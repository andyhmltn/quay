Quay: Super Simple key binding
=========

Quay is a super simple script that allows you to easily bind key shortcuts to functions using javascript. <br/>

For instance, say you had this function:

	var say_hello = function() {
		alert('Hello there!');
	}

You may want that function to run when a key combination is pressed on your page. <br/>
Just include Quay and add the following:

	Quay.press({
		'ctrl_alt_a':say_hello
	});

And voila! Now that function will be run whenever the user presses CTRL+ALT+A on that page.<br/>

## Version
0.5

## Support
Should work in most web browsers.<br/>
Ex. Chrome 20+, Firefox 16+, IE8+, Opera 10+ and Safari?<br/>
Testing is needed to confirm.<br/>

## Installation

	<script type="quay.js"></script>

## Dependencies
None

## Demo
Refer to `demo.html`

## API

<b>Quay.press(object)</b><br/>
Binds an key press combination to a function call.<br/>
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

<b>Quay.setLogger(fn)</b> (Optional)<br/>
Used to receive debug message.

Example:

	Quay.setLogger(function(msg){
		console.log(msg);
	});

<b>Quay.VERSION</b><br/>
Version of Quay

## Key Names:
Note: The keys are not case insentive.<br/>

<b>Edit Keys:</b><br/>
"BACKSPACE", "DEL", "INSERT", "RETURN", "SPACE", "TAB"<br/>

<b>Directional Keys:</b><br/>
"DOWN", "END", "HOME", "LEFT", "PAGEDOWN", "PAGEUP", "RIGHT", "UP"<br/>

<b>Fn:</b><br/>
"F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"<br/>

<b>Special keys:</b><br/>
"ALT", "CAPSLOCK", "CTRL", "ESC", "META", "NUMLOCK", "PAUSE", "SCROLL", "SHIFT"<br/>

<b>Others:</b><br/>
For anything else, use the character.<br/>

## License
MIT License
