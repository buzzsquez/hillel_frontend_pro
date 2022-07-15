let http = require('http');
const fs = require('fs');
const url = require('url');
let static = require('node-static');
let file = new static.Server('.');
let port = 2205;

console.log('Hi, webServer');

const PERSON_PATH = './data/personsData.json';

class PersonService {
    loadPerson() {
        return new Promise((resolve, reject) => {
            fs.readFile(PERSON_PATH, 'utf8', (err, personData) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(JSON.parse(personData));
            });
        });
    }
}

const personService = new PersonService();

function onPersonRequest(req, res) {
    return personService.loadPerson();
}

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const queryObject = url.parse(req.url, true).query;
    const pathName = url.parse(req.url, true).pathname;

    if (req.url === '/person') {
        onPersonRequest(req, res)
            .then(personData => {
                res.write(JSON.stringify(personData));
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }

    if (req.url === '/person/name') {
        onPersonRequest(req, res)
            .then(personData => {
                res.write(JSON.stringify({ name: personData.name }));
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }

    if (pathName === '/person' && Object.keys(queryObject).length != 0) {
        onPersonRequest(req, res)
            .then(personData => {
                const respObj = {}
                for (key in queryObject) {
                    if (key in personData) {
                        respObj[key] = personData[key]
                    }
                }
                res.write(JSON.stringify(respObj))
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }

    if (req.url === '/person/address') {
        onPersonRequest(req, res)
            .then(personData => {
                const { city, street, postCode } = personData;
                res.write(JSON.stringify({ city, street, postCode }));
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }

    if (req.url === '/person/post/recipient') {
        onPersonRequest(req, res)
            .then(personData => {
                const { name, surname, city, street, postCode } = personData;
                res.write(JSON.stringify({ name, surname, city, street, postCode }));
                res.end();
            })
            .catch(err => {
                res.statusCode = 400
                res.write(JSON.stringify(err));
                res.end();
            });
        return;
    }

    res.write('webServer is working!');
    res.end();
}).listen(port);

console.log(`webServer running on port ${port}`);