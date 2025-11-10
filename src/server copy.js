// note: see the saved

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var nodemailer = require('nodemailer');

app.post('/sendemail', (req, res) => {
    console.log('req.body', req.body);
    var transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mvc57@att.net',
        pass: 'nfezlcdlggjxrhme',
    },
    });

    var mailOptions = {
    from: 'mvc57@att.net',
    to: 'mvc757@gmail.com;',
    cc: 'mvc57@att.net',
    attachments: [{
        filename: "100000.pdf",
        path: "d:/jukebox/letters/100000.pdf"}],
    subject: 'Eligibility for the 2022-2023 school year',
    html: `<html>
    
    <body><h1>Eligibility for the 2022-2023 school year</h1>
    <img src="https://pbs.twimg.com/profile_images/1425941668830777346/a5pQztqA_400x400.jpg" />      
    </body></html>`,
    };
}); 

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

/*
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');

let transporter = nodemailer.createTransport({
    host: 'smtp.mail.att.net',
    port: 465,
    secure: true,
    auth: {
        //user: 'mvc757@gmail.com',
        user: 'mvc57@att.net',
        pass: 'HappyLaborDay123'
    }
});

let mailOptions = {
    from: '"Mario Camarena" <mvc757@gmail.com>',
    to: 'mvc57@att.net',
    subject: 'Test with an html Templete',
    html: ejs.render( fs.readFileSync('fileinfo.html', 'utf-8') , {message: 'Hi, it worked!'})
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
*/
