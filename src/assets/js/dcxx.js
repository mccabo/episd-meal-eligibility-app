	var localData = 1;

	/**********************************************************************************************************************************
	1. ready
		a. set cache to false for ajaxSetup
		b. if locaStorage is null then create from external data
	***********************************************************************************************************************************/
	var clearColor = "white";
	var invalidColor = "#ffe1e6";
	var valLabel = "";
	var valField = "";
	var isFocus = false;
	var rowCount = -1;
	var secCount = -1;
		
	function newForm()
	{
		$("#divStart").hide();		
		$("#divMain").append('<div class="w3-row" style="width:1200px"><div id="divMenu" class="w3-quarter w3-container w3-white"></div><div id="divForm" class="w3-threequarter w3-container w3-white"></div></div>');
		
		$("#divMenu").append('<form id="menuForm" class="form-inline w3-center w3-margin"></form>');
			//$("#menuForm").append('<div id="divRemoveLogo" class="w3-center w3-margin"><input type="button" id="btnRemoveLogo" style="width:200px" class="w3-button w3-blue w3-border" value="Remove Logo"></div>');
			$("#menuForm").append('<div id="divAddLogo" class="w3-center w3-margin"><input type="file" id="fileUpload" style="width:250px" class="w3-button w3-blue w3-border" value="Add Logo"></div>');
			$("#menuForm").append('<div id="divHeader" class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnHeader" value="Add Header"></div>');			
			$("#menuForm").append('<div id="divTitle" class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnTitle" value="Add Title"></div>');	
			$("#menuForm").append('<div id="divInstructions" class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnInstructions" value="Add Instructions"></div>');			
			$("#menuForm").append('<div id="divSections" class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnAddSection" value="Add Section"></div>');						
			$("#menuForm").append('<div id="divSections" class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnAddField" value="Add Field"></div>');						
			$("#menuForm").append('<div class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnFooter" value="Add Footer"></input></div>');
			$("#menuForm").append('<div class="w3-center w3-margin"><input type="button" style="width:250px" class="w3-button w3-blue w3-border" id="btnSubmit" value="Add Submit"></input></div>');		
			
		$("#divForm").append('<form id="mainForm" class="form-inline w3-center w3-margin" style="width:850px;display:block;border: 1px solid black;"></form>');
		//$("#mainForm").append('<input type="button" class="w3-btn w3-green w3-margin" id="btnSub" style="width:100px;margin-bottom:25px" value="Submit"></input></td>');		
		//var btnLogo = document.getElementById("btnLogo");
		
		// When the user clicks the button, open the modal
		//btnLogo.onclick = function() 
		//{
			//$("#mainForm").append('<input type="file" id="fileUpload">');							 			
			var logoResponse = "<div id='divFormLogo' class='w3-center w3-margin'><img id='imgLogo' width='200px' style='display:none' /></div>";
			$("#mainForm").append(logoResponse);
			$("#fileUpload").change(function () {
				var filePath;			
				filePath=$('#fileUpload').val().split("\\")[2];
				var fullPath = "http://localhost/dc/Images/" + filePath;
				//alert("fullPath = '" + fullPath + "'");					
				
				$("#divFormLogo").empty();
				$("#divFormLogo").append("<img id='imgLogo' src='" + "http://localhost/dc/Images/" + filePath + "' width='200px' />");				
			});		
		
			//var logoResponse = "<div class='w3-center w3-margin'><img id='imgLogo' src='" + "http://localhost/dc/Images/ddc.png" + "' width='200px' /></div>";
							 
		//}

		//var faxheaderDate = "<div class='w3-margin'><b><input id='lblDate' type='text' value='Date:' style='border:0px;text-align:center'></input><b></div>";
		
		var btnFaxHeader = document.getElementById("btnFaxHeader");
		// When the user clicks the button, open the modal
		
		btnHeader.onclick = function() 
		{
			rowCount++;
			$("#mainForm").append("<div id='divRow" + rowCount + "' class='w3-row'></div>");
			var faxheaderResponse = "<input id='lblfh1r1' value='Label:' style='border:0px;text-align:right;width:150px'></input>";
			faxheaderResponse += "<input id='txtfh1r1' value='Data' style='border:0px;text-align:left;width:200'></input>";
			//faxheaderResponse += "<input id='lblfh2r1' value='Label:' style='border:0px;text-align:right;width:150px'></input>";
			//faxheaderResponse += "<input id='txtfh2r1' value='Data' style='border:0px;text-align:left;width:200'></input>";			
			
			$("#divRow" + rowCount).append(faxheaderResponse);
		}			

		var btnTitle = document.getElementById("btnTitle");
		
		btnTitle.onclick = function() 
		{
			getTitleProperties("mainForm","Form Title");
		}
		
		btnInstructions.onclick = function() 
		{
			$("#mainForm").append("<div id='divInstructions" + secCount + "' class='w3-margin' contenteditable>Enter Instructions</div>");			
		}
		
		btnFooter.onclick = function() 
		{
			$("#mainForm").append("<div id='divFooter" + secCount + "' class='w3-margin' contenteditable>Enter Footer Information</div>");			
		}
		
		btnSubmit.onclick = function() 
		{
			$("#mainForm").append("<input type='button' class='w3-btn w3-orange' id='btnSubmit' style='width:100px;margin-bottom:25px' value='Submit' onclick='submitData()' ></input></td>");			
		}
		
		btnAddField.onclick = function() 
		{
			$("#divSection" + secCount + "Body").append("<div class='w3-left form-group' style='margin-left:10px;padding:5px'><label id='lblFSF' name='LSF' class='w3-left w3-text-black' contenteditable style='margin-top:15px;margin-right:10px;text-align:right' for='" + "label" + "'>" + "label" + "</label><input id='chkFSF" + secCount + "' type='checkbox' class='w3-left w3-check' checked='checked' style='margin-bottom:10px'/><input class='w3-border w3-input type='text' size='1px' name='FSF' id='txtFSF'/></div>");
		}
		
		var btnAddSection = document.getElementById("btnAddSection");
		
		btnAddSection.onclick = function() 
		{
			//addSection("A","indADepAFrmASecA","Section Title");
			secCount++;
			$("#mainForm").append("<div id='divSection" + secCount + "'></div>");			
			$("#divSection" + secCount).append("<div class='w3-blue' contenteditable>Section " + secCount + "</div>");
			$("#divSection" + secCount).append("<div class='w3-row w3-yellow' id='divSection" + secCount + "Body'></div>");			
			//$("#divSection" + secCount + "Body").append("<div class='form-group' style='margin-left:10px;padding:5px'><label id='lblFSF' name='LSF' class='w3-left w3-text-black' contenteditable style='width:50px;text-align:right;margin:5px' for='" + "label" + "' onblur='onBlur()' onfocus='onFocus()' onmousedown='onFocus()' onclick='getProperties(\"" + "subfldId" + "\",\"" + this.id + "\",\"" + "subfld" + "\")'>" + "label" + "</label><input id='chkFSF" + secCount + "' type='checkbox' class='w3-left w3-check' checked='checked' /><input onblur='onBlur()' onfocus='onFocus()' onmousedown='onFocus()' onclick='getProperties(\"" + "subfldId" + "\",\"" + this.id + "\",\"" + "subfld" + "\")' class='w3-input w3-border' placeholder='" + "label" + "' pattern='\d{1,5}' maxlength='15' size='15' type='text' name='FSF' id='txtFSF'/></div>");
			$("#divSection" + secCount + "Body").append("<div class='w3-left form-group' style='margin-left:10px;padding:5px'><label id='lblFSF' name='LSF' class='w3-left w3-text-black' contenteditable style='margin-top:15px;margin-right:10px;text-align:right' for='" + "label" + "'>" + "label" + "</label><input id='chkFSF" + secCount + "' type='checkbox' class='w3-left w3-check' checked='checked' style='margin-bottom:10px'/><input class='w3-border w3-input type='text' size='1px' name='FSF' id='txtFSF'/></div>");			
		}		
	}
	
	function submitData()
	{
		// When the user clicks the button, open the modal
		

		alert("submitData");
		var key = "123456789";
		//json = {"SSN":document.getElementById("SSN").value,"FirstName":document.getElementById("FirstName").value,"Initial":document.getElementById("Initial").value,"LastName":document.getElementById("LastName").value,"EmailAddress":document.getElementById("EmailAddress").value}
		json = {"SSN":123456789,"FirstName":document.getElementsByName("FSFFirst Name: ")[0].value,"Initial":document.getElementsByName("FSFInitial: ")[0].value,"LastName":document.getElementsByName("FSFLast Name: ")[0].value,"EmailAddress":document.getElementsByName("FSFEmail Address: ")[0].value,"Phone":document.getElementsByName("FSFPhone: ")[0].value,"Fax":document.getElementsByName("FSFFax: ")[0].value}
		alert("json = " + json);
		alert("FirstName = " + document.getElementsByName("FSFFirst Name: ")[0].value);
		
		var inputfields = document.getElementsByName("FSFFirst Name: ");
		var ar_inputflds = inputfields.length;
		//alert(inputfields[1].value);
		localStorage.setItem(key, JSON.stringify(json));

		var retrievedObject = localStorage.getItem('123456789');
		data = JSON.parse(retrievedObject);
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		if(dd<10) {
			dd = '0'+dd
		} 

		if(mm<10) {
			mm = '0'+mm
		} 

		today = mm + '/' + dd + '/' + yyyy;
		//document.write(today);
		//alert("First Name = " + document.getElementsByName("FSFFirst Name: ").value);
		var headerResponse = "<div class='w3-center w3-margin'><img id='imgLogo' style='margin:10px;width:200px' src='" + "http://qcddev.com/wb/Images/qcd.jpg" + "' /></div><div class='w3-margin'><b>Date: " + today + "</div></b><table class='w3-table-all' style='width:100%'><tr><td style='text-align:right;width:8%'><b>To:</b></td><td width:25%>" + data.FirstName + " " + data.Initial + " " + data.LastName + "</td><td style='text-align:right'><b>From:</b></td><td>" + "Choice Administrators" + "</td></tr><tr><td style='text-align:right'><b>Fax:</b></td><td>" + data.Fax + "</td><td style='text-align:right'><b>Fax:</b></td><td>" + "714-558-8000" + "</td></tr><tr><td style='text-align:right'><b>Phone:</b></td><td>" + data.Phone + "</td><td style='text-align:right'><b>Phone:</b></td><td>" + "800-869-8969" + "</td></tr><tr><td style='text-align:right'><b>eMail:</b></td><td>" + data.EmailAddress + "</td><td style='text-align:right'><b>eMail:</b></td><td>" + "mvc57@att.net" + "</td></tr><tr><td style='text-align:right'><b>Group:</b></td><td>" + "Group Therapy" + "</td><td style='text-align:right'><b>Group #:</b></td><td>" + "12345" + "</td></tr></table><br><p style='margin-left:20px'>California<em>Choice</em> has received a request for <b>Ivana Tinkle</b>.</p><br><p style='margin-left:20px'>In order to process your request, the following information must be received:</p><br>";
		//document.getElementById("pThankyou").innerHTML = "Dear " + data.FirstName + ",<br><br>";
		document.getElementById("pThankyou").innerHTML = headerResponse;

		//document.getElementById("pThankyou").innerHTML += "The following cofiguration settings have been defined for your QCD Form development environment:<br><br>";
		
		/*document.getElementById("pThankyou").innerHTML += "<input type='button' class='' type='button' style='margin-bottom:5px;text-align:" + data.textalign + ";width:" + data.btnwidth + "px;height:" + data.btnheight + "px;color:" + data.btntextcolor + ";background-color:" + data.btncolor + "' value='" + data.industries[0].industry + "'></input><br>";
		document.getElementById("pThankyou").innerHTML += "<input type='button' class='' type='button' style='margin-bottom:5px;text-align:" + data.textalign + ";width:" + data.btnwidth + "px;height:" + data.btnheight + "px;color:" + data.btntextcolor + ";background-color:" + data.btncolor + "' value='" + data.industries[1].industry + "'></input><br>";
		document.getElementById("pThankyou").innerHTML += "<input type='button' class='' type='button' style='margin-bottom:5px;text-align:" + data.textalign + ";width:" + data.btnwidth + "px;height:" + data.btnheight + "px;color:" + data.btntextcolor + ";background-color:" + data.btncolor + "' value='" + data.industries[2].industry + "'></input><br>";
		document.getElementById("pThankyou").innerHTML += "<input type='button' class='' type='button' style='margin-bottom:5px;text-align:" + data.textalign + ";width:" + data.btnwidth + "px;height:" + data.btnheight + "px;color:" + data.btntextcolor + ";background-color:" + data.btncolor + "' value='" + data.industries[3].industry + "'></input><br>";
		document.getElementById("pThankyou").innerHTML += "<input type='button' class='' type='button' style='margin-bottom:5px;text-align:" + data.textalign + ";width:" + data.btnwidth + "px;height:" + data.btnheight + "px;color:" + data.btntextcolor + ";background-color:" + data.btncolor + "' value='" + data.industries[4].industry + "'></input><br><br><br>";			
		*/
		
		//document.getElementById("pThankyou").innerHTML += "We may also contact you at " + document.getElementById("Phone").value + " or at " +  document.getElementById("Cell").value + "." ;
		
		//var elements = document.getElementsByTagName("input")
		//for (var i = 0; i < elements.length; i++) {
				//alert(elements[i].name);
		//}
		
		modal.style.display = "block";				
	}
	
	$(document).ready(function()
	{			
		//alert("Starting");
		//set cache to false for ajaxSetup
		$.ajaxSetup({ cache: false });
		
		//append divLocal by adding radio buttons for dc and td and initialize checking dc		
		$("#divLocal").append("<div id='crdRadios' class='w3-card-4' style='width:275px;padding-left:5px;padding-bottom:5px'>");
			$("#crdRadios").append("<table><tr><td width='100'><input id='radDC' name='radType' type='radio' onclick='loadData(1)' class='w3-radio' style='margin-right:5px' checked>W&B</input></td><td><input id='radTD' name='radType' onclick='loadData(1)' type='radio' class='w3-radio' style='margin-right:5px'>Transportation</input></td></tr>");
			//append divLocal by adding radio buttons for local and external  and initialize checking local 
			$("#crdRadios").append("<tr><td width='100'><input id='radLocal' name='radData' type='radio' onclick='loadData(1)' class='w3-radio' style='margin-right:5px' checked>Local</input></td><td><input id='radExternal' name='radData' type='radio' onclick='loadData(0)' class='w3-radio' style='margin-right:5px' >External</input></td></tr></table>");
		$("#divLocal").append("</div>");
		//copy external dc data to localstorage if it does not already exist
		var retrievedObjectDC = localStorage.getItem('dc');		
		if(retrievedObjectDC == null)
		{
			//copy json data from external dc json file to localStorage and call it dc
			$.getJSON("ajax/dc.json", function(json){
				localStorage.setItem('dc', JSON.stringify(json));
			});
		}

		//copy extrnal td data to localstorage if it does not already exist
		var retrievedObjectTD = localStorage.getItem('td');
		if(retrievedObjectTD  == null)
		{					
			//copy json data from external td json file to localStorage and call it td
			$.getJSON("Ajax/td.json", function(json){
				localStorage.setItem('td', JSON.stringify(json));
			});
		}					
		
		//set buttoncolor in td on click of btnColor
		//alert(document.getElementById("clrBtnColor").value);
		document.getElementById("clrBtnColor").addEventListener("click", function() 
		{
			//setBtnColor();
		});
		
		
		//set sectioncolor in td on click of secColor
		document.getElementById("clrSecColor").addEventListener("click", function() 
		{
			//setSecColor();
		});		
		
		// Get the modal
		var modal = document.getElementById('myModal');

		// Get the button that opens the modal
		var btn = document.getElementById("btnSubmit2");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];

		

		// When the user clicks on <span> (x), close the modal
		span.onclick = function() {
			modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		//get data from localstorage
		loadData(1);		
	});
	
	function loadData(local)
	{
		
		//alert("local = " + local);
		localData = local;
		//clear divMain
		$("#divMain").empty();
		//set async to false
		jQuery.ajaxSetup({async:false});

		var data = [];

		//set datasource 
		if(localData == 0)
		{
			var radDC = document.getElementById("radDC");
			var radTD = document.getElementById("radTD");
						
			var url = "";
			
			if(radDC.checked == true)
			{				
				url = "ajax/dc.json";
			}
			else if(radTD.checked == true)
			{
				url = "ajax/td.json";
			}
			
			$.ajax(
			{				
			  url: url,				
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else if(localData == 1)
		{
			var radDC = document.getElementById("radDC");
			var radTD = document.getElementById("radTD");
						
			if(radDC.checked == true)
			{				
				var retrievedObject = localStorage.getItem('dc');
								
			}
			else if(radTD.checked == true)
			{
				var retrievedObject = localStorage.getItem('td');
			}
						
			data = JSON.parse(retrievedObject);					
			//alert(data.button[0].text[0].color);
		}
		
		//alert(data.button[0].text[0].font[0].family);
		
		var color = document.getElementById("clrBtnColor");
		var bgcolor = document.getElementById("clrBtnBGColor");			
		color.value = data.button[0].text[0].color;			
		bgcolor.value = data.button[0].backgroundcolor;				

		//set variables from data
		var btnColor = color.value; //text Color		
		var btnBGColor = bgcolor.value;	//bg Color	
		
		var btnheight = data.button[0].height;		
		
		var redW;
		var indML = 0;
		var indW = data.button[0].width;
		var indBGC = btnColor;

		var depML = 15;
		var depW = indW-15;
		var depBGC = btnColor;

		var frmML = 30;
		var frmW = depW-15;
		var frmBGC = btnColor;

		var secML = 5;
		var secW = frmW-15;
		var secBGC = "white";

		var fldML = 5;
		var fldW = secW-15;
		var fldBGC = "white";

		var subfldML = -8;
		var subfldW = fldW-15;
		var subfldBGC = "white";

		var fieldStr = "";
		var subfieldStr = "";
				
		//add a button to scroll to form
		$("#divMain").append('<input id="ShowForm" type="button" style="margin-top:0px" onclick="back()" class="w3-margin w3-white" value="Show Form" hidden></input><br>');			                      
		
		//loop through industries
		for(var i=0;i<data.industries.length;i++)
		{
			//get industry id and name value 
			var indId = data.industries[i].id;
			var ind = data.industries[i].industry;
						
			//add an accordian button for each of the industries
			
			//if(indId.indexOf("indF") == 0)
			//{
			//	$("#divMain").append("<input id='btn" + indId + "' type='button' onclick='accordian(\"" + indId + "\")' class='ind w3-btn' style='color:" + btnColor + ";background-color:" + "#666666" + ";height:" + btnheight + "px;text-align:left;width:" + indW + "px;margin-left:" + indML + "px;margin-bottom:5px' value='" + data.industries[i].industry + "'</input><br>");
			//	//$("#divMain").append("<input id='txtMSF" + indId + "' name='MI" + ind + "' type='text' class='sub w3-btn w3-" + indBGC + "' onclick='newForm()' style='border:0;text-align:left;width:" + indW + "px;margin-left:" + indML + "px;margin-bottom:2px' value='" + ind + "' ></input><br>");
			//}
			//else
			//{
				$("#divMain").append("<input id='btn" + indId + "' type='button' onclick='accordian(\"" + indId + "\")' class='ind w3-btn' style='color:" + btnColor + ";background-color:" + btnBGColor + ";height:" + btnheight + "px;text-align:left;width:" + indW + "px;margin-left:" + indML + "px;margin-bottom:5px' value='" + data.industries[i].industry + "'</input><br>");				
			//}
			
			$("#divMain").append("<div id='div" + indId + "' class='w3-accordion-content '></div>");			
			
			//loop through departments
			for(var j=0;j<data.industries[i].departments.length;j++)
			{
				//get department id and name value 
				var depId = data.industries[i].departments[j].id;
				var dep = data.industries[i].departments[j].department;
				
				//add a department button for each of the departments
				//if(indId.indexOf("indF") == 0)
				//{
				//	$("#div" + indId).append("<input id='btn" + depId + "' type='button' onclick='accordian(\"" + depId + "\")' class='dep w3-btn' style='color:" + btnColor + ";background-color:" + "#666666" + ";height:" + btnheight + "px;text-align:left;width:" + depW + "px;margin-left:" + depML + "px;margin-bottom:5px' value='" + dep + "'></input><br>");					
				//}
				//else
				//{
					$("#div" + indId).append("<input id='btn" + depId + "' type='button' onclick='accordian(\"" + depId + "\")' class='dep w3-btn' style='color:" + btnColor + ";background-color:" + btnBGColor + ";height:" + btnheight + "px;text-align:left;width:" + depW + "px;margin-left:" + depML + "px;margin-bottom:5px' value='" + dep + "'></input><br>");
				//}
				
				$("#div" + indId).append("<div id='div" + depId + "' class='w3-accordion-content '></div>");
				
				//loop through forms
				for(var k=0;k<data.industries[i].departments[j].forms.length;k++)
				{
					//get form id and name value
					var frmId = data.industries[i].departments[j].forms[k].id;
					var frm = data.industries[i].departments[j].forms[k].form;
					
					//add a form button for each of the forms
					//if(indId.indexOf("indF") == 0)
					//{
					//	$("#div" + depId).append("<input id='btn" + frmId + "' type='button' onclick='clickForm(\"" + frmId + "\",\"" + frm + "\")' class='frm w3-btn' style='color:" + btnColor + ";background-color:" + "#666666" + ";height:" + btnheight + "px;text-align:left;width:" + frmW + "px;margin-left:" + frmML + "px;margin-bottom:5px' value='" + frm + "'></input><br>");
					//}
					//else
					//{
						$("#div" + depId).append("<input id='btn" + frmId + "' type='button' onclick='clickForm(\"" + frmId + "\",\"" + frm + "\")' class='frm w3-btn' style='color:" + btnColor + ";background-color:" + btnBGColor + ";height:" + btnheight + "px;text-align:left;width:" + frmW + "px;margin-left:" + frmML + "px;margin-bottom:5px' value='" + frm + "'></input><br>");
					//}
					
					$("#div" + depId).append("<div id='div" + frmId + "' class='w3-accordion-content '></div>");
					
					//add a "Check all Sections" checkbox

					//if(frmId.indexOf("indF") == -1)
					//{
						$("#div" + frmId).append("<input id='chkAllSections' type='checkbox' onclick='checkAllSections(this)' class='sec w3-check' style='margin-left:35px;margin-right:5px'/><b><input class='w3-text-red' id='btnAll" + secId + "' type='text' readonly style='border:0;text-align:left;width:" + secW + "px;margin-left:" + secML + "px;margin-bottom:2px' value='All Sections'></input></b><br>");
					//}

					//loop through sections
					for(var l=0;l<data.industries[i].departments[j].forms[k].sections.length;l++)
					{
						//get section id, name and checked value
						var secId = data.industries[i].departments[j].forms[k].sections[l].id;
						var sec = data.industries[i].departments[j].forms[k].sections[l].section;
						var secchecked = data.industries[i].departments[j].forms[k].sections[l].checked;																														
						
						//add a form button for each of the forms
						if(secId.indexOf("indF") == -1)
						{
							$("#div" + frmId).append("<input id='chkMS" + secId + "' type='checkbox' " + secchecked + " class='sec w3-check' style='margin-left:35px;margin-right:5px' onclick='checkAllSections(this)'/><input id='btn" + secId + "' type='text' readonly onclick='showFormSection(\"" + secId + "\",\"" + sec + "\")' class='dep w3-text w3-" + secBGC + "' style='border:0;text-align:left;width:" + secW + "px;margin-left:" + secML + "px;margin-bottom:2px' value='" + sec + "'></input><br>");
						}
						else
						{
							//$("#div" + frmId).append("<input id='btn" + secId + "' type='text' readonly  onclick='checkAllSections(this) onclick='showFormSection(\"" + secId + "\",\"" + sec + "\")' class='dep w3-button' style='color:white;background-color:#666666;border:0;text-align:left;width:" + secW + "px;margin-left:" + secML + "px;margin-bottom:2px' value='" + sec + "'></input><br>");
							$("#div" + frmId).append("<input id='chkMS" + secId + "' type='checkbox' " + secchecked + " class='sec w3-check' style='margin-left:35px;margin-right:5px' onclick='checkAllSections(this)'/><input id='btn" + secId + "' type='text' readonly onclick='showFormSection(\"" + secId + "\",\"" + sec + "\")' class='dep w3-text w3-" + secBGC + "' style='border:0;text-align:left;width:" + secW + "px;margin-left:" + secML + "px;margin-bottom:2px' value='" + sec + "'></input><br>");
						}
						
						$("#div" + frmId).append("<div id='div" + secId + "' class='w3-accordion-content '></div>");
						
						//add a "Check all Fields" checkbox
						//if(secId.indexOf("indF") == -1)
						//{
							$("#div" + secId).append("<input id='chkAllFields' type='checkbox' onclick='checkAllFields(\"" + secId + "\")' class='sec w3-check' class='w3-check' style='margin-left:60px;margin-right:5px'/><b><input class='w3-white w3-text-red' id='btnAll' type='text' readonly style='width:" + fldW + "px;border:0;text-align:left;margin-left:0px;margin-bottom:2px' value='All Fields'></input></b><br>");
						//}
						
						//loop through fields
						for(var m=0;m<data.industries[i].departments[j].forms[k].sections[l].fields.length;m++)
						{
							//get field id, name and checked value
							var fldId = data.industries[i].departments[j].forms[k].sections[l].fields[m].id;
							var fldchecked = data.industries[i].departments[j].forms[k].sections[l].fields[m].checked;
							//alert("fldchecked = " + fldchecked);
							var fld = data.industries[i].departments[j].forms[k].sections[l].fields[m].field;							
							
							//if(secId.indexOf("indF") == -1)
							//{
							//	$("#div" + secId).append("<input id='chkMF" + fldId + "' type='checkbox' " + fldchecked + " class='w3-check' style='margin-left:60px;margin-right:5px' onclick='addremoveField(\"" + fldId + "," + fld  + "\")'/><input id='btn" + fldId + "' type='text' readonly onclick='accordian(\"" + fldId + "\")' class='fld w3-text w3-" + fldBGC + "' style='border:0;text-align:left;width:" + fldW + "px;margin-left:" + fldML + "px;margin-bottom:2px' value='" + fld + "' ></input><br>");
							//}
							//else
							//{
								$("#div" + secId).append("<input id='chkMF" + fldId + "' type='checkbox' " + fldchecked + " class='w3-check' style='margin-left:60px;margin-right:5px' onclick='addremoveField(\"" + fldId + "," + fld  + "\")'/><input id='btn" + fldId + "' type='text' readonly onclick='accordian(\"" + fldId + "\")' class='fld w3-text w3-" + fldBGC + "' style='border:0;text-align:left;width:" + fldW + "px;margin-left:" + fldML + "px;margin-bottom:2px' value='" + fld + "' ></input><br>");
								//$("#div" + secId).append("<input id='btn" + fldId + "' type='button' readonly onclick='accordian(\"" + fldId + "\")' class='w3-button' style='color:white;background-color:#666666;border:0;text-align:left;width:" + fldW + "px;margin-left:" + fldML + "px;margin-bottom:2px' value='" + fld + "' ></input><br>");
							//}
						
							$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content '></div>");
							
							var subfld = "";
							var subfldId = "";
							var subfldChecked = "checked";
							var subfldReadOnly = "";
							var subfldRequired = "";
							
							//loop through subfields
							var thisID = "chkAllSubFields";
							//if(fldId.indexOf("indF") == -1)
							//{
								//$("#div" + fldId).append("<input id='chkAllSubFields' type='checkbox' onclick='selectAllSubFields()' class='w3-check' style='margin-left:85px;margin-right:5px' onclick='addremoveSubField(\"" + subfldId + "\",\"" + thisID + "\",\"" + subfld + "\",\"" + secId + "\")' /><b><input id='txt" + subfldId + "' type='text' onclick='accordian(\"" + subfldId + "\")' class='sub w3-text-blue w3-" + subfldBGC + "' style='border:0;text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='All SubFields' ></input></b><br>");
							//}
							
							for(var n=0;n<data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields.length;n++)
							{
								subfld = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].subfield;
								subfldId = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].id;
								subfldChecked = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].checked;
								subfldReadOnly = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].readonly;
								subfldRequired = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].required;
								subfldTextColor = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].textcolor;

								var thisID = "chkMSF" + subfldId;								
								/*									
								$("#div" + fldId).append("<input id='chkMSF" + subfldId + "' type='checkbox' " + subfldChecked + " class='w3-check' style='margin-left:85px;margin-right:5px' onclick='addremoveSubField(\"" + subfldId + "\",\"" + thisID + "\",\"" + subfld + "\",\"" + secId + "\")' /><input id='txtMSF" + subfldId + "' name='MSF" + subfld + "' type='text' class='sub w3-btn w3-" + textColor + " w3-" + subfldBGC + "' onblur='onBlur()' onmousedown='onFocus()' onclick='getProperties(\"" + subfldId + "\",\"" + this.id + "\",\"" + subfld + "\")' style='border:0;text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "' ></input><br>");
								*/
								//if(fldId.indexOf("indF") == -1)
								//{
								//	$("#div" + fldId).append("<input id='chkMSF" + subfldId + "' type='checkbox' " + subfldChecked + " class='w3-check' style='margin-left:85px;margin-right:5px' onclick='addremoveSubField(\"" + subfldId + "\",\"" + thisID + "\",\"" + subfld + "\",\"" + secId + "\")' /><input id='txtMSF" + subfldId + "' name='MSF" + subfld + "' type='text' class='sub w3-btn w3-" + subfldBGC + "' onblur='onBlur()' onmousedown='onFocus()' onclick='getProperties(\"" + subfldId + "\",\"" + this.id + "\",\"" + subfld + "\")' style='border:0;text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "' ></input><br>");
								//}
								//else
								//{
									//$("#div" + fldId).append("<input id='txtMSF" + subfldId + "' name='MSF" + subfld + "' type='text' class='sub w3-btn' onblur='onBlur()' onmousedown='onFocus()' onclick='getProperties(\"" + subfldId + "\",\"" + this.id + "\",\"" + subfld + "\")' style='color:white;background-color:#666666;border:0;text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "' ></input><br>");									
									$("#div" + fldId).append("<input id='chkMSF" + subfldId + "' type='checkbox' " + subfldChecked + " class='w3-check' style='margin-left:85px;margin-right:5px' onclick='addremoveSubField(\"" + subfldId + "\",\"" + thisID + "\",\"" + subfld + "\",\"" + secId + "\")' /><input id='txtMSF" + subfldId + "' name='MSF" + subfld + "' type='text' class='sub w3-btn w3-" + subfldBGC + "' onblur='onBlur()' onmousedown='onFocus()' onclick='getProperties(\"" + subfldId + "\",\"" + this.id + "\",\"" + subfld + "\")' style='border:0;text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "' ></input><br>");
								//}
							}
						}
					}
				}
			}
		}
	}
	
	function accordian(id)
	{
		//alert("accordian id = " + id);
		
		var curDiv = "div" + id;
		var curBtn = "btn" + id;

		var indArray;
		var curLevel = "";

		if(id.indexOf("sub") != -1)
		{
			indArray = $(".sub").toArray();
			curLevel = "sub";
		}
		else if(id.indexOf("fld") != -1)
		{
			indArray = $(".fld").toArray();
			curLevel = "fld";
		}
		else if(id.indexOf("sec") != -1)
		{
			indArray = $(".sec").toArray();
			curLevel = "sec";
		}
		else if(id.indexOf("frm") != -1)
		{
			indArray = $(".frm").toArray();
			curLevel = "frm";
		}
		else if(id.indexOf("dep") != -1)
		{
			indArray = $(".dep").toArray();
			curLevel = "dep";
		}
		else if(id.indexOf("ind") != -1)
		{
			indArray = $(".ind").toArray();
			curLevel = "ind";			
			document.getElementById("tblMenuProp").style.display = "none";
		}

		for(var i = 0; i < indArray.length; i++) {
			if(indArray[i].id != curBtn && indArray[i].id.indexOf("sec") == -1)
			{
				//document.getElementById(indArray[i].id).style.visibility = "hidden";
			}
		}

		var x = document.getElementById(curDiv);

		if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
		} else {
			x.className = x.className.replace(" w3-show", "");
		}		
	}
	
	function hexToRgbA(hex){
		var c;
		if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
			c= hex.substring(1).split('');
			if(c.length== 3){
				c= [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c= '0x'+c.join('');
			return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
		}
		throw new Error('Bad Hex');
	}
	
		
	function checkAllSections(cb)
	{
		//alert("checkAllSections cb id = " + cb.id);
		
		//$("#divSections").empty();
				
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}
			
		x = document.getElementById(cb.id);
		
		if(x.checked)
		{
			//alert("Add all Sections");

			var indLength = data.industries.length;
			//alert("ind length =" + indLength);

			var aFlag = 0;
			var bFlag = 0;
			var cFlag = 0;
			var dFlag = 0;
			var eFlag = 0;
			var fFlag = 0;
			
			for(var i=0;i<data.industries.length;i++)
			{
				var indId = data.industries[i].id;
				var ind = data.industries[i].industry;

				//Departments

				var depLength = data.industries[i].departments.length;
				//alert("Industry " + i + " dep length =" + depLength);
				for(var j=0;j<data.industries[i].departments.length;j++)
				{
					var depId = data.industries[i].departments[j].id;
					var dep = data.industries[i].departments[j].department;

					//Forms

					var frmLength = data.industries[i].departments[0].forms.length;
					//alert("ind " + i + " dep " + j + " frm length =" + frmLength);
					var curLet = "";
					for(var k=0;k<data.industries[i].departments[j].forms.length;k++)
					{
						var frmId = data.industries[i].departments[j].forms[k].id;
						var frm = data.industries[i].departments[j].forms[k].form;

						//Sections

						var secLength = data.industries[i].departments[j].forms[k].sections.length;

						//if(i==0 && j==0 && k==0)
						//{
							//alert("ind " + i + " dep " + j + " frm " + k + " sec length = " + secLength);
							var lum = 105;
							for(var l=0;l<secLength;l++)
							{
								var secId = data.industries[i].departments[j].forms[k].sections[l].id;
								var sec = data.industries[i].departments[j].forms[k].sections[l].section;
								
								if(cb.id.indexOf("chkAllSections") == 0)
								{
									//alert("chkAllSections is checked");
									switch(l)
									{
										case 0:
											curLet = "A";
											break;
										case 1:
											curLet = "B";
											break;
										case 2:
											curLet = "C";
											break;
										case 3:
											curLet = "D";
											break;
										case 4:
											curLet = "E";
											break;
										case 5:
											curLet = "F";
											break;
									}
									
									//alert("secId = " + secId);
									//alert("sec = " + sec);
									//alert("curLet = " + curLet);									
									
									//var secColor = document.getElementById("clrSecColor");
									//var secBGColor = document.getElementById("clrSecBGColor");									
									
									//secColor.value = data.sectextcolor;									
									//secBGColor.value = data.seccolor;
																		
									var secColor = data.section[0].text[0].color;		
									var secBGColor = data.section[0].backgroundcolor;		
									
									document.getElementById("clrSecColor").value = secColor;
									document.getElementById("clrSecBGColor").value = secBGColor;		
									
									//alert("curColor = " + curColor);
									
									var rgbaColor = hexToRgbA(secBGColor).toString();
									var rgbaColorArray = rgbaColor.split(',');
									
									//var rgbaColorArr = rgbaColor.split(',');
									
									//alert("rgbaColorArray[0] = " + rgbaColorArray[0]);
									//alert("rgbaColorArray[1] = " + rgbaColorArray[1]);
									//alert("rgbaColorArray[2] = " + rgbaColorArray[2]);
									//alert("rgbaColorArray[3] = " + rgbaColorArray[3]);									
									
									$("#chkMS" + secId).prop( "checked", true );
									lum = lum-15;									
									
									var rgbaCol = rgbaColorArray[0] + "," + rgbaColorArray[1] + "," + rgbaColorArray[2] + ",0." + lum + ")";
									//alert("rgbaCol = " + rgbaCol);									
									
									$("#divSections").append("<div id='divSection" + curLet + "' class='w3-margin' onclick='showFormSection(\"" + secId + "\",\"" + sec + "\")' style='color:" + secColor + ";background-color:" + rgbaCol + ";text-align:left;margin-left:0px;padding:5px;visibility:visibility'></div>");
									$("#divSections").append("<div id='divSection" + curLet + "Body' style='text-align:left;margin-left:10px' class='w3-accordion-content'></div>");									
									showAllSections(secId,sec);								
									addFields(secId);
								}
								else
								{
									//alert("chkAllSections is NOT checked");
									curLet = secId.substr(secId.length-1,1);
									curCBLet = cb.id.substr(cb.id.length-1,1);
									//alert("curLet = " + curLet);
									//alert("curCBLet cb = " + curCBLet);	

									var clrSection = document.getElementById("clrSecBGColor");
									var clrSectionText = document.getElementById("clrSecColor");
									clrSection.value = data.section[0].backgroundcolor;									
									//alert(data.section[0].text[0].color);
									clrSectionText.value = data.section[0].text[0].color;
									
									var secColor = data.section[0].backgroundcolor;
									//alert(secColor);									
									var secTxtColor = data.section[0].text[0].color;
									
									//alert("curColor = " + curColor);
									//alert("sec = " + sec);
									
									var rgbaColor = hexToRgbA(secColor).toString();
									var rgbaColorArray = rgbaColor.split(',');
									
									//var rgbaColorArr = rgbaColor.split(',');
									
									//alert("rgbaColorArray[0] = " + rgbaColorArray[0]);
									//alert("rgbaColorArray[1] = " + rgbaColorArray[1]);
									//alert("rgbaColorArray[2] = " + rgbaColorArray[2]);
									//alert("rgbaColorArray[3] = " + rgbaColorArray[3]);									
																		
									lum = lum-15;									
									
									var rgbaCol = rgbaColorArray[0] + "," + rgbaColorArray[1] + "," + rgbaColorArray[2] + ",0." + lum + ")";
									//alert("rgbaCol = " + rgbaCol);																																			
																		
									if(((curLet == "A" && (curLet == curCBLet)) && aFlag == 0) || ((curLet == "F" && (curLet == curCBLet)) && fFlag == 0))
									{
										$("#divSections").append("<div id='divSection" + curLet + "' class='w3-margin' onclick='showFormSection(\"" + secId + "\",\"" + sec + "\")' style='color:" + secTxtColor + ";background-color:" + rgbaCol + ";text-align:left;margin-left:0px;padding:5px;visibility:visibility'></div>");
										$("#divSections").append("<div id='divSection" + curLet + "Body' style='text-align:left;margin-left:10px' class='w3-accordion-content'></div>");									
										
										//if(curLet != "F")
										//{
										showAllSections(secId,sec);
										//}
										addFields(secId);										
									}	

									switch(l)
									{
										case 0:
											curLet = "A";
											aFlag = 1;
											break;
										case 1:
											curLet = "B";
											bFlag = 1;
											break;
										case 2:
											curLet = "C";
											cFlag = 1;
											break;
										case 3:
											curLet = "D";
											dFlag = 1;
											break;
										case 4:
											curLet = "E";
											eFlag = 1;
											break;
										case 5:
											curLet = "F";
											fFlag = 1;
											break;
									}									
								}
							}
						//}
					}
				}
			}						
			//showForm();
			var tblSections = document.getElementById("tblSections");
			tblSections.style.display = "block";
		}
		else
		{
			alert("Remove all Sections");
			var indLength = data.industries.length;
			//alert("ind length =" + indLength);

			for(var i=0;i<data.industries.length;i++)
			{
				var indId = data.industries[i].id;
				var ind = data.industries[i].industry;

				//Departments

				var depLength = data.industries[0].departments.length;
				//alert("Industry " + i + " dep length =" + depLength);
				for(var j=0;j<data.industries[i].departments.length;j++)
				{
					var depId = data.industries[i].departments[j].id;
					var dep = data.industries[i].departments[j].department;

					//Forms

					var frmLength = data.industries[0].departments[0].forms.length;
					//alert("ind " + i + " dep " + j + " frm length =" + frmLength);
					var curLet = "";
					for(var k=0;k<data.industries[i].departments[j].forms.length;k++)
					{
						var frmId = data.industries[i].departments[j].forms[k].id;
						var frm = data.industries[i].departments[j].forms[k].form;

						//Sections

						var secLength = data.industries[i].departments[j].forms[k].sections.length;

						if(i==0 && j==0 && k==0) //this conditional statement can be removed once the data has more industries, departments, and forms
						{
							//alert("ind " + i + " dep " + j + " frm " + k + " sec length = " + secLength);

							for(var l=0;l<secLength;l++)
							{
								var secId = data.industries[i].departments[j].forms[k].sections[l].id;
								var sec = data.industries[i].departments[j].forms[k].sections[l].section;

								if(cb.id.indexOf("chkAllSections") == 0)
								{
									switch(l)
									{
										case 0:
											$("#divSections").empty();
											curLet = "A";
											break;
										case 1:
											curLet = "B";
											break;
										case 2:
											curLet = "C";
											break;
										case 3:
											curLet = "D";
											break;
										case 4:
											curLet = "E";
											break;
										case 5:
											curLet = "F";
											break;
									}																
									$("#chkMS" + secId).prop( "checked", false );								
									divMenuSec(secId,sec);
								}								
								else
								{	
									curLet = secId.substr(secId.length-1,1);
									curCBLet = cb.id.substr(cb.id.length-1,1)					;
									
									//alert("curLet = " + curLet);
									//alert("curCBLet cb = " + curCBLet);
									
									if(curLet == curCBLet)									
									{
										//alert("Match on " + curCBLet);
										$("#chkMS" + secId).prop( "checked", false );								

										divMenuSec(secId,sec);
										
										//divSections.Children.RemoveAt(1);
										
										document.getElementById("divSection" + curCBLet).remove();
										document.getElementById("divSection" + curCBLet + "Body").remove();
																				
										//$("#divSections").Remove("divSection" + curCBLet + "Body");
									}
								}
							}
						}						
					}
				}
			}				
		}				 		
		//SectionMenu(secId);			
	}
	
	function checkSection(secId,sec)
	{
		//alert("checkSection secId = " + secId + ", and sec = " + sec);
	}
	
	function clickForm(frmId,frm)
	{
		//alert("clickForm frmId = " + frmId + ", and frm = " + frm);	
		
		getHeaderProperties(frmId,frm);
		getTitleProperties(frmId,frm);		
		accordian(frmId); // this opens the correct menu item on the left		
	}	
	
	function getTitleProperties(frmId,frm)
	{
		var id = frmId;
		var title = frm;
		//$("#dcForm").css('display', 'block');
		//$("#divTitle").empty();
		$("#mainForm").append("<input type='text' class='w3-margin' style='border:0px;text-align:center;center;font-size:20px' value='" + title + "'></input>");
	}
	
	function addFields(id)
	{
		//alert("addFields id " + id);			
		
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}

		for(var i=0;i<data.industries.length;i++)
		{
			var frmId = data.industries[i].id;
			var frm = data.industries[i].industry;

			for(var d=0;d<data.industries[i].departments.length;d++)
			{
				var frmId = data.industries[i].departments[d].id;
				var frm = data.industries[i].departments[d].department;
				
				for(var f=0;f<data.industries[i].departments[d].forms.length;f++)
				{
					var frmId = data.industries[i].departments[d].forms[f].id;
					var frm = data.industries[i].departments[d].forms[f].form;

					for(var s=0;s<data.industries[i].departments[d].forms[f].sections.length;s++)
					{
						var secId = data.industries[i].departments[d].forms[f].sections[s].id;
						var sec = data.industries[i].departments[d].forms[f].sections[s].section;
						
						if(secId == id)
						{
							//alert("Match on " + secId);
							for(var t=0;t<data.industries[i].departments[d].forms[f].sections[s].fields.length;t++)
							{
								var fldId = data.industries[i].departments[d].forms[f].sections[s].fields[t].id;
								var fld = data.industries[i].departments[d].forms[f].sections[s].fields[t].field;

								//alert("Field = " + fld)
								//$("#div" + secId).append("<input type='checkbox' class='w3-check' checked style='margin:5px'/><input id='btn" + fldId + "' type='button' onclick='accordian(\"" + fldId + "\")' class='w3-text w3-" + fldBGC + "' style='text-align:left;width:" + fldW + "px;margin-left:" + fldML + "px;margin-bottom:2px' value='" + fld + "'</input><br>");
								//$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content '></div>");

								var mFldCB = document.getElementById("chkMF" + fldId);
								//alert(fldCB.checked);

								//Subfields
								
								//if(secId.indexOf("indZ") == -1 && mFldCB.checked == true)
								//{					
									for(var u=0;u<data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields.length;u++)
									{
										var subfldId = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].id;
										var subfld = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].subfield;
										//alert("SubField = " + subfld)
										//$("#div" + fldId).append("<input type='checkbox' class='w3-check' checked style='margin:5px'/><input id='btn" + subfldId + "' type='text' onclick='accordian(\"" + subfldId + "\")' class='w3-text w3-" + subfldBGC + "' style='text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "'</input><br>");
										//$("#div" + fldId).append("<div class='row' id='div" + subfldId + "' class='w3-accordion-content '></div>");

										label = subfld;
										//alert(label);

										var type = "";
										var size = "100";
										var maxlength = "50";
										var width = "";
										var lblWidth = "100px";

										//alert("secCB = '" + "chkS" + secId + "'");
										var mSecCB = document.getElementById("chkMS" + secId);

										//alert("mSecCB id = " + mSecCB.id);
										//alert(mSecCB.checked);									

										var lbl = label.replace(" ", "").replace("-","").replace("#","").replace("+","").replace(":","").replace(" ","").replace(" ","");
										//alert("'" + lbl + "'");
										if(mSecCB.checked == true)
										{
											checked = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].checked;
											required = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].required;

											key = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].key;
											type = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].type;
											readonly = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].readonly;
											maxlength = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].maxlength;
											size = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].size;
											textcolor = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].textcolor;
											backgroundcolor = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].backgroundcolor;
											fieldlength = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].fieldlength;
											datetype = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].datetype;

											function1 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].function1;
											function2 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].function2;
											function3 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].function3;

											logic1 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].logic1;
											logic2 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].logic2;
											logic3 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].logic3;

											value1 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].value1;
											value2 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].value2;
											value3 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].value3;

											group1 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].group1;
											group2 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].group2;
											group3 = data.industries[i].departments[d].forms[f].sections[s].fields[t].subfields[u].group3;
											
											if(subfld == "Initial:")
											{
												//alert("subfldId = " + subfldId);
												//alert("subfld = " + subfld);							
												//alert("checked = " + checked);
												//alert("required = " + required);
												//alert("textcolor = " + textcolor);
											}
																																				
											var thisID = "chkFSF" + subfldId;
											
											switch(s)
											{
												case 0:
													curLet = "A";
													break;
												case 1:
													curLet = "B";
													break;
												case 2:
													curLet = "C";
													break;
												case 3:
													curLet = "D";
													break;
												case 4:
													curLet = "E";
													break;
												case 5:
													curLet = "F";
													break;
											}
									
											var mSFCB = document.getElementById("chkMSF" + subfldId);
											
											if(mSFCB.checked == true)
											{
												//alert("Adding subfield " + subfld);
												//$("#divSection" + curLet + "Body").append("Test");
												$("#divSection" + curLet + "Body").append("<div class='form-group' style='margin-left:10px;padding:5px'><input id='chkFSF" + subfldId + "' type='checkbox' class='w3-check' checked='checked' onclick='removeSubField(\"" + subfldId + "\",\"" + thisID + "\",\"" + subfld + "\",\"" + secId + "\")' /><label id='lblFSF" + subfldId + "' name='LSF" + subfld + "' class='w3-text-" + textcolor + "' contenteditable style='width:" + lblWidth + "px;text-align:right;margin:5px' for='" + label + "' onblur='onBlur()' onfocus='onFocus()' onmousedown='onFocus()' onclick='getProperties(\"" + subfldId + "\",\"" + this.id + "\",\"" + subfld + "\")'>" + label + "</label><input onblur='onBlur()' onfocus='onFocus()' onmousedown='onFocus()' onclick='getProperties(\"" + subfldId + "\",\"" + this.id + "\",\"" + subfld + "\")' class='w3-input w3-border' placeholder='" + label + "' pattern='\d{1,5}' maxlength='" + maxlength + "' size='" + size + "' type='" + type + "' name='FSF" + subfld + "' id='txtFSF" + subfldId + "'/></div>");												
												//alert("Adding subfield 'FSF" + subfld + "'");
											}
										}
									}
								//}
							}
						}
					}
				}
			}
		};
		//accordian(id);
		//setFields();
	}	
	
	function divMenuSec(secId,sec) //from form
	{
		//alert("divMenuSec secId = " + secId + ", and sec = " + sec);	
		
		//alert(sec);

		var id = secId;
		var curLet = id.substr(15,1);
		var curSection = "divindAdepAfrmAsec" + curLet; //THIS WILL NEED TO BE MODIFIED TO BECOME DYNAMIC FOR ANY INDUSTRY, DEPARTMENT, FORM OR SECTION
		var curSec = sec;		
		
		var y = document.getElementById(curSection);
		if (y.className.indexOf("w3-show") == -1) {
			//alert("Show y");
			//y.className += " w3-show";
		} else {
			//alert("Hide y");
			y.className = y.className.replace(" w3-show", "");
		}		
	}

	function addSection(curLet,secId,sec)
	{
		$("#formMain").append("<div id='divSection" + curLet + "' class='w3-margin' onclick='showFormSection(\"" + secId + "\",\"" + sec + "\")' style='color:" + "black" + ";background-color:" + "green" + ";text-align:left;margin-left:0px;padding:5px'></div>");
		$("#formMain").append("<div id='divSection" + curLet + "Body' style='text-align:left;margin-left:10px' class='w3-accordion-content'></div>");									
		//showAllSections(secId,sec);
		
		$("#divSection" + curLet).append(sec); 
	}
	
	function showAllSections(secId, sec)
	{		
		//alert("showAllSections secId = " + secId + ", and sec = " + sec);
		//window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);	
		var id = secId;
		//alert("showAllSections id = " + id);
		var curDiv = "div" + id;
		var curLet = id.substr(15,1);
		//alert(curDiv);
		//alert(curLet);

		var curChk = "chk" + id;
		//alert(curChk);

		var c = document.getElementById(curChk);
		//$("#" + curChk).prop( "checked", true );
				
		
		var a = document.getElementById("divSection" + curLet);
		a.className = a.className.replace(" w3-show", "");

		var b = document.getElementById("divSection" + curLet);
		b.className = b.className.replace(" w3-show", "");

		var c = document.getElementById("divSection" + curLet + "Body");
		c.className = c.className.replace(" w3-show", "");
		
		//add the Section Title		
		$("#divSection" + curLet).empty(); 
		$("#divSection" + curLet).append(sec); 
		
		//show/hide section in menu
		var x = document.getElementById(curDiv);
		if (x.className.indexOf("w3-show") == -1) {
			//alert("Show x");
			//if(curLet == "A")
			//{
				//x.className += " w3-show";
			//}
		} else {
			//alert("Hide x");
			x.className = x.className.replace(" w3-show", "");
		}

		//show/hide Body of section on form
		var curDivBody = "divSection" + curLet + "Body";
		var y = document.getElementById(curDivBody);
		if (y.className.indexOf("w3-show") == -1) {
			//alert("Show y");
			//if(curLet == "A")
			//{
				//y.className += " w3-show";
			//}
		} else {
			//alert("Hide y");
			y.className = y.className.replace(" w3-show", "");
		}	
		showFormSection(secId, sec);
	}
	
	function showFormSection(secId, sec)
	{		
		alert("showFormSection secId = " + secId + ", and sec = " + sec);
				
		var id = secId;
		//alert("showFormSection id = " + id);
		var curDiv = "div" + id;
		var curLet = id.substr(15,1);
		//alert(curDiv);
		//alert(curLet);				
		
		//var a = document.getElementById("divSection" + curLet);
		//a.className = a.className.replace(" w3-show", "");
		//var b = document.getElementById("divSection" + curLet);
		//b.className = b.className.replace(" w3-show", "");
		//var c = document.getElementById("divSection" + curLet + "Body");
		//c.className = c.className.replace(" w3-show", "");
		
		//add the Section Title		
		$("#divSection" + curLet).empty(); 
		$("#divSection" + curLet).append(sec); 
		
		//show/hide section in menu
		var x = document.getElementById(curDiv);
		if (x.className.indexOf("w3-show") == -1) {
			//alert("Show x");			
			x.className += " w3-show";		
		} else {
			//alert("Hide x");
			x.className = x.className.replace(" w3-show", "");
		}

		//show/hide Body of section on form
		var curDivBody = "divSection" + curLet + "Body";
		var y = document.getElementById(curDivBody);
		if (y.className.indexOf("w3-show") == -1) {
			//alert("Show y");
			var tblSections = document.getElementById("tblSections");
			tblSections.style.display = "none";

			var tblSubFields = document.getElementById("tblSubFields");
			tblSubFields.style.display = "block";
			y.className += " w3-show";
		} else {
			//alert("Hide y");
			var tblSections = document.getElementById("tblSections");
			tblSections.style.display = "block";

			var tblSubFields = document.getElementById("tblSubFields");
			tblSubFields.style.display = "none";
			y.className = y.className.replace(" w3-show", "");
		}		
	}	

	function getHeaderProperties()
	{
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}
		
		//dhcl = data.header.company.logo
		var dhclUrl = data.header[0].company[0].logo[0].url;				
		var dhclAlign = data.header[0].company[0].logo[0].align;				
		var dhclWidth = data.header[0].company[0].logo[0].width;
		var dhclHeight = data.header[0].company[0].logo[0].height;
		
		//dhc = data.header.company
		var dhcName = data.header[0].company[0].name;
		var dhcAlign = data.header[0].company[0].align;
		
		//dhct = data.header.company.text
		var dhctColor = data.header[0].company[0].text[0].color;		
		var dhctBGColor = data.header[0].company[0].text[0].backgroundcolor;
		
		//dhctf = data.header.company.text.font
		var dhctfSize = data.header[0].company[0].text[0].font[0].size;
		var dhctfFamily = data.header[0].company[0].text[0].font[0].family;
		var dhctfStyle = data.header[0].company[0].text[0].font[0].style;
		var dhctfWeight = data.header[0].company[0].text[0].font[0].weight;
		
		//dhca = data.header.company.address
		var dhcaStreet = data.header[0].company[0].address[0].street;
		var dhcaUnit = data.header[0].company[0].address[0].unit;
		var dhcaCity = data.header[0].company[0].address[0].city;
		var dhcaCounty = data.header[0].company[0].address[0].county;
		var dhcaState = data.header[0].company[0].address[0].state;
		var dhcaPhone = data.header[0].company[0].phone[0].business;
		var dhcaFax = data.header[0].company[0].address[0].fax;	

		$("#divHeader").empty();
		$("#divHeader").append("<div id='divLogo' class='w3-margin w3-"+ dhcAlign + "'><img id='imgLogo' style='width:" + dhclWidth + "px;height:'" + dhclHeight + "px' src='" + dhclUrl + "'></img></div>");		
		$("#divHeader").append("<div id='divName' class='w3-margin w3-"+ dhcAlign + "'><input type='text' style='text-align:center;font-size:" + dhctfSize + "px;color:" + dhctColor + ";background-color:'" + dhctBGColor + "' value='" + dhcName + "'></input></div>");				
	}
	
	function getProperties(id,field,subfield)
	{	
		//alert("getProperties id = " + id + ", and field = " + field + ", and subfield = " + subfield);
		
		//alert("getProperties");
		//alert("id = " + id);
		//alert("field = " + field);
		//alert("subfield = " + subfield);
				
		//document.getElementById("tblSubFields").scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
		
		var subfld = subfield;
		//alert("1: subfld = " + subfld);
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				dc = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			dc = JSON.parse(retrievedObject);
		}
		
		document.getElementById("lblCurField").innerHTML = "<b>Subfield: </b>";
		document.getElementById("lblCurField").innerHTML += "<font color='blue'><b>" + subfield.replace(":","") + "</b></font color>";				
		
		//alert(dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields.length);		
		for (var i = 0; i < dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields.length; i++) {
			
			//alert("2: subfld = '" + subfld + "'");
			//alert("3: dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].subfield = '" + dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].subfield + "'");
			
			if(id === dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].id)
			{  	
				//alert("Match on = " + subfld);
				//look for match with name
				//alert(dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].id);	
				//industries[i].industry = "HR";  //add two
				//indAdepAfrmAsecAfldAsubfldC
			   
				var required = dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].required;
				var textcolor = dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].textcolor;
				var checked = dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].checked;
				//var enabled = dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].enabled;				
				var readonly = dc.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].readonly;
				
				//alert("'" + required + "'");
				//alert("'" + textcolor + "'");
				//alert("'" + checked + "'");
				//alert("'" + readonly + "'");
				//alert("'" + enabled + "'");
			   
				//break;  //exit loop since you found the person
				
				//get values from json and assign to variables
				var chkRequired = document.getElementById("chkRequired");
				var txtTxtColor = document.getElementById("txtTextColor");
				var chkChecked = document.getElementById("chkChecked");
				//var chkEnabled = document.getElementById("chkEnabled");
				var chkReadOnly = document.getElementById("chkReadOnly");
				
				//set radio button to checked/unchecked based on data from json file for each subfield or label that is clicked
				if(required == "required")
				{					
					chkRequired.checked = true;								
				}
				else if(required == "")
				{
					chkRequired.checked = false;
				}
				
				txtTxtColor.value = textcolor;
				//alert(txtTxtColor.value);
				
				if(checked == "checked")
				{
					chkChecked.checked = true;
				}
				else if(checked == "")
				{
					chkChecked.checked = false;
				}
				
				//not included in json subfield properties yet								
				/*
				if(enabled == "enabled")
				{
					chkEnabled.checked = true;
				}
				else if(enabled == "")
				{
					chkEnabled.checked = false;
				}
				*/
				
				//alert("readonly = " + readonly);								
				if(readonly == "readonly")
				{
					chkReadOnly.checked = true;
				}
				else if(readonly == "")
				{
					chkReadOnly.checked = false;
				}							
				
				//var y = document.getElementById("txt");
				break;
				
			}
		}
		localStorage.setItem("dc", JSON.stringify(dc));
		
		var tblSections = document.getElementById("tblSections");
		tblSections.style.display = "none";
		
		var tblMenuSec = document.getElementById("tblSubFields");
		tblMenuSec.style.display = "block";
		openPropDB(id,field,subfield);		
	}	
	
	function openPropDB(id,field,subfield)
	{			
		var divSubFieldProperties = document.getElementById("divSubFieldProperties");
		divSubFieldProperties.style.display = "block";		
	}	
		
	function addremoveSubField(id,cb,subfield,secid)
	{
		//alert("addremoveSubField id = " + id + ", and cb = " + cb + ", and subfield = " + subfield + ", and secid = " + secid);
		
		//alert("addremoveSubField");
		//alert("id = " + id);
		//alert("cb id = " + cb);
		//alert("subfield = " + subfield);
		//alert("secId = " + secid);
		
		var cb = document.getElementById(cb);
		
		if(cb.checked)
		{
			document.getElementById("chkChecked").checked = true;
		}
		else
		{
			document.getElementById("chkChecked").checked = false;
		}
		
		var curLet = id.substr(15,1);
		//alert("curLet = " + curLet);
		var curLabel = subfield;
		//alert("curLabel = " + curLabel);
		               			
		//onFocus(id,cb,subfield);						
		$("#divSection" + curLet + "Body").empty();
		addFields(secid);
		//getProperties(id,cb,subfield);
		
	}
	
	function removeSubField(id,cb,subfield,secid)
	{
		//alert("removeSubField id = " + id + ", and cb = " + cb + ", and subfield = " + subfield + ", and secid = " + secid);
		
		//alert("addremoveSubField");
		//alert("id = " + id);
		//alert("cb id = " + cb);
		//alert("subfield = " + subfield);
		//alert("secId = " + secid);
		
		var curLet = id.substr(15,1);
		//alert("curLet = " + curLet);
		var curLabel = subfield;
		//alert("curLabel = " + curLabel);
		               
		var curSFCB = "chkMSF" + id;
		var sfCB = document.getElementById(curSFCB);
		sfCB.checked = false;
			
		//onFocus(id,cb,subfield);						
		$("#divSection" + curLet + "Body").empty();
		addFields(secid);		
	}	
	
	function onFocus()
	{
		isFocus = true;
		//alert("onFocus");
		var curField = event.target;		
		var id = curField.id;		

		if(id.indexOf("txt") == 0)
		{
			label = id.replace("txt","lbl");
			chk = id.replace("txt","chk");
			name = curField.name;			
		}
		else if(id.indexOf("chk") == 0)
		{
			label = id.replace("chk","lbl");
			chk = id.replace("chk","chk");
			name = curField.name;			
		}
		else if(id.indexOf("lbl") == 0)
		{
			label = id;
			chk = id;
			name = curField.innerHTML;
		}
		
		//alert("label = " + label);
		//alert("chk = " + chk);
		//var name = curField.name;
		//alert("name = " + name);
		var highlightColor = "lightyellow";
				
		curField.style.backgroundColor = highlightColor;
		
		var w = document.getElementById("curChkField"); 
		var x = document.getElementById("txtBlurId");
		var y = document.getElementById("txtBlurName");
		var z = document.getElementById("lblBlurId"); 				
						
		if(id.indexOf("txt") == 0)
		{
			w.value = id.replace("txt","chk");
			z.value = id.replace("txt","lbl");
		}
		else if(id.indexOf("chk") == 0)
		{
			w.value = id.replace("chk","chk");
			z.value = id.replace("chk","lbl");
		}						

		x.value = curField.id;
		y.value = curField.name;

		valLabel = z.value;
		valField = curField.id;
		//alert("valLabel = " + valLabel);		
		
		//alert("curField.fontcolor = " + curField.fontcolor);
		//if(curField.fontcolor == "red")
		//{
		//	chkRequired.checked = true;
		//}
		//else
		//{
		//	chkRequired.checked = false;
		//}
	}	
	
	function onBlur()
	{		
		var curField = event.target;
		if(isFocus && curField.name != undefined)
		{						
			//alert("Blur value = " + curField.name);
			var id = curField.id;
			var fldName = curField.name.replace(':','').replace("FSF","").replace("MSF","").trim();
			//alert("fldName = '" + fldName + "'");
			//alert("valLabel = " + valLabel);
					
			//var x = document.getElementById("txtBlurId");
			//var y = document.getElementById("txtBlurName");
			
			//z.value = curField.id.replace("txt","lbl");
			//x.value = id;
			//y.value = curField.name;
			
			//alert("curField.fontcolor = " + curField.fontcolor);
			//if(curField.fontcolor == "red")
			//{
			//	chkRequired.checked = true;
			//}
			//else
			//{
			//	chkRequired.checked = false;
			//}
			
			//var val = curField.value;
			//alert("'" + id.indexOf("SocialSecurity") + "'");

			//alert("curField = " + curField);
			//alert("curField id = " + id);

			curField.style.backgroundColor = "white";
			var lblId = id.replace("txt","lbl");
			//alert("lblId = " + lblId);
			//alert("lblId.style.color = " + lbl.style.color);
			
			var txtColor = $("#" + lblId).css('color');
			//alert("Text color = " + txtColor);
			
			if(txtColor == "rgb(244, 67, 54)")
			{
				//alert("1: Is required");
				if(curField.value.length == 0)
				{
					//alert("2: Is required");
					$("#" + id).css('background-color',invalidColor);
				}	
				else if(fldName == "SocialSecurity" || fldName == "SSN")
				{
					isSSN();
				}
				else if(fldName == "Email Address")
				{
					isEmail();
				}
				else if(fldName.indexOf("Date") != -1 && txtColor == "rgb(244, 67, 54)")
				{
					isDate();
				}
				else if(fldName.indexOf("Phone") != -1 || fldName.indexOf("Fax") != -1 || fldName.indexOf("Cell") != -1)
				{
					isPhone();
				}				
			}
			else if(fldName == "SocialSecurity" || fldName == "SSN")
			{
				isSSN();
			}
			else if(fldName == "Email Address")
			{
				isEmail();
			}
			else if(fldName.indexOf("Date") != -1 && txtColor == "rgb(244, 67, 54)")
			{
				isDate();
			}
			else if(fldName.indexOf("Phone") != -1 || fldName.indexOf("Fax") != -1 || fldName.indexOf("Cell") != -1)
			{
				isPhone();
			}
			else
			{
			}
		}
		curField.value = curField.value.toUpperCase();
		//alert(curField.value);
		isFocus = false;
	}		
	
	function isSSN()
	{
	  //alert("isSSN");
	  var curField = event.target;
	  var curId = curField.id;
	  var curLen = curField.value.length;
	  //alert(curLen);

	  if(curLen > 0)
	  {
		if(curLen == 9)
		{
		  curField.style.backgroundColor = clearColor;
		  //alert("Good SSN");
		}
		else
		{
		  curField.style.backgroundColor = invalidColor;
		  //alert("Bad SSN");
		}
	  }
	  else
	  {
		  curField.style.backgroundColor = clearColor;
	  }
	}	

	function setProperties()
	{								
		//alert("setProperties");	
		
		var cbRequired = document.getElementById("chkRequired"); //get the Required checkbox object		
		var cbChecked = document.getElementById("chkChecked"); //get the Required checkbox object
				
		var curLabelFld = document.getElementById("lblBlurId"); //get the label object for the required field 
		var curLabelId = curLabelFld.value; //get the id of the label 
		var curChkId = curLabelFld.value; //get the id of the label 
		//alert("curLabelId = " + curLabelId);			

		var modMSFField = document.getElementById(curLabelId.replace("lblFSF","txtMSF")); //this is the label of the field which needs to be set to required or not
		var modFSFField = document.getElementById(curLabelId); //this is the label of the field which needs to be set to required or not
		
		//alert("modMSFField id = " + modMSFField.id);			
		//alert("modFSFField name = " + modFSFField.name);
		
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}		
		
		var bc = document.getElementById("clrSecColor");
		//alert("color = " + bc.value );
		//update the button color in json file
		data.btncolor = bc.value;
				
		//alert("Set text red");
		for (var h=0; h<data.industries[0].departments[0].forms[0].sections[0].fields.length; h++) 
		{
			for (var i=0; i<data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields.length; i++) 
			{
				//alert("Before textcolor " + data.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].textcolor);
				//alert(data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].id + " : " + curLabelId.replace("lbl",""));	
				var subFldId = curLabelId.replace("lblFSF",""); 		
				var subFldName = curLabelId.replace("FSF",""); 		
				
				if (data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].id == subFldId) 
				{
					//alert("Match on " + data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].id);
					var subfldid = data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].id;
					var subfld = data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].subfield;
					var cb = "chkMSF" + subFldId;
					
					var curMenuChkId = "chkMSF" + subFldId;	
					var curFormChkId = "chkFSF" + subFldId;	
					//alert("curMenuChkId = " + curMenuChkId);					
					var curMenuChk = document.getElementById(curMenuChkId);
					var curFormChk = document.getElementById(curFormChkId);						
					
					if(cbRequired.checked == true)
					{
						//alert("set required");
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].required = "required";
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].textcolor = "red";
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].checked = "checked";	
						curMenuChk.checked = true;					
						
						localStorage.setItem('dc', JSON.stringify(data));
						$("#divSection" + curLet + "Body").empty();
						addFields("indAdepAfrmAsecA");
																
						//modMSFField.value = "required";
						//alert("modField value = " + modField.innerHTML);
						modMSFField.className = "w3-text-red";																
					}
					else
					{
						//alert("set NOT required");
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].required = "";
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].textcolor = "black";
						curMenuChk.checked = false;	
						
						localStorage.setItem('dc', JSON.stringify(data));
						$("#divSection" + curLet + "Body").empty();
						addFields("indAdepAfrmAsecA");
												
						modMSFField.className = "w3-text-black";																
					}
					
					if(cbChecked.checked == true)
					{
						//alert("set checked");
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].checked = "checked";	
						curMenuChk.checked = true;					
						
						localStorage.setItem('dc', JSON.stringify(data));
						$("#divSection" + curLet + "Body").empty();
						addFields("indAdepAfrmAsecA");

						
					}
					else
					{
						//alert("set NOT checked");
						data.industries[0].departments[0].forms[0].sections[0].fields[h].subfields[i].checked = "";		
						curMenuChk.checked = false;					
						
						localStorage.setItem('dc', JSON.stringify(data));
						$("#divSection" + curLet + "Body").empty();
						addFields("indAdepAfrmAsecA");					
					}
						
					
					//curFormChkId = "chkFSF" + subFldId;					
					//var curFormChk = document.getElementById(curFormChkId);
					//curFormChk.checked = true;					
					//alert("Check: curMenuChk.checked = " + curMenuChk.checked);
					//alert("Check: curFormChk.checked = " + curFormChk.checked);
										
					//addremoveSubField(subfldid, cb, subfld, "indAdepAfrmAsecA");
					//curFormChk.checked = true;									
					
					break;
				}
				else
				{
					//alert(data.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].id);
				}
				//alert("After textcolor " + data.industries[0].departments[0].forms[0].sections[0].fields[0].subfields[i].textcolor);
			} 								  				
		}
		//loadData(1);
	}
	
	/*
	function setBtnBGColor()
	{	
		alert("setBtnBGColor");			
		var x = document.getElementById("clrBtnColor");
		var y = document.getElementById("clrBtnBGColor");
		var curBtnId, curBtn;							
		
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}	
					
		for(var i=0;i<data.industries.length;i++)
		{
			var indId = data.industries[i].id;
			curBtnId = "btn" + indId;
			var curBtn = document.getElementById(curBtnId);
			curBtn.style.background = x.value;			
			for(var d=0;d<data.industries[i].departments.length;d++)
			{
				var depId = data.industries[i].departments[d].id;
				curBtnId = "btn" + depId;
				var curBtn = document.getElementById(curBtnId);
				curBtn.style.background = x.value;			
				
				for(var f=0;f<data.industries[i].departments[d].forms.length;f++)
				{
					var frmId = data.industries[i].departments[d].forms[f].id;
					curBtnId = "btn" + frmId;
					var curBtn = document.getElementById(curBtnId);
					curBtn.style.background = x.value;								
				}
			}
		}
		data.button[0].text[0].color = x.value;
		data.button[0].backgroundcolor = y.value;
		localStorage.setItem("dc", JSON.stringify(data));
		//setSectionColor();
	}
	*/

	function setBtnColor()
	{	
		alert("setBtnColor");			
		var x = document.getElementById("clrBtnColor");
		var y = document.getElementById("clrBtnBGColor");
				
		var curBtnId, curBtn;				
				
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}
		
		for(var i=0;i<data.industries.length;i++)
		{
			var indId = data.industries[i].id;
			curBtnId = "btn" + indId;
			var curBtn = document.getElementById(curBtnId);
			curBtn.style.color = x.value;
			
			if(indId.indexOf("indZ") == -1)
			{
				curBtn.style.background = y.value;			
			}
			
			for(var d=0;d<data.industries[i].departments.length;d++)
			{
				var depId = data.industries[i].departments[d].id;
				curBtnId = "btn" + depId;
				var curBtn = document.getElementById(curBtnId);
				curBtn.style.color = x.value;			
				if(depId.indexOf("indZ") == -1)
				{
					curBtn.style.background = y.value;			
				}
				
				for(var f=0;f<data.industries[i].departments[d].forms.length;f++)
				{
					var frmId = data.industries[i].departments[d].forms[f].id;
					curBtnId = "btn" + frmId;
					var curBtn = document.getElementById(curBtnId);
					curBtn.style.color = x.value;								
					if(frmId.indexOf("indZ") == -1)
					{	
						curBtn.style.background = y.value;			
					}
				}
			}
		}

		data.button[0].text[0].color = x.value;
		data.button[0].backgroundcolor = y.value;
		localStorage.setItem("dc", JSON.stringify(data));

		//setBtnBGColor();
	}	
	
	function setSecColor()
	{	
		//alert("setSecColor");			
		var curLet = "";
		var x = document.getElementById("clrSecColor");		
		var y = document.getElementById("clrSecBGColor");		
		
		//updateItem('dc', 'sectioncolor', x.value);
		
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}	
		
		data.section[0].text[0].color = x.value;
		data.section[0].backgroundcolor = y.value;
		localStorage.setItem("dc", JSON.stringify(data));
		
		var lum = 105;
		for(var i=0;i<data.industries[0].departments[0].forms[0].sections.length;i++)
		{							
			switch(i)
			{
				case 0:
					curLet = "A";
					break;
				case 1:
					curLet = "B";
					break;
				case 2:
					curLet = "C";
					break;
				case 3:
					curLet = "D";
					break;
				case 4:
					curLet = "E";
					break;
				case 5:
					curLet = "F";
					break;
			}
			
			curSecId = "divSection" + curLet;
			var curDiv = document.getElementById(curSecId);
			
			var curColor = x.value;
			var curBGColor = y.value;
			//alert("curColor = " + curColor);
									
			var rgbaColor = hexToRgbA(curBGColor).toString();
			var rgbaColorArray = rgbaColor.split(',');									
								
			lum = lum-15;									
									
			var rgbaCol = rgbaColorArray[0] + "," + rgbaColorArray[1] + "," + rgbaColorArray[2] + ",0." + lum + ")";

			//alert("x.value = " + x.value);
			curDiv.style.color = curColor;	
			curDiv.style.background = rgbaCol;			
		}		
	}	

	function setSecTextColor()
	{	
		//alert("setSecTextColor");			
		var curLet = "";
		var x = document.getElementById("clrSectionText");		
		
		updateItem('dc', 'sectextcolor', x.value);
		
		if(localData == 0)
		{
			$.ajax({
			  url: 'ajax/dc.json',
			  async: false,
			  dataType: 'json',
			  success: function (json) {
				data = json;
			  }
			});
		}
		else
		{
			var retrievedObject = localStorage.getItem('dc');
			data = JSON.parse(retrievedObject);
		}
		
		var lum = 1;
		for(var i=0;i<data.industries[0].departments[0].forms[0].sections.length;i++)
		{							
			switch(i)
			{
				case 0:
					curLet = "A";
					break;
				case 1:
					curLet = "B";
					break;
				case 2:
					curLet = "C";
					break;
				case 3:
					curLet = "D";
					break;
				case 4:
					curLet = "E";
					break;
				case 5:
					curLet = "F";
					break;
			}
			
			curSecId = "divSection" + curLet;
			var curDiv = document.getElementById(curSecId);
			
			var curColor = x.value;
			//alert("curColor = " + curColor);
									
			var rgbaColor = hexToRgbA(curColor).toString();
			var rgbaColorArray = rgbaColor.split(',');																
									
			var rgbaCol = rgbaColorArray[0] + "," + rgbaColorArray[1] + "," + rgbaColorArray[2] + "," + lum + ")";

			//alert("rgbaCol = " + rgbaCol);
			curDiv.style.color = rgbaCol;
		}	
		//setSecColor();
	}	
	
	function setObject(key, obj) {
		localStorage.setItem(key, JSON.stringify(obj));
	}

	function getObject(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	function updateItem(key, property, value)
	{
		var obj = getObject(key);
		obj[property] = value;
		setObject(key, obj);
	}
	
	function isEmail() {
		//alert("isEmail");
		var curField = event.target;
		var id = curField.id;
		var val = curField.value;

		if(val.length > 0)
		{
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			//alert(re.test(val));

			if(re.test(val))
			{
				curField.css.backgroundColor = clearColor;
			}
			else
			{
				curField.style.backgroundColor = invalidColor;
			}
		}
	}

	function isPhone() {
		//alert("isPhone");
		var curField = event.target;
		var curId = curField.id;
		var curValue = curField.value;
		var curLen = curField.value.length;

		var s2 = (""+curValue).replace(/\D/g, '');
		var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
		curField.value = ((!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3]);
		//alert(curField.value.length);
		if(curField.value.length > 0)
		{
			curField.style.backgroundColor = clearColor;
		}
		else
		{
			curField.style.backgroundColor = invalidColor;
		}
	}

	function isDate(dateStr)
	{
		//alert("isDate");
		var curField = event.target;
		var curId = curField.id;
		var curValue = curField.value;
		var curLen = curField.value.length;
		//alert(curValue);
		var m = curValue.split("-")[1];
		var d = curValue.split("-")[2];
		var y = curValue.split("-")[0];

		//alert(m);
		//alert(d);
		//alert(y);

		var newDate = m + "-" + d + "-" + y;
		//alert(newDate);

		var datePat = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
		var matchArray = dateStr.match(datePat); // is the format ok?

		if (matchArray == null)
		{
			alert("Please enter date as either mm/dd/yyyy or mm-dd-yyyy.");
			return false;
		}

		month = matchArray[1]; // p@rse date into variables
		day = matchArray[3];
		year = matchArray[5];

		if (month < 1 || month > 12)
		{
			// check month range
			alert("Month must be between 1 and 12.");
		return false;
		}

		if (day < 1 || day > 31)
		{
			alert("Day must be between 1 and 31.");
			return false;
		}

		if ((month==4 || month==6 || month==9 || month==11) && day==31)
		{
			alert("Month " + month + " doesn`t have 31 days!")
			return false;
		}

		if (month == 2)
		{ // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
			if (day > 29 || (day==29 && !isleap))
			{
				alert("February " + year + " doesn`t have " + day + " days!");
			return false;
			}
		}
		return true; // date is valid
	}
	
	function showProps()
	{
		/*
		var x = document.getElementById("btnProperties");
		var y = document.getElementById("divProperties");
		
		if(x.value=="Show Properties")
		{
			x.value="Hide Properties";
			y.style.display = "block";
		}
		else
		{
			x.value="Show Properties";
			y.style.display = "none";
		}
		*/
	}	
	
	function addremoveField(info)
	{
		//alert("addremoveField info = " + info);
				
		var id = info.split(',')[0];
		var curLet = id.substr(15,1);
		//alert(curLet);
		var curDiv = "div" + id;
		var curSec = info.split(',')[1];
		var x = document.getElementById(curDiv);
		var curCB = "chkMF" + id;
		var cb = document.getElementById(curCB);

		//$("#divSection" + curLet + "Body").empty();
		if(cb.checked)
		{
			//alert("Checked");
			addFields(id);			
		}		
		else
		{
			//alert("Not Checked");
		}
	}
	
	function checkAllFields(secID)
	{
		var x = document.getElementById("chkAllFields");
		var curFldChk = "";
		//alert(secID);
		if(x.checked)
		{			
			for(var i=0;i<6;i++)
			{
				switch(i)
				{
					case 0:
						curFldChk = "chkMF" + secID + "fldA";
						break;
					case 1:
						curFldChk = "chkMF" + secID + "fldB";
						break;
					case 2:
						curFldChk = "chkMF" + secID + "fldC";
						break;
					case 3:
						curFldChk = "chkMF" + secID + "fldD";
						break;
					case 4:
						curFldChk = "chkMF" + secID + "fldE";
						break;
					case 5:
						curFldChk = "chkMF" + secID + "fldF";
						break;
				}				
				$("#" + curFldChk).prop( "checked", true );
			}
		}
		else
		{
			//alert("Not Checked");
			//alert("#div" + "A" + "Body");
			$("#divSection" + "A" + "Body").empty();
			for(var i=0;i<6;i++)
			{
				switch(i)
				{
					case 0:
						curFldChk = "chkMF" + secID + "fldA";
						break;
					case 1:
						curFldChk = "chkMF" + secID + "fldB";
						break;
					case 2:
						curFldChk = "chkMF" + secID + "fldC";
						break;
					case 3:
						curFldChk = "chkMF" + secID + "fldD";
						break;
					case 4:
						curFldChk = "chkMF" + secID + "fldE";
						break;
					case 5:
						curFldChk = "chkMF" + secID + "fldF";
						break;
				}				
				$("#" + curFldChk).prop( "checked", false );
			}
		}		
	}
	
	function selectAllSubFields()
	{
		//alert("selectAllSubFields");
				
		var x = document.getElementById("chkAllSubFields");
		var curSecChk = "";

		if(x.checked)
		{
			//alert("Checked");

			for(var i=0;i<5;i++)
			{

				switch(i)
				{
					case 0:
						curSecChk = "chkindAdepAfrmAsecA";
						break;
					case 1:
						curSecChk = "chkindAdepAfrmAsecB";
						break;
					case 2:
						curSecChk = "chkindAdepAfrmAsecC";
						break;
					case 3:
						curSecChk = "chkindAdepAfrmAsecD";
						break;
					case 4:
						curSecChk = "chkindAdepAfrmAsecE";
						break;
				}
				$("#" + curSecChk).prop( "checked", true );

			}
		}
		else
		{
			//alert("Not Checked");

			for(var i=0;i<5;i++)
			{
				switch(i)
				{
					case 0:
						curSecChk = "chkindAdepAfrmAsecA";
						break;
					case 1:
						curSecChk = "chkindAdepAfrmAsecB";
						break;
					case 2:
						curSecChk = "chkindAdepAfrmAsecC";
						break;
					case 3:
						curSecChk = "chkindAdepAfrmAsecD";
						break;
					case 4:
						curSecChk = "chkindAdepAfrmAsecE";
						break;
				}
				$("#" + curSecChk).prop( "checked", false );
			}
		}		
	}	