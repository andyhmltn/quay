(function(root, factory) {

	// This chunck of code is to allow
	// for AMD/RequireJS loading in a clean
	// way that doesn't leak into the global
	// scope as it did before
	// For more info: https://github.com/umdjs/umd/blob/master/amdWeb.js
	if(typeof define === 'function' && define.amd) {
		// Register the AMD module
		define([], factory);
	} else {
		root.Quay = factory();
	}
})(window, function() {
	// Define the Quay module in the factory
	// and begin the business
	var Quay = function($el) {
		var self = this;

		self.bindings = {};
		self.pressing = [];
		self.special_keys = {
			8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 91: "cmd", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: "", 191: "/",
			220: "\\", 222: "'", 224: "cmd", 93: "cmd"
		};

		if($el) {
			self.bindTo($el);
		}
	}

	Quay.prototype.run = function(key) {
		var key = this.convert(key.which);

		if(! Quay.utils.contains(this.pressing, key)) {
			this.pressing.push(key);
		}
	}

	Quay.prototype.keydown = function(e) {
		this.run(e);

		var currently_pressing = this.pressing.sort().join('_');

		if(Quay.utils.contains(Object.keys(this.bindings), currently_pressing)) {
			this.bindings[currently_pressing].apply(this, [currently_pressing, e]);
		}
	}

	Quay.prototype.keyup = function(e) {
		var key_string = this.convert(e.which);

		var	filterCallback = function(value) {
			return value !== key_string;
		}

		// <IE9 doesn't support the
		// array filter method so Quay.utils
		// provides a (rather rough) fallback
		var result = (this.pressing.filter) ?
						this.pressing.filter(filterCallback) :
						Quay.utils.filter(this.pressing, filterCallback);

		this.pressing = result;

		// The command key behaves extremely
		// weirdly. It will cause the browser to
		// 'forget' other keys are depressed and
		// so the only way to deal with that is a
		// hack to clear the keys pressed when cmd is
		// released. Maybe not a correct assumption but
		// it's better than breaking everything
		if(key_string == "cmd") {
			this.pressing = [];
		}
	}

	Quay.prototype.bindTo = function(element) {
		// I'm not keen on how hacky it is to
		// get the current instance into these
		// functions (without function.prototype.bind)
		// but it seem silly to drop <IE8 support for
		// something like this
		var instance = this;

		if(element.addEventListener) {
			element.addEventListener('keydown', function(e) { instance.keydown.call(instance, e) });
			element.addEventListener('keyup', function(e) { instance.keyup.call(instance, e) });
		}
	}

	Quay.prototype.capture = function(key_bindings) {
		var keys = Object.keys(key_bindings);

		for(var i=0; i<keys.length; i++) {
			var keys_split = keys[i].split(',');

			for(var k=0; k< keys_split.length; k++) {
				var sorted = keys_split[k].split('_').sort().join('_');

				this.bindings[sorted] = key_bindings[keys[i]];
			}

		}
	}

	Quay.prototype.convert = function(key) {
		if(Quay.utils.contains(Object.keys(this.special_keys), String(key))) {
			return this.special_keys[key];
		}

		return String.fromCharCode(key).toLowerCase();
	}

	Quay.utils = {
		filter: function(haystack, callback) {
			var result = [];

			for(var i=0; i<haystack.length; i++) {
				var testedValue = callback.apply(null, [ haystack[i] ]);

				if(testedValue) {
					result.push(haystack[i]);
				}
			}

			return result;
		},
		contains: function(haystack, needle) {
			var i = haystack.length;

			while(i--) {
				if(haystack[i] === needle)
					return true;
			}

			return false;
		}
	}

	// Quay Versioning
	// TODO: Automagic gulp versioning :)
	Quay.VERSION = {
		MAJOR: 2,
		MINOR: 3,
		PATCH: 0,
		FULL: function() {
			return [this.MAJOR, this.MINOR, this.PATCH].join('.');
		}
	}

	return Quay;
})
