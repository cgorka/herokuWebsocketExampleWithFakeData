//Config
const ARRAY_LENGTH=150;

const faker = require('faker');
function generateStatus(){
    const n=Math.random()
    if (n>0.3)
        return 'green'
    else if (n<0.15)
        return 'red'
    else
        return 'yellow'
}
function getItem(id) {
    faker.locale = "pl";
    return [
        {
            "id": id,
            "first_name": faker.name.firstName() +' '+faker.name.lastName(),
            "last_name": faker.name.findName(),
            "email": faker.internet.email(),
            "genre": faker.commerce.productMaterial(),
            "ip_address": faker.internet.ip(),
            "mass":faker.finance.amount(0,100,4)+" g",
            "image":faker.image.food(),
            "status":generateStatus()
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
