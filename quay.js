Array.prototype.each = function(callback){for(i = 0; i < this.length; i++){callback(i, this[i]);}}
Array.prototype.contains = function(obj) {var i = this.length; while (i--) {if (this[i] === obj) {return true;} }return false;}
Array.prototype.remove= function(){ var what, a= arguments, L= a.length, ax; while(L && this.length){what= a[--L]; while((ax= this.indexOf(what))!= -1){this.splice(ax, 1);}}return this;}

function Quay() {}

Quay.pressing = [];
Quay.convert = function(key) {
	var special_keys = {
		8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
		20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
		37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
		96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
		104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
		112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
		120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 186: ";", 191: "/",
		220: "\\", 222: "'", 224: "meta"
	};

	if(Object.keys(special_keys).contains(String(key)))
	{
		return special_keys[key];
	} else {
		return String.fromCharCode(key).toLowerCase();
	}
}
Quay.run = function(key) {
	var string = this.convert(key.which);
	this.pressing.push(string);
}

Quay.press = function(key_bindings) { this.bindings = key_bindings; }

window.onkeydown = function(e) {
	Quay.run(e);

	var currently_pressing = Quay.pressing.join('_');
	if(Object.keys(Quay.bindings).contains(currently_pressing))
	{
		Quay.bindings[currently_pressing]();
	}
}

window.onkeyup = function(e) {
	Quay.pressing.remove(Quay.convert(e.which));
}