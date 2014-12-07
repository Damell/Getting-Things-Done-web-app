'use strict';
var http = require('http');

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
		}
		resolve();
	});
	resolve = function () {
		var options = {
			hostname: 'gtd.bibliofair.com',
			//hostname: 'localhost',
			port: 8080,
			//path: 'https://anypoint.mulesoft.com/apiplatform/proxy/http://mocksvc.mulesoft.com/mocks/4d88e080-1ff0-458b-bf41-001e1838c0f9/mocks/fd43c983-f4f1-4705-9c56-9e5939d14a24' + req.url,
			path: '/gtd' + req.url,
			method: req.method,
			headers: {'Content-Type': 'application/json' 
			}
		};
		var respData = '';
		var reqs = http.request(options, function(resp) {
			resp.on('data', function (chunk) {
				respData += chunk;
			});
			resp.on('end', function () {
				res.writeHead(resp.statusCode, {'Content-Type': 'application/json' });
				if (respData) {
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
