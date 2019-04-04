const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data; // eo6 equivalent to const cards = data.cards;

/*router.get('/', (req, res) => { //was router.get'/cards',... but can be just '/' because every route in this file starts with cards
    res.render('card', { 
        prompt: cards[0].question,
        hint: cards[0].hint
    });
});
*/

router.get('/:id', (req, res) => { //  " '/:' " - tells express to use this part of the url as a variable
    res.render('card', { 
        prompt: cards[req.params.id].question,
        hint: cards[req.params.id].hint
    });
});



module.exports = router; //finally need to export the router