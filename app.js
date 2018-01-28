const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname+"/views/partials")
app.set('view engine','hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = now+" "+req.method+" "+req.url+'\n';
    console.log(now,req.method, req.url);

    fs.appendFile('logs/server.log',log, (err) => {
        if(err) console.log('Error Appending logs to log file')
    });
    next();//With Out next() web application will stuck on serving request.
})

app.use(express.static(__dirname+ '/public'));

// app.use((req,res,next) => {
//      console.log("Server Maintainance Mode");
//      res.render('maintanance.hbs')
// });

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        currentYear : new Date().getFullYear(),
        welcomeText : 'Hi! , Welcome to the to be Awesome Web Page.'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear : new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is an ErrorPage'
    })
})

app.listen(port, ()=> {
    console.log('Server is running on port : 8080')
});