var currentText=0;

  function showText(textArray, index) {
      $('.visible p').html(textArray[index][0].innerHTML);
   }

var textBlock = [
$('#first_intro'),
$('#second_intro'),
$('#third_intro'),
$('#fourth_intro'),
$('#first'),
$('#second'),
$('#third'),
$('#fourth'),
$('#fifth'),
$('#sixth'),
$('#seventh'),
$('#eighth'),
$('#ninth'),
$('#tenth'),
$('#eleventh'),
];
var interval = 5000;

// function assignIntervalValue()
// $(document).ready(function(){

// setInterval( function(){showText(textBlock)
// 	currentText++;
// 	interval = textBlock[currentText][0].innerText.length * 100;
// 	console.log(interval);
// if (currentText === textBlock.length) {
//   currentText = 0; 
// }
// }, interval);
// });
 $('#down_arrow').on("click", function() {
 		if (currentText < textBlock.length ) {
 			currentText += 1;
 		} else {
 			currentText = textBlock.length
 		};
      showText(textBlock, currentText);
      console.log(currentText);

 });

  $('#up_arrow').on("click", function() {
  	if (currentText > 0 ) {
 			currentText -= 1;
 		}else {
 			currentText = 0
 		};
      showText(textBlock, currentText);
      console.log(currentText);
 });
