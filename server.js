'use strict';
var faker = require('faker');

function getItem(id)
{
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



function getData() {
  let data = [getItem(0)]
  for (let i = 1; i < 12; i++) {
     data=[...data,getItem(i)];
  }

  return data
}

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  // console.log(generateRandomJson('Object'));

  wss.clients.forEach((client) => {
    const mydata=getData()
    // const mydata=getItem(10)
    console.log('data: ', mydata);
    client.send(JSON.stringify(mydata));
  });
}, 1000);
