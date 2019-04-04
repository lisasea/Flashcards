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

router.get( '/', ( req, res ) => { //new route router.get method
    const numberOfCards = cards.length; // calculate # of cards we have to choose from. in project 6 projects.length
    const flashcardId = Math.floor( Math.random() * numberOfCards ); //generate a random number betwee
    res.redirect( `/cards/${flashcardId}` ) // ?side=question  //use this query string at end to test
});

router.get('/:id', (req, res) => { //  " '/:' " - tells express to use this part of the url as a variable
    const { side } = req.query;
    const { id } = req.params;

    if ( !side ) {
        res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const text = cards[id][side];
    const { hint } = cards[id];

/*  is now brlow:
res.render('card', { 
        prompt: cards[req.params.id].question,
        hint: cards[req.params.id].hint
    });
});
*/

    const templateData = { id, text, name };

    if ( side === 'question' ) {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateDate.sideToShowDisplay = 'Answer'; //Jennifer - why is this capitalized?
    } else if ( side === 'answer' ) {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';

    }

    res.render('card', templateData);
});

module.exports = router; //finally need to export the router