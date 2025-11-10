const { exec } = require('child_process');
const PDFDocument = require('pdfkit');
const wkhtmltopdf = require('wkhtmltopdf');
const doc = new PDFDocument();
// server.js (using Express)
var fs = require('fs');
const fsp = require('fs/promises');
var http = require('http');
const util = require('util');
const path = require('path');
const readline = require('readline');

var emailArray = [];
var x = 0;

var config = JSON.parse(fs.readFileSync('D:/EPISD/config.json', 'utf8'));
var configFilePath = 'D:/EPISD/config.json';
//console.log(config);
var server = config.panels[0].fields[0].value;
var database = config.panels[0].fields[1].value;
var driver = config.panels[0].fields[2].value;
var trustedConnection = config.panels[0].fields[3].value;
var uid = config.panels[0].fields[4].value;
var pwd = config.panels[0].fields[3].value;
var dateTime = new Date().toLocaleString();
var curDate = dateTime.split(',')[0].replace('/', '-').replace('/', '-');
var printToPath = config.panels[2].fields[5].value + '/';
var appsPath = config.panels[6].fields[0].value;

var apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));
console.log('apps len:' + apps.Applications.length);
var letters = JSON.parse(fs.readFileSync('D:/EPISD/letters.json', 'utf8'));

var x = 0;

const express = require('express');
const app = express();
const port = 3000;

var batchnum = '0';

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Middleware to parse URL-encoded bodies (for form data)
//app.use(express.urlencoded({ extended: true }));

const bodyParser = require('body-parser'); // Install with: npm install body-parser

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.post('/default-action', (req, res) => {
  console.log('In default-action server function');
  console.log('req.url: ' + req.url);
});

app.post('/appIndexxxxx', (req, res) => {
  console.log('appIndex');
  showApps(req, res, apps, processArray);
});

app.post('/appIndexxxx', (req, res) => {
  console.log('appIndex');
  console.log('req: ' + req.query.selectedIndexes);
});

app.post('/appIndexbbb', (req, res) => {
  console.log('In appIndex server function');

  var frmData = req.query.frmData;
  console.log('frmData: ' + frmData.split(',')[0]);
  console.log('frmData: ' + frmData.split(',')[1]);
  console.log('frmData: ' + frmData.split(',')[2]);
  console.log('frmData: ' + frmData[0].appid);
  //console.log("frmData: "+JSON.parse(frmData[0]))
});

app.post('/appIndex', (req, res) => {
  console.log('In appIndex server function');
  var frmData = req.query.frmData;
  //console.log('frmData: ' + frmData);
  var appArray = [];
  appArray = frmData.split(',');
  //console.log('appArray len: ' + appArray.length);
  //var apps = JSON.parse(fs.readFileSync(appsPath,, 'utf8'));

  //var appArray = req.query.appArray;
  //console.log('appArray : ' + appArray);

  //appArray = JSON.parse(appArray);
  //console.log('appArray len: ' + JSON.stringify(appArray.length));
  //var appid = appArray[0].appid;
  //console.log('appid: ' + appid);

  //var appid = '';
  //var batchnum = '';
  //var email = '';

  //for(var i=0;i<)
  //console.log('appid: ' + appid);
  //console.log('batchnum: ' + batchnum);
  //console.log('email: ' + email);

  //var appid = apparray[0].appid;
  //var batchnum = apparray[0].batchnum;
  //var email = apparray[0].email;

  //var apparray = JSON.parse(JSON.stringify(apparray));
  //console.log('apparray len: ' + apparray.length);
  //console.log('apparray: ' + apparray);
  //console.log('appIdString len: ' + appIdArray.length);

  //apps.Applications[0].BatchNum = 100;

  //console.log("appsData: "+JSON.stringify(apps, null, 4))
  //fs.writeFile(appsPath, JSON.stringify(apps, null, 4), function (err) {});

  //res.writeHead(200, { 'Content-Type': 'text/html' });
  //res.write(appIdString);
  //res.end();
  //return htmlString;

  var batchnum = '';

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
  var appData = [];
  var appid = '';
  var batchnum = '';
  var email = '';
  console.log('appArray.len: ' + appArray.length);

  for (var i = 0; i < appArray.length; i++) {
    //apps[i].Printed = "true";
    //appData = appArray[i].split('|');
    //for (var j = 0; j < appData.length; j++) {
    //  appid = appData[i].appid;
    //  batchnum = appData[i].batchnum;
    //  email = appData[i].email;
    //}

    appid = appArray[i];

    console.log('appId: ' + appid);

    //console.log("appData.len: "+appData.len);

    //var appid = appArray[i].appid;

    for (var pdfIndex = 0; pdfIndex < apps.Applications.length; pdfIndex++) {
      if (apps.Applications[pdfIndex].Id == appid) {
        console.log('match on : ' + appid);
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
          `</div><div><input type="button" value="Home" class="btn btn-success w3-margin" onclick="window.location.href = 
          'http://localhost:8081'"></div><embed src="http://localhost:3600/Eligibility/Letters/Batch%20` +
          apps.Applications[pdfIndex].BatchNum +
          `/` +
          fileName +
          `#zoom=225" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"></div></body></html>`;
      }
    }
  }

  //console.log('htmlString : ' + htmlString);
  res.write(htmlString);
  res.end();
  //return htmlString;
});

app.post('/showConfigSample', (req, res) => {
  var htmlString = `
    <!DOCTYPE html>
    <html lang="">
      <head>
        <script>
          
          function initializePage() {
            console.log('initializePage');
            const messageElement = document.getElementById('status');
            messageElement.textContent = 'The page has fully loaded and is ready!';

            document.getElementById("myForm").addEventListener("submit", function (e) {
              e.preventDefault();
              getData(e.target);
            });
          }

          function getData(form) {
            var formData = new FormData(form);
            for (var pair of formData.entries()) {
              console.log(pair[0] + ": " + pair[1]);
            }
            console.log(Object.fromEntries(formData));
          }

          if (document.readyState === 'complete') {
            console.log('ready');
            initializePage();
          } else {    
            document.addEventListener('readystatechange', () => {
              if (document.readyState === 'complete') {
                initializePage();
              }
            });
          }
          
        </script>
      </head>
      <body>
        <form id="myForm">  
          <label>Name:<input id="name" name="name" value="John Doe"></label>
          <label>Address:<input id="addr" name="address" value="Street address"></label>
          <div id="status"></div>
          <input type="submit" value="Submit">
        </form>  
      </body>
    </html
    `;

  res.write(htmlString);
  res.end();
});

app.post('/showConfigWorks', (req, res) => {
  console.log('req.url: ' + req.url);
  console.log('In showConfig server functionnnnnn');
  var htmlString = `
  <!DOCTYPE html>
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
        
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>
    
      <title>Config EPISD</title>
      <script> 	
        if (document.readyState === 'complete') {
          console.log('ready');
          initializePage();
        } else {    
          document.addEventListener('readystatechange', () => {
            console.log('ready');
            if (document.readyState === 'complete') {
              initializePage();
            }
          });
        }
        
        function initializePage() {
          console.log('initializePage');
          document.getElementById('myForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const form = event.target;
            //alert("form id: "+form.id);
            const formData = new FormData(form); // Create FormData object from the form

            // Iterate over key-value pairs
            //alert("formData: "+JSON.stringify(formData));
            for (const [key, value] of formData.entries()) {
                console.log('key:', key);
                console.log('value:', value);
            }

            // Get specific values
            //const username = formData.get('username');
            //console.log('Username:', username);
          });
        }

        /*
        function getData(form) {
          var formData = new FormData(form);
          for (var pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }
          console.log(Object.fromEntries(formData));
        }

        if (document.readyState === 'complete') {
          console.log('ready');
          initializePage();
        } else {    
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
              initializePage();
            }
          });
        }
        */      
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
                    <img src="http://localhost:3600/episdlogo.jpg" style="width: 100%">
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
                <div id="status" style="display: flex;margin: auto;justify-content: center;text-align: center"></div>                                        
              </div>
            </nav>              
          </div>                  
        </div> 
        <div class="w3-margin" style="display: flex;justify-content: center;border: solid black 0px;width: 100%;float: auto">             
        <form id="myForm">  
          <label>Name:<input id="name" name="name" value="John Doe"></label>
          <label>Address:<input id="addr" name="address" value="Street address"></label>        
          <label>City:<input id="city" name="city" value="Oceanside"></label>        
            <div style="display: inline-flex;margin: auto;border: solid green 10px">`;
  for (var i = 0; i < config.panels.length; i++) {
    htmlString +=
      `
    <div class="w3-margin" style="border: solid black 3px;width: 300px;padding: 20px;border-radius: 10px">
    <input id="lblPanel` +
      i +
      `" name="lblPanel` +
      i +
      `" value="` +
      config.panels[i].panel +
      `" class="panel" style="margin-left: 0px;font-weight: 600;background-color: white;color: purple;font-size:20px;width: 100%;border: solid black 0px;text-align: center" contenteditable>                                 
    `;
    /*
    for (var j = 0; j < config.panels[i].fields.length; j++) {
      htmlString +=
        `
      <div class="mb-3 mt-3">
        <label id="lblPanel` +
        i +
        j +
        `" onblur="updateConfig(` +
        i +
        ",'" +
        config.panels[i].fields[j].label.toLowerCase() +
        `\')" for="server" style="color: black;font-size: 20px;font-weight: 700" contenteditable>` +
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
    */
    htmlString += `
                </div>`;
  }
  htmlString += `
            <input type="submit" value="Submit">
          </form>   
        </div>
    </body>
  </html>`;
  //console.log(htmlString);
  res.write(htmlString);
  res.end();
});

app.post('/showConfig', (req, res) => {
  console.log('req.url: ' + req.url);
  console.log('In showConfig server function');
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
      
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
      integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
  
    <title>Config EPISD</title>
    <script> 		

      if (document.readyState === 'complete') {
        console.log('ready');
        initializePage();
      } else {    
        document.addEventListener('readystatechange', () => {
          console.log('ready');
          if (document.readyState === 'complete') {
            initializePage();
          }
        });
      }
      
      function initializePage() {
        console.log('initializePage');
        document.getElementById('myForm').addEventListener('submit', function(event) {
          event.preventDefault(); // Prevent default form submission

          const form = event.target;
          const formData = new FormData(form); // Create FormData object from the form          

          var queryString = $('#myForm').serialize();
          myForm.action = "http://localhost:3000/updateConfig?formData="+queryString;
          form.submit();

          // Iterate over key-value pairs
          for (const [key, value] of formData.entries()) {
              console.log('key:', key);
              console.log('value:', value);
          }

          //var queryString = encodeURIComponent($('#myForm').serialize());
          
          console.log("queryString: "+queryString)

          // Get specific values
          //const username = formData.get('username');
          //console.log('Username:', username);
        });
      }

      function getPanelValue() {
        alert("getPanelValue");
      } 

      function updateConfig(i,panel) {
        alert("i: "+i);
        var form =document.getElementById("myForm").addEventListener("submit", function (e) {
        e.preventDefault();

        var formData = new FormData(form);
          // output as an object
          console.log(Object.fromEntries(formData));

          // ...or iterate through the name-value pairs
          for (var pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }
        });
      }

      function updateConfigx(i,panel) {
        //alert("i: "+i);
        //alert("panel: "+panel);
        var formActionPath = "";

        let curPanelLabel = '';
        const elements = document.getElementsByTagName("label");

        elements.forEach((element, index) => {
          // Access the background style property and set a color
          element.style.background = 'lightyellow';          
        });

        for (let i = 0; i < elements.length; i++) {
          //alert(elements[i].id);
          elements[i].style.background = 'lightgreen'; // Modify element style 
          curPanelLabel =elements[i].innerHTML;                                  
        }        
        
        //const myForm = document.getElementById("myForm");
        //myForm.action = "http://localhost:3000/updateConfig?value="+elements;

        // To submit the form
        //myForm.submit();        
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
                    <img src="http://localhost:3600/episdlogo.jpg" style="width: 100%">
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
                <div id="status" style="display: flex;margin: auto;justify-content: center;text-align: center"></div>                                        
              </div>
            </nav>              
          </div>                  
        </div> 
        <div class="w3-margin" style="display: flex;justify-content: center;border: solid black 0px;width: 100%;float: auto">             
          <form id="myForm" action="/default-action" method="POST" style="border: solid black 0px;width: 100%;max-width: none;">
            <div style="display: inline-flex;margin: auto;border: solid green 0px;width: 98%;margin-left: 15px;justify-content: center">`;
  for (var i = 0; i < config.panels.length; i++) {
    htmlString +=
      `
    <div class="" style="border: solid black 3px;width: 600px;padding: 20px;border-radius: 10px;margin: 5px" ` +
      config.panels[i].hidden +
      `>
    <input id="panelLbl` +
      i +
      `" value="` +
      config.panels[i].panel +
      `"  name="panelLbl` +
      i +
      `" class="panel" style="margin-left: 0px;font-weight: 600;background-color: white;color: purple;font-size:20px;width: 100%;border: solid black 0px;text-align: center" contenteditable />      
      <div style="display: flex;margin: auto;justify-content: center">
      <input type="submit" value="Submit" class="btn btn-primary w3-margin" style="width: 100px">         
      <button hidden id="btnUpdate" type="button" class="btn btn-primary w3-margin ` +
      config.panels[i].panel +
      `" style="width: 100px;height: 35px">Update</button>
    </div>   
    `;
    for (var j = 0; j < config.panels[i].fields.length; j++) {
      htmlString +=
        `
      <div style="margin-bottom: 20px">
        <input id="lbl` +
        i +
        j +
        `" name="lbl` +
        i +
        j +
        `" value="` +
        config.panels[i].fields[j].label +
        `" style="display: flex;margin: auto;color: purple;font-size: 20px;font-weight: 700;width: 100%;border: solid black 0px;height: 35px;
          padding-left: 10px;margin-bottom: 5px" contenteditable />
      <input id="fld` +
        i +
        j +
        `" name="fld` +
        i +
        j +
        `" type="` +
        config.panels[i].fields[j].type +
        `" class="` +
        config.panels[i].fields[j].class +
        `" value="` +
        config.panels[i].fields[j].value +
        `" style="color: blue;font-size: 20px;border: solid grey 1px;padding-left: 10px;border-radius: 8px" checked>
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

app.post('/updateSearches', (req, res) => {
  console.log('In updateSearches server function');
  console.log('req.url: ' + req.url);

  fs.writeFile(
    configFilePath,
    JSON.stringify(config, null, 4),
    function (err) {}
  );

  /*
  var value = req.url;

  var configFilePath = 'D:/EPISD/config.json';

  var formdata = value.replace('/updateConfig?formData=', '');
  formdata = formdata
    .split('%5C')
    .join('\\')
    .split('%20')
    .join(' ')
    .split('%40')
    .join('@')
    .split('%3A')
    .join(':')
    .split('%2F')
    .join('/')
    .split('%3D')
    .join('=')
    .replace('%panelLbl0=', '');

  var dataArrray = [];
  var dataArrray = formdata.split('&');

  for (var i = 0; i < config.panels.length; i++) {
    for (var j = 0; j < dataArrray.length; j++) {
      if (dataArrray[j].indexOf('panelLbl' + i) != -1) {
        config.panels[i].panel = dataArrray[j].split('=')[1];
      }
    }
  }

  for (var i = 0; i < config.panels.length; i++) {
    for (var j = 0; j < config.panels[i].fields.length; j++) {
      for (var k = 0; k < dataArrray.length; k++) {
        var id = dataArrray[k]
          .split('=')[0]
          .replace('lbl', '')
          .replace('fld', '');
        var name = dataArrray[k].split('=')[0];
        var val = dataArrray[k].split('=')[1];
        if (id == config.panels[i].fields[j].id) {
          if (name.indexOf('lbl') != -1) {
            config.panels[i].fields[j].label = val;
          } else if (name.indexOf('fld') != -1) {
            config.panels[i].fields[j].value = val;
          }
        }
      }
    }
  }

  directoryPath = config.panels[2].fields[5].value;
  //console.log('directoryPath: ' + directoryPath);
  function createDirectoryIfNotExists(directoryPath) {
    try {
      fsp.mkdir(directoryPath, { recursive: true });
      console.log(`Directory created or already exists: ${directoryPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error}`);
    }
  }

  console.log(': ' + dataArrray[0].split('=')[1]);
  // Example usage:
  createDirectoryIfNotExists(directoryPath);

  fs.writeFile(
    configFilePath,
    JSON.stringify(config, null, 4),
    function (err) {}
  );

  exec('pm2 restart server.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  var htmlString =
    `<!DOCTYPE html>
        <html lang="">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
            <script> 		

                var delayInMilliseconds = 500; //1 second

                setTimeout(function() {
                //your code to be executed after 3 secondS
                window.location.replace("http://localhost:3600");            
                }, delayInMilliseconds);
            </script>
          </head>
          <body>          
            <div class="w3-container">    
            <div class="w3-panel w3-card-2"><p>` +
    'test' +
    `</p></div>
        |
            </div>
            </body>
        </html>`;

  res.send(htmlString);
  res.end();
  */
});

app.post('/updateConfig', (req, res) => {
  console.log('In updateConfig server function');
  var value = req.url;
  var formdata = value.replace('/updateConfig?formData=', '');
  formdata = formdata
    .split('%5C')
    .join('\\')
    .split('%20')
    .join(' ')
    .split('%40')
    .join('@')
    .split('%3A')
    .join(':')
    .split('%2F')
    .join('/')
    .split('%3D')
    .join('=')
    .replace('%panelLbl0=', '');

  var dataArrray = [];
  var dataArrray = formdata.split('&');

  for (var i = 0; i < config.panels.length; i++) {
    for (var j = 0; j < dataArrray.length; j++) {
      if (dataArrray[j].indexOf('panelLbl' + i) != -1) {
        config.panels[i].panel = dataArrray[j].split('=')[1];
      }
    }
  }

  for (var i = 0; i < config.panels.length; i++) {
    for (var j = 0; j < config.panels[i].fields.length; j++) {
      for (var k = 0; k < dataArrray.length; k++) {
        var id = dataArrray[k]
          .split('=')[0]
          .replace('lbl', '')
          .replace('fld', '');
        var name = dataArrray[k].split('=')[0];
        var val = dataArrray[k].split('=')[1];
        if (id == config.panels[i].fields[j].id) {
          if (name.indexOf('lbl') != -1) {
            config.panels[i].fields[j].label = val;
          } else if (name.indexOf('fld') != -1) {
            config.panels[i].fields[j].value = val;
          }
        }
      }
    }
  }

  directoryPath = config.panels[2].fields[5].value;
  //console.log('directoryPath: ' + directoryPath);
  function createDirectoryIfNotExists(directoryPath) {
    try {
      fsp.mkdir(directoryPath, { recursive: true });
      console.log(`Directory created or already exists: ${directoryPath}`);
    } catch (error) {
      console.error(`Error creating directory: ${error}`);
    }
  }

  console.log(': ' + dataArrray[0].split('=')[1]);
  // Example usage:
  createDirectoryIfNotExists(directoryPath);

  fs.writeFile(
    configFilePath,
    JSON.stringify(config, null, 4),
    function (err) {}
  );

  exec('pm2 restart server.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });

  var htmlString =
    `<!DOCTYPE html>
        <html lang="">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
            <script> 		

                var delayInMilliseconds = 500; //1 second

                setTimeout(function() {
                //your code to be executed after 3 secondS
                window.location.replace("http://localhost:3600");            
                }, delayInMilliseconds);
            </script>
          </head>
          <body>          
            <div class="w3-container">    
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
  //console.log('req.url: ' + req.url);
  //console.log('req.url: ' + req.url);

  var appstring = req.query.appString;
  //console.log('appstring: ' + appstring);

  var appArray = appstring.split(',');
  //console.log('appArray[0]: ' + appArray[0]);

  for (var i = 0; i < appArray.length; i++) {
    console.log('appArray[' + i + ']: ' + appArray[i]);
  }

  //var appArray = [];
  //appArray.push()
  //console.log('req.body: ' + JSON.stringify(req.body.inpSelect));
  //var app = req.url;
  //console.log('app: ' + app.split('=')[1]);
  //var appArray = app.split('=')[1];
  //console.log('appArray: ' + appArray[0].appid);

  //console.log('req.body: ' + req.body);
  //console.log('req.body strinfied: ' + JSON.stringify(req.body));
});

app.post('/email', (req, res) => {
  var appstring = req.query.appString;
  //console.log('appstring: ' + appstring);

  var appArray = appstring.split(',');
  //console.log('appArray: ' + appArray);
  //const appId = req.query.appid; // '4'
  //const email = req.query.email; // 'sdfa3'
  //const indexString = req.query.indexString; // 'sdfa3'

  //const appid = req.query.appId; // '4'
  //const email = req.query.email; // '4'
  //const email = req.query.email; // 'sdfa3'

  //console.log('appid: ' + appid);
  //console.log('email: ' + email);

  //console.log('indexString: ' + indexString);
  //var config = JSON.parse(fs.readFileSync('C:/EPISD/config.json', 'utf8'));
  //console.log("config: "+JSON.stringify(config));
  var apps = JSON.parse(fs.readFileSync(appsPath, 'utf8'));

  //var indexArray = appid.split(',');
  //console.log("config.appsPath: "+config.appsPath);
  // console.log('indexArray len: ' + indexArray.length);
  //console.log('indexArray: ' + indexArray[0]);

  var appid = '';
  var email = '';
  var pdfIndex = '';
  //console.log('appArray.length: ' + appArray.length);
  for (var i = 0; i < appArray.length; i++) {
    //console.log('appArray[' + i + ']: ' + appArray[i]);
    appid = appArray[i].split(':')[0];
    email = appArray[i].split(':')[1].trim();
    //console.log('appId: ' + appid);
    //console.log('email: ' + email);
    //console.log('appArray[' + i + ']: ' + appArray[i]);
    for (var j = 0; j < apps.Applications.length; j++) {
      if (appid == apps.Applications[j].Id) {
        console.log('i: ' + i);
        pdfIndex = j; //added 1 because letters is in index 0 in json file
        //console.log('Email: pdfIndex: ' + pdfIndex);

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
        var transporter = nodemailer.createTransport({
          host: host,
          port: port,
          secure: secure,
          auth: {
            user: user,
            pass: pwd,
          },
        });

        //console.log('2: pdfIndex: ' + pdfIndex);
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
        console.log('Email fileName: ' + fileName);
        //var guardianName = apps[i].Guardians[0].FirstName + " " + apps[i].Guardians[].LastName;
        var language = apps.Applications[pdfIndex].Language;
        var batchnum = apps.Applications[pdfIndex].BatchNum;
        console.log('batchnum: ' + batchnum);
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
                path: pdfPath + '/Batch ' + batchnum + '/' + fileName,
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

          var delayInMilliseconds = 0; //5 second

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
                path: pdfPath + '/Batch ' + batchnum + '/' + fileName,
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
    }
  }

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
                  onclick="window.location.href = 'http://localhost:3600/'"> 
                <input type="button" style="font-size: 30px;height: 75px;width: 250px" value="Back" class="btn btn-success w3-margin" 
                  onclick="history.back()">             
                <div class="w3-container" style="display: inline-flex;margin: auto;flex-wrap: wrap;width: 100%">`);

  for (var i = 0; i < appArray.length; i++) {
    //console.log('appArray[' + i + ']: ' + appArray[i]);
    appid = appArray[i].split(':')[0];
    email = appArray[i].split(':')[1].trim();
    //console.log('appId: ' + appid);
    //console.log('email: ' + email);
    //console.log('appArray[' + i + ']: ' + appArray[i]);
    for (var j = 0; j < apps.Applications.length; j++) {
      if (appid == apps.Applications[j].Id) {
        //var pdfindex = ((indexArray[i]*1)+1); //added 1 because letters is in index 0 in json file
        //res.write("<embed src='http://localhost:8080/Eligibility/Letters/"+apps[pdfindex].Filename+"#zoom=225' style='width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto;margin-bottom: 10px'>");
        res.write(
          `                   
                <div class="w3-card-4 w3-margin" style="width:18%">
                  <header class="w3-container" style="color: #0a58ca">
                    <h1>` +
            apps.Applications[j].Id +
            `</h1>
                  </header>
                  <div class="w3-container">
                    <h1 style="color: purple;font-size: 32px">` +
            apps.Applications[j].Guardians[0].LastName +
            ', ' +
            apps.Applications[j].Guardians[0].FirstName +
            `</h1>      
                  </div>
                  <footer class="w3-container" style="color: #0a58ca">
                    <h1 style="margin-top: 2px">` +
            apps.Applications[j].Guardians[0].Email +
            `</h1>
                  </footer>  
                </div> 
              `
        );
      }
      //console.log("appsData: "+JSON.stringify(apps, null, 4))
      fs.writeFile(appsPath, JSON.stringify(apps, null, 4), function (err) {});
    }
  }

  res.write(`
                </div>
              </body>
            </html>`);
  res.end();
});

app.post('/printbyId', (req, res) => {
  console.log('printbyId');
  console.log('apps len: ' + apps.length);

  var fileName = '';
  var dest = '';
  //wkhtmltopdf --enable-local-file-access input.html output.pdf
  wkhtmltopdf.command = 'C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'; // For Windows

  const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>My PDF Document</title>
            <style>  
            .flex-container {
              display: flex;
              width: 300px;
              height: 100px;
              border: 2px solid black;
              margin: 10px;
            }

            .flex-container > div {
              width: 50px;
              height: 50px;
              background-color: lightblue;
              border: 1px solid darkblue;
              display: flex;
              justify-content: left;
              align-items: left;
            }

            .row-example {
              flex-direction: row; /* Default behavior, items laid out horizontally */
            }
             
            </style>
        </head>
        <body>
            <div class="flex-container row-example">
              <div>1</div>
              <div>2</div>
              <div>3</div>
            </div>                       
        </body>
        </html>
    `;

  var appstring = req.query.appString;
  console.log('appstring: ' + appstring);

  var appArray = appstring.split(',');
  //console.log('appArray[0]: ' + appArray[0]);

  //console.log('appArray.length: ' + appArray.length);

  for (var i = 0; i < appArray.length; i++) {
    //console.log('appArray[' + i + ']: ' + appArray[i]);
    var appId = appArray[i].split(':')[0];
    var email = '';
    console.log('appId: ' + appId);
    //console.log('appArray[' + i + ']: ' + appArray[i]);
    for (var j = 0; j < apps.Applications.length; j++) {
      //console.log('apps.Applications[j].Id: ' + apps.Applications[j].Id);
      //console.log('appId: ' + appId);
      if (apps.Applications[j].Id == appId) {
        console.log('Match found');

        batchnum = apps.Applications[j].BatchNum;
        email = apps.Applications[j].Guardians[0].Email;

        console.log('email:' + email);
        console.log('Batch : ' + apps.Applications[j].BatchNum);

        var curIndex = j;
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
            `<div v-if="applications[activeIndex].Language=='English'" id="divTitle2" style="display: flex;margin: auto;justify-content: center;text-align: center
              ;border: solid black 0px;width: 100%;font-weight: 600" contenteditable="true">` +
            letters.English[0].Title +
            `</div>`;
        } else if (apps.Applications[curIndex].Language == 'Spanish') {
          element +=
            `<div id="divTitle2" style="display: flex;margin: auto; justify-content: center;justify-content: center;text-align: center
              ;border: solid black 0px;
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

        for (var k = 0; k < apps.Applications[curIndex].Students.length; k++) {
          if (k == 0) {
            element +=
              `<div style="border: solid black 0px;margin-left: 20px">` +
              apps.Applications[curIndex].Students[k].FirstName +
              ` ` +
              apps.Applications[curIndex].Students[k].LastName +
              ` ` +
              apps.Applications[curIndex].Students[k].Campus;
          } else {
            element +=
              `, ` +
              apps.Applications[curIndex].Students[k].FirstName +
              ` ` +
              apps.Applications[curIndex].Students[k].LastName +
              ` ` +
              apps.Applications[curIndex].Students[k].Campus;
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
          <div class="flex-container" style="display: flex;margin: auto;border: solid black 0px;width: 100%;flex-wrap: nowrap;flex-direction: row">
            <div style="width: 100%;border: solid black 0px"><input id="chkApprovedFree" style="margin-left: 10px;margin-top: 7px" type="checkbox" ` +
          freeChecked +
          `>  ` +
          apps.Applications[curIndex].Status[0].Status +
          `</div>						
          </div>
          <div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">`;
        if (apps.Applications[curIndex].Language == 'English') {
          element +=
            `<div style="width: 100%x"><input id="chkApprovedReduced" style="margin-left: 10px;margin-top: 7px" type="checkbox" ` +
            reducedChecked +
            `>  ` +
            apps.Applications[curIndex].Status[1].Status +
            `</div>`;
        } else if (apps.Applications[curIndex].Language == 'Spanish') {
          element +=
            `<div style="width: 100%"><input id="chkApprovedReduced" style="margin-left: 10px;margin-top: 7px" type="checkbox" ` +
            reducedChecked +
            `>  ` +
            apps.Applications[curIndex].Status[1].Status +
            `</div>`;
        }
        element +=
          `
          </div>
          <div style="display: inline-flex;margin: auto;border: solid black 0px;width: 100%">
            <div style="width: 100%"><input id="chkDenied" style="margin-left: 10px;margin-top: 7px" type="checkbox" ` +
          deniedChecked +
          `>  ` +
          apps.Applications[curIndex].Status[2].Status +
          `</div>
          </div>
          <div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
            <div style="width: 100%"><input id="chkDenied" style="margin-left: 25px;margin-top: 7px" type="radio" ` +
          reasonChecked +
          `>  ` +
          apps.Applications[curIndex].Reasons[0].Reason +
          `							
            </div>
          </div>
          <div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
            <div style="width: 100%"><input id="chkDenied" style="margin-left: 25px;margin-top: 7px" type="radio">							
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

        fileName =
          apps.Applications[curIndex].Filename +
          '_' +
          apps.Applications[curIndex].Id +
          '_' +
          apps.Applications[curIndex].Guardians[0].LastName +
          '_' +
          apps.Applications[curIndex].Guardians[0].FirstName +
          '.pdf';

        //var src = 'C:/Users/' + userName + '/Downloads/' + fileName;

        dest = printToPath + 'Batch ' + batchnum + '/' + fileName;
        console.log('dest: ' + dest);

        console.log('printToPath:' + printToPath);

        var batchDirPath = printToPath + '/Batch ' + batchnum;

        function createDirectoryIfNotExists(batchDirPath) {
          try {
            fsp.mkdir(batchDirPath, { recursive: true });
            console.log(`Directory created or already exists: ${batchDirPath}`);
          } catch (error) {
            console.error(`Error creating directory: ${error}`);
          }
        }

        // Example usage:
        createDirectoryIfNotExists(batchDirPath);

        //console.log(element);

        wkhtmltopdf(element, { output: dest }, (err) => {
          if (err) {
            console.error('Error generating PDF:', err);
          } else {
            console.log('PDF generated successfully');
          }
        });
      }
    }
  }

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
            newApps[i].ApplicationID.trim() == apps.Applications[j].Id.trim()
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
                window.location.replace("http://localhost:3600");            
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

      /*
      if (fs.existsSync(src)) {
        //console.log('The file: '+ src +' exists');

        fs.copyFile(src, dest, (err) => {
          if (err) throw err;
        });
      } else {
        console.log('The file: ' + src + ' does not exist');
      }
      */

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
        `</div><div><input type="button" value="Home" class="btn btn-success w3-margin" onclick="window.location.href = 'http://localhost:3600'"></div><embed src="http://localhost:8083/` +
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
  console.log('In showLetters server function');
  //console.log(req.body);
  //var apps = JSON.parse(fs.readFileSync(appsPath,, 'utf8'));
  console.log('apps length: ' + apps.Applications.length);

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
  var processArray = '9';
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
      `</div><div><input type="button" value="Home" class="btn btn-success w3-margin" onclick="window.location.href = 'http://localhost:3600'"></div><embed src="http://localhost:3600/` +
      fileName +
      `#zoom=225" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `;
    //}
  }
  `</div></body> 
        `;

  res.write(htmlString);
  res.end();
  return htmlString;
});

app.listen(port, () => {
  console.log(`Print Server listening at http://localhost:${port}`);
});
