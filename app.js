/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
/**
 * To Include In Snippets:
 * Callback Function Definition    
 * Anonymous Function Definition
 * Ternary Operator Definition
 * DOM Manipulation Definition
 */

var scores, roundScore, activePlayer, gamePlaying; //Declare Variables For Use In Application

init(); //Function Called When Application Is Initialised.

/**
 * //Assigns Random Absolute Value To Dice Variable
 * var dice = Math.floor(Math.random() * 6) + 1
 *
 * //Selects Elements The Same As CSS, Used To Assign Value In Current Box In Webpage
 * document.querySelector('#current-' + activePlayer).textContent = dice;
 *
 * //Used To Assign Value In Curent Box In Webpage, Uses HTML For Emphasis (HTML As String)
 * document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
 *
 * //querySelecter Can Also Be Used To Read Elements From Webpage
 * var x = document.querySelector('#score-0').textContent; //Reads Score From Webpage
 */

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
};

function nextPlayer() { //Function That Is Called When Hold Is Pressed Or Lost Points Due To Rolling A 1
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //If Player 1 Was Previous Select Player 2 And Vice Versa
    roundScore = 0; //sets round score back to 0

    document.getElementById('current-0').textContent = '0' //Changes Current Display Back To 0
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active'); //Toggles Active Player Between Players
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active'); //Removes Active Class From Player 1
    //document.querySelector('.player-1-panel').classList.add('active'); //Adds Active Class From Player 2

    document.getElementById('dice-1').style.display = 'none'; //Removes Dice When Changes To Next Player
    document.getElementById('dice-2').style.display = 'none';
};

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
        } else { //Else Call NextPlayer Function
            nextPlayer()
        }
        /*
        if(dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = 0;
            nextPlayer();
        } else if (dice !== 1) { //If Dice Is Not 1
            roundScore += dice; //Adds Score To Round Score
            document.querySelector('#current-' + activePlayer).textContent = roundScore; //Displays Current Score In Box If Dice Is Greater Than 1
        } else { //Else Call NextPlayer Function
            nextPlayer()
        }
        lastDice = dice;
        */
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
            var winningScore = input;
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








