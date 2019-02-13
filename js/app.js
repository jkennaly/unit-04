/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game = new Game();

//start game
$("#btn__reset").on("click", e => {
	game = new Game();
	game.startGame();
});

//onscreen game keyboard event handler
$("#qwerty").on("click", e => {
	const $target = $(e.target);
	const validButton = $target.hasClass("key") && !$target.prop("disabled");
	//if the target is a valid button, pass the value to handleInteraction
	if (validButton) game.handleInteraction($target.html());
});

//physical keyboard event handler
//note: keydown event used instead of keypress.
//keypress event is deprecated in cases where it can be replaced with keydown:
//see https://developer.mozilla.org/en-US/docs/Web/Events/keypress
document.addEventListener("keydown", e => {
	const letter = String.fromCharCode(e.keyCode).toLowerCase();
	//if the key pressed is a valid key, pass the value to handleInteraction
	if (/[a-z]/.test(letter)) game.handleInteraction(letter);
});
