/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
const $letterButtons = $("button.key");

const winMsg = "Congratulations!";
const loseMsg = "Maybe next time...";

class Game {
  constructor() {
    this.missed = 0;

    //map the phrase strings to create Phrase objects
    this.phrases = [
      "A Foot in the Door",
      "Cut and Run",
      "For Crying Out Loud",
      "On the wagon",
      "The whole shebang"
    ].map(str => new Phrase(str));

    this.activePhrase = null;
  }

  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  startGame() {
    //hide start screen overlay
    $("#overlay").hide();

    //get and display the phrase
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  checkForWin() {
    //if there are no hidden letters, the game is won
    return !$(".hide.letter").length;
  }

  gameOver() {
    const wonGame = checkForWin();
    const overlayClass = wonGame ? "win" : "lose";
    //show start screen overlay and update class
    $("#overlay")
      .show()
      .attr("class", overlayClass);

    const message = wonGame ? winMsg : loseMsg;
    $("#game-over-message").html(message);

    //clear outt he last game
    this.missed = 0;
    $("button:disabled").prop("disabled", false);
    $(".key.chosen, .key.wrong").attr("class", "key");
    $('img[src*="lostHeart.png"]').attr("src", "images/liveHeart.png");
  }

  removeLife() {
    //find last liveheart
    //switch to deadheart
    $('img[src*="liveHeart.png"]:last').attr("src", "images/lostHeart.png");

    //increment missed and end game if over
    this.missed++;
    if (this.missed >= 5) this.gameOver();
  }

  handleInteraction(letter) {
    //get the button that was pressed
    const $btn = $letterButtons.filter(
      (i, el) => el.innerHTML.toLowerCase() === letter.toLowerCase()
    );
    $btn.prop("disabled", true);
    const guessCorrect = this.activePhrase.checkLetter(letter);
    if (guessCorrect) {
      $btn.addClass("chosen");
      this.activePhrase.showMatchedLetter(letter);
      const won = this.checkForWin();
      if (won) this.gameOver();
    } else {
      $btn.addClass("wrong");
      this.removeLife();
    }
  }
}
