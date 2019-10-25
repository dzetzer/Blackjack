import blackjack from "blackjack-dealer-logic"

export default () => {
  const singleDeckGame = blackjack.singleDeckGame;

  const playText = document.getElementById("txt-game");

  const playButton = document.getElementById("btn-play");

  const wagerInput = document.getElementById("inp-wager");
  const wagerForm = document.getElementById("frm-wager");
  const wagerSubmit = document.getElementById("btn-submit");

  const doubleButton = document.getElementById("btn-double");
  const standButton = document.getElementById("btn-stand");
  const hitButton = document.getElementById("btn-hit");

  playButton.onclick = function()
  {
    playButton.style.display = "none";
    wagerForm.style.display = "block";
    playText.innerHTML = "You Have " + singleDeckGame.getUserChips() + " Chips";
  }
  wagerSubmit.onclick = function()
  {
    wagerForm.style.display = "none";
    doubleButton.style.display = "block";
    standButton.style.display = "block";
    hitButton.style.display = "block";

    var wagerNum = wagerInput;
    singleDeckGame.ante = wagerNum;
    singleDeckGame.deal();
    displayHand();
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
  function gameLose()
  {
    playText.innerHTML = "You Lost! <br/>" + gameSummary();
  }
  function gameWin()
  {
    playText.innerHTML = "You Won! <br/>" + gameSummary();
  }
  function gameSummary()
  {
    doubleButton.style.display = "none";
    standButton.style.display = "none";
    hitButton.style.display = "none";

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
  function checkGame()
  {
    singleDeckGame.settleDealerHand();
    var dealerNum = singleDeckGame.evaluateDealer();
    var userNum = singleDeckGame.evaluateUser();
    if(userNum > 21) gameLose();
    if(dealerNum > 21) gameWin();
  }
}






