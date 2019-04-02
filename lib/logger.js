"use strict";

var chalk = require("chalk");

function _getTime() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var ms = date.getMilliseconds();

    function _size(n) {
        if (n === 0) return 1;
        else return Math.floor(Math.log10(n)) + 1;
    }

    return "0".repeat(2 - _size(h)) + h + ":" +
        "0".repeat(2 - _size(m)) + m + ":" +
        "0".repeat(2 - _size(s)) + s + "." +
        "0".repeat(3 - _size(ms)) + ms;
}

function _format() {
    if (arguments.length === 0) return "";
    var value = arguments[0];
    delete arguments[0];


    switch (typeof value) {
        case "object":
            return JSON.stringify(value);
        case "undefined":
            return "undefined";
        default:
            value = value.toString() || value;
            var argKeys = Object.keys(arguments);
            for (var i = 1; i < argKeys.length + 1; i++) {
                var regexp = new RegExp("\\{" + (i - 1) + "\\}", "g");
                value = value.replace(regexp, _format(arguments[i.toString()]));
            }
            return value;
    }
}

module.exports = function (options) {
    var scope;
    if (typeof options === "string") {
        options = {
            scope: options
        };
    }
    if (options.scope) {
        scope = chalk.gray.bold(options.scope + ": ");
    } else {
        scope = chalk.gray.bold(": ");
    }
    options.indent = Number(options.indent);
    if (isNaN(options.indent)) {
        options.indent = 0;
    }
    options.indent = Math.max(0, options.indent);
    var indent = " ".repeat(options.indent);
    if (typeof options.pid === "undefined") {
        options.pid = true;
    } else {
        options.pid = !!options.pid;
    }

    var journals = {};

    function _baseLog() {
        var str = indent +
            chalk.bold("[" + _getTime() + (options.pid ? ("|" + process.pid) : "") + "]");

        return str;
    }

    return {
        info: function () {
            var str = _baseLog() +
                " " + chalk.green.underline("INFO") + "  " +
                scope +
                _format.apply(null, arguments);

            console.log(str);
        },

        warn: function () {
            var str = _baseLog() +
                " " + chalk.yellow.underline("WARN") + "  " +
                scope +
                _format.apply(null, arguments);

            console.warn(str);
        },

        error: function () {
            var str = _baseLog() +
                " " + chalk.red.underline("ERROR") + " " +
                scope +
                _format.apply(null, arguments);

            console.error(str);
        },

        journal: function (name, date) {
            if (typeof date === "undefined") {
                date = true;
            } else {
                date = !!date;
            }
            journals[name] = _baseLog() +
                " " + chalk.blue.underline("JOURN") + " " +
                scope +
                chalk.italic("Journal " + name + " created") +
                "\n";

            return {
                log: function () {
                    journals[name] += (date ? (_baseLog() + " ") : "") +
                        _format.apply(null, arguments) +
                        "\n";
                },
                print: function () {
                    if (!journals[name] && journals[name] !== "") return;
                    console.log(journals[name].substring(0, journals[name].length - 1));
                    delete journals[name];
                }
            };
        }
    };
};