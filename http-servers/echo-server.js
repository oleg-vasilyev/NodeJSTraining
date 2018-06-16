const http = require('http');
const url = require('url');
const Duplex = require('stream').Duplex;

const port = 3000;

const requestHandler = (req, res) => {
    res.setHeader('content-type', 'text/plain');

    const parsedUrl = url.parse(req.url);
    const echo = parsedUrl.pathname.substring(1);

    const stream = new Duplex();
    stream.push(echo);
    stream.push(null);
    stream.pipe(res);
}

const server = http
    .createServer(requestHandler)
    .listen(port, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Server started: http://localhost:${port}`);
        }
    });