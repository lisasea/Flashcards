const express = require('express');
const bodyParser = require('body-parser'); //installed middleware body-parser in terminal
//above requires body-parser 
const cookieParser = require('cookie-parser'); //installed middleware body-parser in terminal
//above requires cookie-parser 

const app = express();
app.use(bodyParser.urlencoded({ extended: false})); //tell express to use the body-parser middleware passing in an object to turn off the body-parser extended option
app.use(cookieParser()); // tell express to use the cookie-parser middleware

const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];

app.set('view engine', 'pug'); //use the app.set method to set the view engine to parameter pug 

app.use((req, res, next) => { //below we modify the req object by creating it a property "message"
 //   req.message = 'This message made it!'; //create a property called message and pass in the string 'Thos message...""
    console.log("Hello");
    const err = new Error('Oh noes!');
    next(err); //function think of as next step on the conveyer belt
});

app.use((req, res, next) => {
//    console.log('req.message'); //this message is passed from the above function to this
    console.log('world');
    next(); //function think of as next step on the conveyer belt
});




app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name }); //to the pug template index.pug  No need to put .pug as set view engine to it above
    } else {
        res.redirect('/hello'); //redirect to the pug template hello.pug page if there is no name
    }
});

//app.get('/cards', (req, res) => {
//    res.locals.promp = "Who is buried in Grant's tomb?"; 
//    res.render('card');
//});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?", colors});
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    console.dir(req); //printout the request object to the console
    console.dir(req.body); //printout the body property of the request object to the console
    res.cookie('username', req.body.username); //sends cookie to browser after we submit the form
    res.redirect('/')
    //changed to above code  res.render('hello', { name: req.body.username}); //pass in the name to the render method
    //res.json(req.body);// doesn't get html response at all... just json string
    //Jennifer? above "also remove the logging line?" from video what?
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
}

app.use((err, req, res, next) => { //error handler
    res.locals.error = err;
    res.status(err.status); //read status property we just set
    res.render('error');
});


app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});