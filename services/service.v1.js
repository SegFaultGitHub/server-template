"use strict";

module.exports = function (app, router) {
    router.get("/",
        function (request, response, next) { // jshint ignore:line
            return response.end();
        }
    );
};