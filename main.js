// start main vars
let player1 = document.querySelector('.player--0'),
  player2 = document.querySelector('.player--1'),
  playerScore1 = document.querySelector('#score--0'),
  playerScore2 = document.querySelector('#score--1'),
  currentScore1 = document.querySelector('#current--0'),
  currentScore2 = document.querySelector('#current--1'),
  diceImg = document.querySelector('.dice'),
  btnNew = document.querySelector('.btn--new'),
  btnRoll = document.querySelector('.btn--roll'),
  btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// starting the game
const starting = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  playerScore1.textContent = 0;
  playerScore2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  diceImg.classList.add('hidden');
  player1.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--winner');
  player2.classList.remove('player--active');
};
starting();

//switch player
const switchPlayer = function () {
  // set current score player to zero
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // toggle current score
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // toggle classes for players
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

// ROLL DICE Btn
btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number
    let randomNum = Math.trunc(Math.random() * 6) + 1;
    // change dice img
    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice-${randomNum}.png`;

    // check for NOT equal 1
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      // check for EQUAL 1
    } else {
      switchPlayer();
    }
  }
});

// HOLD DICE Btn
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // add player winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // remove active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // hide the dice img
      diceImg.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// NEW GAME Btn
btnNew.addEventListener('click', starting);
