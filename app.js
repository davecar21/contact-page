//Install express server
const express = require('express');
const path = require('path');
const app = express();

const nodemailer = require('nodemailer');


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);



(function() {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'davecargrave21@gmail.com',
            pass: 'Dav3car21'
        }
    });

    const mailOptions = {
        from: 'Davecar <davecargrave21@gmail.com>', // sender address
        to: 'davecargrave21@gmail.com', // list of receivers
        subject: 'Subject of your email', // Subject line
        html: '<p>Your TEST here</p>' // plain text body
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
})();