Quay: Super Simple key binding
=========

## Version
0.5

Quay is a super simple script that allows you to easily bind key shortcuts to functions using javascript. 

For instance, say you had this function:

	var say_hello = function() {
		alert('Hello there!');
	}

You may want that function to run when a key combination is pressed on your page. 
Just include Quay and add the following:

	Quay.press({
		'ctrl_alt_a':say_hello
	});

And voila! Now that function will be run whenever the user presses CTRL+ALT+A on that page.

## Support 
Should work on Chrome 20+, Firefox 16+, IE8+, Opera 10+ and Safari?.
More testing is needed to confirm.

## Installation

	<script type="quay.js"></script>

## Dependencies
None

## Demo
Refer to `demo.html`

## API

<b>Quay.press(object)</b>
Binds an key press combination to a function call.
Pass an object to `Quay.press()`, where the properties names are the key combination, and the value is the function.

	Quay.press({
		key_combo : function,
		...
	})

Example:

	var say_hello = function () {
		log( "Hello World! It's " + (new Date()).toUTCString() );
	};
	Quay.press({
		'ctrl_alt_a' : say_hello
	});

<b>Quay.setLogger(fn)</b> (Optional)
Used to receive debug message.

Example:

	Quay.setLogger(function(msg){
		console.log(msg);
	});

<b>Quay.VERSION</b>
Version of Quay

## List of Key Names:
Note: The keys are not case insentive.

<b>Edit Keys:</b>
"BACKSPACE", "DEL", "INSERT", "RETURN", "SPACE", "TAB"

<b>Directional Keys:</b>
"DOWN", "END", "HOME", "LEFT", "PAGEDOWN", "PAGEUP", "RIGHT", "UP"

<b>Fn:</b>
"F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"

<b>Special keys:</b>
"ALT", "CAPSLOCK", "CTRL", "ESC", "META", "NUMLOCK", "PAUSE", "SCROLL", "SHIFT"

<b>Others:</b>
For anything else, use the character.

## License
MIT License
