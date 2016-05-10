slots = [
        { "text": "Eridium x3",
          "css": "eridiumx3" },
        { "text": "Seven",
          "css": "seven" },
        { "text": "Leg",
          "css": "leg" },
        { "text": "Psycho",
          "css": "psycho" },
        { "text": "Vault",
          "css": "vault" },
        { "text": "Bell",
          "css": "bell" },
        { "text": "Marcus",
          "css": "marcus" },
        { "text": "Cherries",
          "css": "cherries" },
        { "text": "Eridium x1",
          "css": "eridiumx1" },
        { "text": "Eridium x2",
          "css": "eridiumx2" }
    ];

var rotation_amount = 360/slots.length;
  
$(document).ready(function() {
  // Handler for .ready() called.
//alert();
   // show initial slots

  $("#lever").on("click", function(){
    // Ease out and spin wheels
//alert(rotation_amount);
    // Get final position of wheels
    outcome = get_outcome();

    // Callback when timers complete
    if($("#first").hasClass("spinning")) {
      $("#first").attr("class", "slots "+outcome[0]);
      $("#second").attr("class", "slots "+outcome[1]);
      $("#third").attr("class", "slots "+outcome[2]);

    }
    else
    {
      spin_wheel("#first");
      spin_wheel("#second");
      spin_wheel("#third");
    }
  });

  $('input[name=sa]').on("click", function(x){
    alert($(this).val());
    $("#first").attr("class", "slots "+$(this).val());
  });
  $('input[name=sb]').on("click", function(x){
    $("#second").attr("class", "slots "+$(this).val());
  });
  $('input[name=sc]').on("click", function(x){
    $("#third").attr("class", "slots "+$(this).val());
  });

});

function set_rotation(el, position) {
  $("#"+el).css("transform","rotateX("+position*rotation_amount+"deg)");
  $("#"+el).attr('class', 'slots slot'+position);
}

function get_outcome() {
  // Choose one of the outcome scenarios based upon probabilities
  var outcomes = new Array();;

  outcomes[0]= "marcus";
  outcomes[1]= "marcus";
  outcomes[2]= "marcus";

//  alert(outcomes[0]);

  return (outcomes);
}

function spin_wheel(el) 
{
  $(el).attr("class", "slots spinning");
//  $(el).attr("class", "slots easing_up").delay(200).queue(function () {$(this).attr("class","slots spinning");$(this).dequeue();});

}


    slots = [
        { "text": "Eridium x3",
          "css": "eridiumx3" },
        { "text": "Seven",
          "css": "seven" },
        { "text": "Leg",
          "css": "leg" },
        { "text": "Psycho",
          "css": "psycho" },
        { "text": "Vault",
          "css": "vault" },
        { "text": "Bell",
          "css": "bell" },
        { "text": "Marcus",
          "css": "marcus" },
        { "text": "Cherries",
          "css": "cherries" },
        { "text": "Eridium x1",
          "css": "eridiumx1" },
        { "text": "Eridium x2",
          "css": "eridiumx2" }
    ];

    //outcomes = {{ outcomes|safe }}

    weights = init_weights();

    function rand_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function init_weights() {
        var w = [];
        var total = 0;
        var cumulative_weight = 0;

        for (var i = 0; i < outcomes.length; i++) {
            total += outcomes[i].chance;
        }

        for (var i = 0; i < outcomes.length; i++) {
            var normalized_weight = outcomes[i].chance / total;
            w[i] = cumulative_weight + normalized_weight;
            cumulative_weight += normalized_weight;
        }
        
        return w;
    }

    function get_reward() {
        var r = Math.random();
        var i = 0;
        for (i = 0; i < weights.length && r >= weights[i]; i++) ;
        return outcomes[i];
    }

    function get_outcome() {
        var outcome = [];
        var reward = get_reward();
        var wheel = null;
        var prev_wheel = null;

        outcome[0] = reward.reward;
        outcome[1] = $.map(reward.symbols.split(''), function(char) {
            switch (char) {
                // TODO fails on NN5 when N comes up as a 5
                case 'N':
                    if (prev_wheel) {
                        wheel = prev_wheel;
                    } else {
                        wheel = slots[rand_int(0, 9)];
                        prev_wheel = wheel;
                    }
                    return wheel.css;
                case 'X':
                    do {
                        wheel = slots[rand_int(0, 9)];
                    } while (prev_wheel && (wheel === prev_wheel));
                    prev_wheel = wheel;
                    return wheel.css;
                default:
                    wheel = slots[parseInt(char)];
                    prev_wheel = wheel;
                    return wheel.css;
            }
        });
        outcome[2] = reward.symbols;

        return outcome;
    }

    $(document).ready(function () {
        $("#lever").on("click", function () {
            outcome = get_outcome();

            $("#outcome").empty();
            $("#outcome").append(outcome[0] + " ");
            $("#outcome").append(outcome[1] + " ");
            $("#outcome").append(outcome[2]);
        });
        
        $("#test").on("click", function () {
            var dist = {};
            var test_iterations = 1000000;
            
            var start = (new Date).getTime();
            for (var i = 0; i < test_iterations; i++) {
                symbols = get_outcome()[2];
                dist[symbols] = dist[symbols] + 1 || 1;
            }
            var diff = (new Date).getTime() - start;
            
            $("#data").empty();
            $.each(outcomes, function (id, outcome) {
                var result = (dist[outcome.symbols] / test_iterations) * 100;
                var variance = result - outcome.chance;
                $("#data").append("<tr><th>"+outcome.symbols+"</th><td>"+outcome.chance.toFixed(2)+"</td><td>"+result.toFixed(2)+"</td><td>"+variance.toFixed(4)+"</td></tr>");
            });
            
            $("#time").empty().append("Execution time: " + diff);
        });
    });