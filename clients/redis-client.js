"use strict";

var redis = require("redis");
var logger = require("../lib/logger")({
    scope: "redis"
});
var config = require("../config.js");

module.exports = function (callback) {
    var port = config.redis.port;
    var host = config.redis.host;
    var db = config.redis.db;

    var client = redis.createClient(port, host);
    client.select(db, function (err) {
        if (err) return callback(err);
        else {
            logger.info(`Redis client created and connected to db${db}`);
            return callback(null, client);
        }
    });
};