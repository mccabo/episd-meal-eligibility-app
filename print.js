
var fs = require('fs');
var http = require('http');
const util = require('util');
const path = require('path');

var x=0;

// Create a server that invokes the `api` function upon receiving a request
http.createServer(handler).listen(8100, function (err) {
  if (err) {
    console.log('Error starting http Print Server');
  } else {
    console.log('Print Server running at http://127.0.0.1:8100/ or http://localhost:8100/');
  }
});

// API data modification
function handler(req, res) {
  x++;
  if(x % 2 !== 0) {  
    
    //console.log("req.url: "+req.url);
    var requrl = req.url.split('?')[1];    
    var printType = requrl.split('=')[0];        
    var printString = requrl.split('=')[1];    
    var printArray = printString.split(',');
    console.log("printArray: "+printArray);
    //var apps = JSON.parse(fs.readFileSync('D:/Projects/EPISD/deploy template/public/applications.json', 'utf8'));
    //var config = JSON.parse(fs.readFileSync('D:/EPISD/config.json', 'utf8'));
    //console.log("config: "+JSON.stringify(config));
    //var appsPath = config[0].appsPath;
    //console.log("appsPath: "+appsPath)
    var apps = JSON.parse(fs.readFileSync("applications.json", 'utf8'));
    //console.log("apps: "+apps);

    for(var i=0;i<printArray.length;i++) {
      for(var j=0;j<apps.Applications.length;j++) {
        if(apps.Applications[j].Index == printArray[i]) {
          apps.Applications[j].Selected = "true";
        }
      }
    }        
    
    res.writeHead(200, {'Content-Type': 'text/html'});    
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
        <input type="submit" class="w3-btn w3-green w3-margin" value="Home" onclick="window.location.href = 'http://localhost:8081/'">`
        //if(printType=="printSelected") {
          //htmlString += `<label class="w3-margin" style="color: black">The following letter have been printed: </label>`    
        //} else if(printType=="printSelected") {
          htmlString += `<label class="w3-margin" style="color: black">The following letters have been printed: </label>`    
        //}
      htmlString += `</div>                      
      <div style="border: solid rgb(55, 97, 189) 0px;display: block;margin: auto;width: 88%;height: 1000px;overflow-y: auto;
      justify-content: center;float: auto" class="hidden pdf">`
  
        for(var i=0;i<printArray.length;i++) {
          var pdfIndex = (printArray[i]); //added 1 because letters is in index 0 in json file
          //console.log("pdfIndex: "+pdfIndex);
          var fileName = apps.Applications[pdfIndex].Filename+"_"+apps.Applications[pdfIndex].Id+"_"+apps.Applications[pdfIndex].Guardians[0].LastName+"_"+apps.Applications[pdfIndex].Guardians[0].FirstName+".pdf";             
          var displayFileName = apps.Applications[pdfIndex].Guardians[0].FirstName.toLowerCase()+"."+apps.Applications[pdfIndex].Guardians[0].LastName.toLowerCase()+"@gmail.com";  
          //console.log("apps.Applications[i].Selected: "+apps.Applications[i].Selected);
          if(apps.Applications[i].Selected == "true") {
            htmlString += `<embed src="http://localhost:8080/Eligibility/Letters/`+fileName+`" style="width: 95%;height: 95%;overflow-x: hidden;overflow-y: auto" class="w3-margin"> `                         
          }
        }
  
        htmlString += `</div>                             
      </div>    
    </body>
    </html>`
    
    res.write(htmlString);        
    res.end();
  }
}