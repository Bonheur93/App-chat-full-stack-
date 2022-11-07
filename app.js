const express = require ("express");

const app = express;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const errorHandlers = require('./handlers/errorHandler');



  

module.exports = app;