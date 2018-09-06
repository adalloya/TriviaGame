$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    questions: {
      q1: 'Where did the fairy Navi get her name?',
      q2: 'What game did the character Marth debut in?',
      q3: 'Which Zelda game did the Master Sword first appear in?',
      q4: 'Luigi is older than Mario.',
      q5: "There are three Pokemon Stadium games for the Nintendo 64.",
      q6: 'How many Mario franchise characters have appeared in the Super Smash Bros up to date?',
      q7: "What other Nintendo character does Kirby resemble when he receives the Sword ability?"
    },
    options: {
      q1: ['Navigate', 'North American Vampire, Inc', 'Navel', 'Navy'],
      q2: ['Age of empires', 'Mario Party', 'Super Smash Bros. Melee','Fire Emblem'],
      q3: ['Legend of Zelda: Ocarina of Time', 'Legend of Zelda: The Wind Waker', 'Legend of Zelda: Twilight Princess', 'Legend of Zelda: A Link to the Past'],
      q4: ['True', 'False'],
      q5: ['True','False'],
      q6: ['5','7','9','11'],
      q7: ['Marth', 'Roy', 'Link','Mario']
    },
    answers: {
      q1: 'Navigate',
      q2: 'Fire Emblem',
      q3: 'Legend of Zelda: A Link to the Past',
      q4: 'False',
      q5: 'False',
      q6: '11',
      q7: 'Link'
    },
    // trivia methods
    // method to initialize game
    startGame: function(){
      // restarting game results
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
    
      $('#game').show();
      

      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      

      $('#start').hide();
  
      $('#remaining-time').show();
      

      trivia.nextQuestion();
      
    },
    nextQuestion : function(){
      
      trivia.timer = 20;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
  
    timerRunning : function(){

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
    
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
   
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        

        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
  
        $('#game').hide();
        
    
        $('#start').show();
      }
      
    },

    guessChecker : function() {
      
    
      var resultId;
      
      
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      

      if($(this).text() === currentAnswer){
    
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }

      else{

        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },

    guessResult : function(){
     
      trivia.currentSet++;
      
      $('.option').remove();
      $('#results h3').remove();
     
      trivia.nextQuestion();
       
    }
  
  }