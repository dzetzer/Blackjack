import blackjack from "blackjack-dealer-logic"


export default () => {
  const singleDeckGame = blackjack.singleDeckGame;
  const Result = blackjack.Result;

  const nameText = document.getElementById("txt-player");
  const playText = document.getElementById("txt-game");

  const nameForm = document.getElementById("frm-name");
  const nameInput = document.getElementById("inp-name");
  const playButton = document.getElementById("btn-play");

  const wagerForm = document.getElementById("frm-wager");
  const wagerInput = document.getElementById("inp-wager");
  const wagerOutput = document.getElementById("txt-wager");
  const wagerSubmit = document.getElementById("btn-wager-submit");

  const doubleButton = document.getElementById("btn-double");
  const standButton = document.getElementById("btn-stand");
  const hitButton = document.getElementById("btn-hit");

  const contButton = document.getElementById("btn-continue");

  const gameList = document.getElementById("txt-history");

  playButton.onclick = function()
  {
    nameForm.style.display = "none";
    playButton.style.display = "none";
    wagerForm.style.display = "block";
    nameText.innerHTML = nameInput.value;
    setWagerForm();
  }
  wagerSubmit.onclick = function()
  {
    wagerForm.style.display = "none";
    doubleButton.style.display = "block";
    standButton.style.display = "block";
    hitButton.style.display = "block";

    singleDeckGame.receiveAnte(wagerInput.value);
    singleDeckGame.deal();
    displayHand();
  }
  wagerForm.oninput = function()
  {
    wagerOutput.innerHTML=wagerInput.value;
  }
  doubleButton.onclick = function() 
  { 
    singleDeckGame.doubleUser();
    singleDeckGame.evaluateUser();
    displayHand();
    checkGame();
  }
  standButton.onclick = function() 
  { 
    singleDeckGame.standUser();
    singleDeckGame.evaluateUser();
    displayHand();
    checkGame();
  }
  hitButton.onclick = function() 
  { 
    singleDeckGame.hitUser();
    singleDeckGame.evaluateUser();
    displayHand();
    checkGame();
  }
  contButton.onclick = function()
  {
    contButton.style.display = "none";
    wagerForm.style.display = "block";
    setWagerForm();

    singleDeckGame.resetAnte();
    singleDeckGame.resetPlayers();
  }
  function gameLose()
  {
    singleDeckGame.resetAnte();
    playText.innerHTML = "You Lost! <br/>" + gameSummary();
  }
  function gameWin()
  {
    singleDeckGame.userWin();
    playText.innerHTML = "You Won! <br/>" + gameSummary();
  }
  function gamePush()
  {
    singleDeckGame.pushHand();
    playText.innerHTML = "Push! <br/>" + gameSummary();
  }
  function gameSummary()
  {
    doubleButton.style.display = "none";
    standButton.style.display = "none";
    hitButton.style.display = "none";
    contButton.style.display = "block";

    return "Your Hand Was: " + singleDeckGame.getUserHandValue() + "<br/>" +
           "The Dealers Hand Was: " + singleDeckGame.getDealerHandValue();
  }
  function displayHand()
  {
    playText.innerHTML = "The Current Ante is: " + singleDeckGame.getAnte() + "<br/>" +
                         "Your Current Hand is: " + singleDeckGame.getUserHandValue() + "<br/>" +
                         "The Dealers First Card is: " + singleDeckGame.getDealerCardUp();
                         singleDeckGame.getDealerHand();
  }
  function addGameHistory(gameResult)
  {
    var listElement = document.createElement("li");
    if(gameResult == Result.LOSS) { listElement.innerHTML = "Loss" };
    if(gameResult == Result.PUSH) { listElement.innerHTML = "Push" };
    if(gameResult == Result.WIN) { listElement.innerHTML = "Win" };
    gameList.appendChild(listElement);
  }
  function checkGame()
  {
    singleDeckGame.settleDealerHand();
    if(singleDeckGame.isUserBust() || !singleDeckGame.isUserPlaying())
    {
      let gameResult = singleDeckGame.outcome();
      switch (gameResult) {
        case Result.LOSS:
          gameLose();
          addGameHistory(singleDeckGame.outcome());
          break;
        case Result.PUSH:
          gamePush();
          addGameHistory(singleDeckGame.outcome());
          break;
        case Result.WIN:
          gameWin();
          addGameHistory(singleDeckGame.outcome());
          break;
        default:
          break;
      }
    }
  }
  function setWagerForm()
  {
    playText.innerHTML = "You Have " + singleDeckGame.getUserChips() + " Chips";
    wagerInput.min = 1;
    wagerInput.max = singleDeckGame.getUserChips();
    wagerInput.value = 1;
  }
}