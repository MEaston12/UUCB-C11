const dataHandler = require('../dataHandler');
const express = require('express');
const api = express.Router();

//This automagically parses incoming json bodies into the req object and i love it
api.use(require('body-parser').json());

api.get('/notes', (req,res,next) => {
    res.json(dataHandler.notes.get());
});

api.post('/notes', (req,res,next) => {
    res.json(dataHandler.notes.add(req.body.title, req.body.text));
});

api.delete('/notes/:id', (req,res,next) => {
    dataHandler.notes.delete(req.params.id);
    res.sendStatus(200);
});

module.exports = api;