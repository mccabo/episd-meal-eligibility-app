// server.js (using Express)
var fs = require('fs');
var http = require('http');
const util = require('util');
const path = require('path');

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

var x = 0;

const express = require('express');
const app = express();
const port = 3000;

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

app.post('/import', (req, res) => {
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
      //console.log('newApps: ' + JSON.stringify(newApps));
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
            newApps[i].ApplicationID.trim() == apps.Applications[j].Id.trim()
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
          freeStatus = newApps[i].Status.trim() == 'Free' ? 'true' : 'false';
          reducedStatus =
            newApps[i].Status.trim() == 'Reduced' ? 'true' : 'false';
          deniedStatus = newApps[i].Status.trim() == 'Paid' ? 'true' : 'false';

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
          Director: 'Laura V. Duran, Director of Food and Nutrition Services',
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
          Accordance4: '. This institution is an equal opportunity provider.',
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
          //'D:/Projects/EPISD/deploy template/public/applications.json',
          appsPath,
          JSON.stringify(apps, null, 4),
          function (err) {}
        );
      }
      //console.log('apps: ' + JSON.stringify(apps));
      console.log('newApps count: ' + addedCount);
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

app.post('/showLetters', (req, res) => {
  console.log(req.body);
  //var apps = JSON.parse(fs.readFileSync(appsPath,, 'utf8'));
  console.log('apps length: ' + apps.Applications.length);
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
  var processArray = '0';
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
