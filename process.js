var fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();
const readline = require('readline');
var http = require('http');
const util = require('util');
const path = require('path');

var emailArray = [];
var x = 0;

var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));

const sql = require('mssql/msnodesqlv8');

var server = config.panels[0].fields[0].value;
var database = config.panels[0].fields[1].value;
var driver = config.panels[0].fields[2].value;
var trustedConnection = config.panels[0].fields[3].value;
var uid = config.panels[0].fields[4].value;
var pwd = config.panels[0].fields[3].value;
var printToPath = config.panels[2].fields[5].value;
var appsPath = config.panels[6].fields[0].value;

doc.pipe(fs.createWriteStream('c:/EPISD/Eligibility/Letters/Test.pdf')); // write to PDF

// add stuff to PDF here using methods described below...

// finalize the PDF and end the stream
doc.end();

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
console.log('Test');
function test() {
  console.log('Testing 123');
}

// Create a server that invokes the `api` function upon receiving a request 11122024
http.createServer(handler).listen(8100, function (err) {
  if (err) {
    console.log('Error starting http Print Server');
  } else {
    console.log(
      'Print Server running at http://127.0.0.1:8100/ or http://localhost:8100/'
    );
  }
});

function updateConfig(index) {
  console.log('Updateeee: ' + index);

  if (index == 0) {
    console.log('Update ODBC');
  } else if (index == 1) {
    console.log('Update Print');
  } else if (index == 2) {
    console.log('Update Email');
  } else if (index == 3) {
    console.log('Update Phone');
  } else if (index == 4) {
    console.log('Update Chat');
  } else if (index == 5) {
    console.log('Update Robocalls');
  }
}

// API data modification
function handler(req, res) {
  doc.pipe(res); // HTTP response

  //console.log("Test")
  console.log('req.url: ' + req.url);
  x++;
  if (req.url.indexOf('/?updateConfig=') == 0) {
    var tab = req.url.split('=')[1];
    //console.log('tab: ' + tab);
    updateConfig(tab);
  } else if (
    req.url != '/' &&
    req.url.indexOf('ico') == -1 &&
    req.url.indexOf('episdlogo.jpg') == -1
  ) {
    //console.log('req.url: ' + req.url);
    var requrl = req.url.split('?')[1];
    var processType = requrl.split('=')[0];
    var processString = requrl.split('=')[1];
    //console.log('processString: ' + processString);
    var processArray = processString.split(',');
    //console.log('processArray: ' + processArray);
    var apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));

    if (processType == 'printSelected') {
      printSelected();
    } else if (processType == 'emailSelected') {
      emailSelected();
    } else if (processType == 'setSelected') {
      setSelected();
    } else if (processType == 'importApps') {
      importApps();
    } else if (processType == 'showConfig') {
      showConfig(apps);
    } else if (processType == 'appIndex') {
      appIndex(req, res, apps, processArray);
    } else if (processType == 'copyPDF') {
      updatePrinted(apps, processArray);
    } else if (processType == 'addDJ') {
      console.log('Calling  addDJ');
    }

    function printSelected(apps) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      var htmlString = `<!DOCTYPE html>
      <html>
      <title>W3.CSS</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <script
      src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
      integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      ></script>
      <body style="overflow-y: hidden">   
        
        <div id="eligibility" class="w3-container w3-margin" style="display: inline-flex;margin: auto">      
          <input type="submit" class="w3-btn w3-green w3-margin" value="Home" onclick="window.location.href = 'http://localhost:8081/'">`;
      htmlString += `<label class="w3-margin" style="color: black">The following letters have been printed: </label>`;
      htmlString += `</div>                      
        <div style="border: solid rgb(55, 97, 189) 0px;display: block;margin: auto;width: 88%;height: 1000px;overflow-y: auto;
        justify-content: center;float: auto" class="pdf">`;

      for (var i = 0; i < processArray.length; i++) {
        var pdfIndex = processArray[i]; //added 1 because letters is in index 0 in json file
        var fileName =
          apps.Applications[pdfIndex].Filename +
          '_' +
          apps.Applications[pdfIndex].Id +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].LastName +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].FirstName +
          '.pdf';
        var displayFileName =
          apps.Applications[pdfIndex].Guardians[0].FirstName.toLowerCase() +
          '.' +
          apps.Applications[pdfIndex].Guardians[0].LastName.toLowerCase() +
          '@gmail.com';
        htmlString +=
          `<embed src="http://localhost:8080/Eligibility/Letters/` +
          fileName +
          `" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `;
      }
      htmlString += `</div>                             
        </div>    
      </body>
      </html>`;
      res.write(htmlString);
      res.end();
    }

    function emailSelected(apps) {
      //console.log('processType: ' + processType);
      //console.log('processArray: ' + processArray);
      emails(processString, res);
      //console.log("apps: "+JSON.stringify(apps));
    }

    function setPrinted(apps) {
      console.log('processType: ' + processType);
      //console.log("processArray: "+processArray);
      //console.log("apps: "+JSON.stringify(apps));
      //console.log("processArray :+"+processArray);
      updatePrinted(processString, apps);
    }

    function showConfig(apps) {
      console.log(apps);
      /*
      var htmlString = `<!DOCTYPE html>
        <html lang="">
          <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          <link rel="icon" href="<%= BASE_URL %>favicon.ico">
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
          <title>EPSID Config</title>
        
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="**** PrimeVue is an open source UI library for Vue featuring a rich set of 80+ components, a theme designer, various theme alternatives such as Material, Bootstrap, Tailwind, premium templates and professional support. In addition, it integrates with PrimeBlock, which has 400+ ready to use UI blocks to build spectacular applications in no time." />
          <!-- Added to show icons in the editor -->
          <link rel="stylesheet" href="https://unpkg.com/primeicons@6.0.1/primeicons.css">
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
          <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
          <script src="https://unpkg.com/musicgenres-json@latest/dist/index.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
          <script src="https://unpkg.com/vue@2.4.4/dist/vue.js"></script>
          <script language="javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>				
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
          <script type="text/json" config="C:/inetpub/wwwroot/EPISD/config.json"></script>
        
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
            integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer"
          ></script>
        
          <title>Config EPISD</title>
          <script> 		
          
            function updateConfig(i) {
              //alert(i);
              var submitPath = "http://localhost:8100?updateConfig="+i
              window.location.href = submitPath;                 
            }
          
            function setODBCTrusted() {
              //alert('setTrusted');
              var userAccount = document.getElementById('divSQLAccount');  
              var trustedCB = document.getElementById('chkTrusted');
              if (trustedCB.checked == true){
                userAccount.style.display = 'none';
              } else {  
                userAccount.style.display = 'block';
              } 
            }

            function setPrintTrusted() {
              alert('setPrintTrusted');
            }

            function setSMTPTrusted() {
              alert('setSMTPTrusted');
              var emailAccount = document.getElementById('divEmailAccount');  
              var emailUser = document.getElementById('emailUser');  
              var emailPassword = document.getElementById('emailPassword');  
              var emailCheckBox = document.getElementById('chkSecure');
              if (emailCheckBox.checked == true){
                emailAccount.style.display = 'none';
              } else {  
                emailAccount.style.display = 'block';
              } 
            }

            function setAPITrusted() {
              alert('setAPITrusted');
            }

          </script>
          <style>
            nav {
              border: solid black 0px;
              width: 100%;
            }

            .header {
              border: solid black 0px;
              display: flex;
              margin: auto;
              justify-content: space-between;
              width: 100%;
              padding: 5px;
            }

            button {
              width: 100px;
              height: 50px;
              font-size: 20px;
            }

            .w3-btn {
              border-radius: 4px;
            }

            img {
                width: 25%;
                height: auto;
              }
              button {
                border-radius: 4px;
              }
              .title {
                border: solid black 0px;
                border-radius: 4px;
                text-align: center;
                font-size: 40px;
              }

            div {
              border: solid black 0px;
            }

            .img {
                width: 58%;
              }

            @media only screen and (max-width: 600px) {
              img {
                width: 50%;
                height: auto;
              }

              .img {
                width: 100%;
              }

              button {
                width: 75px;
                height: 40px;
                font-size: 14px;
              }

              .title {
                border: solid black 0px;
                border-radius: 4px;
                text-align: center;
                font-size: 10px;
                width: 100%;
              }

              .logout {
                width: 70px;
                height: 30px;
                font-size: 10px;
                margin-top: 10px
              }
            }

            .signup-login {
              display: flex;
              margin: auto;
              justify-content: center;
            }
            input {
              border: 1px solid transparent;
              padding: 0px; 
              width: 25px;
              background-color: transparent;
            }
          </style>
          </head>
          <body>
              <div id="divNav" class="" style="display: flex;justify-content: center;border: solid black 0px;float: auto;margin-top: 13px;margin-left: 1px">                  
                <div id="divImage" style="display: block;width: 99%;border: solid rgb(167, 31, 31) 0px">                  
                  <nav>                           
                    <div class="create-logout" v-if="user">                
                      <div class="header">
                        <div>
                          <img src="http://localhost:8081/episdlogo.jpg" style="width: 100%">
                        </div>        
                        <div>          
                          <button class="btn btn-primary logout" @click="handleClick">Logout</button>
                        </div>
                      </div>
                      <div class="title w-full" style="display: flex;justify-content: center;margin-bottom: 10px">
                        <div id="divConfig" class="title" style="font-size: 34px;font-weight: 600;color: black;width: 100%">          
                          Eligibility Letter Configuration Utility
                        </div>                                 
                      </div>
                    </div>
                  </nav>              
                </div>                  
              </div> 
              <div class="w3-margin" style="display: flex;justify-content: center;border: solid black 0px;width: 100%;float: auto">             
                <form action="/" style="displayL flex;margin: auto;flex-wrap: nowrap;border: solid black 0px; width: 100%" class="w3-margin">
                <div style="display: inline-flex;margin: auto;border: solid green 10px">`;
      for (var i = 0; i < config.panels.length; i++) {
        htmlString +=
          `
          <div class="w3-margin" style="border: solid black 3px;width: 300px;padding: 20px;border-radius: 10px">
          <label style="margin-left: 0px;font-weight: 600;color: purple;font-size:20px;width: 100%;border: solid black 0px;text-align: center">` +
          config.panels[i].panel +
          `</label>                   
          <div style="display: flex;margin: auto;justify-content: center">                
            <button type="button" class="btn btn-primary w3-margin" style="width: 75px;height: 35px" onclick="updateConfig(` +
          i +
          `)">Update</button>
          </div>   
          `;
        for (var j = 0; j < config.panels[i].fields.length; j++) {
          htmlString +=
            `
            <div class="mb-3 mt-3">
              <label for="server" style="color: black;font-size: 20px;font-weight: 700">` +
            config.panels[i].fields[j].label +
            `:</label><br>
            <input id="` +
            config.panels[i].fields[j].id +
            `" type="` +
            config.panels[i].fields[j].type +
            `" class="` +
            config.panels[i].fields[j].class +
            `" value="` +
            config.panels[i].fields[j].value +
            `" style="color: blue;font-size: 20px" checked>
                            </div>`;
        }
        htmlString += `
                      </div>`;
      }
      htmlString += `
                </form>   
              </div>
          </body>
        </html>`;


      res.write(htmlString);
      res.end();
      */
    }

    async function emails(indexString, res) {
      console.log('indexString: ' + indexString);
      //var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
      //console.log("config: "+JSON.stringify(config));
      var apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));

      var indexArray = indexString.split(',');
      //console.log("config.appsPath: "+config.appsPath);
      //console.log("indexArray len: "+indexArray.length);

      for (var i = 0; i < indexArray.length; i++) {
        var pdfIndex = indexArray[i]; //added 1 because letters is in index 0 in json file
        //console.log("Email: pdfIndex: "+pdfIndex);

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        var nodemailer = require('nodemailer');

        var host = config.panels[2].fields[0].value;
        var port = config.panels[2].fields[1].value;
        var secure = config.panels[2].fields[2].value;
        var user = config.panels[2].fields[3].value;
        var pwd = config.panels[2].fields[4].value;
        var from = user;
        var pdfPath = config.panels[2].fields[5].value;
        //console.log('pdfPath: ' + pdfPath);
        /*
        var transporter = nodemailer.createTransport({
          host: host,
          port: port,
          secure: secure,
          auth: {
            user: user,
            pass: pwd,
          },      
        });
        */

        var transporter = nodemailer.createTransport({
          host: host,
          port: port,
          secure: secure,
          auth: {
            user: user,
            pass: pwd,
          },
        });

        //console.log("pdfIndex: " + pdfIndex);
        apps.Applications[pdfIndex].Sent = 'true';
        var fileName =
          apps.Applications[pdfIndex].Filename +
          '_' +
          apps.Applications[pdfIndex].Id +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].LastName +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].FirstName +
          '.pdf';
        //console.log('Email fileName: ' + fileName);
        //var guardianName = apps[i].Guardians[0].FirstName + " " + apps[i].Guardians[].LastName;
        var language = apps.Applications[pdfIndex].Language;
        //console.log("language: " + language);
        //console.log("secure: " + secure);
        //console.log("user: " + user);
        //console.log("pwd: " + pwd);
        //console.log(
        //  'to email: ' + apps.Applications[pdfIndex].Guardians[0].Email
        //);
        if (language.trim() == 'English') {
          var mailOptions = {
            from: from,
            to: apps.Applications[pdfIndex].Guardians[0].Email,
            attachments: [
              {
                filename: fileName,
                path: pdfPath + fileName,
              },
            ],
            subject: 'Eligibility for the 2025-2026 school year',
            html: `<html>
            
            <body><h1>Eligibility for the 2025-2026 school year</h1>
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
              //console.log(info.envelope.from);
              console.log('Email sent: ' + info.response);
              //noEmailsToSend = false;
            }
          });
        } else if (language.trim() == 'Spanish') {
          var mailOptions = {
            from: from,
            to: apps.Applications[pdfIndex].Guardians[0].Email,
            attachments: [
              {
                filename: fileName,
                path: printToPath + fileName,
              },
            ],
            subject: 'Eligibility for the 2025-2026 school year',
            html: `<html>
            
            <body><h1>Eligibility for the 2025-2026 school year</h1>
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
              //console.log(info.envelope.from);
              console.log('Email sent: ' + info.response);
              //noEmailsToSend = false;
            }
          });
        }
      }

      var dateTime = new Date().toLocaleString();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(
        "<div><h1 class='w3-margin'>The following Emails were sent on: " +
          dateTime +
          '</h1></div>'
      );

      res.write(` <!DOCTYPE html>
          <html>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
            <script src="https://unpkg.com/musicgenres-json@latest/dist/index.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
            <script src="https://unpkg.com/vue@2.4.4/dist/vue.js"></script>
            <script language="javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
    
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
            <script language="javascript" type="text/json" src="./../server.js"></script>
            <script language="javascript" type="text/json" src="./../episd.js"></script>
            <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
    
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
              integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"
            ></script>
    
            <title>PrimeVue App</title>
            <body>
              <input type="button" style="font-size: 30px;height: 75px;width: 250px" value="Home" class="btn btn-success w3-margin" 
                onclick="window.location.href = 'http://localhost:8081/'"> 
              <input type="button" style="font-size: 30px;height: 75px;width: 250px" value="Back" class="btn btn-success w3-margin" 
                onclick="history.back()">             
              <div class="w3-container" style="display: inline-flex;margin: auto;flex-wrap: wrap;width: 100%">`);

      for (var i = 0; i < indexArray.length; i++) {
        //var pdfindex = ((indexArray[i]*1)+1); //added 1 because letters is in index 0 in json file
        //res.write("<embed src='http://localhost:8080/Eligibility/Letters/"+apps[pdfindex].Filename+"#zoom=225' style='width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto;margin-bottom: 10px'>");
        res.write(
          `                   
          <div class="w3-card-4 w3-margin" style="width:18%">
            <header class="w3-container" style="color: #0a58ca">
              <h1>` +
            apps.Applications[indexArray[i]].Id +
            `</h1>
            </header>
            <div class="w3-container">
              <h1 style="color: purple;font-size: 32px">` +
            apps.Applications[indexArray[i]].Guardians[0].LastName +
            ', ' +
            apps.Applications[indexArray[i]].Guardians[0].FirstName +
            `</h1>      
            </div>
            <footer class="w3-container" style="color: #0a58ca">
              <h1 style="margin-top: 2px">` +
            apps.Applications[indexArray[i]].Guardians[0].Email +
            `</h1>
            </footer>  
          </div> 
        `
        );
        //console.log("appsData: "+JSON.stringify(apps, null, 4))
        fs.writeFile(
          appsPath,
          JSON.stringify(apps, null, 4),
          function (err) {}
        );
      }
      res.write(`
              </div>
            </body>
          </html>`);
      res.end();
    }

    function setSelected(apps) {
      for (var i = 0; i < apps.Applications.length; i++) {
        apps.Applications[i].Selected = 'false';
        //console.log("apps "+i+" is selected: "+JSON.stringify(apps.Applications[i].Selected, null, 4))
      }

      //console.log("processArray: '"+processArray+"'");

      if (processArray != '') {
        for (var x = 0; x < processArray.length; x++) {
          apps.Applications[processArray[x]].Selected = 'true';
        }
      }

      if (processArray != '') {
        for (var i = 0; i < processArray.length; i++) {
          //if(apps.Applications[i].Selected == 'true') {
          console.log(
            'apps ' +
              processArray[i] +
              ' is selected: ' +
              JSON.stringify(
                apps.Applications[processArray[i]].Selected,
                null,
                4
              )
          );
          //}
        }
      }

      fs.writeFile(appsPath, JSON.stringify(apps, null, 4), function (err) {});
    }

    async function updatePrinted(apps, processArray) {
      //var requrl = req.url.split('?')[1];
      //var displayType = requrl.split('=')[0];
      //console.log('1: processArray: ' + processArray);
      var displayString = requrl.split('=')[1];
      var displayArray = processArray;
      //console.log(apps.Applications.length);

      var userName = process.env.USERNAME;
      var fileName = '';
      console.log('2: displayArray: ' + displayArray);
      setTimeout(function () {
        for (var i = 0; i < processArray.length; i++) {
          //apps[processArray[i]].Printed = "true";
          //console.log("displayArray: "+displayArray) ;
          var pdfIndex = processArray[i];
          //console.log("pdfIndex: "+pdfIndex)
          //var pdfIndex  = txtSelected.value;
          apps.Applications[pdfIndex].Printed = 'true';

          //console.log(
          //  'apps: ' + JSON.stringify(apps.Applications[pdfIndex], null, 4)
          //);

          console.log('pdfIndex: ' + pdfIndex);
          fileName =
            apps.Applications[pdfIndex].Filename +
            '_' +
            apps.Applications[pdfIndex].Id +
            '_' +
            apps.Applications[pdfIndex].Guardians[0].LastName +
            '_' +
            apps.Applications[pdfIndex].Guardians[0].FirstName +
            '.pdf';

          var src = 'C:/Users/' + userName + '/Downloads/' + fileName;
          var dest = printToPath + fileName;

          if (fs.existsSync(src)) {
            //console.log('The file: '+ src +' exists');

            fs.copyFile(src, dest, (err) => {
              if (err) throw err;
            });
          } else {
            console.log('The file: ' + src + ' does not exist');
          }

          //console.log(src+' was copied to '+dest);
        }
      }, 3000);

      //console.log('Updated APPS: ' + JSON.stringify(apps, null, 4));

      //fs.writeFile(
      //  appsPath,
      //  JSON.stringify(apps, null, 4),
      //  function (err) {}
      //);

      //var htmlString = '';
      setTimeout(function () {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        //console.log("apps: "+JSON.stringify(apps, null, 4));

        //showApps(req,res,apps);

        //res.write(htmlString);
        //res.end();
        var htmlString = `
          <html>
            <title>W3.CSS</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://unpkg.com/primeicons@6.0.1/primeicons.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
            <script src="https://unpkg.com/musicgenres-json@latest/dist/index.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
            <script src="https://unpkg.com/vue@2.4.4/dist/vue.js"></script>
            <script language="javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
            <body style="overflow-y: auto">
              <div class="w3-container w3-margin" style="display: inline-flex;margin: auto">`;
        //console.log("processArray.length: "+processArray.length);
        for (var i = 0; i < processArray.length; i++) {
          var index = processArray[i];
          //console.log("index: "+index);
          apps.Applications[index].Printed = 'true';
          //console.log("apps.Applications[0].Filename: "+apps.Applications[0].Filename);
          var fileName =
            apps.Applications[index].Filename +
            '_' +
            apps.Applications[index].Id +
            '_' +
            apps.Applications[index].Guardians[0].LastName +
            '_' +
            apps.Applications[index].Guardians[0].FirstName +
            '.pdf';
          //if(apps.Applications[index].Selected == "true") {
          //html2pdf().set(options).from(element).save()
          //htmlString += `<embed src="http://localhost:8080/Eligibility/Letters/`+apps.Applications[i].Filename+"_"+apps.Applications[i].Id+"_"+apps.Applications[i].Guardians[0].LastName+"_"+apps.Applications[i].Guardians[0].FirstName+".pdf"+`" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `
          htmlString +=
            `</div><div><input type="button" value="Home" class="btn btn-success w3-margin" onclick="window.location.href = 'http://localhost:8081'"></div><embed src="http://localhost:8083/` +
            fileName +
            `#zoom=225" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `;
          //}
        }
        `
              </div></body> 
            `;

        //console.log(
        //  'JSON.stringify(apps, null, 4): ' + JSON.stringify(apps, null, 4)
        //);

        fs.writeFile(
          appsPath,
          JSON.stringify(apps, null, 4),
          function (err) {}
        );
        res.write(htmlString);
        res.end();
      }, 3000);
      //return htmlString;
    }

    async function processLineByLine(filePath) {
      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
        crlfDelay: Infinity, // Handle Windows-style newlines
      });

      rl.on('line', (line) => {
        //console.log(`Line from file: ${line}`); // Process each line here
        var curEmail = line;
        emailArray.push(curEmail);
      });

      await new Promise((resolve) => rl.once('close', resolve)); // Wait for the file to be fully read
      //console.log('emailArray: ' + emailArray);
    }

    async function importApps() {
      // Get the directory where applications.json is located
      var appsDirectory = require('path').dirname(appsPath);
      var csvPath = require('path').join(appsDirectory, 'emails.csv');
      
      console.log('Looking for emails.csv at: ' + csvPath);
      await processLineByLine(csvPath);

      //console.log('email length: ' + emailArray.length);

      // Process CSV data and calculate batch numbers based on date grouping
      var dateGroups = {};
      var maxBatchNum = 0;
      
      // First pass: identify existing batch numbers and group by date
      for (var x = 0; x < emailArray.length; x++) {
        var parts = emailArray[x].split(',');
        var appId = parts[0];
        var appDate = parts[1]; // Date column (e.g., "10-12-2025")
        var existingBatchNum = parts[5] ? parts[5].trim() : ''; // BatchNum is in column 5 (6th column)
        
        // Track the maximum existing batch number
        if (existingBatchNum && !isNaN(existingBatchNum)) {
          var batchNumInt = parseInt(existingBatchNum);
          if (batchNumInt > maxBatchNum) {
            maxBatchNum = batchNumInt;
          }
        }
        
        // Group applications by date
        if (!dateGroups[appDate]) {
          dateGroups[appDate] = {
            batchNum: existingBatchNum && !isNaN(existingBatchNum) ? parseInt(existingBatchNum) : null,
            appIds: []
          };
        }
        dateGroups[appDate].appIds.push(x);
      }
      
      // Second pass: assign batch numbers to date groups that don't have one
      var currentBatchNum = maxBatchNum;
      var dateKeys = Object.keys(dateGroups).sort(); // Sort dates to ensure consistent ordering
      var updatedRows = false;
      
      for (var d = 0; d < dateKeys.length; d++) {
        var dateKey = dateKeys[d];
        if (dateGroups[dateKey].batchNum === null) {
          currentBatchNum++;
          dateGroups[dateKey].batchNum = currentBatchNum;
          
          // Update the emailArray entries with the new batch number
          for (var a = 0; a < dateGroups[dateKey].appIds.length; a++) {
            var idx = dateGroups[dateKey].appIds[a];
            var parts = emailArray[idx].split(',');
            // Ensure we have 6 columns, add batch number at the end
            if (parts.length === 5) {
              emailArray[idx] = emailArray[idx] + ',' + currentBatchNum;
              updatedRows = true;
            } else if (parts.length === 6 && (!parts[5] || parts[5].trim() === '')) {
              parts[5] = currentBatchNum;
              emailArray[idx] = parts.join(',');
              updatedRows = true;
            }
          }
          
          console.log('Assigned batch number ' + currentBatchNum + ' to date: ' + dateKey);
        }
      }
      
      // Write updated CSV back to file only if rows were updated
      if (updatedRows) {
        var updatedCsvContent = emailArray.join('\n');
        fs.writeFileSync(csvPath, updatedCsvContent, 'utf8');
        console.log('Updated emails.csv at: ' + csvPath + ' with new batch numbers');
      } else {
        console.log('No new batch numbers to assign - CSV file not modified');
      }

      //var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
      //var server = config.panels[0].fields[0].value;
      //var database = config.panels[0].fields[1].value;
      //var driver = config.panels[0].fields[2].value;
      //var trustedConnection = config.panels[0].fields[3].value;

      //console.log('server: ' + server);
      //console.log('database: ' + database);
      //console.log('driver: ' + driver);
      //console.log('trustedConnection: ' + trustedConnection);

      const sql = require('mssql/msnodesqlv8');
      const conn = new sql.ConnectionPool({
        database: database,
        server: server,
        driver: driver,
        options: {
          trustedConnection: false,
        },
      });

      /*
      //console.log('database: ' + database);
      //console.log('server: ' + server);
      //console.log('driver: ' + driver);
      //console.log('trustedConnection: ' + trustedConnection);

      var siteID = 0;
      var siteName = 0;
      */

      conn.connect().then(() => {
        var newApps = [];
        var newCusts = [];
        var newSites = [];
        var site = [];

        var appsTableName = config.panels[6].fields[1].value;

        var applications = 'SELECT * FROM ' + appsTableName;
        var customers = 'SELECT * FROM customers';
        var sites = 'SELECT * FROM sites';

        conn.query(customers, function (err, result) {
          newCusts = result.recordsets[0];
          //console.log('newCusts: ' + JSON.stringify(newCusts));
        });

        conn.query(sites, function (err, result) {
          newSites = result.recordsets[0];
          //console.log('newSites: ' + JSON.stringify(newSites));
        });

        conn.query(applications, function (err, result) {
          newApps = result.recordsets[0];

          //console.log('newApps: ' + JSON.stringify(newApps));
          var newEnglishApp = [];
          var newSpanishApp = [];

          for (var i = 0; i < newApps.length; i++) {
            var addedCount = 0;
            var matchFlag = false;
            var language = newApps[i].Lang.trim();

            var studentsArray = [];
            //console.log("apps: "+JSON.stringify(apps));
            for (var j = 0; j < apps.Applications.length; j++) {
              if (
                newApps[i].ApplicationID.trim() ==
                apps.Applications[j].Id.trim()
              ) {
                matchFlag = true;
                break;
              }
            }
            //console.log("End matchFlag: "+matchFlag);
            if (matchFlag == true) {
              //skip and do nothing
              //console.log("Skipped: '" + newApps[i].ApplicationID[0] + "'");
            } else {
              //console.log('id: ' + newApps[i].ApplicationID);
              //console.log('newCusts.length: ' + newCusts.length);

              for (var c = 0; c < newCusts.length; c++) {
                //console.log('app id: ' + newApps[i].ApplicationID);
                //console.log('cust id: ' + newCusts[c].ApplicationID);
                for (var s = 0; s < newSites.length; s++) {
                  if (newCusts[c].SiteID.trim() == newSites[s].SiteID.trim()) {
                    //console.log('newSites[s].name: ' + newSites[s].Name);
                    siteID = newSites[s].Name;
                  }
                }
                //console.log('siteID: ' + siteID);

                if (
                  newApps[i].ApplicationID.trim() ==
                  newCusts[c].ApplicationID.trim()
                ) {
                  var cfName = toTitleCase(newCusts[c].FirstName);
                  var clName = toTitleCase(newCusts[c].LastName);
                  var addStud = {
                    Id: newCusts[c].CustomerID.trim(),
                    FirstName: cfName,
                    LastName: clName,
                    Campus: siteID,
                  };
                  studentsArray.push(addStud);
                }
              }

              addedCount++;
              freeStatus =
                newApps[i].Status.trim() == 'Free' ? 'true' : 'false';
              reducedStatus =
                newApps[i].Status.trim() == 'Reduced' ? 'true' : 'false';
              deniedStatus =
                newApps[i].Status.trim() == 'Paid' ? 'true' : 'false';

              if (deniedStatus == 'true') {
                reason = 'true';
              } else {
                reason = 'false';
              }

              //console.log('studentsArray: ' + studentsArray);

              //var siteName = 'Coronado High School';

              var curEmail = '';
              var curBatchNum = '';
              for (var x = 0; x < emailArray.length; x++) {
                //console.log('emailArray: ' + emailArray[x]);
                //console.log('emailArray)[0]: ' + emailArray[x].split(',')[0]);
                /*console.log(
                  'newApps[i].ApplicationID.trim(): ' +
                    newApps[i].ApplicationID.trim()
                );*/
              if (
                emailArray[x].split(',')[0] == newApps[i].ApplicationID.trim()
              ) {
                  // CSV structure: AppID,Date,Email,LastName,FirstName,BatchNum
                  // Index:         0     1    2     3         4          5
                  curEmail = emailArray[x].split(',')[2];  // Email is in column 2
                  curBatchNum = emailArray[x].split(',')[5]; // BatchNum is in column 5
                  //console.log('curEmail: ' + curEmail);
                  //console.log('curBatchNum: ' + curBatchNum);
                }
              }

              //console.log('curEmail: ' + curEmail);

              var gName = '';

              gName = newApps[i].Guardian.trim();
              var gNameArray = gName.split(' ');

              //console.log('gNameArray: ' + gNameArray);
              //console.log('gNameArray len: ' + gNameArray.length);

              /*
              var gfName = toTitleCase(
                newApps[i].Guardian.trim().split(' ')[0]
              );
              var glName = toTitleCase(
                newApps[i].Guardian.trim().split(' ')[1]
              );
              */

              var gfName = gNameArray[0];
              var glName = '';

              if (gNameArray.length == 2) {
                var glName = gNameArray[1];
              } else {
                for (var x = 1; x < gNameArray.length; x++) {
                  if (gNameArray.length == 0) {
                    glName += gNameArray[x];
                  } else {
                    glName += ' ' + gNameArray[x];
                  }
                }
              }
              //var glNameArray = glName.split(' ');

              gfName = toTitleCase(gfName);
              glName = toTitleCase(glName);

              const removeAccents = (str) => {
                return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
              };

              //const text = 'Héllö Wörld!';
              //const plainText = removeAccents(text);

              //console.log('fName Before: ' + gfName); // Output: Hello World!
              //console.log('fName Before: ' + glName); // Output: Hello World!

              gfName = toTitleCase(gfName);
              glName = toTitleCase(glName);

              gfName = removeAccents(gfName);
              glName = removeAccents(glName);

              gfName = gfName.trim(gfName);
              glName = glName.trim(glName);

              const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'Jume',
                'July',
                'August',
                'September',
                'October',
                'Movember',
                'DecemberS',
              ];

              //console.log('lName After: ' + gfName); // Output: Hello World!
              //console.log('lName After: ' + glName); // Output: Hello World!
              const now = new Date();
              const month = now.getMonth() + 1;
              const day = now.getDate();
              const year = now.getFullYear();
              const date = month + '/' + day + '/' + year;
              //console.log('date: ' + date);

              newAppEnglish = {
                Date: date,
                Index: apps.Applications.length.toLocaleString(),
                Id: newApps[i].ApplicationID.trim(),
                BatchNum: curBatchNum,
                Language: newApps[i].Lang.trim(),
                Filename: 'EPISD - Meal Application',
                Selected: 'false',
                Sent: 'false',
                Printed: 'false',
                Guardians: [
                  {
                    Id: newApps[i].ApplicationID.trim(),
                    FirstName: gfName,
                    LastName: glName,
                    Address: '',
                    City: '',
                    State: '',
                    Zip: '',
                    Phone: '',
                    Email: curEmail,
                  },
                ],
                Students: studentsArray,
                Status: [
                  {
                    Checked: freeStatus,
                    Status: 'Approved for free meals.',
                    MobileStatus: 'Approved for free meals',
                  },
                  {
                    Checked: reducedStatus,
                    Status:
                      'Approved for reduced-price meals for breakfast at a cost of $0.00; for lunch at a cost of $0.40; and afterschool snack at a cost of $0.00.',
                    MobileStatus: 'Approved for reduced-price meals',
                  },
                  {
                    Checked: deniedStatus,
                    Status: 'Denied for the following reason(s):',
                    MobileStatus: 'Denied',
                  },
                ],
                Reasons: [
                  {
                    Checked: reason,
                    Reason: 'Income over the allowable amount.',
                    MobileReason: 'Income over the allowable amount',
                  },
                  {
                    Checked: 'false',
                    Reason:
                      'Incomplete application, please complete the forms attached to provide the needed information.',
                    MobileReason: 'Incomplete application',
                  },
                ],
              };

              newAppSpanish = {
                Index: apps.Applications.length.toLocaleString(),
                Id: newApps[i].ApplicationID.trim(),
                BatchNum: curBatchNum,
                Language: newApps[i].Lang.trim(),
                Filename: 'EPISD - Meal Application',
                Selected: 'false',
                Sent: 'false',
                Printed: 'false',
                Guardians: [
                  {
                    Id: newApps[i].ApplicationID.trim(),
                    FirstName: gfName,
                    LastName: glName,
                    Address: '',
                    City: '',
                    State: '',
                    Zip: '',
                    Phone: '',
                    Email: curEmail,
                  },
                ],
                Students: studentsArray,
                Status: [
                  {
                    Checked: freeStatus,
                    Status: 'Aprovada para comidas gratis.',
                    MobileStatus: 'Aprovada para comidas gratis',
                  },
                  {
                    Checked: reducedStatus,
                    Status:
                      'Aprovada para comidas a precio reducido para almuerzos a un costo de $0.40; desayuno a un costo $0,00; merienda para despues de la escuela (si esta disponble) a un costo de $0.00.',
                    MobileStatus: 'Aprovado para comida a precio reducido',
                  },
                  {
                    Checked: deniedStatus,
                    Status: 'Negada por la(s) siguiente(s) razon(es):',
                    MobileStatus: 'Negada',
                  },
                ],
                Reasons: [
                  {
                    Checked: reason,
                    Reason: 'Su ingreso sobrepasa la cantidad permitida.',
                    MobileReason: 'Su ingreso sobrepasa la cantidad permitida.',
                  },
                  {
                    Checked: 'false',
                    Reason:
                      'Su solicitud esta incompleta. Por favor conplete los documentos adjuntos para proporcionar la informacion necesaria.',
                    MobileReason: 'Su solicitud esta incompleta.',
                  },
                ],
              };

              //apps.Applications.push(newApp);
              //console.log("Added: '" + newApps[i].ApplicationID.trim() + "'");

              if (language.trim() == 'English') {
                apps.Applications.push(newAppEnglish);
              } else if (language.trim() == 'Spanish') {
                apps.Applications.push(newAppSpanish);
              }
            }

            //console.log("appsData: "+JSON.stringify(apps, null, 4))
            fs.writeFile(
              appsPath,
              JSON.stringify(apps, null, 4),
              function (err) {}
            );
          }
          //console.log('apps: ' + JSON.stringify(apps));
          //console.log('newApps count: ' + addedCount);
        });
      });
    }

    function appIndex(req, res, apps, processArray) {
      //console.log("appIndex")
      showApps(req, res, apps, processArray);
    }

    function showApps(req, res, apps, processArray) {
      //var apps = JSON.parse(fs.readFileSync(appsPath,, 'utf8'));
      //console.log("apps length: "+apps.Applications.length)
      for (var i = 0; i < apps.Applications.length - 1; i++) {
        var index = i;
        //console.log("index: "+index);
        //apps.Applications[index].Printed = "true";
        /*
        console.log("http://localhost:8080/Eligibility/Letters/`+apps.Applications[i].Filename: "+"http://localhost:8080/Eligibility/Letters/"+apps.Applications[i].Filename);
        if(apps.Applications[i].Selected == "true") {          
          htmlString += `<embed src="http://localhost:8080/Eligibility/Letters/`+apps.Applications[i].Filename+`" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `                         
        }
        */
      }
      //console.log(JSON.stringify(apps, null, 4));
      //fs.writeFile('ppsPath, JSON.stringify(apps, null, 4), function (err) {
      //});

      res.writeHead(200, { 'Content-Type': 'text/html' });

      var htmlString = `
          <html>
            <title>W3.CSS</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            <link rel="stylesheet" href="https://unpkg.com/primeicons@6.0.1/primeicons.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.10.0/jquery-ui.js"></script>
            <script src="https://unpkg.com/musicgenres-json@latest/dist/index.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>
            <script src="https://unpkg.com/vue@2.4.4/dist/vue.js"></script>
            <script language="javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
            <body style="overflow-y: auto">
              <div class="w3-container w3-margin" style="display: inline-flex;margin: auto">
                `;
      for (var i = 0; i < processArray.length; i++) {
        //apps[i].Printed = "true";
        var pdfIndex = processArray[i];
        var fileName =
          apps.Applications[pdfIndex].Filename +
          '_' +
          apps.Applications[pdfIndex].Id +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].LastName +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].FirstName +
          '.pdf';
        //if(apps.Applications[i].Printed == "true") {
        htmlString +=
          `</div><div><input type="button" value="Home" class="btn btn-success w3-margin" onclick="window.location.href = 'http://localhost:8081'"></div><embed src="http://localhost:8083/` +
          fileName +
          `#zoom=225" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `;
        //}
      }
      `</div></body> 
            `;

      res.write(htmlString);
      res.end();
      //return htmlString;
    }
  }
}
