var helloTemplate = require('marko').load(require.resolve('./hello.marko'));

helloTemplate.render({
    name: 'World'
}, function(err, html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    document.body.appendChild(el);
});