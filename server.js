var HTTP_PORT = 8080;

Error.stackTraceLimit = Infinity;

//
require('app-module-path').addPath(__dirname);

require('colors');

require('marko/browser-refresh').enable();
require('optimizer/browser-refresh').enable('*.marko *.css *.less');

// Configure the optimizer...
// Even though you can use multiple optimizer instances, we only need to
// configure the default optimizer since we're only using the default.
require('optimizer').configure({
	// Don't fingerprint files for development
	fingerprintsEnabled: false,

	// Don't create bundles for development
	bundlingEnabled: false,

	// Don't minify for development
	minify: false,

	// Set appropriate optimizer flags for development
	flags: ['raptor-logging/browser', 'development'],

	// Use the "development" cache profile
	cacheProfile: 'development',

	plugins: [
        'optimizer-marko',
        'optimizer-less',
        'optimizer-image'
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
	'index': ['default.html', 'default.htm']
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
