const express = require('express');
const router = express.Router();

router.use((req, res, next) => { //below we modify the req object by creating it a property "message"
 //   req.message = 'This message made it!'; //create a property called message and pass in the string 'Thos message...""
    console.log("Hello");
    const err = new Error('Oh noes!');
    next(err); //function think of as next step on the conveyer belt
});

router.use((req, res, next) => {
//    console.log('req.message'); //this message is passed from the above function to this
    console.log('world');
    next(); //function think of as next step on the conveyer belt
});

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name }); //to the pug template index.pug  No need to put .pug as set view engine to it above
    } else {
        res.redirect('/hello'); //redirect to the pug template hello.pug page if there is no name
    }
});

//router.get('/cards', (req, res) => {
//    res.locals.promp = "Who is buried in Grant's tomb?"; 
//    res.render('card');
//});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    console.dir(req); //printout the request object to the console
    console.dir(req.body); //printout the body property of the request object to the console
    res.cookie('username', req.body.username); //sends cookie to browser after we submit the form
    res.redirect('/')
    //changed to above code  res.render('hello', { name: req.body.username}); //pass in the name to the render method
    //res.json(req.body);// doesn't get html response at all... just json string
    //Jennifer? above "also remove the logging line?" from video what?
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

module.exports = router;