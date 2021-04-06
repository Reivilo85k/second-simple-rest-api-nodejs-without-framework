
exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};

exports.addJSONNumbers = function (req, res){
        body = '';

        req.on('data', function (chunk) {
            body += chunk
        });

        req.on('end', function (){
            postBody = JSON.parse(body)
            console.log('postBody', postBody)

            if (postBody.a && postBody.b) {
                console.log('Found 2 numbers to be added to each other')

                const result = postBody.a + postBody.b;
                const response = {
                    "result": result.toString()
                };
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(response));

            } else {
                incompleteRequest(req, res)
            }
        })
        return res;
}

exports.addQueryNumbers = function (req, res){
    const baseUrl = 'http://' + req.headers.host + '/';
    const reqUrl = new URL(req.url, baseUrl);
    console.log('a :', reqUrl.searchParams.get('a'), 'b :', reqUrl.searchParams.get('b'))

    if (reqUrl.searchParams.get('a') && reqUrl.searchParams.get('b')) {
        console.log('Found 2 numbers to be added to each other')
        const result = parseInt(reqUrl.searchParams.get('a')) + parseInt(reqUrl.searchParams.get('b'));
        const response = {
            "result": result.toString()
        };
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));

    } else {
        incompleteRequest(req, res);
    }
        return res;
}

function incompleteRequest(req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end("request incomplete");
}
