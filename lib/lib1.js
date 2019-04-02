"use strict";

var logger = require("./logger")("lib1");

module.exports = function (app, callback) {
    var redis = app.get("clients").redis; // jshint ignore:line

    function foo() {
        logger.info("foo");
    }

    return callback(null, {
        foo: foo
    });
};