'use strict';
const faker = require('faker');

function getItem(id) {
    return [
        {
            "id": id,
            "first_name": faker.name.findName(),
            "last_name": faker.name.findName(),
            "email": faker.internet.email(),
            "gender": faker.music.genre(),
            "ip_address": faker.internet.ip()
        }
    ]
}

function getItems() {
    let items = [getItem(0)]
    for (let i = 1; i < 12; i++) {
        items = [...items, getItem(i)];
    }
    return items
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
        client.send(JSON.stringify(getItems()));
    });
}, 1000);
