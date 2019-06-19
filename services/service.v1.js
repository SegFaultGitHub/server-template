"use strict";

module.exports = function (app, router) {
	/* GET /service/v1/route */
	router.get("/route",
		function (request, response, next) { // jshint ignore:line
			return response.end();
		}
	);
};