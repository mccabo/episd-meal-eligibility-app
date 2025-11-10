		$(document).ready(function()
		{
			alert("Start local jsxxxx");
			//test();
			//$(function() {
			//});
			//$.ajaxSetup({ cache: false });
			$("#divLocal").append("<input id='radLocal' name='radData' type='radio' onclick='loadData(1)' class='w3-radio w3-margin'>Local Data</input><input id='radExternal' name='radData' type='radio' onclick='loadData(0)' class='w3-radio w3-margin' >External Data</input><br>");
            alert("22222 Start");
			//function loadData()
			// Get the modal
			var modal = document.getElementById('myModal');
			alert("3 Start");
			// Get the button that opens the modal
			var btn = document.getElementById("myBtn");
			alert("4 Start");
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			alert(span.id);
			// When the user clicks the button, open the modal
            
			btn.onclick = function() {

				alert("submitData");
				//var key = document.getElementById("SSN");
				//json = {"SSN":document.getElementById("SSN").value,"SSN":document.getElementById("Title").value,"FirstName":document.getElementById("FirstName").value,"Initial":document.getElementById("Initial").value,"LastName":document.getElementById("LastName").value,//"EmailAddress":document.getElementById("EmailAddress").value}
				//localStorage.setItem(key, JSON.stringify(json));

				var retrievedObject = localStorage.getItem('submittedData');
				submittedData = JSON.parse(retrievedObject);            
				//document.getElementById("pThankyou").innerHTML = "Dear " + document.getElementById("FirstName").value + " " + document.getElementById("LastName").value + ",<br><br>";
				//document.getElementById("pThankyou").innerHTML += "Thanks for your interest in our services. A representative will be contacting you at " + document.getElementById("EmailAddress").value + ".";

				document.getElementById("pDear").innerHTML = "Dear " + submittedData.FirstName + " " + submittedData.LastName + ",";
				document.getElementById("pBelow").innerHTML = "Below is a list of submiited dependents to be enrolled as part of our Halth Benefits package:";
				document.getElementById("pThankyou").innerHTML += "Thank you for your interest in our services.";
				document.getElementById("pContact").innerHTML += "A representative will be contacting you at " + submittedData.eMail + ".";
				
				modal.style.display = "block";

				//for(var i=0;i<document.all.length;i++)
				//{
					//alert("q");
				//}
			}			
			
            alert("6 Start");
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				alert("7a Start");
				modal.style.display = "none";
				alert("7b Start");
			}
            alert("7 Start");
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				alert("7c Start");
				if (event.target == modal) {
					alert("7d Start");
					modal.style.display = "none";
					alert("7e Start");
				}
			}
            alert("8 Start");
		});        

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

		function loadData(local)
		{
            //alert(local);
			$("#divMain").empty();
			
			jQuery.ajaxSetup({async:false});

			//var localStore = 0;
			var data = [];

			//alert("1");

			if(local == 0)
			{
				$.ajax({
				  url: 'ajax/dc.json',
				  async: false,
				  dataType: 'json',
				  success: function (json) {
					data = json;
				  }
				});
				//alert("External data " + data.industries.length);
			}
			else
			{
				$.getJSON("/Ajax/dc.json", function(json){
					//localStorage.setItem('session', JSON.stringify(a));
					localStorage.setItem('dc', JSON.stringify(json));
					alert("Local data " + data.industries.length);
				});

				updateItem('dc', 'btncolor', 'orange');

				var retrievedObject = localStorage.getItem('dc');
				data = JSON.parse(retrievedObject);
			}
			//alert(data.btncolor);
			var bgColor = data.btncolor;
			var redW;
			var indML = 0;
			var indW = 325;
			var indBGC = bgColor + "-0";

			var depML = 0;
			var depW = indW -16;
			var depBGC = bgColor + "-1";

			var frmML = 0;
			var frmW = depW -16;
			var frmBGC = bgColor + "-2";

			var secML = 0;
			var secW = 170;
			var secBGC = "white";

			var fldML = 0;
			var fldW = 155;
			var fldBGC = "white";

			var subfldML = 0;
			var subfldW = 130;
			var subfldBGC = "white";

			var fieldStr = "";
			var subfieldStr = "";

			//alert(mydata);

				//alert("4");
				//$.getJSON("/Ajax/dc.json", function(json){
				// ACCESS DATA
				//alert(data.industries.length);

				/*
				// THIS IS ALREADY STRINGIFIED
				var string = data;
				//var string = '{"items":[{"Desc":"Item1"},{"Desc":"Item2"}]}';
				// DO NOT STRINGIFY AGAIN WHEN WRITING TO LOCAL STORAGE
				localStorage.setItem('forms', string);

				// READ STRING FROM LOCAL STORAGE
				var retrievedObject = localStorage.getItem('forms');

				// CONVERT STRING TO REGULAR JS OBJECT
				var parsedObject = JSON.parse(retrievedObject);

				// ACCESS DATA
				alert(parsedObject.industries[0].industry);
				*/

				//Industries
				for(var i=0;i<data.industries.length;i++)
				{
					var indId = data.industries[i].id;
					var ind = data.industries[i].industry;

					$("#divMain").append("<input id='btn" + indId + "' type='button' onclick='accordian(\"" + indId + "\")' class='ind w3-btn w3-t" + indBGC + "' style='text-align:left;width:" + indW + "px;margin-left:" + indML + "px;margin-bottom:2px' value='" + data.industries[i].industry + "'</input><br>");
					$("#divMain").append("<div id='div" + indId + "' class='w3-accordion-content w3-container'></div>");

					//Departments
					for(var j=0;j<data.industries[i].departments.length;j++)
					{
						var depId = data.industries[i].departments[j].id;
						var dep = data.industries[i].departments[j].department;
						$("#div" + indId).append("<input id='btn" + depId + "' type='button' onclick='accordian(\"" + depId + "\")' class='dep w3-btn w3-t" + depBGC + "' style='text-align:left;width:" + depW + "px;margin-left:" + depML + "px;margin-bottom:2px' value='" + dep + "'></input><br>");
						$("#div" + indId).append("<div id='div" + depId + "' class='w3-accordion-content w3-container'></div>");

						//Forms
						for(var k=0;k<data.industries[i].departments[j].forms.length;k++)
						{
							var frmId = data.industries[i].departments[j].forms[k].id;
							var frm = data.industries[i].departments[j].forms[k].form;
							$("#div" + depId).append("<input id='btn" + frmId + "' type='button' onclick='clickForm(\"" + frmId + "," + frm + "\")' class='frm w3-btn w3-t" + frmBGC + "' style='text-align:left;width:" + frmW + "px;margin-left:" + frmML + "px;margin-bottom:2px' value='" + frm + "'></input><br>");
							$("#div" + depId).append("<div id='div" + frmId + "' class='w3-accordion-content w3-container'></div>");

							//Sections
							for(var l=0;l<data.industries[i].departments[j].forms[k].sections.length;l++)
							{
								var secId = data.industries[i].departments[j].forms[k].sections[l].id;
								var sec = data.industries[i].departments[j].forms[k].sections[l].section;
								var secchecked = data.industries[i].departments[j].forms[k].sections[l].checked;

								$("#div" + frmId).append("<input id='chk" + secId + "' type='checkbox' " + secchecked + " class='sec w3-check' style='margin:5px' onclick='addremoveSection(\"" + secId + "," + sec + "\")'/><input id='btn" + secId + "' type='text' readonly onclick='showSection(\"" + secId + "\")' onclick='accordian(\"" + secId + "\")' class='dep w3-text w3-" + secBGC + "' style='border:0;text-align:left;width:" + secW + "px;margin-left:" + secML + "px;margin-bottom:2px' value='" + sec + "'></input><br>");
								$("#div" + frmId).append("<div id='div" + secId + "' class='w3-accordion-content w3-container'></div>");

								//Fields
								for(var m=0;m<data.industries[i].departments[j].forms[k].sections[l].fields.length;m++)
								{
									var fldId = data.industries[i].departments[j].forms[k].sections[l].fields[m].id;
									var fldchecked = data.industries[i].departments[j].forms[k].sections[l].fields[m].checked;
									var fld = data.industries[i].departments[j].forms[k].sections[l].fields[m].field;

									$("#div" + secId).append("<input id='chk" + fldId + "' type='checkbox' " + fldchecked + " class='w3-check' style='margin:5px' onclick='addremoveField(\"" + fldId + "," + fld  + "\")'/><input id='btn" + fldId + "' type='text' readonly onclick='accordian(\"" + fldId + "\")' class='fld w3-text w3-" + fldBGC + "' style='border:0;text-align:left;width:" + fldW + "px;margin-left:" + fldML + "px;margin-bottom:2px' value='" + fld + "' ></input><br>");
									$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content w3-container'></div>");

									var subfld = "";
									var subfldId = "";
									var subfldChecked = "checked";
									var subfldReadOnly = "";
									var subfldRequired = "";

									//Subfields
									for(var n=0;n<data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields.length;n++)
									{
										subfld = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].subfield;
										subfldId = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].id;
										subfldChecked = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].checked;
										subfldReadOnly = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].readonly;
										subfldRequired = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].required;

										var req = "0";
										var txtColor = "black";

										//alert(subfldRequired);

										if(subfldRequired == "required")
										{
											req = "1";
											txtColor = "red";
										}
										else
										{
											req = "0";
											txtColor = "black";
										}

										$("#div" + fldId).append("<input id='chk" + subfldId + "' type='checkbox' " + subfldChecked + " class='w3-check' style='margin:5px' onclick='addremoveSubField(\"" + subfldId + "," + subfld  + "\")'/><input id='txt" + subfldId + "' type='text' onclick='accordian(\"" + subfldId + "\")' class='sub w3-text-" + txtColor + " w3-" + subfldBGC + "' style='border:0;text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "' ></input><br>");
									}
								}
							}
						}
					}
				}
			//});
		}

		function addFields(id,curLet)
		{
			//alert("id = " + id);
			//alert("curLet = " + curLet);

			var curI = id.substr(3,1);
			var curD = id.substr(7,1);
			var curF = id.substr(11,1);
			var curS = id.substr(15,1);

			//alert("curI = " + curI);
			//alert("curD = " + curD);
			//alert("curF = " + curF);
			//alert("curS = " + curS);

			var i = -1;
			var j = -1;
			var k = -1;
			var l = -1;

			switch(curI){
				case "A":
					i = 0;
					break;
				case "B":
					i = 1;
					break;
				case "C":
					i = 2;
					break;
				case "D":
					i = 3;
					break;
				case "E":
					i = 4;
					break;
			}

			switch(curD){
				case "A":
					j = 0;
					break;
				case "B":
					j = 1;
					break;
				case "C":
					j = 2;
					break;
				case "D":
					j = 3;
					break;
				case "E":
					j = 4;
					break;
			}

			switch(curF){
				case "A":
					k = 0;
					break;
				case "B":
					k = 1;
					break;
				case "C":
					k = 2;
					break;
				case "D":
					k = 3;
					break;
				case "E":
					k = 4;
					break;
			}

			switch(curS){
				case "A":
					l = 0;
					break;
				case "B":
					l = 1;
					break;
				case "C":
					l = 2;
					break;
				case "D":
					l = 3;
					break;
				case "E":
					l = 4;
					break;
			}

			//alert("i = " + i);
			//alert("j = " + j);
			//alert("k = " + k);
			//alert("l = " + l);

			$.getJSON("/Ajax/dc.json", function(data){

				for(var m=0;m<data.industries[i].departments[j].forms[k].sections[l].fields.length;m++)
				{
					var fldId = data.industries[i].departments[j].forms[k].sections[l].fields[m].id;
					var fld = data.industries[i].departments[j].forms[k].sections[l].fields[m].field;

					//alert("Field = " + fld)
					//$("#div" + secId).append("<input type='checkbox' class='w3-check' checked style='margin:5px'/><input id='btn" + fldId + "' type='button' onclick='accordian(\"" + fldId + "\")' class='w3-text w3-" + fldBGC + "' style='text-align:left;width:" + fldW + "px;margin-left:" + fldML + "px;margin-bottom:2px' value='" + fld + "'</input><br>");
					//$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content w3-container'></div>");

					var fldCB = document.getElementById("chk" + fldId);
					//alert(fldCB.checked);

					//Subfields
					if(fldCB.checked == true)
					{
						for(var n=0;n<data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields.length;n++)
						{
							var subfldId = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].id;
							var subfld = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].subfield;
							//alert("SubField = " + subfld)
							//$("#div" + fldId).append("<input type='checkbox' class='w3-check' checked style='margin:5px'/><input id='btn" + subfldId + "' type='text' onclick='accordian(\"" + subfldId + "\")' class='w3-text w3-" + subfldBGC + "' style='text-align:left;width:" + subfldW + "px;margin-left:" + subfldML + "px;margin-bottom:2px' value='" + subfld + "'</input><br>");
							//$("#div" + fldId).append("<div class='row' id='div" + subfldId + "' class='w3-accordion-content w3-container'></div>");

							label = subfld;
							//alert(label);

							var type = "";
							var size = "25";
							var maxlength = "50";
							var width = "";
							var lblWidth = "100px";

							//alert("chk = '" + "chk" + subfldId + "'");
							var subfldCB = document.getElementById("chk" + subfldId);
							//alert(subfldCB.checked);

							var lbl = label.replace(" ", "").replace("-","").replace("#","").replace("+","").replace(":","").replace(" ","").replace(" ","");
							//alert("'" + lbl + "'");
							if(subfldCB.checked == true)
							{
								checked = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].checked;
								required = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].required;

								key = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].key;
								type = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].type;
								readonly = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].readonly;
								maxlength = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].maxlength;
								size = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].size;
								textcolor = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].textcolor;
								backgroundcolor = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].backgroundcolor;
								fieldlength = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].fieldlength;
								datetype = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].datetype;

								function1 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].function1;
								function2 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].function2;
								function3 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].function3;

								logic1 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].logic1;
								logic2 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].logic2;
								logic3 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].logic3;

								value1 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].value1;
								value2 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].value2;
								value3 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].value3;

								group1 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].group1;
								group2 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].group2;
								group3 = data.industries[i].departments[j].forms[k].sections[l].fields[m].subfields[n].group3;

								if(required == "required")
								{
									textcolor = "red";
								}

								$("#divSection" + curLet + "Body").append("<div class='form-group' style='padding:5px'><input type='checkbox' class='w3-check' checked='checked' onclick='addremoveSubField(label)' /><label class='w3-text-" + textcolor + "' style='width:" + lblWidth + "px;text-align:right;margin:5px' for='" + label + "'>" + label + "</label><input onfocus='onFocus()' onblur='onBlur()' placeholder='" + label.replace(':','') + "' class='w3-input w3-border' placeholder='" + label + "' pattern='\d{1,5}' maxlength='" + maxlength + "' size='" + size + "' type='" + type + "' id='" + lbl + "' required /></div>");
							}
						}
					}
				}
			});
			//setFields();
		}

		function setFields()
		{
			//alert("Test");
			var fieldString = "";
			$.getJSON("/Ajax/dc.json", function(dataFields){
				for(var a=0;a<dataFields.industries.length;a++)
				{
					fieldString +=  dataFields.industries[a].industry + "\n";
					for(var b=0;b<dataFields.industries[a].departments.length;b++)
					{
						//alert(dataFields.industries[a].departments[b].department);
						fieldString += dataFields.industries[a].departments[b].department + "\n";
						for(var c=0;c<dataFields.industries[a].departments[b].forms.length;c++)
						{
							fieldString += dataFields.industries[a].departments[b].forms[c].form + "\n" + "\n";
							for(var d=0;d<dataFields.industries[a].departments[b].forms[c].sections.length;d++)
							{
								fieldString += dataFields.industries[a].departments[b].forms[c].sections[d].section + "\n";
								for(var e=0;e<dataFields.industries[a].departments[b].forms[c].sections[d].fields.length;e++)
								{
									fieldString += dataFields.industries[a].departments[b].forms[c].sections[d].fields[e].field + "\n";
									for(var f=0;f<dataFields.industries[a].departments[b].forms[c].sections[d].fields[e].subfields.length;f++)
									{
										fieldString += dataFields.industries[a].departments[b].forms[c].sections[d].fields[e].subfields[f].subfield + "\n";
									}
								}
							}
						}
					}
				}
				//alert(dataFields.industries[0].departments[0].department);
			});

			//var obj = {a: 'foo', b: 'bar'};

			 //foo
			 //bar


			//alert(obj['b']);

			/*
			//JsonTextReader reader = new JsonTextReader(new StringReader(json));
			//while (reader.Read())
			//{
			//	if (reader.Value != null)
			//	{
			//		alert("Token: {0}, Value: {1}", reader.TokenType, reader.Value);
			//	}
			//	else
			//	{
			//		alert("Token: {0}", reader.TokenType);
			//	}
			//}

			//alert(sb);



			$.getJSON("/Ajax/dc.json", function(dataFields){
				for(var a=0;a<dataFields.industries.length;a++)
				{
					fieldString +=  dataFields.industries[a].industry + "\n";
					for(var b=0;b<dataFields.industries[a].departments.length;b++)
					{
						fieldString += dataFields.industries[a].departments[b].department + "\n";
						for(var c=0;c<dataFields.industries[a].departments[b].forms.length;c++)
						{
							fieldString += dataFields.industries[a].departments[b].forms[c].form + "\n" + "\n";
							for(var d=0;d<dataFields.industries[a].departments[b].forms[c].sections.length;d++)
							{
								fieldString += dataFields.industries[a].departments[b].forms[c].sections[d].section + "\n";
								for(var e=0;e<dataFields.industries[a].departments[b].forms[c].sections[d].fields.length;e++)
								{
									fieldString += dataFields.industries[a].departments[b].forms[c].sections[d].fields[e].field + "\n";
									for(var f=0;f<dataFields.industries[a].departments[b].forms[c].sections[d].fields[e].subfields.length;f++)
									{
										fieldString += dataFields.industries[a].departments[b].forms[c].sections[d].fields[e].subfields[f].subfield + "\n";
									}
								}
							}
						}
					}
				}
			});

			alert(fieldString);

			var industry = document.getElementById("industry").value;
			var department = document.getElementById("department").value;
			var form = document.getElementById("form").value;
			var section = document.getElementById("section").value;
			var field = document.getElementById("field").value;
			var subfield = document.getElementById("subfield").value;

			//var m={industry:industry,department:department,form:form,section:section,field:field,subfield,subfield};

			var m={
					industries
					[
						{
							industry:industry,department:department,form:form,section:section,field:field,subfield,subfield};
			localStorage.setItem('field',JSON.stringify(m));

			var gm =JSON.parse(localStorage.getItem('field'));
			var path = gm.industry + "/" + gm.department + "/" + gm.form + "/" + gm.section + "/" + gm.field + "/" + gm.subfield;
			alert(path);
			*/
		}

		function submitData()
		{
			alert("submitData");
			json = {"FirstName":document.getElementById("FirstName").value,"Initial":document.getElementById("Initial").value,"LastName":document.getElementById("LastName").value}
			localStorage.setItem('submittedData', JSON.stringify(json));

			var retrievedObject = localStorage.getItem('submittedData');
			submittedData = JSON.parse(retrievedObject);
			//alert("Thank you for submitting your data " + submittedData.FirstName + " " + submittedData.Initial + ". " + submittedData.LastName + ". We will be contacting you within the next 24 hours with some follow up questions at " + document.getElementById("EmailAddress").value) + ".";
			var elements = document.getElementById("dcForm").elements;
			for(var i=0, element; element = elements[i++];)
			{
				if(element.type != "checkbox")
				{
					alert(element.id + ":" + element.value);
				}
			}
		}        