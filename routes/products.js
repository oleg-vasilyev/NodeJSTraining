import fs from 'fs';
import { Duplex } from 'stream';


const productsRoot = 'data/products';
const reviewsRoot = 'data/reviews';

const productsPromise = new Promise(resolve => {
    fs.readdir(productsRoot, (err, fileNames) => {
        const products = [];

        fileNames.forEach(fileName => {
            const filePath = `${productsRoot}/${fileName}`;
            const file = JSON.parse(
                fs
                    .readFileSync(filePath)
                    .toString()
            );

            products.push(file);
        });
        resolve(products);
    });
});

const reviewsPromise = new Promise(resolve => {
    fs.readdir(reviewsRoot, (err, fileNames) => {
        const reviews = [];

        fileNames.forEach(fileName => {
            const filePath = `${reviewsRoot}/${fileName}`;
            const file = JSON.parse(
                fs
                    .readFileSync(filePath)
                    .toString()
            );

            reviews.push(file);
        });
        resolve(reviews);
    });
});

function postProduct(req, res) {
    productsPromise.then(products => {
        const ids = products.map(d => d.id);
        const maxID = Math.max(...ids);

        const body = req.body;

        const newID = maxID + 1;
        const name = body.name;
        const brand = body.brand;
        const price = body.price;
        const options = []; // enough

        const newProduct = {
            id: newID,
            name,
            brand,
            price,
            options
        };
        const json = JSON.stringify(newProduct);

        const callback = (file) => {
            const newProduct = JSON.stringify(file);
            const stream = new Duplex();
            stream.push(newProduct);
            stream.push(null);

            res.setHeader('content-type', 'application/json');
            stream.pipe(res);
        };
        fs.writeFile(`product${newID}`, json, 'utf8', callback);
    });
}

function products(req, res) {
    productsPromise.then(products => {
        const productsJson = JSON.stringify(products);
        const stream = new Duplex();
        stream.push(productsJson);
        stream.push(null);

        res.setHeader('content-type', 'application/json');
        stream.pipe(res);
    });
}

function productById(req, res, id) {
    productsPromise.then(products => {
        const requestedProduct = products.filter(d => d.id == id) || [];

        const productJson = JSON.stringify(requestedProduct);
        const stream = new Duplex();
        stream.push(productJson);
        stream.push(null);

        res.setHeader('content-type', 'application/json');
        stream.pipe(res);
    });
}

function productReviewById(req, res, id) {
    reviewsPromise.then(reviews => {
        const requestedReview = reviews.filter(d => d.productID == id) || [];

        const reviewsJson = JSON.stringify(requestedReview);
        const stream = new Duplex();
        stream.push(reviewsJson);
        stream.push(null);

        res.setHeader('content-type', 'application/json');
        stream.pipe(res);
    });
}

export {
    postProduct,
    products,
    productById,
    productReviewById
};