const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { //was router.get'/cards',... but can be just '/' because every route in this file starts with cards
    res.render('card', { prompt: "Who is buried in Grant's tomb?", colors});
});

module.exports = router; //finally need to export the router