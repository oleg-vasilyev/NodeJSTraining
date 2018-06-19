import url from 'url';

function parseQuery(req, res) {

    const parser = (request) => {
        const queryData = url.parse(request.url, true).query;
        return queryData;
    }
    const parsedQuery = parser(req);
    req.parsedQuery = parsedQuery;
}

export default parseQuery;