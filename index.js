//index.js
'use strict';

//Imports
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://crack:crack@ds243728.mlab.com:43728/wroddit');


const db = mongoose.connection;
mongoose.promise = global.Promise;
db.on('error', () => console.log("failure"));
db.once('open', () => {
    console.log('succesfully established a connection to mongodb');
})

const wrodditRouter = require('./routes/wroddit.js')
const server = express();

//Template engine (hbs)
hbs.registerPartials(path.join(__dirname + '/views/partials'));

//Express settings
server.set('view engine', 'hbs');
server.use(express.static(path.join(__dirname, 'public')));

//Express routing
server.get('/', (req, res) => res.redirect('/w/frankenstein'));
server.use('/w/frankenstein', wrodditRouter);
server.listen(3000, () => console.log('Listening on port 3000'));
