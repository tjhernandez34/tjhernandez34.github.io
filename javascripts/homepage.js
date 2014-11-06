// Create HTML5 elements for IE
  
document.createElement("article");
document.createElement("section");

$(document).ready(function(){
    $('section[data-type="background"]').each(function(){
        var $backgroundObj = $(this); // assigning the object
     
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $backgroundObj.data('speed')); 
             
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';
 
            // Move the background
            $backgroundObj.css({ backgroundPosition: coords });
        }); 
    });    
});