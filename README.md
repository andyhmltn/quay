Quay: Super Simple key binding
=========

**Please note: This is an MVP! Not all features may work correctly**

Quay is a super simple script that allows you to easily bind key shortcuts to functions using javascript. For instance, say you had this function:

	var say_hello = function() {
		alert('Hello there!');
	}

You may want that function to run when a key combination is pressed on your page. Just include Quay and add the following:

	Quay.press({
		'ctrl_alt_a':say_hello
	});

And voila! Now that function will be run whenever the user presses CTRL+ALT+A on that page.

License
-----------
Please see LICENSE.md