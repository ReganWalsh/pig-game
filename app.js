var scores, roundScore, activePlayer, gamePlaying; //Declare Variables For Use In Application

init(); //Function Called When Application Is Initialised.

function init() {
    scores = [0,0]; //Initialise Array, Used To Keep Track Of Both Players Scores
    roundScore = 0; //Initialise Variable, Used To Keep Track Of Round Score For A Particular Player
    activePlayer = 0; //Initialise Variable For Active Player, 0 For Player 1, 1 For Player 2
    gamePlaying = true; //Initialise Boolean For When Game Is Currently In Progress

    document.getElementById('dice-1').style.display = 'none'; //Changes CSS To Hide Dice At Start Of Game
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0'; //Changes All Box Numbers To 0, By Default
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1"; //Changes Player Names Back To Default When A New Game Is Started
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner'); //Removes Winner Class From Player When New Game Is Started
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active'); //Removes Active Class From Player When New Game Is Started
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active') //Adds Active Class To Player 1 When New Game Is Started
}

function nextPlayer() { //Function That Is Called When Hold Is Pressed Or Lost Points Due To Rolling A 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //If Player 1 Was Previous Select Player 2 And Vice Versa
    roundScore = 0; //sets round score back to 0

    document.getElementById('current-0').textContent = '0'; //Changes Current Display Back To 0
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active'); //Toggles Active Player Between Players
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active'); //Removes Active Class From Player 1
    //document.querySelector('.player-1-panel').classList.add('active'); //Adds Active Class From Player 2

    document.getElementById('dice-1').style.display = 'none'; //Removes Dice When Changes To Next Player
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init); //Adds Event Listener To New Game When Clicked, Callback Function Provided To Clear Game Contents

document.querySelector('.btn-roll').addEventListener('click', function() { //Adds Event Listener To Roll Dice Button On Click
    //Inside An Anonymous Function

    if (gamePlaying) { //If Still Playing
        var dice1 = Math.floor(Math.random() * 6) + 1; //Assigns Random Absolute Value To Dice Variable
        var dice2 = Math.floor(Math.random() * 6) + 1; //Assigns Random Absolute Value To Dice Variable

        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png'; //Sets Image To Correspond With Random Number Generated And Assigned To dice
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png'; //Sets Image To Correspond With Random Number Generated And Assigned To dice

        if (dice1 !== 1 && dice2 !==1) { //If Dice Is Not 1
            roundScore += dice1 + dice2; //Adds Score To Round Score
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //Displays Current Score In Box If Dice Is Greater Than 1
        }
        else if (dice1 === 1 && dice2 === 1) { //If 2 1s Are Rolled, All Points Are Lost
                scores[activePlayer] = 0;
                console.log(scores[activePlayer]);
                document.querySelector('#score-' + activePlayer).textContent = 0;
                nextPlayer();
        } else { //Else Call NextPlayer Function
            nextPlayer()
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() { //Adds Event Listener To Hold Button On Click
    //Inside An Anonymous Function

    if(gamePlaying) { //If Still Playing
        scores[activePlayer] += roundScore; //Adds Current Score To Global Score

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]; //Displayed Saved Scores To Global Score

        var input = document.querySelector('.final-score').value; //Assign Input To Final Score Value Provided By User
        var winningScore; //Declare Winning Score Variable

        if(input) { //If There Is Input Assign The Provided Input To Winning Score
            winningScore = input;
        } else {
            winningScore = 100; //Default Value
        }

        if (scores[activePlayer] >= winningScore) { //If Score Is Greater Than Or Equal To Win Condition
            document.querySelector('#name-' + activePlayer).textContent = "Winner!"; //Set Text To Winner
            document.getElementById('dice-1').style.display = 'none'; //Changes CSS To Hide Dice
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner'); //Adds Winner Class To Player Who Won
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); //Removes Active Class From Player Who Won
            gamePlaying = false; //End Game
        } else {
            nextPlayer(); //Otherwise Continue Game
        }
    }
});








