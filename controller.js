const http = require('http');

module.exports = http.createServer((req, res) => {
    const service = require('./service.js');
    const baseUrl = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseUrl);


    if(reqUrl.pathname === '/add' && req.method === 'POST' || reqUrl.pathname === '/add' && req.method === 'GET') {
        console.log('Request-Type: ' + req.method +
                ' Endpoint: ' + reqUrl.pathname);

        service.addNumbers(req, res);
    }else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);
    }
})
