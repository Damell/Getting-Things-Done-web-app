'use strict';
var http = require('https');

module.exports = function (req, res) {
	//if (req.url !== '/api') { return next(); }
	var resolve;
	var data = '';
	req.on('data', function (chunk) {
		if (chunk) {
			data += chunk;
		}
	});
	req.on('end', function () {
		if (data) {
			data = JSON.parse(data);
		} else {
			data = {};
		}
		resolve();
	});
	resolve = function () {
		var options = {
			hostname: 'anypoint.mulesoft.com',
			port: 443,
			path: 'gtdtest-spproject.rhcloud.com/gtd' + req.url,
			method: req.method
		};
		data = '';
		var reqs = http.request(options, function(resp) {
			resp.on('data', function (chunk) {
				data += chunk;
			});
			resp.on('end', function () {
				data = JSON.parse(data);
				res.writeHead(res.statusCode, {'Content-Type': 'application/json' });
				res.end( JSON.stringify(data) );
			});
		});
		reqs.on('error', function(e) {
			console.log('problem with request' + e.message);
		});
		reqs.end();
	};
};
