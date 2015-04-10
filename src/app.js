var helloTemplate = require('marko').load(require.resolve('./hello.marko'));

// make sure our stylesheet gets bundled with our app
require('./style.less');

helloTemplate.render({
    name: 'World'
}, function(err, html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el);
});