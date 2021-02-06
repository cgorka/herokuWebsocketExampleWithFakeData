'use strict';
const data=[{"id":1,"first_name":"Lindsey","last_name":"Aberhart","email":"laberhart0@sitemeter.com","gender":"Non-binary","ip_address":"177.8.193.200"},
  {"id":2,"first_name":"Karyn","last_name":"Revel","email":"krevel1@canalblog.com","gender":"Male","ip_address":"186.56.207.38"},
  {"id":3,"first_name":"Neda","last_name":"Kimbrough","email":"nkimbrough2@reference.com","gender":"Polygender","ip_address":"235.196.118.85"},
  {"id":4,"first_name":"Imogen","last_name":"Parfett","email":"iparfett3@google.com.br","gender":"Genderfluid","ip_address":"236.233.24.15"},
  {"id":5,"first_name":"Pavla","last_name":"Brauns","email":"pbrauns4@macromedia.com","gender":"Agender","ip_address":"247.138.153.172"},
  {"id":6,"first_name":"Ray","last_name":"Benezeit","email":"rbenezeit5@bluehost.com","gender":"Polygender","ip_address":"12.152.215.171"},
  {"id":7,"first_name":"Corney","last_name":"Robion","email":"crobion6@earthlink.net","gender":"Male","ip_address":"11.216.71.148"},
  {"id":8,"first_name":"Aubine","last_name":"Thackwray","email":"athackwray7@qq.com","gender":"Non-binary","ip_address":"231.110.112.206"},
  {"id":9,"first_name":"Giavani","last_name":"Jager","email":"gjager8@bloomberg.com","gender":"Genderqueer","ip_address":"222.5.154.93"},
  {"id":10,"first_name":"Timmie","last_name":"Sorel","email":"tsorel9@squarespace.com","gender":"Polygender","ip_address":"46.12.205.200"}]
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
  wss.clients.forEach((client) => {
    client.send(data);
  });
}, 1000);
