const express = require('express');

const app = express();

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


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});