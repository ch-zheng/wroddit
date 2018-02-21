//Index.js
'use strict';
const express = require('express');
const path = require('path');
const server = express();

//Express settings
server.set('view engine', 'hbs');
server.use(express.static('public'));
//Express routing
server.get('/', (req, res) => res.send('Hello World!'));
server.get('/w/frankenstein', (req, res) => res.render('wroddit'));
server.listen(3000, () => console.log('Listening on port 3000'));
