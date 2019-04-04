const express = require('express');
const bodyParser = require('body-parser'); //installed middleware body-parser in terminal
//above requires body-parser

const app = express();
app.use(bodyParser.urlencoded({ extended: false})); //tell express to use the body-parser middleware passing in an object to turn off the body-parser extended option

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

app.set('view engine', 'pug'); //use the app.set method to set the view engine to parameter pug 

app.get('/', (req, res) => {
    res.render('index'); //to the pug template index.pug  No need to put .pug as set view engine to it above
});

//app.get('/cards', (req, res) => {
//    res.locals.promp = "Who is buried in Grant's tomb?"; 
//    res.render('card');
//});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", colors})
});

app.get('/hello', (req, res) => {
    res.render('hello');
})

app.post('/hello', (req, res) => {
    console.dir(req); //printout the request object to the console
    console.dir(req.body); //printout the body property of the request object to the console

    res.render('hello');
})

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});