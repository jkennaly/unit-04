/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

const classString = letter =>
  letter === " " ? "space" : "hide letter " + letter;
const $letterLi = letter =>
  $("<li></li>")
    .addClass(classString(letter))
    .html(letter);

const $ul = $("#phrase > ul:first");

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
    //set up the regex to use for testing if a letter is in the phrase
    this.phraseRegex = new RegExp(`[${this.phrase}]`, "i");
  }

  addPhraseToDisplay() {
    //convert phrase from string to lis
    const phrases = this.phrase.split("");
    const $letterLis = phrases.map(l => $letterLi(l));

    //clear the ul, then add the lis to it
    $ul.empty();
    $letterLis.forEach($li => $ul.append($li));
  }

  checkLetter(letter) {
    const notSpace = letter !== " ";
    const inPhrase = this.phraseRegex.test(letter);
    return notSpace && inPhrase;
  }

  showMatchedLetter(letter) {
    const $lis = $ul
      .children("li." + letter)
      .removeClass("hide")
      .addClass("show");
  }
}
