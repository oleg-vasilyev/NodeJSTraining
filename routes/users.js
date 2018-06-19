import fs from 'fs';
import { Duplex } from 'stream';


const usersRoot = 'data/users';

const usersPromise = new Promise(resolve => {
    fs.readdir(usersRoot, (err, fileNames) => {
        const users = [];

        fileNames.forEach(fileName => {
            const filePath = `${usersRoot}/${fileName}`;
            const file = JSON.parse(
                fs
                    .readFileSync(filePath)
                    .toString()
            );

            users.push(file);
        });
        resolve(users);
    });
});

function users(req, res) {
    usersPromise.then(users => {
        const usersJson = JSON.stringify(users);
        const stream = new Duplex();
        stream.push(usersJson);
        stream.push(null);

        res.setHeader('content-type', 'application/json');
        stream.pipe(res);
    });
}

export default users;