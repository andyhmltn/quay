/**
 * Quay - Super simple key binding for JS
 * MIT License
 * https://github.com/andyhmltn/quay
 */
(function (window) {
    "use strict";
    // returns the keys of an object.
    var getKeys = Object.keys || function (obj) {
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    };
    var getEventNumber = function (e) {
        return e.which || e.charCode || e.keyCode || 0;
    };
    // Bind events to functions
    // Taken from `https://raw.github.com/snaptortoise/konami-js/master/konami.js`
    var addEvent = function (obj, type, fn, ref_obj) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
            // IE
            var name = type + fn;
            obj["e" + name] = fn;
            obj[name] = function () {
                obj["e" + name](window.event, ref_obj);
            };
            obj.attachEvent("on" + type, obj[name]);
        }
    };
    // Converts a string of keys delimited by `_` to the corresponding unicode value.
    // The resulting string is sorted by the unicode values of the keys.
    // Ex. convertKeyNamesToUnicode( "ctrl_;" ) === "17,59"
    // Note: `_` is represented by `\\_`. Ex. "ctrl_\\_"
    var convertKeyNamesToUnicode = function (str) {
        str = str || "";
        var keys = [];
        if ((-1 < str.indexOf("\\_"))) {
            str = str.replace(/_?\\_/g, "");
            keys.push("_");
        }
        keys = keys.concat(str.split("_"));
        var nums = [],
        name;
        for (var i = 0, len = keys.length; i < len; i++) {
            name = keys[i].toUpperCase();
            nums[i] = special_key_unicode[name] || name.charCodeAt(0);
        }
        return nums.sort().join(",");
    };
    var special_key_unicode = {
        "BACKSPACE" : "8",
        "TAB" : "9",
        "RETURN" : "13",
        "SHIFT" : "16",
        "CTRL" : "17",
        "ALT" : "18",
        "PAUSE" : "19",
        "CAPSLOCK" : "20",
        "ESC" : "27",
        "SPACE" : "32",
        "PAGEUP" : "33",
        "PAGEDOWN" : "34",
        "END" : "35",
        "HOME" : "36",
        "LEFT" : "37",
        "UP" : "38",
        "RIGHT" : "39",
        "DOWN" : "40",
        "INSERT" : "45",
        "DEL" : "46",
        "F1" : "112",
        "F2" : "113",
        "F3" : "114",
        "F4" : "115",
        "F5" : "116",
        "F6" : "117",
        "F7" : "118",
        "F8" : "119",
        "F9" : "120",
        "F10" : "121",
        "F11" : "122",
        "F12" : "123",
        "NUMLOCK" : "144",
        "SCROLL" : "145",
        "META" : "224"
    };
    var Quay = function () {
        var that = this;
        var currently_pressing;
        var pressing = {};
        // A place holder for a user defined log function
        this.log = function () {};
        // Store bindings from object
        this.press = function (key_bindings) {
            if (!key_bindings || typeof key_bindings !== "object") {
                throw new Error("Quay.press(): Must pass an object literal.");
            }
            this.bindings = {};
            var name = "";
            for (var prop in key_bindings) {
                if (!key_bindings.hasOwnProperty(prop) || typeof key_bindings[prop] !== "function") {
                    continue;
                }
                name = convertKeyNamesToUnicode(prop);
                this.log("Adding key combo: " + prop + " as " + name);
                this.bindings[name] = key_bindings[prop];
            }
        };
        // clear the stored pressed keys
        this.resetPressed = function () {
            that.log("Pressed keys cleared.");
            pressing = {};
            currently_pressing = "";
        };
        // on keydown to store pressed key and call the bound key binding.
        addEvent(window.document, "keydown", function (e) {
            if (!pressing[getEventNumber(e)]) {
                pressing[getEventNumber(e)] = 1;
                currently_pressing = getKeys(pressing).sort().join(',');
    			that.log("Adding event number: " + getEventNumber(e));
				that.log("You're currently pressing: " + currently_pressing);
            }
			
            if (typeof that.bindings[currently_pressing] === "function") {
                that.log("Calling function for `" + currently_pressing + "`");
                that.bindings[currently_pressing]();
            }
        });
        // on keyup, remove the key as pressed.
        addEvent(window.document, "keyup", function (e) {
            that.log("Removing e:" + getEventNumber(e));
            delete pressing[getEventNumber(e)];
            currently_pressing = "";
        });
        // clear the pressed keys if the window closes focus
        addEvent(window.document, "focus", this.resetPressed);
        addEvent(window.document, "blur", this.resetPressed);
    };
    var x = new Quay();
    window.Quay = {
        setLogger : function (fn) {
            x.log = fn;
        },
        press : function () {
            x.press.apply(x, arguments);
        },
        VERISON : "0.5"
    };
})(this);
