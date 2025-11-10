var element = document.createElement('div');
var options = [];
var x = '';

exports.printSelected = async function (
  selectedApps,
  Applications,
  English,
  Spanish
) {
  var selectedAppsArray = selectedApps.split(',');
  var selectChecked = null;
  for (var i = 0; i < selectedAppsArray.length; i++) {
    selectChecked = document.getElementById('chkSelect' + selectedAppsArray[i]);
    var curIndex = selectedAppsArray[i];
    printedCount = 0;
    element = `<!DOCTYPE html>
		<html lang="">
			<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width,initial-scale=1.0">
			<link rel="icon" href="<%= BASE_URL %>favicon.ico">
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
			<script language="javascript" type="text/json" src="./../server.js"></script>
			<script language="javascript" type="text/json" src="./../episd.js"></script>
			<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script>
			<script type="text/json" apps="C:/inetpub/wwwroot/EPISD/applications.json"></script>
		
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
    if (Applications[curIndex].Language == 'English') {
      element +=
        `<div v-if="applications[activeIndex].Language=='English'" id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        English[0].Title +
        `</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        Spanish[0].Title +
        `</div>`;
    }
    element += `</div>
		<br>`;
    if (Applications[curIndex].Language == 'English') {
      element +=
        `<div class="w-full" style="display: inline-flex;margin: auto; justify-content: left">
			<div style="font-style: italic;margin-bottom: 10px" contenteditable="false">` +
        English[0].District +
        `</div>
		</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div class="w-full" style="display: inline-flex;margin: auto; justify-content: left">
		<div style="font-style: italic;margin-bottom: 10px" contenteditable="false">` +
        Spanish[0].District +
        `</div>`;
    }
    element += `</div>`;
    if (Applications[curIndex].Language == 'English') {
      element +=
        `<div class="w-16rem" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">` +
        English[0].BodyDate +
        `</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div class="w-16rem" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">` +
        Spanish[0].BodyDate +
        `</div>`;
    }
    element += `<div class="w-full" style="display: inline-flex;margin: auto; justify-content: left;border: solid black 0px">`;
    if (Applications[curIndex].Language == 'English') {
      element +=
        `<p contenteditable="false">Dear Mr./Ms.: ` +
        Applications[curIndex].Guardians[0].LastName +
        `, ` +
        Applications[curIndex].Guardians[0].FirstName +
        `</p>
		</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<p contenteditable="false">Estimado Sr/a: ` +
        Applications[curIndex].Guardians[0].LastName +
        `, ` +
        Applications[curIndex].Guardians[0].FirstName +
        `</p>
		</div></div>`;
    }
    if (Applications[curIndex].Language == 'English') {
      element +=
        `<div contenteditable="false">` + English[0].Reviewed + `</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div contenteditable="false">` + Spanish[0].Reviewed + `</div>`;
    }

    for (var j = 0; j < Applications[curIndex].Students.length; j++) {
      if (j == 0) {
        element +=
          `<div style="border: solid black 0px;margin-left: 20px">` +
          Applications[curIndex].Students[j].FirstName +
          ` ` +
          Applications[curIndex].Students[j].LastName +
          ` ` +
          Applications[curIndex].Students[j].Campus;
      } else {
        element +=
          `, ` +
          Applications[curIndex].Students[j].FirstName +
          ` ` +
          Applications[curIndex].Students[j].LastName +
          ` ` +
          Applications[curIndex].Students[j].Campus;
      }
    }

    if (Applications[curIndex].Language == 'English') {
      element +=
        `</div><br>
			<div contenteditable="false">` +
        English[0].Status +
        `</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `</div><br>
			<div contenteditable="false">` +
        Spanish[0].Status +
        `</div>
		</div>`;
    }

    var freeChecked = '';
    var reducedChecked = '';
    var deniedChecked = '';
    var reasonChecked = '';
    if (Applications[curIndex].Status[0].Checked == 'true') {
      freeChecked = 'checked';
    }

    if (Applications[curIndex].Status[1].Checked == 'true') {
      reducedChecked = 'checked';
    }

    if (Applications[curIndex].Status[2].Checked == 'true') {
      deniedChecked = 'checked';
      reasonChecked = 'checked';
    }

    element +=
      `				 
			<div style="display: inline-flex;margin: auto;border: solid black 0px;width: 100%">
				<div style="width: 30px"><input id="chkApprovedFree" style="margin-top: 7px" type="checkbox" ` +
      freeChecked +
      `></div><div>` +
      Applications[curIndex].Status[0].Status +
      `</div>						
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">`;
    if (Applications[curIndex].Language == 'English') {
      element +=
        `<div style="width: 30px"><input id="chkApprovedReduced" style="margin-left: 2px;margin-top: 7px" type="checkbox" ` +
        reducedChecked +
        `></div><div style="margin-left: 6px">` +
        Applications[curIndex].Status[1].Status +
        `</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div style="width: 30px"><input id="chkApprovedReduced" style="margin-left: 5px;margin-top: 7px" type="checkbox" ` +
        reducedChecked +
        `></div><div style="margin-left: 10px">` +
        Applications[curIndex].Status[1].Status +
        `</div>`;
    }
    element +=
      `
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
				<div style="width: 30px"><input id="chkDenied" style="margin-top: 7px" type="checkbox" ` +
      deniedChecked +
      `></div><div>` +
      Applications[curIndex].Status[2].Status +
      `</div>
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
				&emsp;&emsp;<div style="width: 30px"><input id="chkDenied" style="margin-top: 7px" type="radio" ` +
      reasonChecked +
      `></div>
				<div>							
					` +
      Applications[curIndex].Reasons[0].Reason +
      `							
				</div>
			</div>
			<div style="display:  inline-flex;margin: auto;border: solid black 0px;width: 100%">
				&emsp;&emsp;<div style="width: 30px"><input id="chkDenied" style="margin-top: 7px" type="radio"></div>
				<div>							
					` +
      Applications[curIndex].Reasons[1].Reason +
      `							
				</div>
			</div>`;

    if (Applications[curIndex].Status[0].Checked == 'true') {
      element += `
			<script> 
			alert("Applications[curIndex].Status[0].Checked=='true'");
			</script>`;
    } else if (Applications[curIndex].Status[1].Checked == 'true') {
      element += '';
    } else if (Applications[curIndex].Status[2].Checked == 'true') {
      element += '';
    }

    element += `</div></div></div>`;
    if (Applications[curIndex].Language == 'English') {
      element +=
        ` 
			<div style="border: solid black 0px;margin-top: 10px"> 
        <div style="margin-left: 0px" contenteditable="false">` +
        English[0].Discussion +
        `</div>           
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        English[0].Service +
        `</div>
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        English[0].Street +
        `</div>
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        English[0].City +
        `</div>
        <div style="margin-left: 0px;font-style: italic" contenteditable="false">&emsp;&emsp;` +
        English[0].Phone +
        `</div>
        <div style="margin-top: 20px" contenteditable="false">` +
        English[0].Reapply +
        `</div>    
        <div style="margin-top: 20px" contenteditable="false">` +
        English[0].Closing +
        `</div>      
        <div style="margin-top: 20px;font-style: italic" contenteditable="false">` +
        English[0].Director +
        `</div><br>`;
      element +=
        `
        <div style="font-size: 14px" class="page-break">` +
        English[0].Accordance1 +
        `</div>
			
			<div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">
			
		</div>
		
    <div id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        English[0].Title +
        `</div>

			<br><div style="font-size: 14px">` +
        English[0].Accordance2 +
        `</div>																		
			<label style="font-size: 13px;font-style: italic;color: blue">` +
        English[0].Link1 +
        `</label>` +
        English[0].Accordance3 +
        `
			<label style="font-size: 13px;font-style: italic;color: blue">` +
        English[0].Link2 +
        `</label>` +
        English[0].Accordance4 +
        `</div>`;
    } else if (Applications[curIndex].Language == 'Spanish') {
      element +=
        `<div style="border: solid black 0px;margin-top: 10px"> 
			<div style="margin-left: 0px" contenteditable="false">` +
        Spanish[0].Discussion +
        `</div>                   
			<div style="margin-left: 0px" contenteditable="false">` +
        Spanish[0].Service +
        `</div>
			<div style="margin-left: 0px" contenteditable="false">` +
        Spanish[0].Street +
        `</div>
			<div style="margin-left: 0px" contenteditable="false">` +
        Spanish[0].City +
        `</div>
			<div style="margin-left: 0px" contenteditable="false">` +
        Spanish[0].Phone +
        `</div>
			<div style="margin-top: 20px" contenteditable="false">` +
        Spanish[0].Reapply +
        `</div>    
			<div style="margin-top: 20px" contenteditable="false">` +
        Spanish[0].Closing +
        `</div>      
			<div style="margin-top: 20px" contenteditable="false">` +
        Spanish[0].Director +
        `</div><br>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600" class="page-break">` +
        Spanish[0].Accordance1 +
        `</div>						
				<div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">
		</div>

    <div id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
			width: 100%;font-weight: 600" contenteditable="true">` +
        Spanish[0].Title +
        `</div>`;

      element +=
        `<br><div style="font-size: 14px">` + Spanish[0].Accordance2 + `</div>`;
      element +=
        `<div style="font-size: 14px">` + Spanish[0].Accordance3 + `</div>`;
      element +=
        `<div style="font-size: 14px">` + Spanish[0].Accordance4 + `</div>`;
      element +=
        `<div style="font-size: 14px;font-style: italic;color: blue">` +
        Spanish[0].Link +
        `</div>`;
      element +=
        `<div style="font-size: 14px">` + Spanish[0].Accordance5 + `</div>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600">` +
        Spanish[0].Mail1 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        Spanish[0].Mail2 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        Spanish[0].Mail3 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        Spanish[0].Mail4 +
        `</div>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600">` +
        Spanish[0].Fax1 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        Spanish[0].Fax2 +
        `</div>`;
      element +=
        `<div style="font-size: 14px;font-weight: 600">` +
        Spanish[0].Email1 +
        `</div>`;
      element +=
        `\t<div style="font-size: 14px">&emsp;&emsp;` +
        Spanish[0].Email2 +
        `</div>`;
      element +=
        `\n<div style="font-size: 14px">` +
        Spanish[0].Accordance6 +
        `</div>																		
			</div>`;
    }
    `
		</div></body>`;

    //if(Applications[curIndex].Selected =='true') {
    printedCount++;
    console.log(
      'Applications[' + i + '].Printed: ' + Applications[curIndex].Printed
    );
    Applications[curIndex].Printed = 'true';
    options = {
      filename:
        Applications[curIndex].Filename +
        '_' +
        Applications[curIndex].Id +
        '_' +
        Applications[curIndex].Guardians[0].LastName +
        '_' +
        Applications[curIndex].Guardians[0].FirstName,
      margin: 0.25,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      putTotalPages: true,
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    //setTimeout(function(){
    await html2pdf().set(options).from(element).save();
  }

  //setTimeout(function(){
  /*
  if (txtSelected.value.toString() != '') {
    //alert("txtSelected.value.toString(): "+txtSelected.value.toString())
    window.location.href('http://localhost:3000/updatePrinted');
    //alert(x.toString());
    //document.getElementById("indexString").innerHTML = x.toString
  } else {
    //alert("Nothing to print")
  }
  //}, 30000);
  */
};
