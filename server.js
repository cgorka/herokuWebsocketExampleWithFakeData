//Config
const ARRAY_LENGTH=150;

const faker = require('faker');
function getItem(id) {
    return [
        {
            "id": id,
            "first_name": faker.name.findName(),
            "last_name": faker.name.findName(),
            "email": faker.internet.email(),
            "genre": faker.music.genre(),
            "ip_address": faker.internet.ip(),
            "mass":faker.finance.amount(0,100,4)
        }
    ]
}

function getItems() {
    let items = [getItem(0)]
    for (let i = 1; i < ARRAY_LENGTH; i++) {
        items = [...items, getItem(i)];
    }
    return JSON.stringify(items,null,2);
}

const express = require('express');
const {Server} = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, {root: __dirname}))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({server});

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(getItems());
    });
}, 2000);
