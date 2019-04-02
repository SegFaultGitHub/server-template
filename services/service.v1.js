"use strict";

module.exports = function (app, router) {
    router.get("/",
        function (request, response, next) {
            return response.end();
        }
    );
};