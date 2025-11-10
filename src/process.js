var fs = require('fs');
var http = require('http');
const util = require('util');
const path = require('path');

var x = 0;

const sql = require('mssql/msnodesqlv8');
const conn = new sql.ConnectionPool({
  database: 'Winsnap',
  server: '(localdb)\\mssqllocaldb',
  driver: 'msnodesqlv8',
  user: 'mario',
  password: 'F@ll1sH3r3@123',
  options: {
    trustedConnection: true,
  },
});
conn.connect().then(() => {
  // ... sproc call, error catching, etc
  //example: https://github.com/patriksimek/node-mssql#request
  var sql = 'SELECT * FROM Applications;';
  conn.query(sql, function (err, result) {
    console.log('Connected to Applications');
    console.log('Applications: ') + result;
    fs.writeFile(
      'AspNetUsers.json',
      JSON.stringify(result, null, 4),
      function (err) {}
    );
  });
});

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

// API data modification
function handler(req, res) {
  console.log('Test');
  //console.log("req.url: "+req.url);
  x++;
  if (req.url.indexOf('ico') == -1 && req.url.indexOf('episdlogo.jpg') == -1) {
    console.log('req.url: ' + req.url);
    var requrl = req.url.split('?')[1];
    var processType = requrl.split('=')[0];
    var processString = requrl.split('=')[1];
    console.log('processString: ' + processString);
    var processArray = processString.split(',');

    console.log("processArray: '" + processArray + "'");
    //var apps = JSON.parse(fs.readFileSync('D:/Projects/EPISD/deploy template/public/applications.json', 'utf8'));
    //var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
    //console.log("config: "+JSON.stringify(config));
    //var appsPath = config[0].appsPath;
    //console.log("appsPath: "+appsPath)
    var apps = JSON.parse(
      fs.readFileSync(
        'D:/Projects/EPISD/deploy template/public/applications.json',
        'utf8'
      )
    );
    var importedApps = JSON.parse(
      fs.readFileSync(
        'D:/Projects/EPISD/deploy template/public/apps.json',
        'utf8'
      )
    );
    var importedCustomers = JSON.parse(
      fs.readFileSync(
        'D:/Projects/EPISD/deploy template/public/customers.json',
        'utf8'
      )
    );
    var importedSites = JSON.parse(
      fs.readFileSync(
        'D:/Projects/EPISD/deploy template/public/sites.json',
        'utf8'
      )
    );
    //var requests = JSON.parse(fs.readFileSync("D:/Projects/Jukebox SPA/src/assets/json/dj.json", 'utf8'));
    //console.log("1: requests: "+JSON.stringify(requests));
    //console.log("processString: "+processString);

    if (processType == 'printSelected') {
      printSelected(apps);
    } else if (processType == 'emailSelected') {
      emailSelected(apps);
    } else if (processType == 'setPrinted') {
      setPrinted(apps);
    } else if (processType == 'setSelected') {
      setSelected(apps);
    } else if (processType == 'importApps') {
      console.log('importedApps: ' + JSON.stringify(importedApps));
      importApps(apps, importedApps, importedCustomers, importedSites);
    } else if (processType == 'showConfig') {
      showConfig(apps);
    } else if (processType == 'appIndex') {
      //appIndex(req, res, apps, processArray);
    } else if (processType == 'copyPDF') {
      //console.log("apps: "+JSON.stringify(apps));
      //console.log("Calling  copyPDF");
      updatePrinted(apps, processArray);
    } else if (processType == 'addDJ') {
      console.log('Calling  addDJ');
    }

    function printSelected(apps) {
      console.log('processType: ' + processType);
      console.log('processArray: ' + processArray);
      //console.log("apps: "+JSON.stringify(apps));

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
      //if(printType=="printSelected") {
      //htmlString += `<label class="w3-margin" style="color: black">The following letter have been printed: </label>`
      //} else if(printType=="printSelected") {
      htmlString += `<label class="w3-margin" style="color: black">The following letters have been printed: </label>`;
      //}
      htmlString += `</div>                      
        <div style="border: solid rgb(55, 97, 189) 0px;display: block;margin: auto;width: 88%;height: 1000px;overflow-y: auto;
        justify-content: center;float: auto" class="pdf">`;

      for (var i = 0; i < processArray.length; i++) {
        var pdfIndex = processArray[i]; //added 1 because letters is in index 0 in json file
        //console.log("pdfIndex: "+pdfIndex);
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
        //console.log("apps.Applications[i].Selected: "+apps.Applications[i].Selected);
        //if(apps.Applications[i].Selected == "true") {
        htmlString +=
          `<embed src="http://localhost:8080/Eligibility/Letters/` +
          fileName +
          `" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `;
        //}
      }

      htmlString += `</div>                             
        </div>    
      </body>
      </html>`;

      res.write(htmlString);
      res.end();
    }

    function emailSelected(apps) {
      console.log('processType: ' + processType);
      console.log('processArray: ' + processArray);
      emails(processString, res);
      //console.log("apps: "+JSON.stringify(apps));
    }

    function setPrinted(apps) {
      //console.log("processType: "+processType);
      //console.log("processArray: "+processArray);
      //console.log("apps: "+JSON.stringify(apps));
      //console.log("processArray :+"+processArray);
      updatePrinted(processString, apps);
    }

    function showConfig(apps) {
      //console.log("processType: "+processType);
      //console.log("processArray: "+processArray);
      //console.log("apps: "+JSON.stringify(apps));
      var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
      //console.log(JSON.stringify(config))
      //console.log('panels length:', config.panels.length);
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
                        <div id="divConfig" class="title" style="font-size: 34px;font-weight: 600;color: black">          
                          Eligibility Letter Configuration Utility
                        </div>            
                      </div>                  
                    </div>
                  </nav>              
                </div>  
              </div> 
              <div class="w3-margin" style="display: flex;justify-content: center;border: solid black 0px;width: 100%;float: auto">             
                <form action="/" style="displayL flex;margin: auto;flex-wrap: nowrap;border: solid black 0px; width: 100%" class="w3-margin">
                <div style="display: inline-flex;margin: auto;border: solid green 0px">`;
      for (var i = 0; i < config.panels.length; i++) {
        htmlString +=
          `
                      <div class="w3-margin" style="border: solid black 3px;width: 250px;padding: 20px;border-radius: 10px">
                        <label style="margin-left: 0px;font-weight: 600;color: purple;font-size:20px;width: 100%;border: solid black 0px;text-align: center">` +
          config.panels[i].panel +
          `</label>                   
                        <div style="display: flex;margin: auto;justify-content: center">                
                          <button type="Update" class="btn btn-primary w3-margin" style="width: 75px;height: 35px">Update</button>
                        </div>   
                        `;
        for (var j = 0; j < config.panels[i].fields.length; j++) {
          htmlString +=
            `
                            <div class="mb-3 mt-3">
                              <label for="server" style="color: black;font-weight: 700">` +
            config.panels[i].fields[j].label +
            `:</label>
                              <input type="text" class="form-control w3-input" id="server" placeholder="Enter server name" name="server" value="` +
            config.panels[i].fields[j].value +
            `" style="color: blue">
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

      /*
        "server": "(localdb)\\mssqllocaldb",
        "database": "Winsnap",    
        "driver": "msnodesqlv8",
        "trustedConnection": true,
      */

      res.write(htmlString);
      res.end();
    }

    async function emails(indexString, res) {
      //console.log("indexString: "+indexString);
      var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
      //console.log("config: "+JSON.stringify(config));
      var apps = JSON.parse(fs.readFileSync(config.appsPath, 'utf8'));

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
        console.log('pdfPath: ' + pdfPath);
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
        var fileName =
          apps.Applications[pdfIndex].Filename +
          '_' +
          apps.Applications[pdfIndex].Id +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].LastName +
          '_' +
          apps.Applications[pdfIndex].Guardians[0].FirstName +
          '.pdf';
        console.log('Email fileName: ' + fileName);
        //var guardianName = apps[i].Guardians[0].FirstName + " " + apps[i].Guardians[].LastName;
        var language = apps.Applications[pdfIndex].Language;
        //console.log("language: " + language);
        //console.log("secure: " + secure);
        //console.log("user: " + user);
        //console.log("pwd: " + pwd);
        console.log(
          'to email: ' + apps.Applications[pdfIndex].Guardians[0].Email
        );
        if (language.trim() == 'English') {
          var mailOptions = {
            from: 'mvc57@att.net',
            to: apps.Applications[pdfIndex].Guardians[0].Email,
            attachments: [
              {
                filename: fileName,
                path: pdfPath + fileName,
              },
            ],
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
                //path: "d:/jukebox/Eligibility/Letters/"+fileName}],
                path: 'C:/EPISD/Eligibility/Letters/' + fileName,
              },
            ],
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
            <script type="text/json" apps="applications.json"></script>
    
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

      fs.writeFile(
        'D:/Projects/EPISD/deploy template/public/applications.json',
        JSON.stringify(apps, null, 4),
        function (err) {}
      );
    }

    async function updatePrinted(apps, processArray) {
      //var requrl = req.url.split('?')[1];
      //var displayType = requrl.split('=')[0];
      console.log('1: processArray: ' + processArray);
      console.log('Hello World');
      var displayString = requrl.split('=')[1];
      var displayArray = processArray;
      //console.log(apps.Applications.length);

      var userName = process.env.USERNAME;
      var fileName = '';
      //console.log("2: displayArray: "+displayArray) ;
      setTimeout(function () {
        for (var i = 0; i < processArray.length; i++) {
          //apps[processArray[i]].Printed = "true";
          //console.log("displayArray: "+displayArray) ;
          var pdfIndex = processArray[i];
          //console.log("pdfIndex: "+pdfIndex)
          //var pdfIndex  = txtSelected.value;
          apps.Applications[pdfIndex].Printed = 'true';
          //console.log("apps: "+JSON.stringify(apps.Applications[pdfIndex], null, 4));

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
          var dest = 'C:/EPISD/Eligibility/Letters/' + fileName;

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
      }, 500);

      fs.writeFile(
        'D:/Projects/EPISD/deploy template/public/applications.json',
        JSON.stringify(apps, null, 4),
        function (err) {}
      );

      //var htmlString = '';
      //setTimeout(function() {
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
        //apps.Applications[index].Printed = "true";
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
      res.write(htmlString);
      res.end();
      //}, 1000);
      //return htmlString;
    }

    function importAppsx(apps) {
      var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
      var server = config.panels[0].fields[0].value;
      var database = config.panels[0].fields[1].value;
      var driver = config.panels[0].fields[2].value;
      var trustedConnection = config.panels[0].fields[3].value;

      console.log('server: ' + server);
      console.log('database: ' + database);
      console.log('driver: ' + driver);
      console.log('trustedConnection: ' + trustedConnection);

      const sql = require('mssql/msnodesqlv8');
      const conn = new sql.ConnectionPool({
        database: database,
        server: server,
        driver: driver,
        options: {
          trustedConnection: trustedConnection,
        },
      });

      console.log('database: ' + database);
      console.log('server: ' + server);
      console.log('driver: ' + driver);
      console.log('trustedConnection: ' + trustedConnection);

      conn.connect().then(() => {
        console.log('connected');
        var newApps = [];

        var applications = 'SELECT * FROM Applications';
        conn.query(applications, function (err, result) {
          newApps = result.recordsets[0];
          console.log('newApps: ' + JSON.stringify(newApps));
          var newApp = [];

          for (var i = 0; i < newApps.length; i++) {
            var addedCount = 0;
            var matchFlag = false;
            //console.log("apps: "+JSON.stringify(apps));
            for (var j = 0; j < apps.Applications.length; j++) {
              console.log('i: ' + i);
              console.log('j: ' + j);
              console.log(
                'newApps[' +
                  i +
                  "].ApplicationID: '" +
                  newApps[i].ApplicationID.trim() +
                  "'"
              );
              console.log(
                'apps.Applications[' +
                  j +
                  "].Id: '" +
                  apps.Applications[j].Id.trim() +
                  "'"
              );
              //console.log("'"+newApps[i].ApplicationID[i].trim()+"' == '"+apps.Applications[j].Id.trim()+"'");
              //console.log(newApps[i].ApplicationID[i].trim() == apps.Applications[j].Id.trim());
              //console.log("Start matchFlag: "+matchFlag);

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
              console.log("Skipped: '" + newApps[i].ApplicationID[0] + "'");
            } else {
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

              newApp = {
                Index: apps.Applications.length.toLocaleString(),
                Id: newApps[i].ApplicationID.trim(),
                Language: newApps[i].Lang.trim(),
                Filename: 'EPISD - Meal Application',
                Selected: 'false',
                Sent: 'false',
                Printed: 'false',
                Guardians: [
                  {
                    Id: newApps[i].ApplicationID.trim(),
                    FirstName: newApps[i].Guardian.trim().split(' ')[0],
                    LastName: newApps[i].Guardian.trim().split(' ')[1],
                    Address: '',
                    City: '',
                    State: '',
                    Zip: '',
                    Phone: '',
                    Email: '',
                  },
                ],
                Students: [
                  {
                    Id: newApps[i].ApplicationID.trim(),
                    FirstName: 'Betty',
                    LastName: 'Buffet',
                    Campus: 100,
                  },
                ],
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
              apps.Applications.push(newApp);
              console.log("Added: '" + newApps[i].ApplicationID.trim() + "'");
            }

            var jsonEnglish = {
              Id: '0',
              HeaderLeft: 'Texas Department of',
              HeaderLeft2: 'Agriculture',
              HeaderRight:
                'Letter | Household Eligibility Notification | Application',
              HeaderDate: 'July 28, 2022',
              Title:
                'Letter to Household, Eligibility Based on Household Meal Application',
              District: 'El Paso Independent School District',
              BodyDate: 'September 25, 2023',
              Salutation: 'Dear Mr./Ms.:',
              Reviewed:
                'We have reviewed your application for free and reduced-price school meals for the following student(s):',
              Status: 'Your application has been:',
              Discussion:
                'If you do not agree with the decision, you may discuss it with Food & Nutrition Services, fns@episd.org 915.230.2160. You also have a right to a fair hearing. To request a fair hearing, call or write the following official within 10 calendar days:',
              Service: 'Food and Nutrition Services',
              Street: '1905 Delta Dr.',
              City: 'El Paso, TX 79905',
              Phone: '915.230.2160',
              Reapply:
                'You may reapply for meal benefits at any time during the school year. If you are not eligible now but have a decrease in household income, become unemployed, have an increase in household size, or qualify for the Supplemental Nutrition Assistance Program (SNAP), Temporary Assistance for Needy Families (TANF) or Federal Distribution Program on Indian Reservations (FDPIR), you may fill out another application at that time.',
              Closing: 'Sincerley,',
              Director:
                'Laura V. Duran, Director of Food and Nutrition Services',
              Gap: 'This institution is an equal opportunity provider.',
              Accordance1:
                'In accordance with federal civil rights law and U.S. Department of Agriculture (USDA) civil rights regulations and policies, this institution is prohibited from discriminating on the basis of race, color, national origin, sex (including gender identity and sexual orientation), disability, age, or reprisal or retaliation for prior civil rights activity. Program information may be made available in languages other than English.',
              Accordance2:
                'Persons with disabilities who require alternative means of communication to obtain program information (e.g., Braille, large print, audiotape, American Sign Language), should contact the responsible state or local agency that administers the program or USDA’s TARGET Center at (202) 720-2600 (voice and TTY) or contact USDA through the Federal Relay Service at (800) 877-8339. To file a program discrimination complaint, a Complainant should complete a Form AD-3027, USDA Program Discrimination Complaint Form which can be obtained online at: ',
              Link1:
                'https://www.usda.gov/sites/default/files/documents/USDA-OASCR%20P-Complaint-Form-0508-0002-508-11-28-17Fax2Mail.pdf',
              Accordance3:
                ', from any USDA office, by calling (866) 632-9992, or by writing a letter addressed to USDA. The letter must contain the complainant’s name, address, telephone number, and a written description of the alleged discriminatory action in sufficient detail to inform the Assistant Secretary for Civil Rights (ASCR) about the nature and date of an alleged civil rights violation. The completed AD-3027 form or letter must be submitted to USDA by: (1) mail: U.S. Department of Agriculture, Office of the Assistant Secretary for Civil Rights, 1400 Independence Avenue, SW, Washington, D.C. 20250-9410; (2) fax: (833) 256-1665 or (202) 690-7442; or (3) email: ',
              Link2: 'program.intake@usda.gov',
              Accordance4:
                '. This institution is an equal opportunity provider.',
            };

            var jsonSpanish = {
              Id: '0',
              HeaderLeft: 'Texas Department of Agriculture',
              HeaderRight:
                'Letter | Household Eligibility Notification | Application',
              HeaderDate: 'July 28, 2022',
              Title:
                'Carta para el hogar, Elegibilidad basada en la solicitud de comidas para la familia',
              District: 'El Distrito Escolar Independiente de El Paso',
              BodyDate: 'Septiembre 25, 2023',
              Salutation: 'Estimado Sr/a:',
              Reviewed:
                'Hemos revisado su solicitud para comida escolar gratis o a precio reducido para el/los siguiente(s) estudiante(s):',
              Status: 'Su solicitud ha sido:',
              Discussion:
                'Si usted no está de acuerdo con la decisión, puede consultarlo con el Departamento de Alimentos de Nutrición y Alimentos, fns@episd.org 915.230.2160. Usted también tiene derecho a una audiencia imparcial. Para solicitar una audiencia imparcial, llame o escriba al siguiente funcionario antes de 10 días hábiles:',
              Service: 'Departamento del Servicio de Nutrición y Alimentos',
              Street: '1905 Delta Dr.',
              City: 'El Paso, TX 79905',
              Phone: '915.230.2160',
              Reapply:
                'Usted puede solicitar de nuevo los beneficios de comida en cualquier momento durante el año escolar. Si usted no es elegible ahora, pero tiene una reducción en sus ingresos familiares, pierde su empleo, aumenta el número de personas que viven en su hogar o califica para el Programa de asistencia nutricional complementaria (SNAP), Programa de asistencia temporaria para las familias necesitadas (TANF) o Programa de distribución de alimentos en reservaciones indígenas (FDPIR), usted puede llenar otra solicitud en ese momento.',
              Closing: 'Atentamente,',
              Director:
                'Laura V. Duran, Directora del Departamento de Alimentos de Nutrición y Alimentos',
              Accordance1:
                'Para todos los demás programas de asistencia de nutrición del FNS, agencias estatales o locales y sus subreceptores, deben publicar la siguiente Declaración de No Discriminación:',
              Accordance2:
                'De acuerdo con la ley federal de derechos civiles y las normas y políticas de derechos civiles del Departamento de Agricultura de los Estados Unidos (USDA), esta entidad está prohibida de discriminar por motivos de raza, color, origen nacional, sexo (incluyendo identidad de género y orientación sexual), discapacidad, edad, o represalia o retorsión por actividades previas de derechos civiles.',
              Accordance3:
                'La información sobre el programa puede estar disponible en otros idiomas que no sean el inglés.  Las personas con discapacidades que requieren medios alternos de comunicación para obtener la información del programa (por ejemplo, Braille, letra grande, cinta de audio, lenguaje de señas americano (ASL), etc.) deben comunicarse con la agencia local o estatal responsable de administrar el programa o con el Centro TARGET del USDA al (202) 720-2600 (voz y TTY) o comuníquese con el USDA a través del Servicio Federal de Retransmisión al (800) 877-8339.',
              Accordance4:
                'Para presentar una queja por discriminación en el programa, el reclamante debe llenar un formulario AD-3027, formulario de queja por discriminación en el programa del USDA, el cual puede obtenerse en línea en:',
              Link: 'https://www.fns.usda.gov/sites/default/files/resource-files/usda-program-discrimination-complaint-form-spanish.pdf',
              Accordance5:
                'de cualquier oficina de USDA, llamando al (866) 632-9992, o escribiendo una carta dirigida a USDA. La carta debe contener el nombre del demandante, la dirección, el número de teléfono y una descripción escrita de la acción discriminatoria alegada con suficiente detalle para informar al Subsecretario de Derechos Civiles (ASCR) sobre la naturaleza y fecha de una presunta violación de derechos civiles. El formulario AD-3027 completado o la carta debe presentarse a USDA por:',
              Mail1: '(1) correo:',
              Mail2: 'U.S. Department of Agriculture',
              Mail3:
                'Office of the Assistant Secretary for Civil Rights 1400 Independence Avenue, SW',
              Mail4: 'Washington, D.C. 20250-9410; or',
              Fax1: '(2) fax:',
              Fax2: '(833) 256-1665 o (202) 690-7442; o',
              Email1: '(3) correo electrónico:',
              Email2: 'program.intake@usda.gov',
              Accordance6:
                'Esta entidad es un proveedor que brinda igualdad de oportunidades.',
            };

            var jsonGuardians = {
              Id: '100001',
              FirstName: 'John',
              LastName: 'Doe',
              Address: '1234 Main St.',
              City: 'El Paso',
              State: 'TX',
              Zip: '79901',
              Phone: '915.111.1111',
              Email: 'mvc57@att.net',
            };

            var jsonStudents = {
              Id: '100002',
              FirstName: 'Rebecca',
              LastName: 'Doe',
              Address: '1234 Main St.',
              City: 'El Paso',
              State: 'TX',
              Zip: '79901',
              Phone: '915.111.1111',
              Email: 'mvc57@att.net',
            };

            var jsonStatus = {
              Checked: 'false',
              Status: 'Approved for free meals.',
              MobileStatus: 'Approved for free meals',
            };

            var jsonReasons = [
              {
                Checked: 'false',
                Reason: 'Income over the allowable amount.',
                MobileReason: 'Income over the allowable amount',
              },
              {
                Checked: 'false',
                Reason:
                  'Incomplete application, please complete the forms attached to provide the needed information.',
                MobileReason: 'Incomplete application',
              },
            ];
            //console.log("appsData: "+JSON.stringify(apps, null, 4))
            fs.writeFile(
              'D:/Projects/EPISD/deploy template/public/applications.json',
              JSON.stringify(apps, null, 4),
              function (err) {}
            );
          }
          console.log('apps: ' + JSON.stringify(apps));
          console.log('newApps count: ' + addedCount);
        });
      });
    }

    function importAppsx03242025(apps, iApps, customers, sites) {
      var newApps = [];
      var newCusts = [];
      var newSites = [];

      newApps = iApps.apps;
      newCusts = customers.customers;
      newSites = sites.sites;

      //console.log("\n\napps: "+JSON.stringify(apps));
      //console.log("\n\nnew Apps: "+JSON.stringify(newApps));
      //console.log("\n\nnew Customers: "+JSON.stringify(newCusts));
      //console.log("\n\nnew Sites: "+JSON.stringify(newSites));

      var newApp = [];
      var newStud = [];
      var addedCount = 0;

      console.log('newApps count: ' + newApps.length);
      console.log('newCusts count: ' + newCusts.length);
      console.log('newSites count: ' + newSites.length);

      for (var i = 0; i < newApps.length; i++) {
        console.log(newApps[i].hasOwnProperty('ApplicationID'));
        if (newApps[i].hasOwnProperty('ApplicationID')) {
          var matchFlag = false;
          //console.log("apps: "+JSON.stringify(apps));
          for (var j = 0; j < apps.Applications.length; j++) {
            console.log('i: ' + i);
            console.log('j: ' + j);
            console.log(
              'newApps[' +
                i +
                "].ApplicationID: '" +
                newApps[i].ApplicationID.trim() +
                "'"
            );
            console.log(
              'apps.Applications[' +
                j +
                "].Id: '" +
                apps.Applications[j].Id.trim() +
                "'"
            );
            //console.log("'"+newApps[i].ApplicationID[i].trim()+"' == '"+apps.Applications[j].Id.trim()+"'");
            //console.log(newApps[i].ApplicationID[i].trim() == apps.Applications[j].Id.trim());
            //console.log("Start matchFlag: "+matchFlag);

            if (
              newApps[i].ApplicationID.trim() ==
                apps.Applications[j].Id.trim() ||
              newApps[i].ApplicationID.trim() == 'SNAP' ||
              newApps[i].ApplicationID.trim() == 'TANF' ||
              newApps[i].ApplicationID.trim() == 'Homeless' ||
              newApps[i].ApplicationID.trim() == ''
            ) {
              matchFlag = true;
              break;
            } else {
              for (c = 0; c < customers.customers.length; c++) {
                if (
                  customers.customers[c].ApplicationID ==
                  apps.Applications[j].Id
                ) {
                  console.log(
                    'Student Name :' +
                      customers.customers[c].FirstName +
                      ' ' +
                      customers.customers[c].LastName
                  );
                }
              }
            }
          }

          //console.log("End matchFlag: "+matchFlag);
          if (matchFlag == true) {
            //skip and do nothing
            console.log("Skipped: '" + newApps[i].ApplicationID[0] + "'");
          } else {
            console.log("Added: '" + newApps[i].ApplicationID[0] + "'");
            //console.log("sites.sites.length: '"+sites.sites.length+"'");

            addedCount++;
            freeStatus = newApps[i].Status.trim() == 'Free' ? 'true' : 'false';
            reducedStatus =
              newApps[i].Status.trim() == 'Reduced' ? 'true' : 'false';
            deniedStatus =
              newApps[i].Status.trim() == 'Paid' ? 'true' : 'false';

            if (deniedStatus == 'true') {
              reason = 'true';
            } else {
              reason = 'false';
            }

            newApp = {
              Index: apps.Applications.length.toLocaleString(),
              Id: newApps[i].ApplicationID.trim(),
              Language: newApps[i].Lang.trim(),
              Filename: 'EPISD - Meal Application',
              Selected: 'false',
              Sent: 'false',
              Printed: 'false',
              Guardians: [
                {
                  Id: newApps[i].ApplicationID.trim(),
                  FirstName: newApps[i].Guardian.trim().split(' ')[0],
                  LastName: newApps[i].Guardian.trim().split(' ')[1],
                  Address: '',
                  City: '',
                  State: '',
                  Zip: '',
                  Phone: '',
                  Email: '',
                },
              ],
              Students: [],
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
            apps.Applications.push(newApp);

            for (var c = 0; c < customers.customers.length; c++) {
              if (
                customers.customers[c].ApplicationID == newApps[i].ApplicationID
              ) {
                newStud = {
                  Id: newApps[i].ApplicationID.trim(),
                  FirstName: customers.customers[c].FirstName,
                  LastName: customers.customers[c].LastName,
                  Campus: customers.customers[c].SiteID,
                };
                for (var s = 0; s < sites.sites.length; s++) {
                  if (sites.sites[s].SiteID == customers.customers[c].SiteID) {
                    console.log('Campus Name: ' + sites.sites[s].Name);
                    newStud.Campus = sites.sites[s].Name;
                  }
                }

                apps.Applications[j].Students.push(newStud);
              }
            }
            console.log("Added: '" + newApps[i].ApplicationID.trim() + "'");

            //console.log("Campus Name: '"+newApps[i].ApplicationID.trim()+"'");
          }
        }

        //console.log("appsData: "+JSON.stringify(apps, null, 4))
        fs.writeFile(
          'D:/Projects/EPISD/deploy template/public/applications.json',
          JSON.stringify(apps, null, 4),
          function (err) {}
        );
      }
      //console.log("apps: "+JSON.stringify(apps));
      console.log('Apps added: ' + addedCount);
    }

    function importApps(apps) {
      var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
      var server = config.panels[0].fields[0].value;
      var database = config.panels[0].fields[1].value;
      var driver = config.panels[0].fields[2].value;
      var trustedConnection = config.panels[0].fields[3].value;

      console.log('server: ' + server);
      console.log('database: ' + database);
      console.log('driver: ' + driver);
      console.log('trustedConnection: ' + trustedConnection);

      const sql = require('mssql/msnodesqlv8');
      const conn = new sql.ConnectionPool({
        database: database,
        server: server,
        driver: driver,
        options: {
          trustedConnection: trustedConnection,
        },
      });

      console.log('database: ' + database);
      console.log('server: ' + server);
      console.log('driver: ' + driver);
      console.log('trustedConnection: ' + trustedConnection);

      conn.connect().then(() => {
        console.log('connected');
        var newApps = [];

        var applications = 'SELECT * FROM Applications';
        conn.query(applications, function (err, result) {
          newApps = result.recordsets[0];
          console.log('newApps: ' + JSON.stringify(newApps));
          var newApp = [];

          for (var i = 0; i < newApps.length; i++) {
            var addedCount = 0;
            var matchFlag = false;
            //console.log("apps: "+JSON.stringify(apps));
            for (var j = 0; j < apps.Applications.length; j++) {
              console.log('i: ' + i);
              console.log('j: ' + j);
              console.log(
                'newApps[' +
                  i +
                  "].ApplicationID: '" +
                  newApps[i].ApplicationID.trim() +
                  "'"
              );
              console.log(
                'apps.Applications[' +
                  j +
                  "].Id: '" +
                  apps.Applications[j].Id.trim() +
                  "'"
              );
              //console.log("'"+newApps[i].ApplicationID[i].trim()+"' == '"+apps.Applications[j].Id.trim()+"'");
              //console.log(newApps[i].ApplicationID[i].trim() == apps.Applications[j].Id.trim());
              //console.log("Start matchFlag: "+matchFlag);

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
              console.log("Skipped: '" + newApps[i].ApplicationID[0] + "'");
            } else {
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

              newApp = {
                Index: apps.Applications.length.toLocaleString(),
                Id: newApps[i].ApplicationID.trim(),
                Language: newApps[i].Lang.trim(),
                Filename: 'EPISD - Meal Application',
                Selected: 'false',
                Sent: 'false',
                Printed: 'false',
                Guardians: [
                  {
                    Id: newApps[i].ApplicationID.trim(),
                    FirstName: newApps[i].Guardian.trim().split(' ')[0],
                    LastName: newApps[i].Guardian.trim().split(' ')[1],
                    Address: '',
                    City: '',
                    State: '',
                    Zip: '',
                    Phone: '',
                    Email: '',
                  },
                ],
                Students: [
                  {
                    Id: newApps[i].ApplicationID.trim(),
                    FirstName: 'Betty',
                    LastName: 'Buffet',
                    Campus: 100,
                  },
                ],
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
              apps.Applications.push(newApp);
              console.log("Added: '" + newApps[i].ApplicationID.trim() + "'");
            }

            var jsonEnglish = {
              Id: '0',
              HeaderLeft: 'Texas Department of',
              HeaderLeft2: 'Agriculture',
              HeaderRight:
                'Letter | Household Eligibility Notification | Application',
              HeaderDate: 'July 28, 2022',
              Title:
                'Letter to Household, Eligibility Based on Household Meal Application',
              District: 'El Paso Independent School District',
              BodyDate: 'September 25, 2023',
              Salutation: 'Dear Mr./Ms.:',
              Reviewed:
                'We have reviewed your application for free and reduced-price school meals for the following student(s):',
              Status: 'Your application has been:',
              Discussion:
                'If you do not agree with the decision, you may discuss it with Food & Nutrition Services, fns@episd.org 915.230.2160. You also have a right to a fair hearing. To request a fair hearing, call or write the following official within 10 calendar days:',
              Service: 'Food and Nutrition Services',
              Street: '1905 Delta Dr.',
              City: 'El Paso, TX 79905',
              Phone: '915.230.2160',
              Reapply:
                'You may reapply for meal benefits at any time during the school year. If you are not eligible now but have a decrease in household income, become unemployed, have an increase in household size, or qualify for the Supplemental Nutrition Assistance Program (SNAP), Temporary Assistance for Needy Families (TANF) or Federal Distribution Program on Indian Reservations (FDPIR), you may fill out another application at that time.',
              Closing: 'Sincerley,',
              Director:
                'Laura V. Duran, Director of Food and Nutrition Services',
              Gap: 'This institution is an equal opportunity provider.',
              Accordance1:
                'In accordance with federal civil rights law and U.S. Department of Agriculture (USDA) civil rights regulations and policies, this institution is prohibited from discriminating on the basis of race, color, national origin, sex (including gender identity and sexual orientation), disability, age, or reprisal or retaliation for prior civil rights activity. Program information may be made available in languages other than English.',
              Accordance2:
                'Persons with disabilities who require alternative means of communication to obtain program information (e.g., Braille, large print, audiotape, American Sign Language), should contact the responsible state or local agency that administers the program or USDA’s TARGET Center at (202) 720-2600 (voice and TTY) or contact USDA through the Federal Relay Service at (800) 877-8339. To file a program discrimination complaint, a Complainant should complete a Form AD-3027, USDA Program Discrimination Complaint Form which can be obtained online at: ',
              Link1:
                'https://www.usda.gov/sites/default/files/documents/USDA-OASCR%20P-Complaint-Form-0508-0002-508-11-28-17Fax2Mail.pdf',
              Accordance3:
                ', from any USDA office, by calling (866) 632-9992, or by writing a letter addressed to USDA. The letter must contain the complainant’s name, address, telephone number, and a written description of the alleged discriminatory action in sufficient detail to inform the Assistant Secretary for Civil Rights (ASCR) about the nature and date of an alleged civil rights violation. The completed AD-3027 form or letter must be submitted to USDA by: (1) mail: U.S. Department of Agriculture, Office of the Assistant Secretary for Civil Rights, 1400 Independence Avenue, SW, Washington, D.C. 20250-9410; (2) fax: (833) 256-1665 or (202) 690-7442; or (3) email: ',
              Link2: 'program.intake@usda.gov',
              Accordance4:
                '. This institution is an equal opportunity provider.',
            };

            var jsonSpanish = {
              Id: '0',
              HeaderLeft: 'Texas Department of Agriculture',
              HeaderRight:
                'Letter | Household Eligibility Notification | Application',
              HeaderDate: 'July 28, 2022',
              Title:
                'Carta para el hogar, Elegibilidad basada en la solicitud de comidas para la familia',
              District: 'El Distrito Escolar Independiente de El Paso',
              BodyDate: 'Septiembre 25, 2023',
              Salutation: 'Estimado Sr/a:',
              Reviewed:
                'Hemos revisado su solicitud para comida escolar gratis o a precio reducido para el/los siguiente(s) estudiante(s):',
              Status: 'Su solicitud ha sido:',
              Discussion:
                'Si usted no está de acuerdo con la decisión, puede consultarlo con el Departamento de Alimentos de Nutrición y Alimentos, fns@episd.org 915.230.2160. Usted también tiene derecho a una audiencia imparcial. Para solicitar una audiencia imparcial, llame o escriba al siguiente funcionario antes de 10 días hábiles:',
              Service: 'Departamento del Servicio de Nutrición y Alimentos',
              Street: '1905 Delta Dr.',
              City: 'El Paso, TX 79905',
              Phone: '915.230.2160',
              Reapply:
                'Usted puede solicitar de nuevo los beneficios de comida en cualquier momento durante el año escolar. Si usted no es elegible ahora, pero tiene una reducción en sus ingresos familiares, pierde su empleo, aumenta el número de personas que viven en su hogar o califica para el Programa de asistencia nutricional complementaria (SNAP), Programa de asistencia temporaria para las familias necesitadas (TANF) o Programa de distribución de alimentos en reservaciones indígenas (FDPIR), usted puede llenar otra solicitud en ese momento.',
              Closing: 'Atentamente,',
              Director:
                'Laura V. Duran, Directora del Departamento de Alimentos de Nutrición y Alimentos',
              Accordance1:
                'Para todos los demás programas de asistencia de nutrición del FNS, agencias estatales o locales y sus subreceptores, deben publicar la siguiente Declaración de No Discriminación:',
              Accordance2:
                'De acuerdo con la ley federal de derechos civiles y las normas y políticas de derechos civiles del Departamento de Agricultura de los Estados Unidos (USDA), esta entidad está prohibida de discriminar por motivos de raza, color, origen nacional, sexo (incluyendo identidad de género y orientación sexual), discapacidad, edad, o represalia o retorsión por actividades previas de derechos civiles.',
              Accordance3:
                'La información sobre el programa puede estar disponible en otros idiomas que no sean el inglés.  Las personas con discapacidades que requieren medios alternos de comunicación para obtener la información del programa (por ejemplo, Braille, letra grande, cinta de audio, lenguaje de señas americano (ASL), etc.) deben comunicarse con la agencia local o estatal responsable de administrar el programa o con el Centro TARGET del USDA al (202) 720-2600 (voz y TTY) o comuníquese con el USDA a través del Servicio Federal de Retransmisión al (800) 877-8339.',
              Accordance4:
                'Para presentar una queja por discriminación en el programa, el reclamante debe llenar un formulario AD-3027, formulario de queja por discriminación en el programa del USDA, el cual puede obtenerse en línea en:',
              Link: 'https://www.fns.usda.gov/sites/default/files/resource-files/usda-program-discrimination-complaint-form-spanish.pdf',
              Accordance5:
                'de cualquier oficina de USDA, llamando al (866) 632-9992, o escribiendo una carta dirigida a USDA. La carta debe contener el nombre del demandante, la dirección, el número de teléfono y una descripción escrita de la acción discriminatoria alegada con suficiente detalle para informar al Subsecretario de Derechos Civiles (ASCR) sobre la naturaleza y fecha de una presunta violación de derechos civiles. El formulario AD-3027 completado o la carta debe presentarse a USDA por:',
              Mail1: '(1) correo:',
              Mail2: 'U.S. Department of Agriculture',
              Mail3:
                'Office of the Assistant Secretary for Civil Rights 1400 Independence Avenue, SW',
              Mail4: 'Washington, D.C. 20250-9410; or',
              Fax1: '(2) fax:',
              Fax2: '(833) 256-1665 o (202) 690-7442; o',
              Email1: '(3) correo electrónico:',
              Email2: 'program.intake@usda.gov',
              Accordance6:
                'Esta entidad es un proveedor que brinda igualdad de oportunidades.',
            };

            var jsonGuardians = {
              Id: '100001',
              FirstName: 'John',
              LastName: 'Doe',
              Address: '1234 Main St.',
              City: 'El Paso',
              State: 'TX',
              Zip: '79901',
              Phone: '915.111.1111',
              Email: 'mvc57@att.net',
            };

            var jsonStudents = {
              Id: '100002',
              FirstName: 'Rebecca',
              LastName: 'Doe',
              Address: '1234 Main St.',
              City: 'El Paso',
              State: 'TX',
              Zip: '79901',
              Phone: '915.111.1111',
              Email: 'mvc57@att.net',
            };

            var jsonStatus = {
              Checked: 'false',
              Status: 'Approved for free meals.',
              MobileStatus: 'Approved for free meals',
            };

            var jsonReasons = [
              {
                Checked: 'false',
                Reason: 'Income over the allowable amount.',
                MobileReason: 'Income over the allowable amount',
              },
              {
                Checked: 'false',
                Reason:
                  'Incomplete application, please complete the forms attached to provide the needed information.',
                MobileReason: 'Incomplete application',
              },
            ];
            //console.log("appsData: "+JSON.stringify(apps, null, 4))
            fs.writeFile(
              'D:/Projects/EPISD/deploy template/public/applications.json',
              JSON.stringify(apps, null, 4),
              function (err) {}
            );
          }
          console.log('apps: ' + JSON.stringify(apps));
          console.log('newApps count: ' + addedCount);
        });
      });
    }

    function appIndex(req, res, apps, processArray) {
      //console.log("appIndex")
      showApps(req, res, apps, processArray);
    }

    function showApps(req, res, apps, processArray) {
      //var apps = JSON.parse(fs.readFileSync('D:/Projects/EPISD/deploy template/public/applications.json', 'utf8'));
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
      //fs.writeFile('D:/Projects/EPISD/deploy template/public/applications.json', JSON.stringify(apps, null, 4), function (err) {
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

export function testMe() {
  return 'Success!';
}
