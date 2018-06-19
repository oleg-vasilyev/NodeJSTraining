import express from 'express';
import {
    home,
    postProduct,
    products,
    productById,
    productReviewById,
    users,
    error
} from './routes';
import { parseCookie, parseQuery } from './middlewares';


const router = express.Router();

router
    .get('/', (req, res) => {
        parseCookie(req, res);
        console.log(req.parsedCookies);

        parseQuery(req, res);
        console.log(req.parsedQuery);

        home(req, res);
    })
    .get('/api/products', (req, res) => {
        products(req, res);
    })
    .post('/api/products', (req, res) => {

    })
    .get('/api/products/:id', (req, res) => {
        const productId = req.params.id;
        productById(req, res, productId);
    })
    .get('/api/products/:id/reviews', (req, res) => {
        const productId = req.params.id;
        productReviewById(req, res, productId);
    })
    .get('/api/users', (req, res) => {
        users(req, res);
    })
    .get('*', (req, res) => {
        error(req, res);
    });

const app = express()
    .use(router);


export default app;