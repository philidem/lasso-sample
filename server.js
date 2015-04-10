var HTTP_PORT = 8080;

Error.stackTraceLimit = Infinity;

require('colors');

require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less *.png widget.js');

// Configure the lasso...
require('lasso').configure({
	// Don't fingerprint files for development
	fingerprintsEnabled: false,

	// Don't create bundles for development
	bundlingEnabled: false,

	// Don't minify for development
	minify: false,

	// Set appropriate lasso flags for development
	flags: ['raptor-logging/browser', 'development'],

	// Use the "development" cache profile
	cacheProfile: 'development',

	plugins: [
        'lasso-marko',
        'lasso-less',
        'lasso-image'
    ]
});

// Create an HTTP server...
var marko = require('marko');
var express = require('express');
var app = express();
var indexTemplate = marko.load(require.resolve('./src/index.marko'));

app.get('/', function(req, res) {
	var templateData = {

	};

	indexTemplate.render(templateData, res, function(err, result) {
		if (err) {
			console.error('Error rendering ' + req.url, err.stack || err);
		} else {
			console.log('Rendered page ' + req.url);
		}
	});
});

var serveStatic = require('serve-static');
app.use('/static', serveStatic('static', {
	'index': ['index.html']
}));

// Listen on given port
app.listen(HTTP_PORT, function() {
	// Server is ready....
	console.log(('HTTP server is listening on port ' + HTTP_PORT).green);

	if (process.send) {
		// We were launched by browser-refresh so tell the parent process
		// that we are ready...
		process.send('online');
	}
});
