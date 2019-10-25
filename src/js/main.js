import blackjack from "blackjack-dealer-logic"

export default () => {
  const singleDeckGame = blackjack.singleDeckGame;

  const playText = document.getElementById("txt-game");
  const playButton = document.getElementById("btn-play");
  const wagerInput = document.getElementById("inp-wager");
  const wagerForm = document.getElementById("frm-wager");
  const doubleButton = document.getElementById("btn-double");
  const standButton = document.getElementById("btn-stand");
  const hitButton = document.getElementById("btn-hit");

  playButton.onclick = function()
  {
    playButton.style.display = "none";
    wagerForm.style.display = "block";
    playText.innerHTML = "You Have " + singleDeckGame.getUserChips() + " Chips";
  }
  wagerForm.onsubmit = function()
  {
    wagerForm.style.display = "none";
    doubleButton.style.display = "block";
    standButton.style.display = "block";
    hitButton.style.display = "block";
    var wagerNum = wagerInput;
    singleDeckGame.deal();
    playText.innerHTML = "Your Wager is: " + wagerNum;

  }
  doubleButton.onclick = function() 
  { 
    singleDeckGame.doubleUser();
    singleDeckGame.evaluateUser();
  }
  standButton.onclick = function() 
  { 
    singleDeckGame.standUser();
    singleDeckGame.evaluateUser();
  }
  hitButton.onclick = function() 
  { 
    singleDeckGame.hitUser();
    singleDeckGame.evaluateUser(); 
  }
}


