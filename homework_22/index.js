const express = require('express');
const fs = require('fs');
const app = express();
const port = 8181;

const directoryPath = `./mock/user/`;

function getUser(id) {
    return new Promise((resolve, reject) => {
        fs.readFile(`${directoryPath}${id}/get.json`, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}

function getDirectory(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}

app.get('/user/:userID', async (req, res) => {
    try {
        const data = await getUser(req.params.userID);
        res.send(JSON.parse(data));
    } catch (err) {
        res.send('No mock user data');
    }
})

app.get('/users', async (req, res) => {
    try {
        const directory = await getDirectory(directoryPath);
        const preparedData = directory.map((item) => {
            return getUser(item);
        })
        const allUsersData = await Promise.all(preparedData)
        const parsedUsers = allUsersData.map(user => {
            return JSON.parse(user)[0];
        })
        res.send(parsedUsers);
    } catch (err) {
        res.send('Something went wrong');
    }
})

app.get('/users/:action', async (req, res) => {
    try {
        const directory = await getDirectory(directoryPath);
        if (req.params.action === 'last') {
            const data = await getUser(directory[directory.length - 1]);
            return res.send(JSON.parse(data));
        }
        if (req.params.action === 'first') {
            const data = await getUser(directory[0]);
            return res.send(JSON.parse(data));
        }
        if (req.params.action === 'all') {
            const preparedData = directory.map((item) => {
                return getUser(item);
            })
            const allUsersData = await Promise.all(preparedData)
            const parsedUsers = allUsersData.map(user => {
                return JSON.parse(user)[0];
            })
            return res.send(parsedUsers);
        }
    } catch (err) {
        res.send('No mock user data');
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})