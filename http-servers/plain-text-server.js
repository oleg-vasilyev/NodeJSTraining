const http = require('http');

const port = 3000;
const store = {
    message: 'Hello World'
};

const staticRequestHandler = (req, res) => {
    res.setHeader('content-type', 'text/plain');
    res.end(store.message);
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