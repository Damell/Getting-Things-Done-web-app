'use strict';
var http = require('http');

module.exports = function (req, res) {
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
		}
		resolve();
	});
	resolve = function () {
		var options = {
			hostname: 'gtd.bibliofair.com',
			port: 8080,
			path: '/gtd' + req.url,
			method: req.method,
			headers: req.headers
		};
		var respData = '';
		var reqs = http.request(options, function(resp) {
			resp.on('data', function (chunk) {
				respData += chunk;
			});
			resp.on('end', function () {
				res.writeHead(resp.statusCode, {'Content-Type': 'application/json' });
				if ((resp.statusCode === 200 || resp.statusCode === 201) && respData) {
					respData = JSON.parse(respData);
					res.write( JSON.stringify(respData) );
				}
				res.end();
			});
		});
		reqs.on('error', function(e) {
			console.log('problem with request' + e.message);
		});
		if (data) {
			reqs.write(JSON.stringify(data));
		}
		reqs.end();
	};
};
