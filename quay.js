(function(){
	var Quay = function() {
		var _self = this;

		/*Utility Functions*/
		var contains = function(a, obj) {var i = a.length;while (i--) {if (a[i] === obj) {return true;}}return false;},
			remove = function(a, x) {
				if (contains(a,x)) {
					a.splice(a.indexOf(x));
				}
			};

		var pressing = [],
			special_keys = {
				8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
				20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
				37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
				96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
				104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
				112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
				120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: ";", 191: "/",
				220: "\\", 222: "'", 224: "meta"
			};

		this.convert = function(key) {

			if (contains(Object.keys(special_keys),String(key)))
			//if(Object.keys(special_keys).contains(String(key)))
			{
				return special_keys[key];
			} else {
				return String.fromCharCode(key).toLowerCase();
			}
		};
		this.run = function(key) {
			var string = this.convert(key.which);
			pressing.push(string);
		};

		this.press = function(key_bindings) { this.bindings = key_bindings; };

		window.onkeydown = function(e) {
			_self.run(e);

			var currently_pressing = pressing.join('_');
			if (contains(Object.keys(_self.bindings),currently_pressing))
			{
				_self.bindings[currently_pressing]();
			}
		};

		window.onkeyup = function(e) {
			remove(pressing,_self.convert(e.which));
		};
	};



	window.Quay = new Quay();
})();
