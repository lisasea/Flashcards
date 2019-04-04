const express = require('express');
const bodyParser = require('body-parser'); //installed middleware body-parser in terminal
//above requires body-parser 
const cookieParser = require('cookie-parser'); //installed middleware body-parser in terminal
//above requires cookie-parser 

const app = express();
app.use(bodyParser.urlencoded({ extended: false})); //tell express to use the body-parser middleware passing in an object to turn off the body-parser extended option
app.use(cookieParser()); // tell express to use the cookie-parser middleware

const colors = [ //may need to be moved to index.js?
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

app.set('view engine', 'pug'); //use the app.set method to set the view engine to parameter pug 

const mainRoutes = require('./routes'); // import from index.js "exports" line 59 to let the app access routes in index.js 
const cardRoutes = requrie('./routes/cards');

app.use(mainRoutes); // use routes variable to make middleware
app.use('/cards', cardRoutes); // flashcards route. pathname of cards

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => { //error handler
    res.locals.error = err;
    res.status(err.status); //read status property we just set
    res.render('error');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});