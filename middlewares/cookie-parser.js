function parseCookie(req, res) {

    const parser = (request) => {
        const list = {},
            rc = request.headers.cookie;

        rc && rc.split(';').forEach(function (cookie) {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });

        return list;
    }
    const parsedCookies = parser(req);
    req.parsedCookies = parsedCookies;
}

export default parseCookie;