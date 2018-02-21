//index.js
'use strict';

//Imports
const express = require('express');
const hbs = require('hbs');
const path = require('path');

const wrodditRouter = require('./routes/wroddit.js')
const server = express();

//Template engine (hbs)
hbs.registerPartials(path.join(__dirname + '/views/partials'));

//Express settings
server.set('view engine', 'hbs');
server.use(express.static(path.join(__dirname, 'public')));

//Express routing
server.get('/', (req, res) => res.send('This page left intentionally blank'));
server.use('/w/frankenstein', wrodditRouter);
server.listen(3000, () => console.log('Listening on port 3000'));
