//Install express server
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post('/send-mail', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: 'davecargrave21@gmail.com',
            pass: 'Dav3car21'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: '"Davecar" <davecargrave21@gmail.com>', // sender address
        to: req.body.emailAddress, // list of receivers
        subject: 'MDA Feedback', // Subject line
        html: `I am ${req.body.firstName} ${req.body.lastName}, ${req.body.message}` // plain text body
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });

    res.status(201).send('Email Sent!');
});


//https://appdividend.com/2017/08/11/send-email-in-node-js/

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);