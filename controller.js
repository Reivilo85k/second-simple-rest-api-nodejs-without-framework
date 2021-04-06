const http = require('http');

module.exports = http.createServer((req, res) => {
    const service = require('./service.js');
    const baseUrl = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseUrl);


    if(reqUrl.pathname === '/add' && req.method === 'POST') {
        console.log('Request-Type: ' + req.method +
                ' Endpoint: ' + reqUrl.pathname);

        service.addJSONNumbers(req, res);

    }else if(reqUrl.pathname === '/add' && req.method === 'GET') {
        console.log('Request-Type: ' + req.method +
            ' Endpoint: ' + reqUrl.pathname);

        service.addQueryNumbers(req, res);
    }else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);
    }
})
