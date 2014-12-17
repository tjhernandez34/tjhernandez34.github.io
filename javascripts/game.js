var timer;
var guess;
var win = false;
var numberCorrect = 0;
var correctGuesses = [];
var questions = [];
var Question = function(question, answer) {
    this.question = question;
    this.answer = answer;
}; 

function answeredAll() {
	var numberAnswered = [];
	var elems = document.getElementsByClassName( "answers" );
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].innerText !== "") {
			numberAnswered.push(elems[i].innerText);
		}
	}
	if (numberAnswered.length === 5) {
		$('.answers').css('background-color', '#00FFFF');
		$('#score').css('color', '#00FFFF');
		clearInterval(timer);
		alert("Ohhhh Yeeahhh!");
		$('#answer_box').removeClass('visible');
		$('#answer_box').addClass('hidden');
		$('#play_again').removeClass('hidden');
		$('#play_again').addClass('visible');
		return true;
	}	
	else {
		return false;
	}
}

function fillUnansweredQuestions(questions) {
	var answeredQuestions = document.getElementsByClassName( "answers");

	for (var l = 0; l < answeredQuestions.length; l++){
		
		if (answeredQuestions[l].innerText !== "") {	
			$('#answer' + l).css('background-color', '#00FFFF');		
		}else {
			answeredQuestions[l].innerText = questions[l].answer;
			$('#answer' + l).css('background-color', 'red');	
		}
		}
	}

function filledAnswers() {
	var numberAnswered = [];
	var elems = document.getElementsByClassName( "answers" );
	for (var i = 0; i < elems.length; i++) {
			numberAnswered.push(elems[i]);
	}
	return numberAnswered;
}

function createQuestions(allText) {
  var allQuestionPairs = allText.split(/\r\n|\n/);
  var headers = allQuestionPairs[0].split(',');
  $('#game_table').append('<tr><td class="table_title">'+ headers[0]+ '</td><td class="table_title">' + headers[1] + '</td></tr>');
  for (var i = 1; i < allQuestionPairs.length; i++) {
      var data = allQuestionPairs[i].split(',');
      var q = new Question(data[0], data[1]);
      questions.push(q);
  }
  for ( var j = 0; j < questions.length; j++){
  	$('#game_table').append('<tr><td>'+ questions[j].question + '</td><td class="answers" id="answer'+ j + '"></td></tr>');
  }  
}

function startGame() {
	$('#play').click(function(event){
		event.preventDefault();
		$('#play').attr('class', 'hidden');
		$('#answer_box').attr('class', 'visible');
		checkGuess(questions);
		var counter = 60;
		$('#answer0');
   timer = setInterval(function() {
   		win = answeredAll();
     counter--;
			if (counter >= 10) {
         $('#timer')[0].innerText = "0:" + counter;
      }
      else if (counter > 0) {
         $('#timer')[0].innerText = "0:0" + counter;
      }
			else if (counter <= 0) {
         	$('#timer')[0].innerText = "0:00";
         	clearInterval(timer); 
         	fillUnansweredQuestions(questions);
         	alert("Ohhhh Noooo!");
					$('#answer_box').removeClass('visible');
					$('#answer_box').addClass('hidden');
					$('#play_again').removeClass('hidden');
					$('#play_again').addClass('visible');
         return false;
       }
      else {
      	$('#game_table').attr('class', 'correct');
      	clearInterval(timer);
      	return false;
       }
     }, 1000);
	});
}


function checkGuess(questions) {
	setInterval(function() { 
		
		guess = $('#answer_box').val();
		for (var q = 0; q < questions.length; q++) {
			if (questions[q].answer === guess && correctGuesses.indexOf(guess) === -1) {
				correctGuesses.push(questions[q].answer);
				numberCorrect += 1;
				$('#answer' + q)[0].innerText = questions[q].answer;
				$('#score')[0].innerText =  numberCorrect.toString() + " / 5";
				$('#answer_box').val("");
			}
    }
	}, 100);
}

function gameOver() {
 $('#play_again').click(function(event){
		event.preventDefault();
		location.reload();
	});
}

$(document).ready(function() {

startGame();
gameOver();
  $.ajax({
          type: "GET",
          url: "../gameInfo.txt",
          dataType: "text",
          success: function(data) {createQuestions(data);}
       });

  });

