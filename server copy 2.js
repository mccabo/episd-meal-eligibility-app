const PDFDocument = require('pdfkit');
const wkhtmltopdf = require('wkhtmltopdf');
const doc = new PDFDocument();
// server.js (using Express)
var fs = require('fs');
var http = require('http');
const util = require('util');
const path = require('path');
const readline = require('readline');

var emailArray = [];
var x = 0;

var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
var server = config.panels[0].fields[0].value;
var database = config.panels[0].fields[1].value;
var driver = config.panels[0].fields[2].value;
var trustedConnection = config.panels[0].fields[3].value;
var uid = config.panels[0].fields[4].value;
var pwd = config.panels[0].fields[3].value;
var printToPath = config.panels[2].fields[5].value;
var appsPath = config.panels[6].fields[0].value;

var apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));

console.log('id: ' + JSON.stringify(apps.Applications[0].Language));

var letters = JSON.parse(fs.readFileSync('C:/EPISD/letters.json', 'utf8'));

console.log('letters English Id: ' + JSON.stringify(letters.English[0].Id));

var x = 0;

const express = require('express');
const app = express();
const port = 3000;

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

app.post('/submit_data', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Process the data (e.g., save to a database, perform validation)
  console.log('Received username:', username);
  console.log('Received password:', password);

  // Send a response back to the client
  //res.send('Received username: ' + username);

  var htmlString =
    `<!DOCTYPE html>
        <html lang="">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
            <script> 		

                var delayInMilliseconds = 5000; //5 second

                setTimeout(function() {
                //your code to be executed after 1 second
                window.location.replace("http://localhost:8081");            
                }, delayInMilliseconds);
            </script>
          </head>
          <body>          
            <div class="w3-container">    
            <div class="w3-panel w3-card"><p>` +
    username +
    `</p></div>
            <div class="w3-panel w3-card-2"><p>` +
    password +
    `</p></div>
        |
            </div>
            </body>
        </html>`;

  res.send(htmlString);
  res.end();
});

app.post('/showConfig', (req, res) => {
  console.log('showConfig');
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
});

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

app.post('/print', (req, res) => {
  console.log('print');

  //wkhtmltopdf --enable-local-file-access input.html output.pdf
  wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'; // For Windows

  const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My PDF Document</title>
            <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: #333; }
                p { font-size: 14px; }
            </style>
        </head>
        <body>
            <div style="display: flex;margin: auto;justify-content: center;width: 100%;border: solid black 1px;text-align: center">Hello from Node.js!</div>
            <p>This is some HTML content converted to PDF using wkhtmltopdf.</p>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </body>
        </html>
    `;

  for (var i = 0; i < 1; i++) {
    var curIndex = i;
    printedCount = 0;
    element = `<!DOCTYPE html>
		<html lang="">
			<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width,initial-scale=1.0">			
			<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
			<title><%= htmlWebpackPlugin.options.title %></title>
		
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
		
			<script
				src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
				integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
				crossorigin="anonymous"
				referrerpolicy="no-referrer"
			></script>
		
			<title>PrimeVue App</title>
			<script> 
				//function searchApps() {
				//alert("Search Apps");
				//}
			</script>
			<style>
				.page-break  { 
					display: block; 
					page-break-after: always; 
				}
				
				.fullpage {
					height: 11in;
					background-color: fuchsia;
					border: 1px solid black;
				}
			</style>
			</head>
			<body style="background-color: #ffffff;border: solid black 0px;overflow-y: auto;font-size: 12px">
		<div id="divEligibility" class="eligibility app" style="margin-top: 0px">
		<div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">`;
    `<div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">`;
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `<div v-if="applications[activeIndex].Language=='English'" id="divTitle2" style="display: flex;margin: auto; justify-content: center;text-align: center
          ;border: solid black 0px;width: 100%;font-weight: 600" contenteditable="true">` +
        letters.English[0].Title +
        `</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        letters.Spanish[0].Title +
        `</div>`;
    }
    element += `</div>
		<br>`;
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `<div class="w-full" style="display: inline-flex;margin: auto; justify-content: left">
			<div style="font-style: italic;margin-bottom: 10px" contenteditable="false">` +
        letters.English[0].District +
        `</div>
		</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div class="w-full" style="display: inline-flex;margin: auto; justify-content: left">
		<div style="font-style: italic;margin-bottom: 10px" contenteditable="false">` +
        letters.Spanish[0].District +
        `</div>`;
    }
    element += `</div>`;
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `<div class="w-16rem" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">` +
        letters.English[0].BodyDate +
        `</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div class="w-16rem" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">` +
        letters.Spanish[0].BodyDate +
        `</div>`;
    }
    element += `<div class="w-full" style="display: inline-flex;margin: auto; justify-content: left;border: solid black 0px">`;
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `<p contenteditable="false">Dear Mr./Ms.: ` +
        apps.Applications[curIndex].Guardians[0].LastName +
        `, ` +
        apps.Applications[curIndex].Guardians[0].FirstName +
        `</p>
		</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<p contenteditable="false">Estimado Sr/a: ` +
        apps.Applications[curIndex].Guardians[0].LastName +
        `, ` +
        apps.Applications[curIndex].Guardians[0].FirstName +
        `</p>
		</div></div>`;
    }
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `<div contenteditable="false">` +
        letters.English[0].Reviewed +
        `</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div contenteditable="false">` +
        letters.Spanish[0].Reviewed +
        `</div>`;
    }

    for (var j = 0; j < apps.Applications[curIndex].Students.length; j++) {
      if (j == 0) {
        element +=
          `<div style="border: solid black 0px;margin-left: 20px">` +
          apps.Applications[curIndex].Students[j].FirstName +
          ` ` +
          apps.Applications[curIndex].Students[j].LastName +
          ` ` +
          apps.Applications[curIndex].Students[j].Campus;
      } else {
        element +=
          `, ` +
          apps.Applications[curIndex].Students[j].FirstName +
          ` ` +
          apps.Applications[curIndex].Students[j].LastName +
          ` ` +
          apps.Applications[curIndex].Students[j].Campus;
      }
    }

    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `</div><br>
			<div contenteditable="false">` +
        letters.English[0].Status +
        `</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `</div><br>
			<div contenteditable="false">` +
        letters.Spanish[0].Status +
        `</div>
		</div>`;
    }

    var freeChecked = '';
    var reducedChecked = '';
    var deniedChecked = '';
    var reasonChecked = '';
    if (apps.Applications[curIndex].Status[0].Checked == 'true') {
      freeChecked = 'checked';
    }

    if (apps.Applications[curIndex].Status[1].Checked == 'true') {
      reducedChecked = 'checked';
    }

    if (apps.Applications[curIndex].Status[2].Checked == 'true') {
      deniedChecked = 'checked';
      reasonChecked = 'checked';
    }

    element +=
      `				 
			<div style="display: inline-flex;margin: auto;border: solid black 0px;width: 100%">
				<div style="width: 30px"><input id="chkApprovedFree" style="margin-top: 7px" type="checkbox" ` +
      freeChecked +
      `></div><div>` +
      apps.Applications[curIndex].Status[0].Status +
      `</div>						
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">`;
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        `<div style="width: 30px"><input id="chkApprovedReduced" style="margin-left: 2px;margin-top: 7px" type="checkbox" ` +
        reducedChecked +
        `></div><div style="margin-left: 6px">` +
        apps.Applications[curIndex].Status[1].Status +
        `</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div style="width: 30px"><input id="chkApprovedReduced" style="margin-left: 5px;margin-top: 7px" type="checkbox" ` +
        reducedChecked +
        `></div><div style="margin-left: 10px">` +
        apps.Applications[curIndex].Status[1].Status +
        `</div>`;
    }
    element +=
      `
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
				<div style="width: 30px"><input id="chkDenied" style="margin-top: 7px" type="checkbox" ` +
      deniedChecked +
      `></div><div>` +
      apps.Applications[curIndex].Status[2].Status +
      `</div>
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
				&emsp;&emsp;<div style="width: 30px"><input id="chkDenied" style="margin-top: 7px" type="radio" ` +
      reasonChecked +
      `></div>
				<div>							
					` +
      apps.Applications[curIndex].Reasons[0].Reason +
      `							
				</div>
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
				&emsp;&emsp;<div style="width: 30px"><input id="chkDenied" style="margin-top: 7px" type="radio"></div>
				<div>							
					` +
      apps.Applications[curIndex].Reasons[1].Reason +
      `							
				</div>
			</div>`;

    if (apps.Applications[curIndex].Status[0].Checked == 'true') {
      element += `
			<script> 
			alert("apps.Applications[curIndex].Status[0].Checked=='true'");
			</script>`;
    } else if (apps.Applications[curIndex].Status[1].Checked == 'true') {
      element += '';
    } else if (apps.Applications[curIndex].Status[2].Checked == 'true') {
      element += '';
    }

    element += `</div></div></div>`;
    if (apps.Applications[curIndex].Language == 'English') {
      element +=
        ` 
			<div style="border: solid black 0px;margin-top: 10px"> 
        <div style="margin-left: 0px" contenteditable="false">` +
        letters.English[0].Discussion +
        `</div>           
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        letters.English[0].Service +
        `</div>
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        letters.English[0].Street +
        `</div>
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        letters.English[0].City +
        `</div>
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        letters.English[0].Phone +
        `</div>
        <div style="margin-top: 20px" contenteditable="false">` +
        letters.English[0].Reapply +
        `</div>    
        <div style="margin-top: 20px" contenteditable="false">` +
        letters.English[0].Closing +
        `</div>      
        <div style="margin-top: 20px;font-style: italic" contenteditable="false">` +
        letters.English[0].Director +
        `</div><br>`;
      element +=
        `
        <div style="font-size: 14px" class="page-break">` +
        letters.English[0].Accordance1 +
        `</div>
			
			<div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">
			
		</div>
		
    <div id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        letters.English[0].Title +
        `</div>

			<br><div style="font-size: 14px">` +
        letters.English[0].Accordance2 +
        `</div>																		
			<label style="font-size: 13px;font-style: italic;color: blue">` +
        letters.English[0].Link1 +
        `</label>` +
        letters.English[0].Accordance3 +
        `
			<label style="font-size: 13px;font-style: italic;color: blue">` +
        letters.English[0].Link2 +
        `</label>` +
        letters.English[0].Accordance4 +
        `</div>`;
    } else if (apps.Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div style="border: solid black 0px;margin-top: 10px"> 
			<div style="margin-left: 0px" contenteditable="false">` +
        letters.Spanish[0].Discussion +
        `</div>                   
			<div style="margin-left: 0px" contenteditable="false">` +
        letters.Spanish[0].Service +
        `</div>
			<div style="margin-left: 0px" contenteditable="false">` +
        letters.Spanish[0].Street +
        `</div>
			<div style="margin-left: 0px" contenteditable="false">` +
        letters.Spanish[0].City +
        `</div>
			<div style="margin-left: 0px" contenteditable="false">` +
        letters.Spanish[0].Phone +
        `</div>
			<div style="margin-top: 20px" contenteditable="false">` +
        letters.Spanish[0].Reapply +
        `</div>    
			<div style="margin-top: 20px" contenteditable="false">` +
        letters.Spanish[0].Closing +
        `</div>      
			<div style="margin-top: 20px" contenteditable="false">` +
        letters.Spanish[0].Director +
        `</div><br>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600" class="page-break">` +
        letters.Spanish[0].Accordance1 +
        `</div>						
				<div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">
		</div>

    <div id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        letters.Spanish[0].Title +
        `</div>`;

      element +=
        `<br><div style="font-size: 14px">` +
        letters.Spanish[0].Accordance2 +
        `</div>`;
      element +=
        `<div style="font-size: 14px">` +
        letters.Spanish[0].Accordance3 +
        `</div>`;
      element +=
        `<div style="font-size: 14px">` +
        letters.Spanish[0].Accordance4 +
        `</div>`;
      element +=
        `<div style="font-size: 14px;font-style: italic;color: blue">` +
        letters.Spanish[0].Link +
        `</div>`;
      element +=
        `<div style="font-size: 14px">` +
        letters.Spanish[0].Accordance5 +
        `</div>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600">` +
        letters.Spanish[0].Mail1 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        letters.Spanish[0].Mail2 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        letters.Spanish[0].Mail3 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        letters.Spanish[0].Mail4 +
        `</div>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600">` +
        letters.Spanish[0].Fax1 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        letters.Spanish[0].Fax2 +
        `</div>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600">` +
        letters.Spanish[0].Email1 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        letters.Spanish[0].Email2 +
        `</div>`;
      element +=
        `\n<div style="font-size: 14px">` +
        letters.Spanish[0].Accordance6 +
        `</div>																		
			</div>`;
    }
    `
		</div></body>`;

    //if(apps.Applications[curIndex].Selected =='true') {
    /*
    printedCount++;
    console.log(
      'apps.Applications[' +
        i +
        '].Printed: ' +
        apps.Applications[curIndex].Printed
    );
    
    apps.Applications[curIndex].Printed = 'true';
    options = {
      filename:
        apps.Applications[curIndex].Filename +
        '_' +
        apps.Applications[curIndex].Id +
        '_' +
        apps.Applications[curIndex].Guardians[0].LastName +
        '_' +
        apps.Applications[curIndex].Guardians[0].FirstName,
      margin: 0.25,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      putTotalPages: true,
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    */
    //setTimeout(function(){
  }

  wkhtmltopdf(
    element,
    { output: 'c:/EPISD/Eligibility/Letters/output.pdf' },
    (err) => {
      if (err) {
        console.error('Error generating PDF:', err);
      } else {
        console.log('PDF generated successfully: output.pdf');
      }
    }
  );

  // You can also pipe the output to a write stream
  // wkhtmltopdf(htmlContent).pipe(fs.createWriteStream('output_stream.pdf'));

  /*
  doc.pipe(fs.createWriteStream('c:/EPISD/Eligibility/Letters/Test.pdf')); // write to PDF
  // Add initial content to the document

  doc.text(element);
  doc.addPage();
  doc.text('Second page content.');
  doc.addPage();
  doc.text('Third page content.');

  // After adding all pages, switch back to add page numbers
  const pages = doc.bufferedPageRange(); // Get info on all buffered pages
  for (let i = 0; i < pages.count - 1; i++) {
    doc.switchToPage(i);
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; // Set bottom margin to 0 for footer
    doc.text(
      `Page ${i + 1} of ${pages.count}`,
      0,
      doc.page.height - oldBottomMargin,
      { align: 'center' }
    );
    doc.page.margins.bottom = oldBottomMargin; // Restore original margin
  }

  // add stuff to PDF here using methods described below...

  // finalize the PDF and end the stream
  doc.end();
  */
});

app.post('/import', (req, res) => {
  processLineByLine('emails.csv');

  //console.log('email length: ' + emailArray.length);

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
            apps.apps.Applications[j].Id.trim()
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
          freeStatus = newApps[i].Status.trim() == 'Free' ? 'true' : 'false';
          reducedStatus =
            newApps[i].Status.trim() == 'Reduced' ? 'true' : 'false';
          deniedStatus = newApps[i].Status.trim() == 'Paid' ? 'true' : 'false';

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
              curEmail = emailArray[x].split(',')[1];
              curBatchNum = emailArray[x].split(',')[4];
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

  var htmlString =
    `<!DOCTYPE html>
        <html lang="">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
            <script> 		

                var delayInMilliseconds = 5000; //5 second

                setTimeout(function() {
                //your code to be executed after 1 second
                window.location.replace("http://localhost:8081");            
                }, delayInMilliseconds);
            </script>
          </head>
          <body>          
            <div class="w3-container">    
            <div class="w3-panel w3-card"><p>` +
    'Mario' +
    `</p></div>
            <div class="w3-panel w3-card-2"><p>` +
    'test' +
    `</p></div>
        |
            </div>
            </body>
        </html>`;

  res.send(htmlString);
  res.end();
});

app.post('/updatePrinted', (req, res) => {
  //var requrl = req.url.split('?')[1];
  //var displayType = requrl.split('=')[0];
  //console.log('1: processArray: ' + processArray);
  var displayString = requrl.split('=')[1];
  var displayArray = processArray;
  console.log(apps.Applications.length);

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
      apps.apps.Applications[pdfIndex].Printed = 'true';

      //console.log(
      //  'apps: ' + JSON.stringify(apps.apps.Applications[pdfIndex], null, 4)
      //);

      console.log('pdfIndex: ' + pdfIndex);
      fileName =
        apps.apps.Applications[pdfIndex].Filename +
        '_' +
        apps.apps.Applications[pdfIndex].Id +
        '_' +
        apps.apps.Applications[pdfIndex].Guardians[0].LastName +
        '_' +
        apps.apps.Applications[pdfIndex].Guardians[0].FirstName +
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

  console.log('Updated APPS: ' + JSON.stringify(apps, null, 4));

  fs.writeFile(appsPath, JSON.stringify(apps, null, 4), function (err) {});

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
      apps.apps.Applications[index].Printed = 'true';
      //console.log("apps.apps.Applications[0].Filename: "+apps.apps.Applications[0].Filename);
      var fileName =
        apps.apps.Applications[index].Filename +
        '_' +
        apps.apps.Applications[index].Id +
        '_' +
        apps.apps.Applications[index].Guardians[0].LastName +
        '_' +
        apps.apps.Applications[index].Guardians[0].FirstName +
        '.pdf';
      //if(apps.apps.Applications[index].Selected == "true") {
      //html2pdf().set(options).from(element).save()
      //htmlString += `<embed src="http://localhost:8080/Eligibility/Letters/`+apps.apps.Applications[i].Filename+"_"+apps.apps.Applications[i].Id+"_"+apps.apps.Applications[i].Guardians[0].LastName+"_"+apps.apps.Applications[i].Guardians[0].FirstName+".pdf"+`" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `
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

    fs.writeFile(appsPath, JSON.stringify(apps, null, 4), function (err) {});
    res.write(htmlString);
    res.end();
  }, 3000);
  //return htmlString;
});

app.post('/showLetters', (req, res) => {
  console.log(req.body);
  //var apps = JSON.parse(fs.readFileSync(appsPath,, 'utf8'));
  console.log('apps length: ' + apps.Applications.length);
  for (var i = 0; i < apps.Applications.length - 1; i++) {
    var index = i;
    //console.log("index: "+index);
    //apps.apps.Applications[index].Printed = "true";
    /*
    console.log("http://localhost:8080/Eligibility/Letters/`+apps.apps.Applications[i].Filename: "+"http://localhost:8080/Eligibility/Letters/"+apps.apps.Applications[i].Filename);
    if(apps.apps.Applications[i].Selected == "true") {          
      htmlString += `<embed src="http://localhost:8080/Eligibility/Letters/`+apps.apps.Applications[i].Filename+`" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `                         
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
  var processArray = '0';
  for (var i = 0; i < processArray.length; i++) {
    //apps[i].Printed = "true";
    var pdfIndex = processArray[i];
    var fileName =
      apps.apps.Applications[pdfIndex].Filename +
      '_' +
      apps.apps.Applications[pdfIndex].Id +
      '_' +
      apps.apps.Applications[pdfIndex].Guardians[0].LastName +
      '_' +
      apps.apps.Applications[pdfIndex].Guardians[0].FirstName +
      '.pdf';
    //if(apps.apps.Applications[i].Printed == "true") {
    htmlString +=
      `</div><div><input type="button" value="Home" class="btn btn-success w3-margin" onclick="window.location.href = 'http://localhost:8081'"></div><embed src="http://localhost:3600/` +
      fileName +
      `#zoom=225" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `;
    //}
  }
  `</div></body> 
        `;

  res.write(htmlString);
  res.end();
  //return htmlString;
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
