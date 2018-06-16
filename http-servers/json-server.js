const http = require('http');

const port = 3000;
const store = {
    product: {
        id: 1,
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
    }
};

const staticRequestHandler = (req, res) => {
    res.setHeader('content-type', 'application/json');
    const output = JSON.stringify(store.product);
    res.end(output);
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