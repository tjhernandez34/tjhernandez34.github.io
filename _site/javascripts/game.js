var timer, guess, minutesLeft, secondsLeft;
var win = false;
var numberCorrect = 0;
var correctGuesses = [];
var questions = [];
var timeLimit = 90;
var Question = function(question, answer) {
    this.question = question;
    this.answer = answer;
}; 

function addLeadingZero(number){
	return (number < 10) ? ("0" + number) : number;
 }

var winningChanges = function() {
 		$('.answers').css('background-color', '#00FFFF');
		$('#score').css('color', '#00FFFF');
		clearInterval(timer);
		$('#answer_box').removeClass('visible');
		$('#answer_box').addClass('hidden');
		$('#play_again').removeClass('hidden');
		$('#play_again').addClass('visible');
	}

function answeredAll() {
	var numberAnswered = [];
	var elems = document.getElementsByClassName( "answers" );
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].innerHTML !== "") {
			numberAnswered.push(elems[i].innerHTML);
		}
	}
	if (numberAnswered.length === questions.length) {
		winningChanges();
		return true;
	}	
	else {
		return false;
	}
}

function fillUnansweredQuestions(questions) {
	var answeredQuestions = document.getElementsByClassName( "answers");
	for (var l = 0; l < answeredQuestions.length; l++){
		
		if (answeredQuestions[l].innerHTML !== "") {	
			$('#answer' + l).css('background-color', '#00FFFF');		
		}else {
			answeredQuestions[l].innerHTML = questions[l].answer;
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
  $('#score')[0].innerHTML =  numberCorrect.toString() + " / " + questions.length.toString();  
}

function setScoreBoard(){
  $('#score')[0].innerHTML =  numberCorrect.toString() + " / " + questions.length.toString();  
}

function startGame() {
	$('#play').click(function(event){
		event.preventDefault();
		$('#play').attr('class', 'hidden');
		$('#answer_box').attr('class', 'visible');
		checkGuess(questions);
		$('#answer0');
		var counter = timeLimit;
   	timer = setInterval(function() {
   		win = answeredAll();
   		counter -= 1;
   		minutesLeft = Math.floor(counter / 60);
   		secondsLeft = counter % 60;
			if (counter > 0) {
         $('#timer')[0].innerHTML = addLeadingZero(minutesLeft) + ":" + addLeadingZero(secondsLeft);
      }
			else if (counter <= 0) {
         	$('#timer')[0].innerHTML = "0:00";
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
			if (questions[q].answer.toLowerCase() === guess.toLowerCase() && correctGuesses.indexOf(guess) === -1) {
				correctGuesses.push(questions[q].answer);
				numberCorrect += 1;
				$('#answer' + q)[0].innerHTML = questions[q].answer
				$('#score')[0].innerHTML =  numberCorrect.toString() + " / " + questions.length.toString();
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
          success: function(data) {
						minutesLeft = Math.floor(timeLimit / timeLimit);
						secondsLeft = timeLimit % 60;
						$('#timer')[0].innerHTML = addLeadingZero(minutesLeft) + ":" + addLeadingZero(secondsLeft);
          	createQuestions(data);
						setScoreBoard();
          }
       });

  });

