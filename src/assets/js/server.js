// note: see the saved

var http = require('http');
var dt = require('./emails');
var apps = require('./src/assets/json/applications.json');
var fs = require('fs');
var apps = JSON.parse(fs.readFileSync('applications.json', 'utf8'));

//console.log("apps")

function Test() {
  console.log("Test");
}

function sendEmail() {
  apps = JSON.parse(fs.readFileSync('applications.json', 'utf8'));
  console.log("apps.Applications[0].Id");

  var noEmailsToSend = true;
  for(var i=0;i<apps.Applications.length;i++) {
    console.log(apps.Applications[i].Id);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mvc57@att.net',
        pass: 'nfezlcdlggjxrhme',
      },
    });

    var fileName = apps.Applications[i].Filename;
    var sent = apps.Applications[i].Sent;
    //console.log("sent: " + sent);
    //var guardianName = apps.Applications[i].Guardians[0].FirstName + " " + apps.Applications[i].Guardians[0].LastName;
    var language = apps.Applications[i].Language;
    //console.log("language: " + language);

    if(language == "English" && sent == "false") {    
      var mailOptions = {
        from: 'mvc57@att.net',
        to: 'mvc57@att.net',
        attachments: [{
          filename: fileName,
          path: "d:/jukebox/letters/"+fileName}],
        subject: 'Eligibility for the 2023-2024 school year',
        html: `<html>
        
        <body><h1>Eligibility for the 2023-2024 school year</h1>
        Hello,<br><br>
        
        Please see the attached eligibility letter.  Let us know if you have any questions.<br><br>
        Have a nice day.<br><br>
        El Paso ISD Non-discrimination disclaimer http://www.episd.org/Page/1115 "It Starts With Us" 
    `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {          
          console.log('Email sent: ' + info.response);
          noEmailsToSend = false;
        }
      });
    } else if(language == "Spanish" && sent == "false") {
      var mailOptions = {
        from: 'mvc57@att.net',
        to: 'mvc57@att.net',
        attachments: [{
          filename: fileName,
          path: "d:/jukebox/letters/"+fileName}],
        subject: 'Eligibility for the 2023-2024 school year',
        html: `<html>
        
        <body><h1>Eligibility for the 2023-2024 school year</h1>
        Hola,<br><br>
        
        Consulte la carta de elegibilidad adjunta. Háganos saber si tiene alguna pregunta.<br><br>
        Que tenga un lindo día.<br><br>
        El Paso ISD Non-discrimination disclaimer http://www.episd.org/Page/1115 "It Starts With Us" 
    `,
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          noEmailsToSend = false;
        }
      });    
    }
  }
  
  if(noEmailsToSend == true)
  {
    console.log("Nothing to Send!");
  }
}
sendEmail();
//setTimeout(sendEmail, 1000);
//setInterval(sendEmail, 30000);
//sendEmail();
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
