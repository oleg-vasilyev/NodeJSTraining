const http = require('http');
const fs = require('fs');
const Duplex = require('stream').Duplex;

const port = 3000;
const store = {
    message: 'Hello World'
};
const indexPath = 'data/index.html';

const staticRequestHandler = (req, res) => {
    res.setHeader('content-type', 'text/html');

    const file = fs.readFileSync(indexPath);
    const modifiedFile = file
        .toString()
        .replace(
            /\{(\w*)\}/, (match, value) => store[value]
        );

    const stream = new Duplex();
    stream.push(modifiedFile);
    stream.push(null);
    stream.pipe(res);
}

const server = http
    .createServer(staticRequestHandler)
    .listen(port, err => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Server started: http://localhost:${port}`);
        }
    });