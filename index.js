//Index.js
'use strict';
const express = require('express');
const path = require('path');
const server = express();

server.set('view engine', 'ejs');
server.get('/', (req, res) => res.send('Hello World!'));
server.use('/w/frankenstein', express.static(path.join(__dirname, 'public'), {index: 'frankenstein.html'}));
server.listen(3000, () => console.log('Listening on port 3000'));
