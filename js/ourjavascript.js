// JavaScript File

//Local Time - resource: http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function startTime () {
    var today = new Date ();
    var h = today.getHours();
    var m = today.getMinutes();
    m = checkTime(m);
    document.getElementById("digitalclock").innerHTML = h + ":" + m ;
    var t = setTimeout (startTime, 500);
}
function checkTime (i) {
    if (i < 10) {i = "0" + i};
    // add zero in front of numbers < 10
    return i;
}

/*No longer necessary for my Food Modals, but keep just in case.
Modal Focus - resource: http://getbootstrap.com/javascript/#modals
$ ("#myModal1").on("shown.bs.modal", function() {
    $("#image1").focus()
});
*/

/*Tried to include in "Reservations" on Food page, but does not work b/c Datepicker with Icon Trigger is JQuery UI and we do not have JQ UI file downloaded.
Datepicker - resource: https://jqueryui.com/datepicker/#icon-trigger
$ (function () {
   $ ("#datepicker").datepicker( {
    showOn: "button",
    buttonImage: "",
    //Where do I get calendar image to work with this?
    buttonImageOnly: "true",
    buttonText: "Select date"
   }); 
});

$("#datepicker").datepicker("widget");

var widget = $("#datepicker").datepicker("widget");
*/

//JQuery on Food Modals
$(document).ready(function() {
   $(".LIKEbutton").click (function() {
       $(".LIKEbutton").addClass("orangeLIKE");
   });
});

$(document).ready(function() {
   $(".LIKEbutton").dblclick (function() {
       $(".LIKEbutton").removeClass("orangeLIKE");
   });
});

// CREATES STICKY FOOTER

$(window).bind("load", function() { 
       
       var footerHeight = 0,
           footerTop = 0,
           $footer = $("#footer");
           
       positionFooter();
       
       function positionFooter() {
       
                footerHeight = $footer.height();
                footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
       
               if ( ($(document.body).height()+footerHeight) < $(window).height()) {
                   $footer.css({
                        position: "absolute"
                   }).animate({
                        top: footerTop
                   })
               } else {
                   $footer.css({
                        position: "static"
                   })
               }
               
       }

       $(window)
               .scroll(positionFooter)
               .resize(positionFooter)
               
});

// CREATES STICKY FOOTER


