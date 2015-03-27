# lasso-sample
Simple app to demonstrate using Lasso. This sample app uses `express`
to start an HTTP server. The index file routes render a `marko` template
that is using the `optimizer` taglib. The `optimizer` taglib will automatically
bundle all of the required dependencies and put them in the `static` directory.

## Install Dependencies
```bash
cd path/to/lasso-sample
npm install
```

Optionally, install `browser-refresh`:
```bash
npm install browser-refresh -g
```

## Running
**OPTION 1:** No automatic restart
```bash
cd path/to/lasso-sample
node server.js
```

**OPTION 2:** Allow automatic restart when source file is changed
```bash
cd path/to/lasso-sample
browser-refresh
```

## Implementation Overview

### Express Server
An instance of `express` is listening on port `8080`.

### Optimizer Configuration

**Development configuration:**
```javascript
// Configure the optimizer...
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
```

**Production configuration:**
```javascript
// Configure the optimizer...
require('optimizer').configure({
	// Fingerprint files for production
	fingerprintsEnabled: true,

	// Don't create bundles for development
	bundlingEnabled: true,

	// Don't minify for development
	minify: true,

	// Set appropriate optimizer flags for development
	flags: ['raptor-logging/browser'],

	// Use the "production" cache profile
	cacheProfile: 'production',

	plugins: [
        'optimizer-marko',
        'optimizer-less',
        'optimizer-image'
    ]
});
```

### Routes

| Route   | Purpose                                                            |
|---------|--------------------------------------------------------------------|
| /       | Serves index page. HTML is produced by rendering `src/index.marko` |
| /static | Serves static files from the `static` directory                    |
