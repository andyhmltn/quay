/**
 * Quay - Super simple key binding for JS
 * MIT License
 * https://github.com/andyhmltn/quay
 */
(function (window) {
    "use strict";
    
    var mixin = {};
    // returns the keys of an object.
    mixin.getKeys = Object.keys || function (obj) {
        if (typeof obj !== "object") {
            return null;
        }
        var arr = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push(prop);
            }
        }
        return arr;
    };
    // Returns an new object from an object that has it's key and value pairs switched.
    mixin.invertObject = function (obj) {
        if (typeof obj !== "object") {
            return null;
        }
        var x = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                x[obj[prop]] = prop;
            }
        }
        return x;
    };
    // Bind events to functions
    // Taken from `https://raw.github.com/snaptortoise/konami-js/master/konami.js`
    mixin.addEvent = function (obj, type, fn, ref_obj) {
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
    
    var Keys = {};
    // @todo The structure must change to allow for multiple values for the same key name.
    Keys.specialKeyNameToUnicode = {
        "BACKSPACE" : "8",
        "TAB" : "9",
        "RETURN" : "13",
        "SHIFT" : "16",
        "WINDOWS" : "91",
        "CTRL" : "17",
        "ALT" : "18",
        "PAUSE" : "19",
        "CAPSLOCK" : "20",
        "ESC" : "27",
        "SPACE" : "32",
        "PAGEUP" : "33",
        "PAGEDOWN" : "34",
        "PRINT" : "44",
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
        "META" : "224",
        "`" : "192",
        "-" : "189",
        "=" : "187",
        "/" : "191",
        "*" : "106",
        "." : "190",
        "," : "188",
        "\\" : "220",
        "[" : "219",
        "]" : "221",
        ";" : "186",
        "'" : "222"
    };
    Keys.specialUnicodeToKeyName = mixin.invertObject(Keys.specialKeyNameToUnicode);
    Keys.getCharCodeFromEvent = function (e) {
        return e.which || e.keyCode || e.charCode || 0;
    };
    Keys.getKeyNameFromEventCode = function (e) {
        var val = Keys.getCharCodeFromEvent(e);
        return Keys.specialUnicodeToKeyName[val] || String.fromCharCode(val) || "?";
    };
    Keys.getEventCodeFromKeyName = function (key) {
        key = key.toUpperCase();
        return Keys.specialKeyNameToUnicode[key] || key.charCodeAt(0) || 0;
    };
    Keys.formNameFromKeys = function (keys) {
        return keys.sort().join(',');
    };
    // Splits the key names into an array of key names.
    Keys.splitUserKeyNames = function (str) {
        str = str || "";
        var keys = [];
        if (-1 < str.indexOf("\\_")) {
            str = str.replace(/_?\\_/g, "");
            keys.push("_");
        }
        keys = keys.concat(str.split("_"));
        for (var i = 0, len = keys.length; i < len; i++) {
            keys[i] = keys[i].toUpperCase();
        }
        return keys;
    };
    
    var Quay = function () {
        var bindings = {},
        currently_pressing,
        pressing = {},
        that = this;
        
        // A place holder for a user defined log function
        this.log = function () {};
        // Store bindings from object
        this.press = function (key_bindings) {
            if (!key_bindings || typeof key_bindings !== "object") {
                throw new Error("Quay.press(): Must pass an object literal.");
            }
            var name = "";
            for (var prop in key_bindings) {
                if (!key_bindings.hasOwnProperty(prop) || typeof key_bindings[prop] !== "function") {
                    continue;
                }
                name = Keys.formNameFromKeys(
                        Keys.splitUserKeyNames(prop));
                bindings[name] = key_bindings[prop];
                that.log("+) Attached event `" + prop + "` as " + name);
            }
        };
        this.resetPressed = function () {
            pressing = {};
            currently_pressing = "";
            that.log("-) cleared pressed keys.");
        };
        this.addKeyAsPressed = function (e) {
            var val = Keys.getKeyNameFromEventCode(e);
            if (!pressing[val]) {
                pressing[val] = 1;
                currently_pressing = Keys.formNameFromKeys(mixin.getKeys(pressing));
                that.log("+) keydown: `" + val + "` #" + Keys.getCharCodeFromEvent(e));
                that.log("=) Key(s) pressed: " + currently_pressing);
            }
            if (typeof bindings[currently_pressing] === "function") {
                that.log("Calling event for `" + currently_pressing + "`");
                bindings[currently_pressing](e);
            }
        };
        this.removeKeyAsPressed = function (e) {
            var val = Keys.getKeyNameFromEventCode(e);
            delete pressing[val];
            currently_pressing = "";
            that.log("-) keyup: `" + val + "` #" + Keys.getCharCodeFromEvent(e));
        };
    };
    var x = new Quay();
    
    mixin.addEvent(window.document, "keydown", x.addKeyAsPressed);
    mixin.addEvent(window.document, "keyup", x.removeKeyAsPressed);
    mixin.addEvent(window.document, "focus", x.resetPressed);
    mixin.addEvent(window.document, "blur", x.resetPressed);
    
    window.Quay = {
        setLogger : function (fn) {
            x.log = fn;
        },
        press : x.press,
        VERISON : "0.5.0"
    };
})(this);
