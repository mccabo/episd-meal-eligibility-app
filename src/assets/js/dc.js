var transData = null;
var sectionData = null;
var changeBtn = "";
var btnTitle = "Change Button transData";
var lsFlag = 0;
var selLev = "";
var rowCount = -1;
var isFocus = false;
var browser = "";
var alignLogo = "center";
var curColor = "blue";
var clearColor = "white";
var invalidColor = "pink";
var addSubmitFlag = 1;

var SATxtColor = "Green";
var isMobile = false; //initiate as false

var curField = "";
var importFlag = "table";
var secId = 0;
var secCount = -1;

var secId = null;
var fldId = null;
var subId = null;
var lstId = null;

var curSecIndex = null;
var curFldIndex = null;
var curSubIndex = null;
var curLstIndex = null;

var curLevel = "";
var fldCount = 0;
var subCount = 0;
var fileInput = null;
var logoFile = null;
var title = "";

var dataFile = "index.json";                
var sectionsFile = "sections.json";
var subTableFlag = 0; 
var curSec = -1;
var curSelectedSec = 0;

var curLogo = 0;

$(document).ready(function()
{	
	//alert("Ready");

	//document.getElementById("mySidebar").style.width = "8%";
	//initialize current section at 0
	$("#txtSection").val("0");			
	$("#txtIndustries").focus();
	//identify browser being used
	var browser = get_browser();	
	//alert("ready");

	//create an event for all key strokes
	document.onkeydown = checkKey;	

	//device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;
		
		//document.getElementById("divSideMenu").style.width = "100%";
	}	

	//function isMobileDevice() {
		//return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
		//isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	//};

	//add a placeholder for the logo
	
	$("#divForm").append("<div id='divLogo' class='col-12 w3-center' style='width:100%;display:block'></div>");
	$("#divForm").append("<div id='divTitle' class='col-127570 w3-center w3-text-black' style='width:100%;height:50px;margin-right:0px;font-size:20px;display:block' contenteditable></div>");
				
	//attempt to retrieve the transportation transData from localstorage
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);
	
	//get the transData externally if it is not found locally and store it locally
	if(transData == null)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				transData = JSON.parse(this.responseText);
				localStorage.setItem('transportation', JSON.stringify(transData));
				retrievedObjectTransportation = localStorage.getItem('transportation');	
				transData = JSON.parse(retrievedObjectTransportation);

				//attempt to retrieve the transportation transData from localstorage
				var retrievedObjectSections = localStorage.getItem('sections');				
				sectionData = JSON.parse(retrievedObjectSections);

				//get the transData externally if it is not found locally and store it locally
				if(sectionData == null)
				{
					var xhttpS = new XMLHttpRequest();
					xhttpS.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							sectionData = JSON.parse(this.responseText);
							localStorage.setItem('sections', JSON.stringify(sectionData));
						}
					};			
					xhttpS.open("GET", sectionsFile, true);
					xhttpS.send();	
				}

				//xhttp.send();	
				//getFile();
				//}	

				getFile();
				//getLogo();

				//import sections,fields,subfields,lists
				//fileInput = document.getElementById("btnCSV");
				//fileInput.addEventListener('change', readFile);

				logoFile = document.getElementById("btnLogo");
				logoFile.addEventListener('change', readFile);

				//getFormData to initialize the IDE/Form
				//getFormData(transData);

				title = transData.title;
				if(title.length > 0 && transData.prod == 0)
				{	
					getFormMenu();
					getToolsMenu();
					//alert("Title = " + transData.title);
					addTitle(transData.title);		
					addLogo(transData.url);
					$("#divGetIndustries").hide();
					$("#divGetSections").show();
								
				}
				else if(transData.prod == 1)
				{
					addTitle(transData.title);		
					addLogo(transData.url);
					$("#divGetIndustries").hide();
					$("#divGetSections").hide();
					$("#divLogoBtns").hide();
					$("#btnPrev").hide();
					$("#btnNext").hide();
					var x = document.getElementById("divMain");
					x.className = x.className.replace("col-9", "col-12");		
				}

				if(transData.Data.length > 0 )
				{		
					
					//getSectionData();
					addSections();
					//getFieldData();
					//getSubfieldData();
					if(transData.prod == 0)
					{
						$("#divGetFields").show();
						$("#divGetIndustries").hide();
						$("#divGetSections").show();
						$("#txtSections").focus();
					}
					id = transData.Data[0].Sections[0].id;		
					for(var i=0;i<transData.Data[0].Sections.length;i++)
					{			
						addDD(i);
					}
					//accordian("divSection" + 0 + "Body").show();

					//alert("transData.Data[0].Sections[0].Fields.length = " + transData.Data[0].Sections[0].Fields.length);
					if(transData.Data[0].Sections[0].Fields.length > 0 && transData.prod == 0)
					{
						$("#divGetSubfields").show();
					}

					if(transData.prod == 1)
					{
						var x = document.getElementById("divMain");
						$("#divTools").hide();
						x.className = x.className.replace("col-9", "col-12");
						$("#btnPreview").val("Edit");
						addSubmitFlag =1;
						addSubmit();			
					}
					else if(transData.prod == 0)
					{
						var x = document.getElementById("divMain");
						x.className = x.className.replace("col-12", "col-9");
						$("#btnPreview").val("Test");			
						addSubmitFlag = 0;
						addSubmit();
					}
				}				
			}
		};			
		xhttp.open("GET", dataFile, true);
		xhttp.send();	
	}

			
});

function formula()
{
	alert("Formula");
}

function preview()
{
	//alert("preview");
	
	if(transData.prod == 1)
	{
		transData.prod = 0;
		$("#btnPreview").val("Edit");
		$("#divLogoBtns").hide();
		$("#btnPrev").hide();
		$("#btnNext").hide();
		addSubmitFlag = 0;
	}
	else if(transData.prod == 0)
	{
		transData.prod = 1;
		$("#btnPreview").val("Preview");		
	}
			
	localStorage.setItem('transportation', JSON.stringify(transData));
	var retrievedObjectSections = localStorage.getItem('transportation');				
	sectionData = JSON.parse(retrievedObjectSections);
	addSections();
	//$("#divMain").style("width","100%");
	//$('.col-9').addClass('.col-12').removeClass('');
	$("#divGetIndustries").hide();
	//$("#btnProd").val("");	
	location.reload();
}
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/

/*An array containing all the country names in the world:*/
//var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
//var sections = ["General Information","Work History","Employee Information","Education","Skill Set Information","Dependent Information","Contact Information","Employer Information"];

function get_browser() {
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	if(/trident/i.test(M[1])){
		tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
		return {name:'IE',version:(tem[1]||'')};
		}   
	if(M[1]==='Chrome'){
		tem=ua.match(/\bOPR|Edge\/(\d+)/)
		if(tem!=null)   {return {name:'Opera', version:tem[1]};}
		}   
	M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	return {
	name: M[0],
	version: M[1]
	};
}

function getIndustry(title)
{
	alert("getIndustry");
	$("#divGetIndustries").hide();
	$("#divGetSections").show();
	addLogo(transData.url);
	addTitle(title);
}

function getFormData()
{
	//getFormMenu();
	//getToolsMenu();
	getSectionData();	
	getFieldData();	
	getSubfieldData();
	getListData();	
	//getUtilityMenu();
}

function showAddMenu()
{
	//alert("Show Add Menu");
	$("#divNewMenu").empty();
	var menuId = transData.FormMenu[0].Id;
	var menuTitle = transData.FormMenu[0].Title;
	var menuChecked = transData.FormMenu[0].Checked;
	var menuHeight = transData.FormMenu[0].Height;
	var menuWidth = transData.FormMenu[0].Width;
	var menuAlign = transData.FormMenu[0].Align;					
	var menuBGColor = transData.FormMenu[0].Backgroundcolor;
	var menuOnClick = transData.FormMenu[0].OnClick;
	var menuColor = transData.FormMenu[0].Color;		
	var menuType = transData.FormMenu[0].Type;		
	var menuMarginLeft = transData.FormMenu[0].MarginLeft;		
	var menuMarginBottom = transData.FormMenu[0].MarginBottom;				
	var menuBorder = "w3-border";	

	for(j=0;j<transData.FormMenu[0].List.length;j++)
	{
		var menuOnClick = transData.FormMenu[0].List[j].OnClick;
		//alert(menuOnClick);
		//$("#divDD" + menuId).append('<a id="list'+ j+'" style="font-size:100%" href="#" class="w3-bar-item w3-btn" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + transData.TopMenu[i].List[j].Title + '</a>');
		$("#divNewMenu").append('<' + menuType + '   id="btn'+ menuId +'" type="' + menuType + '" style="height:35px;color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:12px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">'  + transData.FormMenu[0].List[j].Title + '</' + menuType + '>');												
		//$("#divSideMenu").append('<button id="list'+ j +'" style="width:95px;margin-right:5px;margin-top:5px" type="button" class="w3-right w3-border w3-btn w3-white w3-bar-item" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + transData.TopMenu[0].List[j].Title + '</button>');
	}
	//$("#divTopMenu").toggle();
}

function downloadObjectAsJson(exportObj, exportName){
	var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
	var downloadAnchorNode = document.createElement('a');
	downloadAnchorNode.setAttribute("href",     dataStr);
	downloadAnchorNode.setAttribute("download", exportName + ".json");
	document.body.appendChild(downloadAnchorNode); // required for firefox
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
	}

function showImportMenu()
{
	//alert("Show Import Menu");
	$("#divNewMenu").empty();
	var menuId = transData.FormMenu[1].Id;
	var menuTitle = transData.FormMenu[1].Title;
	var menuChecked = transData.FormMenu[1].Checked;
	var menuHeight = transData.FormMenu[1].Height;
	var menuWidth = transData.FormMenu[1].Width;
	var menuAlign = transData.FormMenu[1].Align;					
	var menuBGColor = transData.FormMenu[1].Backgroundcolor;
	var menuOnClick = transData.FormMenu[1].OnClick;
	//alert(menuOnClick);
	var menuColor = transData.FormMenu[1].Color;		
	var menuType = transData.FormMenu[1].Type;		
	var menuMarginLeft = transData.FormMenu[1].MarginLeft;		
	var menuMarginBottom = transData.FormMenu[1].MarginBottom;				
	var menuBorder = "w3-border";	

	for(j=0;j<transData.FormMenu[1].List.length;j++)
	{
		var menuOnClick = transData.FormMenu[1].List[j].OnClick;
		//alert(menuOnClick);
		//$("#divDD" + menuId).append('<a id="list'+ j+'" style="font-size:100%" href="#" class="w3-bar-item w3-btn" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + transData.TopMenu[i].List[j].Title + '</a>');
		$("#divNewMenu").append('<' + menuType + '   id="btn'+ menuId +'" type="' + menuType + '" style="height:35px;color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:12px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">'  + transData.FormMenu[1].List[j].Title + '</' + menuType + '>');												
		//$("#divSideMenu").append('<button id="list'+ j +'" style="width:95px;margin-right:5px;margin-top:5px" type="button" class="w3-right w3-border w3-btn w3-white w3-bar-item" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + transData.TopMenu[0].List[j].Title + '</button>');
	}
	//$("#divTopMenu").toggle();
}

function showDeleteMenu()
{
	//alert("Show Delete Menu");
	$("#divNewMenu").empty();
	var menuId = transData.FormMenu[2].Id;
	var menuTitle = transData.FormMenu[2].Title;
	var menuChecked = transData.FormMenu[2].Checked;
	var menuHeight = transData.FormMenu[2].Height;
	var menuWidth = transData.FormMenu[2].Width;
	var menuAlign = transData.FormMenu[2].Align;					
	var menuBGColor = transData.FormMenu[2].Backgroundcolor;
	var menuOnClick = transData.FormMenu[2].OnClick;
	var menuColor = transData.FormMenu[2].Color;		
	var menuType = transData.FormMenu[2].Type;		
	var menuMarginLeft = transData.FormMenu[2].MarginLeft;		
	var menuMarginBottom = transData.FormMenu[2].MarginBottom;				
	var menuBorder = "w3-border";	

	for(j=0;j<transData.FormMenu[2].List.length;j++)
	{
		var menuOnClick = transData.FormMenu[2].List[j].OnClick;
		//alert(menuOnClick);
		//$("#divDD" + menuId).append('<a id="list'+ j+'" style="font-size:100%" href="#" class="w3-bar-item w3-btn" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + transData.TopMenu[i].List[j].Title + '</a>');
		$("#divNewMenu").append('<' + menuType + '   id="btn'+ menuId +'" type="' + menuType + '" style="height:35px;color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:12px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">'  + transData.FormMenu[2].List[j].Title + '</' + menuType + '>');												
		//$("#divSideMenu").append('<button id="list'+ j +'" style="width:95px;margin-right:5px;margin-top:5px" type="button" class="w3-right w3-border w3-btn w3-white w3-bar-item" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + transData.TopMenu[0].List[j].Title + '</button>');
	}
	//$("#divTopMenu").toggle();
}

function doNosetColorthing()
{
	alert("Set Color");
}

function getFormMenu()
{
	//alert("getFormMenu");
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	
	var curLanguage = "English";
	
	//alert("transData.Menus.length = " + transData.Menus.length);
	for(var i=0;i<transData.FormMenu.length;i++)
	{
		//alert(menuOnClick);
		var menuId = transData.FormMenu[i].Id;
		var menuTitle = transData.FormMenu[i].Title;
		var menuChecked = transData.FormMenu[i].Checked;
		var menuHeight = transData.FormMenu[i].Height;
		var menuWidth = transData.FormMenu[i].Width;
		var menuAlign = transData.FormMenu[i].Align;					
		var menuBGColor = transData.FormMenu[i].Backgroundcolor;
		//alert(menuBGColor);			
		var menuOnClick = transData.FormMenu[i].OnClick;
		var menuColor = transData.FormMenu[i].Color;	
		//alert(menuColor);	
		var menuType = transData.FormMenu[i].Type;		
		var menuMarginLeft = transData.FormMenu[i].MarginLeft;		
		var menuMarginBottom = transData.FormMenu[i].MarginBottom;				
		var menuBorder = "w3-border";
		//var menuLogo = "url";
					
		if(menuChecked)
		{
			//alert(isMobile);
			if(isMobile)
			{
				menuAlign = "center"; //allgn the text
				menuwidth = "100";
				$("#divForm").css("margin-left","0px");
				$("#divTools").css("padding-left","15px");
			}
			else
			{
				$("#divTools").css("padding-left","0px");
			}

			if(menuId == "btnbgcolor")
			{
				//alert("bgcolor");
				//$("#divFormMenu").append('<' + menuType + ' id="'+ menuId +'" type=" ' + menuType + '" style="height:35px;color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:12px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">'  + menuTitle + '</' + menuType + '>');											
					
			
				//selLev = '<label id="lblSA" style="color:black" onclick="btnChange()">Select All</label><input id="radSA" name="radCC" type="radio" onchange="btnChange()" style="margin-left:5px;margin-right:20px"></input><label id="lblFld" style="color:blue" onclick="btnChange()">Sections</label><input id="radSec" name="radCC" type="radio" onclick="btnChange()" style="margin-left:5px;margin-right:20px" checked></input><label id="lblFld">Fields</label><input id="radFld" name="radCC" type="radio" onclick="btnChange()" style="margin-left:5px;margin-right:20px"></input><label id="lblSub">Subfields</label><input id="radSub" name="radCC" type="radio" onclick="btnChange()" style="margin-left:5px;margin-right:20px"></input><label id="lblLst">Lists</label><input id="radLst" name="radCC" type="radio" onclick="btnChange()" style="margin-left:5px;margin-right:20px"></input>';  
				//selLev = "<button id='btnSA' class='w3-btn' onclick='selectLevel(\"SA\")'>Select All</button><button id='btnSec' class='w3-btn w3-text-blue' onclick='onclick='selectLevel(\"Sec\")'>Sections</button><button id='btnFld' class='w3-btn' onclick='selectLevel(\"Fld\")'>Fields</button><button id='btnSub' class='w3-btn' onclick='selectLevel(\"Sub\")'>Subfields</button><button id='btnLst' class='w3-btn' onclick='selectLevel(\"Lst\")'>Lists</button>"
				
				$("#btnbgColor").ColorPickerSliders({
					previewontriggerelement: false,
					draggable: "true",
					color: curColor,
					title: "",
					order: {
						rgb:2,
						preview: 1
					},
					onchange: function(container, color) {
						var btn = null;              
						if(changeBtn == "Select All")
						{                                                                        						                
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{                    
								var curSecLabel = "lblsec" + i + "000SA";
								var curFldLabel = "lblfld" + i + "000SA";
								
								var secLabel = $("#"+ curSecLabel);                            
								secLabel.css("color", color.tiny.toRgbString());
								
								var fldLabel = $("#"+ curFldLabel);                            
								fldLabel.css("color", color.tiny.toRgbString());                    
							}
			
							for(var i=0;i<transData.Buttons[0].SelectAll.length;i++)
							{ 
								transData.Buttons[0].SelectAll[i].Color =  color.tiny.toRgbString();                                                                                                
							}
						}
						else if(changeBtn == "Sections")
						{
							transData.Buttons[0].Sections[0].Backgroundcolor =  color.tiny.toRgbString();                                          
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{                                
								var curSecBtn = "btnsec" + i + "000";
								var secBtn = $("#" + curSecBtn);
								secBtn.css("background-color", color.tiny.toRgbString());
								if (color.cielch.l < 60) {
									secBtn.css("color", "white");
									transData.Buttons[0].Sections[0].Color = "white";
								}
								else {
									secBtn.css("color", "black");
									transData.Buttons[0].Sections[0].Color = "black";
								}                                                                                      
							}
						}
						else if(changeBtn == "Fields")
						{
							transData.Buttons[0].Fields[0].Backgroundcolor =  color.tiny.toRgbString();
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{     				                  
								for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
								{                         
									var curFldBtn = "btnfld" + i + j + "00";                        
									var fldBtn = $("#" + curFldBtn);                      
									fldBtn.css("background-color", color.tiny.toRgbString());               
									if (color.cielch.l < 60) {
										fldBtn.css("color", "white");
										transData.Buttons[0].Fields[0].Color = "white";
									}
									else {
										fldBtn.css("color", "black");
										transData.Buttons[0].Fields[0].Color = "black";
									}                                                                                   
								}
							}
						}
						else if(changeBtn == "Subfields")
						{
							transData.Buttons[0].Subfields[0].Backgroundcolor =  color.tiny.toRgbString();
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{     				                  
								for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
								{   
									for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
									{                        
										var curSubBtn = "btnsub" + i + j + k + "0";                        
										var subBtn = $("#" + curSubBtn);                      
										subBtn.css("background-color", color.tiny.toRgbString());               
										if (color.cielch.l < 60) {
											subBtn.css("color", "white");
											transData.Buttons[0].Subfields[0].Color = "white";
										}
										else {
											subBtn.css("color", "black");
											transData.Buttons[0].Subfields[0].Color = "black";
										}                                                                                   
									}
								}
							}
						} 
						else if(changeBtn == "Lists")
						{
							transData.Buttons[0].Lists[0].Backgroundcolor =  color.tiny.toRgbString();
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{     				                  
								for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
								{  
									for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
									{  
										for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
										{                      
											var curLstBtn = "btnlst" + i + j + k + l;                        
											var lstBtn = $("#" + curLstBtn);                      
											lstBtn.css("background-color", color.tiny.toRgbString());               
											if (color.cielch.l < 60) {
												lstBtn.css("color", "white");
												transData.Buttons[0].Lists[0].Color = "white";
											}
											else {
												lstBtn.css("color", "black");
												transData.Buttons[0].Lists[0].Color = "black";
											}
										}
									}                                                                                   
								}
							}
						} 
						localStorage.setItem('transportation', JSON.stringify(transData));                                              
					}                
				});
			}
			else
			{
				//alert(menuType);
				$("#divFormMenu").append('<' + menuType + ' id="btn'+ menuId +'" type="file" style="height:35px;color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:12px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">'  + menuTitle + '</' + menuType + '>');												
			}																		
		}
	}
	//$("#divMenu").append('<div id="divDownload" class="w3-left"><button type="button" onclick="download()" style="margin-bottom:1px;width:100px;text-align:left;background-color:#2b4370" class="w3-btn w3-text-white w3-text w3-left" id="btnDownload" value="Download"></div>');	
	//$("#divMenu").append('<div id="divLanguage" class="w3-left"><div type="button" onclick="addHeader()" style="background-color:#2b4370;margin-bottom:5px;margin-top:5px;width:160px;text-align:left" class="w3-btn w3-left" id="btnLanguage" value="'+ curLanguage + '" /></div>');					
}

function onChange()
{
	//alert("onChange");
	curField = event.target;
	
	id = curField.id;
	
	if(id="txtAreaLList")
	{
		//alert("txtAreaLList has changed");
		//$("#btnAddItem").prop('disabled', false);
	}
	
	//$('textarea').on('change keyup keydown paste cut', 'textarea', function () {
	//alert("test: " + $("#" + curField.id).val().trim().length);
	
	//alert("textarea length = " + $("#" + curField.id).val().trim().length);
	//if($("#" + curField.id).val().trim().length > 20)
	//{
		//alert("textarea length = " + $("#" + curField.id).val().trim().length);
		//$("#" + curField.id).attr('rows',2);
	//}
	//}).find('textarea').change();
}

function getToolsMenu()
{
	//alert("getSideMenuData");
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	
	var curLanguage = "English";
	
	//alert("transData.ToolsMenu.length = " + transData.ToolsMenu.length);
	for(var i=0;i<transData.ToolsMenu.length;i++)
	{
		//alert(menuOnClick);
		var menuId = transData.ToolsMenu[i].Id;
		var menuTitle = transData.ToolsMenu[i].Title;
		var menuChecked = transData.ToolsMenu[i].Checked;
		var menuHeight = transData.ToolsMenu[i].Height;
		var menuWidth = transData.ToolsMenu[i].Width;
		var menuAlign = transData.ToolsMenu[i].Align;		
		var menuOnClick = transData.ToolsMenu[i].OnClick;
		var menuBGColor = transData.ToolsMenu[i].Backgroundcolor;
		var menuColor = transData.ToolsMenu[i].Color;		
		var menuType = transData.ToolsMenu[i].Type;		
		var menuMarginLeft = transData.ToolsMenu[i].MarginLeft;		
		var menuMarginBottom = transData.ToolsMenu[i].MarginBottom;				
		var menuBorder = "w3-border";
		var menuLogo = "url";
					
		if(menuChecked)
		{
			//alert(isMobile);
			if(isMobile)
			{
				menuAlign = "center"; //allgn the text
				menuwidth = "100";
				$("#divSideMenu").css("margin-left","10px");
				$("#divSideMenu").css("padding-left","10px");
				$("#divForm").css("margin-left","0px");
				$("#divTools").css("padding-left","15px");
			}
			else
			{
				//menuAlign = "left"; //align the text	
				//menuBorder = "";
				//menuwidth = "80";
				//$("#divMenu").css("padding-left","20px");
				//$("#divTools").css("padding-left","0px");
			}		                                                                                                          
			
			if(menuOnClick == "")
			{
				//$("#divToolsMenu").append('<button id="bgcolor" class="w3-bar-item w3-border w3-btn btn-default" style="text-align:left;font-size:14px;width:110px;margin-left:10px;margin-left:25px;margin-bottom:2px;display:block">Color</button>');											    
				//$("#divToolsMenu").append('<button id="bgcolor" class="w3-bar-item w3-border w3-btn btn-default" style="text-align:left;font-size:14px;width:110px;margin-left:10px;margin-left:25px;margin-bottom:2px;display:block">Color</button>');											    
				$("#divToolsMenu").append('<button id="btn'+ menuId +'" type=" ' + menuType + '" onclick="' + menuOnClick + '" style="display:none;color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:14px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + menuTitle + '</button>');										
				$("#btnbgcolor").ColorPickerSliders({
					previewontriggerelement: false,
					draggable: "true",
					color: curColor,
					title: "",
					order: {
						rgb:3,
						preview: 1
					},
					onchange: function(container, color) {
						var btn = null;              
						if(changeBtn == "Select All")
						{                                                                        						                
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{                    
								var curSecLabel = "lblsec" + i + "000SA";
								var curFldLabel = "lblfld" + i + "000SA";
								
								var secLabel = $("#"+ curSecLabel);                            
								secLabel.css("color", color.tiny.toRgbString());
								
								var fldLabel = $("#"+ curFldLabel);                            
								fldLabel.css("color", color.tiny.toRgbString());                    
							}
			
							for(var i=0;i<transData.Buttons[0].SelectAll.length;i++)
							{ 
								transData.Buttons[0].SelectAll[i].Color =  color.tiny.toRgbString();                                                                                                
							}
						}
						else if(changeBtn == "Sections")
						{
							transData.Buttons[0].Sections[0].Backgroundcolor =  color.tiny.toRgbString();                                          
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{                                
								var curSecBtn = "btnsec" + i + "000";
								var secBtn = $("#" + curSecBtn);
								secBtn.css("background-color", color.tiny.toRgbString());
								if (color.cielch.l < 60) {
									secBtn.css("color", "white");
									transData.Buttons[0].Sections[0].Color = "white";
								}
								else {
									secBtn.css("color", "black");
									transData.Buttons[0].Sections[0].Color = "black";
								}                                                                                      
							}
						}
						else if(changeBtn == "Fields")
						{
							transData.Buttons[0].Fields[0].Backgroundcolor =  color.tiny.toRgbString();
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{     				                  
								for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
								{                         
									var curFldBtn = "btnfld" + i + j + "00";                        
									var fldBtn = $("#" + curFldBtn);                      
									fldBtn.css("background-color", color.tiny.toRgbString());               
									if (color.cielch.l < 60) {
										fldBtn.css("color", "white");
										transData.Buttons[0].Fields[0].Color = "white";
									}
									else {
										fldBtn.css("color", "black");
										transData.Buttons[0].Fields[0].Color = "black";
									}                                                                                   
								}
							}
						}
						else if(changeBtn == "Subfields")
						{
							transData.Buttons[0].Subfields[0].Backgroundcolor =  color.tiny.toRgbString();
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{     				                  
								for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
								{   
									for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
									{                        
										var curSubBtn = "btnsub" + i + j + k + "0";                        
										var subBtn = $("#" + curSubBtn);                      
										subBtn.css("background-color", color.tiny.toRgbString());               
										if (color.cielch.l < 60) {
											subBtn.css("color", "white");
											transData.Buttons[0].Subfields[0].Color = "white";
										}
										else {
											subBtn.css("color", "black");
											transData.Buttons[0].Subfields[0].Color = "black";
										}                                                                                   
									}
								}
							}
						} 
						else if(changeBtn == "Lists")
						{
							transData.Buttons[0].Lists[0].Backgroundcolor =  color.tiny.toRgbString();
							for(var i=0;i<transData.Data[0].Sections.length;i++)
							{     				                  
								for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
								{  
									for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
									{  
										for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
										{                      
											var curLstBtn = "btnlst" + i + j + k + l;                        
											var lstBtn = $("#" + curLstBtn);                      
											lstBtn.css("background-color", color.tiny.toRgbString());               
											if (color.cielch.l < 60) {
												lstBtn.css("color", "white");
												transData.Buttons[0].Lists[0].Color = "white";
											}
											else {
												lstBtn.css("color", "black");
												transData.Buttons[0].Lists[0].Color = "black";
											}
										}
									}                                                                                   
								}
							}
						} 
						localStorage.setItem('transportation', JSON.stringify(transData));                                              
					}                
				});
			}
			else
			{
				$("#divToolsMenu").append('<button id="btn'+ menuId +'" type=" ' + menuType + '" onclick="' + menuOnClick + '" style="color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:14px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '" onclick="' + menuOnClick + '" onmouseover="onHover(this.id)" onmouseleave="onLeave(this.id)">' + menuTitle + '</button>');															
			}
			//$("#divMenu").append('<div id="div' + transData.Menus[i].Id + '"><button type=" ' + menuType + '" onclick="' + menuOnClick + '" style="width:100%;font-size:9px;color:black;margin-bottom:"' + menuMarginBottom + 'px";text-align:'+ menuAlign +'" id="' + menuId + '">'  + menuTitle + '</button></div>');										
			//$("#divMenu").append('<div id="div' + transData.Menus[i].Id + '"><button type=" ' + menuType + '" onclick="' + menuOnClick + '" style="width:100%;font-size:9px;color:' + menuColor + ';background-color:' + menuBGColor + ';margin-bottom:"' + menuMarginBottom + 'px";text-align:'+ menuAlign +'" id="' + menuId + '">'  + menuTitle + '</button></div>');										
			
			//$("#divMenu").append('<div><button>Button ' + i + '</div>');										
		}
	}
	//$("#divMenu").append('<div id="divDownload" class="w3-left"><button type="button" onclick="download()" style="margin-bottom:1px;width:100px;text-align:left;background-color:#2b4370" class="w3-btn w3-text-white w3-text w3-left" id="btnDownload" value="Download"></div>');	
	//$("#divMenu").append('<div id="divLanguage" class="w3-left"><div type="button" onclick="addHeader()" style="background-color:#2b4370;margin-bottom:5px;margin-top:5px;width:160px;text-align:left" class="w3-btn w3-left" id="btnLanguage" value="'+ curLanguage + '" /></div>');					
}

function getSectionData(transData)
{
	//alert("getSectionData");
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	
	//$("#divLevels").empty();
			
	var allSectionsChecked = 1;		
	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{	
		$("#divLevels").append("<div id='div" + i + "' style='margin-top:5px;margin-right:5px'></div>");	//this is the container for all of the buttons on the right tools menu			
		
		//These variables will be used to create/configure/manage each section on the form
		secId = transData.Data[0].Sections[i].Id; //global variable			
		var secName = transData.Data[0].Sections[i].Section;		
		var secChecked = transData.Data[0].Sections[i].Checked;

		if(secChecked == "")
		{
			allSectionsChecked = 0;
		}

		var secDisabled = transData.Data[0].Sections[i].Disabled;
		var secReadOnly = transData.Data[0].Sections[i].Readonly;		
		var secWidth = transData.Buttons[0].Sections[0].Width;
		var secHeight = transData.Data[0].Sections[i].Height;		
		var secBGColor = transData.Data[0].Sections[i].Backgroundcolor;				
		var secColor = transData.Data[0].Sections[i].Color;
		var secVisibility = transData.Data[0].Sections[i].Visibility;				
		var secMarginLeft = transData.Data[0].Sections[i].MarginLeft;						
		
		//These variables will be used to create and configure a button for each of the sections
		var secBtnId = transData.Data[0].Sections[i].Id;
		var secBtnName = transData.Data[0].Sections[i].Section;
		var secBtnChecked = transData.Data[0].Sections[i].Checked;
		var secBtnDisabled = transData.Data[0].Sections[i].Disabled;
		var secBtnReadOnly = transData.Data[0].Sections[i].ReadOnly;

		//These buttons will always share the same properties
		var secBtnWidth = transData.Buttons[0].Sections[0].Width;
		var secBtnHeight = transData.Buttons[0].Sections[0].Height;			
		var secBtnBGColor = transData.Buttons[0].Sections[0].Backgroundcolor;			
		var secBtnColor = transData.Buttons[0].Sections[0].Color;
		var secBtnVisibility = transData.Buttons[0].Sections[0].Visibility;				
		var secBtnMarginLeft = transData.Buttons[0].Sections[0].MarginLeft;		

		//These variables will be used to create and configure a Select All Sections NOTE: 0 is the index of Select All Sections
		var secSABtnId = transData.Buttons[0].SelectAll[0].Id;
		var secSABtnName = transData.Buttons[0].SelectAll[0].Section;
		var secSABtnChecked = transData.Buttons[0].SelectAll[0].Checked;
		var secSABtnDisabled = transData.Buttons[0].SelectAll[0].Disabled;
		var secSABtnReadOnly = transData.Buttons[0].SelectAll[0].ReadOnly;
		var secSABtnWidth = transData.Buttons[0].SelectAll[0].Width;
		var secSABtnHeight = transData.Buttons[0].SelectAll[0].Height;			
		var secSABtnBGColor = transData.Buttons[0].SelectAll[0].Backgroundcolor;		
		var secSABtnColor = transData.Buttons[0].SelectAll[0].Color;
		var secSABtnVisibility = transData.Buttons[0].SelectAll[0].Visibility;	
		var secSABtnMarginLeft = transData.Buttons[0].SelectAll[0].MarginLeft;	
		var secBtnColorPicker = "yellow";

		if(i==0)
		{
			$("#div" + i).append("<div style='padding:0px'><input id='chk" + secId + "SA' type='checkbox' class='w3-check' style='margin-left:" + secSABtnMarginLeft + "px' onclick='ischecked()' " + secSABtnChecked + "><label id='lbl" + secId + "SA' style='width:" + secBtnWidth + "px;color:" + secSABtnColor + ";margin-left:5px' align='left'>" + secSABtnName + "</label><img src='Images/colors.jpg' onclick='selectLevel(\"Select All\")' style='margin-left:5px;width:25px'/></div>");										
			$("#div" + i).append("<div style='padding:0px'><input id='chk" + secId + "' type='checkbox' class='w3-check' style='margin-left:" + secBtnMarginLeft + "px' onclick='ischecked()' " + secChecked + "><button id='btn" + secId + "' onclick='accordian(\"div" + secId + "\",\"" + secBtnName  + "\",\"" + i + "\")' class='secBtn w3-border w3-btn' style='font-size:14px;color:" + secBtnColor + ";background-color:" + secBtnBGColor + ";text-align:left;height:" + secBtnHeight + "px;width:" + secBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + secBtnDisabled + " " + secBtnReadOnly + " contenteditable>" + secBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Sections\")' style='margin-left:5px;width:25px'/></div>");						
			$("#div" + i).append("<div style='padding:0px' id='div" + secId + "' class='w3-accordion-content w3-show'></div>");				
		}
		else
		{
			$("#div" + i).append("<div style='padding:0px'><input id='chk" + secId + "' type='checkbox' class='w3-check' style='margin-left:" + secBtnMarginLeft + "px' onclick='ischecked()' " + secChecked + "><button id='btn" + secId + "' onclick='accordian(\"div" + secId + "\",\"" + secBtnName  + "\",\"" + i + "\")' class='secBtn w3-border w3-btn' style='font-size:14px;color:" + secBtnColor + ";background-color:" + secBtnBGColor + ";text-align:left;height:" + secBtnHeight + "px;width:" + secBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + secBtnDisabled + " " + secBtnReadOnly + " contenteditable>" + secBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
			$("#div" + i).append("<div id='div" + secId + "' style='padding:0px' class='w3-accordion-content w3-show'></div>");				
		}

		if(i==0)
		{
			if(allSectionsChecked == 1)
			{
				document.getElementById("chksec" + i + "000SA").checked = true;
			}
			else
			{
				document.getElementById("chksec" + i + "000SA").checked = false;
			}
		}
	}
	//alert("allSectionsChecked = " + allSectionsChecked);

	/*
	if(document.getElementById("chksec0000SA") != null)
	{
		if(allSectionsChecked == 1)
		{
			document.getElementById("chksec0000SA").checked = true;
		}
		else
		{
			document.getElementById("chksec0000SA").checked = false;
		}
	}
	*/
}

function getFieldData()
{
	//alert("getFieldData");		
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	
	
	var allFieldsChecked = 1;
	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{		
		var secId = transData.Data[0].Sections[i].Id;
		$("#div" + secId).empty();

		for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
		{			
			//These variables will be used to create/configure/manage each section on the form
			fldId = transData.Data[0].Sections[i].Fields[j].Id;
			var fldName = transData.Data[0].Sections[i].Fields[j].Field;		
			//alert(fldName);
			
			var fldChecked = transData.Data[0].Sections[i].Fields[j].Checked;

			if(fldChecked == "")
			{
				allFieldsChecked = 0;
			}

			var fldType = transData.Data[0].Sections[i].Fields[j].Type;
			
			if(fldType == "Table")
			{
				subTableFlag = 1;
			}

			//alert(fldType);
			//alert(subTableFlag);
			var fldDisabled = transData.Data[0].Sections[i].Fields[j].Disabled;
			var fldReadOnly = transData.Data[0].Sections[i].Fields[j].Readonly;		
			var fldWidth = transData.Buttons[0].Sections[0].Width;
			var fldHeight = transData.Data[0].Sections[i].Fields[j].Height;		
			var fldBGColor = transData.Data[0].Sections[i].Fields[j].Backgroundcolor;				
			var fldColor = transData.Data[0].Sections[i].Fields[j].Color;
			var fldVisibility = transData.Data[0].Sections[i].Fields[j].Visibility;				
			var fldMarginLeft = transData.Data[0].Sections[i].Fields[j].MarginLeft;						
			
			//These variables will be used to create and configure a button for each of the fields
			var fldBtnId = transData.Data[0].Sections[i].Fields[j].Id;
			var fldBtnName = transData.Data[0].Sections[i].Fields[j].Field;
			var fldBtnChecked = transData.Data[0].Sections[i].Fields[j].Checked;
			var fldBtnDisabled = transData.Data[0].Sections[i].Fields[j].Disabled;
			var fldBtnReadOnly = transData.Data[0].Sections[i].Fields[j].ReadOnly;

			//These button will always share the same properties
			var fldBtnWidth = transData.Buttons[0].Fields[0].Width;
			var fldBtnHeight = transData.Buttons[0].Fields[0].Height;			
			var fldBtnBGColor = transData.Buttons[0].Fields[0].Backgroundcolor;	
			//alert("Field button color = " + fldBtnBGColor);		
			var fldBtnColor = transData.Buttons[0].Fields[0].Color;
			var fldBtnVisibility = transData.Buttons[0].Fields[0].Visibility;				
			var fldBtnMarginLeft = transData.Buttons[0].Fields[0].MarginLeft;		

			//These variables will be used to create and configure a Select All Fields NOTE: 0 is the index of Select All Fields
			var fldSABtnId = transData.Buttons[0].SelectAll[1].Id;
			var fldSABtnName = transData.Buttons[0].SelectAll[1].Field;
			var fldSABtnChecked = transData.Buttons[0].SelectAll[1].Checked;
			var fldSABtnDisabled = transData.Buttons[0].SelectAll[1].Disabled;
			var fldSABtnReadOnly = transData.Buttons[0].SelectAll[1].ReadOnly;
			var fldSABtnWidth = transData.Buttons[0].SelectAll[1].Width;
			var fldSABtnHeight = transData.Buttons[0].SelectAll[1].Height;			
			var fldSABtnBGColor = transData.Buttons[0].SelectAll[1].Backgroundcolor;			
			var fldSABtnColor = transData.Buttons[0].SelectAll[1].Color;
			var fldSABtnVisibility = transData.Buttons[0].SelectAll[1].Visibility;	
			var fldSABtnMarginLeft = transData.Buttons[0].SelectAll[1].MarginLeft;	
			//alert(fldSABtnMarginLeft);
			//this is the select all sections field which needs the colorpicker 
			//var secSABtnColorPicker = "<input id='clr" + secId + "SA' type='color' onchange='getSecSABtnColor()' onclick='getSecSABtnColor()' value='" + secSABtnColor + "' style='background-color:" + secSABtnBGColor + ";width:25px;margin-left:5px;visibility:" + secSABtnVisibility + "'/>";			
			//var secSABtnColorPicker = "";			
			
			if(j==0)
			{				
				$("#div" + secId).append("<div><input id='chk" + fldId + "SA' type='checkbox' class='w3-check' style='margin-left:" + fldSABtnMarginLeft + "px' onclick='ischecked()' " + fldSABtnChecked + "><label id='lbl" + fldId + "SA' style='width:" + fldBtnWidth + "px;color:" + fldSABtnColor + ";margin-left:5px' align='left'>Select All Fields</label><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");										
				$("#div" + secId).append("<div><input id='chk" + fldId + "' type='checkbox' class='w3-check' style='margin-left:" + fldBtnMarginLeft + "px' onclick='ischecked()' " + fldChecked + "><button id='btn" + fldId + "' onclick='accordian(\"div" + fldId + "\",\"" + fldBtnName  + "\",\"" + i + "\")' class='fldBtn w3-border w3-btn' style='font-size:14px;color:" + fldBtnColor + ";background-color:" + fldBtnBGColor + ";text-align:left;height:" + fldBtnHeight + "px;width:" + fldBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + fldBtnDisabled + " " + fldBtnReadOnly + " contenteditable>" + fldBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Fields\")' style='margin-left:5px;width:25px'/></div>");						
				$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content w3-show'></div>");						
			}
			else
			{
				$("#div" + secId).append("<div><input id='chk" + fldId + "' type='checkbox' class='w3-check' style='margin-left:" + fldBtnMarginLeft + "px' onclick='ischecked()' " + fldChecked + "><button id='btn" + fldId + "' onclick='accordian(\"div" + fldId + "\",\"" + fldBtnName  + "\",\"" + i + "\")' class='fldBtn w3-border w3-btn' style='font-size:14px;color:" + fldBtnColor + ";background-color:" + fldBtnBGColor + ";text-align:left;height:" + fldBtnHeight + "px;width:" + fldBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + fldBtnDisabled + " " + fldBtnReadOnly + " contenteditable>" + fldBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
				$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content w3-hide'></div>");	
			}

			if(j==0)
			{
				if(allFieldsChecked == 1)
				{
					document.getElementById("chkfld" + i + j + "00SA").checked = true;
				}
				else
				{
					document.getElementById("chkfld" + i + j + "00SA").checked = false;
				}
			}
		}
	}
}

function getSubTableData(transData)
{
	alert("Get table transData");
}

function getSubfieldData()
{
	//alert("getSubfieldData");
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);

	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{
		for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
		{
			fldId = transData.Data[0].Sections[i].Fields[j].Id;
			var allSubfieldsChecked = 1;
			for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
			{
				//These variables will be used to create/configure/manage each section on the form
				subId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
				var subName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;		
				//alert(subName);
				var subChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;

				if(subChecked == "")
				{
					allSubfieldsChecked = 0;
				}

				var subDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;
				var subReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Readonly;		
				var subWidth = transData.Buttons[0].Subfields[0].Width;
				var subHeight = transData.Data[0].Sections[i].Fields[j].Subfields[k].Height;		
				var subBGColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Backgroundcolor;				
				var subColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Color;
				var subVisibility = transData.Data[0].Sections[i].Fields[j].Subfields[k].Visibility;				
				var subMarginLeft = transData.Data[0].Sections[i].Fields[j].Subfields[k].MarginLeft;						

				//These variables will be used to create and configure a button for each of the fields
				var subBtnId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
				var subBtnName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;
				var subBtnChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
				var subBtnDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;
				var subBtnReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].ReadOnly;

				//These button will always share the same properties
				var subBtnWidth = transData.Buttons[0].Subfields[0].Width;
				var subBtnHeight = transData.Buttons[0].Subfields[0].Height;			
				var subBtnBGColor = transData.Buttons[0].Subfields[0].Backgroundcolor;	
				//alert("Field button color = " + subBtnBGColor);		
				var subBtnColor = transData.Buttons[0].Subfields[0].Color;
				var subBtnVisibility = transData.Buttons[0].Subfields[0].Visibility;				
				var subBtnMarginLeft = transData.Buttons[0].Subfields[0].MarginLeft;		

				//These variables will be used to create and configure a Select All Fields NOTE: 0 is the index of Select All Fields
				var subSABtnId = transData.Buttons[0].SelectAll[2].Id;
				var subSABtnName = transData.Buttons[0].SelectAll[2].Subfield;
				var subSABtnChecked = transData.Buttons[0].SelectAll[2].Checked;
				var subSABtnDisabled = transData.Buttons[0].SelectAll[2].Disabled;
				var subSABtnReadOnly = transData.Buttons[0].SelectAll[2].ReadOnly;
				var subSABtnWidth = transData.Buttons[0].SelectAll[2].Width;
				var subSABtnHeight = transData.Buttons[0].SelectAll[2].Height;			
				var subSABtnBGColor = transData.Buttons[0].SelectAll[2].Backgroundcolor;			
				var subSABtnColor = transData.Buttons[0].SelectAll[2].Color;
				var subSABtnVisibility = transData.Buttons[0].SelectAll[2].Visibility;	
				var subSABtnMarginLeft = transData.Buttons[0].SelectAll[2].MarginLeft;

				//alert(subSABtnMarginLeft);
				//this is the select all sections field which needs the colorpicker 
				//var subSABtnColorPicker = "<input id='clr" + subId + "SA' type='color' onchange='getSubSABtnColor()' onclick='getSABtnColor()' value='" + secSABtnColor + "' style='background-color:" + secSABtnBGColor + ";width:25px;margin-left:5px;visibility:" + secSABtnVisibility + "'/>";			
				//var subSABtnColorPicker = "";			

				if(k==0)
				{				
					$("#div" + fldId).append("<div><input id='chk" + subId + "SA' type='checkbox' class='w3-check' style='margin-left:" + subSABtnMarginLeft + "px' onclick='ischecked()' " + subSABtnChecked + "><label id='lbl" + subId + "SA' style='width:" + subBtnWidth + "px;color:" + subSABtnColor + ";margin-left:5px' align='left'>Select All Subfields</label><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");										
					$("#div" + fldId).append("<div><input id='chk" + subId + "' type='checkbox' class='w3-check' style='margin-left:" + subBtnMarginLeft + "px' onclick='ischecked()' " + subChecked + "><button id='btn" + subId + "' onclick='accordian(\"div" + subId + "\",\"" + subBtnName  + "\",\"" + i + "\")' class='subBtn w3-border w3-btn' style='font-size:14px;color:" + subBtnColor + ";background-color:" + subBtnBGColor + ";text-align:left;height:" + subBtnHeight + "px;width:" + subBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + subBtnDisabled + " " + subBtnReadOnly + " contenteditable>" + subBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Subfields\")' style='margin-left:5px;width:25px'/></div>");						
					$("#div" + fldId).append("<div id='div" + subId + "' class='w3-accordion-content w3-show'></div>");	
				}
				else
				{
					$("#div" + fldId).append("<div><input id='chk" + subId + "' type='checkbox' class='w3-check' style='margin-left:" + subBtnMarginLeft + "px' onclick='ischecked()' " + subChecked + "><button id='btn" + subId + "' onclick='accordian(\"div" + subId + "\",\"" + subBtnName  + "\",\"" + i + "\")' class='subBtn w3-border w3-btn' style='font-size:14px;color:" + subBtnColor + ";background-color:" + subBtnBGColor + ";text-align:left;height:" + subBtnHeight + "px;width:" + subBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + subBtnDisabled + " " + subBtnReadOnly + " contenteditable>" + subBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
					$("#div" + fldId).append("<div id='div" + subId + "' class='w3-accordion-content w3-hide'></div>");	
				}
				
				if(k==0)
				{
					if(allSubfieldsChecked == 1)
					{
						document.getElementById("chksub" + i + j + k + "0SA").checked = true;
					}
					else
					{					
						//alert("chksub" + i + j + k + "0SA");
						document.getElementById("chksub" + i + j + k + "0SA").checked = false;
					}
				}
			}
		}
	}
}

function getListData(transData)
{
	//alert("getListData");
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);

	var allListsChecked = 1;
	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{
		for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
		{
			for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
			{
				subId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
				for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
				{			
					//These variables will be used to create/configure/manage each section on the form				
					lstId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Id;
					var lstName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List;
					//alert(lstName);		
					var lstChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Checked;
					
					if(lstChecked == "")
					{
						allListsChecked = 0;
					}
					
					var lstDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Disabled;
					var lstReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Readonly;		
					var lstWidth = transData.Buttons[0].Subfields[0].Width;
					var lstHeight = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Height;		
					var lstBGColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Backgroundcolor;				
					var lstColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Color;
					var lstVisibility = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Visibility;				
					var lstMarginLeft = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].MarginLeft;						
					
					//These variables will be used to create and configure a button for each of the fields
					var lstBtnId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Id;
					var lstBtnName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List;
					var lstBtnChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Checked;
					var lstBtnDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Disabled;
					var lstBtnReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].ReadOnly;

					//These button will always share the same properties
					var lstBtnWidth = transData.Buttons[0].Lists[0].Width;
					var lstBtnHeight = transData.Buttons[0].Lists[0].Height;			
					var lstBtnBGColor = transData.Buttons[0].Lists[0].Backgroundcolor;	
					//alert("Field button color = " + lstBtnBGColor);		
					var lstBtnColor = transData.Buttons[0].Lists[0].Color;
					var lstBtnVisibility = transData.Buttons[0].Lists[0].Visibility;				
					var lstBtnMarginLeft = transData.Buttons[0].Lists[0].MarginLeft;		

					//These variables will be used to create and configure a Select All Fields NOTE: 0 is the index of Select All Fields
					var lstSABtnId = transData.Buttons[0].SelectAll[3].Id;
					var lstSABtnName = transData.Buttons[0].SelectAll[3].List;
					var lstSABtnChecked = transData.Buttons[0].SelectAll[3].Checked;
					var lstSABtnDisabled = transData.Buttons[0].SelectAll[3].Disabled;
					var lstSABtnReadOnly = transData.Buttons[0].SelectAll[3].ReadOnly;
					var lstSABtnWidth = transData.Buttons[0].SelectAll[3].Width;
					var lstSABtnHeight = transData.Buttons[0].SelectAll[3].Height;			
					var lstSABtnBGColor = transData.Buttons[0].SelectAll[3].Backgroundcolor;			
					var lstSABtnColor = transData.Buttons[0].SelectAll[3].Color;
					var lstSABtnVisibility = transData.Buttons[0].SelectAll[3].Visibility;	
					var lstSABtnMarginLeft = transData.Buttons[0].SelectAll[3].MarginLeft;

					//alert(lstSABtnMarginLeft);
					//this is the select all sections field which needs the colorpicker 
					//var lstSABtnColorPicker = "<input id='clr" + lstId + "SA' type='color' onchange='getSubSABtnColor()' onclick='getSABtnColor()' value='" + secSABtnColor + "' style='background-color:" + secSABtnBGColor + ";width:25px;margin-left:5px;visibility:" + secSABtnVisibility + "'/>";			
					//var lstSABtnColorPicker = "";			
					
					if(l==0)
					{				
						$("#div" + subId).append("<div><input id='chk" + lstId + "SA' type='checkbox' class='w3-check' style='margin-left:" + lstSABtnMarginLeft + "px' onclick='ischecked()' " + lstSABtnChecked + "><label id='lbl" + lstId + "SA' style='width:" + lstBtnWidth + "px;color:" + lstSABtnColor + ";margin-left:5px' align='left'>Select All Lists</label><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");										
						$("#div" + subId).append("<div><input id='chk" + lstId + "' type='checkbox' class='w3-check' style='margin-left:" + lstBtnMarginLeft + "px' onclick='ischecked()' " + lstChecked + "><button id='btn" + lstId + "' onclick='accordian(\"div" + lstId + "\",\"" + lstBtnName  + "\",\"" + i + "\")' class='lstBtn w3-border w3-btn' style='font-size:14px;color:" + lstBtnColor + ";background-color:" + lstBtnBGColor + ";text-align:left;height:" + lstBtnHeight + "px;width:" + lstBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + lstBtnDisabled + " " + lstBtnReadOnly + " contenteditable>" + lstBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Lists\")' style='margin-left:5px;width:25px'/></div>");						
						$("#div" + subId).append("<div id='div" + lstId + "' class='w3-dropdown-content w3-show'></div>");	
					}
					else
					{
						$("#div" + subId).append("<div><input id='chk" + lstId + "' type='checkbox' class='w3-check' style='margin-left:" + lstBtnMarginLeft + "px' onclick='ischecked()' " + lstChecked + "><button id='btn" + lstId + "' onclick='accordian(\"div" + lstId + "\",\"" + lstBtnName  + "\",\"" + i + "\")' class='lstBtn w3-border w3-btn' style='font-size:14px;color:" + lstBtnColor + ";background-color:" + lstBtnBGColor + ";text-align:left;height:" + lstBtnHeight + "px;width:" + lstBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + lstBtnDisabled + " " + lstBtnReadOnly + " contenteditable>" + lstBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
						$("#div" + subId).append("<div id='div" + lstId + "' class='w3-dropdown-content w3-hide'></div>");	
					}	
					
					if(allListsChecked == 1)
					{
						document.getElementById("chklst" + i + j + l + "SA").checked = true;
					}
					else
					{
						document.getElementById("chklst" + i + j + l + "SA").checked = false;
					}
				}				
			}
		}
	}
}

function getLogo()
{
	//alert("getLogo");
	var reader = new FileReader();
	readFile = function () 
	{
		reader.onload = function () 
		{
			//alert("importFlag: ");
			var filePath = document.getElementById("btnLogo").value;
			//alert("filePath: " + filePath);
			var fileName = filePath.split("\\")[2];
			logoFile = fileName;
			transData.url = logoFile;
			localStorage.setItem('transportation', JSON.stringify(transData));
			retrievedObjectTransportation = localStorage.getItem('transportation');	
			transData = JSON.parse(retrievedObjectTransportation);
			logoFile = transData.url;
			//alert(logoFile);
			addLogo(logoFile);
		};
		reader.readAsBinaryString(logoFile.files[0]);
	};
}

function getFile()
{
	//alert("getFile");
	readFile = function () {
		var curData = "";
		var newArray = [];
		//test1.push("value");
		//test1.push("value2");
		var colCount = -1;
		var reader = new FileReader();
		var secId = $("#txtSection").val(); 
		
		reader.onload = function () {
			//alert("importFlag: " + importFlag);
			var filePath = document.getElementById("btnCSV").value;
			var fileName =filePath.split("\\")[2];
			sectionsFile = "Ajax/" + fileName;  
			alert("sectionsFile = " + sectionsFile);
		}
	}
}

function getFilex()
{
	alert("getFile");
	readFile = function () {
		var curData = "";
		var newArray = [];
		//test1.push("value");
		//test1.push("value2");
		var colCount = -1;
		var reader = new FileReader();
		var secId = $("#txtSection").val(); 
		
		reader.onload = function () {
			//alert("importFlag: " + importFlag);
			var filePath = document.getElementById("btnCSV").value;
			var fileName =filePath.split("\\")[2];
			sectionsFile = "Ajax/" + fileName;  
			alert("sectionsFile = " + sectionsFile);

			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					sectionData = JSON.parse(this.responseText);
					localStorage.setItem('sections', JSON.stringify(sectionData));
				}
			};
					
			xhttp.open("GET", sectionsFile, true);
			xhttp.send();
			//btnImportNew().click();
			//importNewSection();
			
			//alert(sectionsFile);
			if(importFlag == "frm")
			{
				//alert("Import Form");
				var frmData = reader.result.split(',');								
				var fieldCount = -1;
				var secName = "";
				for(var i=0;i<frmData.length;i++)
				{
					if(frmData[i].indexOf(":") == -1)
					{	
						//alert("Section " + frmData[i]);
						sectionsCount++;
						secName = frmData[i];
						transData.Data[0].Sections.push ( {"Id":"sec" + i + "000","Section":secName,"Fields": []} );
						localStorage.setItem("transportation", JSON.stringify(transData));
						//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
						//alert("Before conversion: " + secNames[i]);
						var newtTitle = toTitleCase(secName);
						//alert("after conversion: " + newtTitle);
						$("#divSecList" + secCount).append("<a onclick='setSection(\"" + newtTitle + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + newtTitle + "</a>"); 				 										
						secId++;
					}
					else
					{
						//alert("Field " + frmData[i]);
						fieldCount++;
						var fldName = frmData[i];
						retrievedObjectTransportation = localStorage.getItem('transportation');	
						transData = JSON.parse(retrievedObjectTransportation);
						transData.Data[0].Sections[secId].Fields.push (
							{				
								"Id": "fld" + secId + fieldCount + "00",
								"Field": fldName,
								"Checked": "",
								"Readonly": "",
								"Disabled": "Disabled",
								"Width": "255",
								"Height": "35",
								"Textcolor": "#000000",
								"MarginLeft": "0",
								"Backgroundcolor": "#2b4370",
								"Subfields": [
									{
										"Id": "sub" + secId + fieldCount + "00",
										"Subfield": fldName,
										"ToolTip": "",
										"Checked": "",
										"Required": "",
										"Key": "",
										"Type": "Button",
										"Readonly": "",
										"Disabled": "Disabled",
										"Size": "",
										"Width": "175",
										"Height": "35",
										"Minlength": "9",
										"Maxlength": "50",
										"Textcolor": "#000000",
										"MarginLeft": "30",
										"Backgroundcolor": "#486aa0",
										"Fieldlength": "",
										"Datetype": "",
										"Function1": "",
										"Function2": "",
										"Function3": "",
										"Logic1": "",
										"Logic2": "",
										"Logic3": "",
										"Value1": "",
										"Value2": "",
										"Value3": "",
										"Group1": "",
										"Group2": "",
										"Group3": "",
										"Lists": [											
										]
									}					
								]
							}
						)
					}
				}
			}
			if(importFlag == "sec")
			{		
				var secNames = reader.result.split(',');							
				var sectionsCount = 0;
				var fieldsCount = 0;
				for(var i=0;i<secNames.length;i++)
				{						
					sectionsCount++;
					transData.Data[0].Sections.push ( {"Id":"sec" + i + "000","Section":secNames[i],"Fields": [{"Subfields":[{"Lists":[]}]}]} );
					localStorage.setItem("transportation", JSON.stringify(transData));
					//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
					//alert("Before conversion: " + secNames[i]);
					var newtTitle = toTitleCase(secNames[i]);
					alert("after conversion: " + newtTitle);
					$("#divSecList" + secCount).append("<a onclick='setSection(\"" + newtTitle + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + newtTitle + "</a>"); 				 										
				}			
			}			
			else if(importFlag == "fld")
			{	
				//alert("Import Fields");			
				//var fldNames = reader.result.split(',');
				var dataRows = reader.result.split('\n');
				$("#divNav").hide();	
				$("#divNavFields").show();	
				var dataRow = null;
				var fieldCount = -1;
				for(var i=0;i<dataRows.length;i++)
				{
					var dataRow = dataRows[i].split(",");
					for(var j=0;j<dataRow.length;j++)
					{	
						fieldCount++;
						var thisField = null;
						var thisSubfield = null;												

						if(j==0)
						{
							thisField = dataRow[j] + ":";
							$("#divNavFields").append("<button id='btn"+ thisField +"' class='w3-bar-item w3-btn w3-border w3-center' style='height:40px;font-size:14px;width:110px;margin-right:2px;margin-bottom:2px;display:block' onclick='addNames(\"" + thisField + "\")'>"+ thisField +"</button>");							

							transData.Data[0].Sections[secId].Fields.push (
								{				
									"Id": "fld" + secId + i + "00",
									"Field": thisField,
									"Type": thisField,
									"Checked": "",
									"ReadOnly": "",
									"Disabled": "Disabled",
									"Width": "255",
									"Height": "35",
									"Textcolor": "#000000",
									"MarginLeft": "0",
									"BackgroundColor": "#2b4370",
									"Subfields": []
								} 
							);
							
							thisSubfield = dataRow[j] + ":";
							transData.Data[0].Sections[secId].Fields[i].Subfields.push (
								{				
									"Id": "sub" + secId + i + j + "0",
									"Subfield": thisSubfield,
									"ToolTip": "",
									"Checked": "",
									"Required": "",
									"Key": "",
									"Type": "Text",
									"Readonly": "",
									"Disabled": "Disabled",
									"Size": "",
									"Width": "150",
									"Height": "35",
									"Minlength": "9",
									"Maxlength": "50",
									"Textcolor": "#000000",
									"MarginLeft": "30",
									"Backgroundcolor": "#486aa0",
									"Fieldlength": "",
									"Datetype": "",
									"Function1": "",
									"Function2": "",
									"Function3": "",
									"Logic1": "",
									"Logic2": "",
									"Logic3": "",
									"Value1": "",
									"Value2": "",
									"Value3": "",
									"Group1": "",
									"Group2": "",
									"Group3": "",
									"Lists": []
								} 
							);
						}
						else
						{
							thisSubfield = dataRow[j] + ":";
							transData.Data[0].Sections[secId].Fields[i].Subfields.push (
								{				
									"Id": "sub" + secId + i + j + "0",
									"Subfield": thisSubfield,
									"ToolTip": "",
									"Checked": "",
									"Required": "",
									"Key": "",
									"Type": "Text",
									"Readonly": "",
									"Disabled": "Disabled",
									"Size": "",
									"Width": "150",
									"Height": "35",
									"Minlength": "9",
									"Maxlength": "50",
									"Textcolor": "#000000",
									"MarginLeft": "30",
									"Backgroundcolor": "#486aa0",
									"Fieldlength": "",
									"Datetype": "",
									"Function1": "",
									"Function2": "",
									"Function3": "",
									"Logic1": "",
									"Logic2": "",
									"Logic3": "",
									"Value1": "",
									"Value2": "",
									"Value3": "",
									"Group1": "",
									"Group2": "",
									"Group3": "",
									"Lists": []
								} 
							);
						}
					}					
				}								

				localStorage.setItem("transportation", JSON.stringify(transData));
				retrievedObjectTransportation = localStorage.getItem('transportation');	
				transData = JSON.parse(retrievedObjectTransportation);
				getFieldData();
				getSubfieldData();
				getListData();
				//$("#fldBarDD" + ).empty();
				alert("Sections length = " + transData.Data[0].Sections.length);
								
				for(var i=0;i<transData.Data[0].Sections.length;i++)
				{							
					for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
					{
						//alert("i = " + i);
						//alert("j = " + j);
						//alert("k = " + transData.Data[0].Sections[i].Fields[j].Subfields.length);

						for(var k=1;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
						{
							var fldName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;
							var isChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
							var isReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Readonly;
							var isDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;

							if(j<transData.Data[0].Sections[i].Fields[j].length-1)
							{
								$("#fldBarDD" + j).append("<br><input id='chkFld" + j + "' type='checkbox' class='w3-check' style='margin-left:25px'  " + isChecked + "><button id='btn" + "0" + j + "' onclick='addDD(\"" + fldName + "\"," + j + "," + (j+1) + ")' class='w3-border w3-button' style='text-align:left;width:200px;margin-left:5px;margin-bottom:5px;' " + isDisabled + " " + isReadOnly + " contenteditable>" + fldName + "</button>");
							}
							else
							{
								$("#fldBarDD" + j).append("<br><input id='chkFld" + j + "' type='checkbox' class='w3-check' style='margin-left:25px'  " + isChecked + "><button id='btn" + "0" + j + "' onclick='addDD(\"" + fldName + "\"," + j + "," + (j+1) + ")' class='w3-border w3-button' style='text-align:left;width:300px;margin-left:5px;margin-bottom:5px;' " + isDisabled + " " + isReadOnly + " contenteditable>" + fldName + "</button><img src='Images/add.jpg' onclick='addField(" + (j+1) + ")' style='margin-left:5px;width:20px'/>");
							}								
						}
					}
				}
				/*
				secId = $("#txtSection").val();			
				//alert("secId = " + secId);
				var fieldCount = transData.Data[0].Sections[secId].Fields.length;
				$("#divDDFields" + "0").append("<div id='fldBarDD" + "0" + "' class='w3-bar w3-white' style'display:none'></div>");
				//adding new fields to the dropdown list for this section
				//alert("Import Fields");	
				for(var i=0;i<transData.Data[0].Sections.length;i++)
				{
					var SecName = transData.Data[0].Sections[i].Section;
					if(i == secId)
					{
						//alert("Match on sec " + i);
						for(var j=0;j<fldNames.length;j++)
						{		
							transData.Data[0].Sections[secId].Fields.push (
								{				
									"Id": "fld" + secId + fieldCount + "00",
									"Field": fldNames[j],
									"Type": "Name",
									"Checked": "Checked",
									"ReadOnly": "",
									"Disabled": "",
									"Width": "255",
									"Height": "35",
									"Textcolor": "",
									"MarginLeft": "0",
									"BackgroundColor": "#2b4370",
									"Subfields": []
								} 
							);
							fieldCount++;		
						}
					}
				}

				localStorage.setItem("transportation", JSON.stringify(transData));
				retrievedObjectTransportation = localStorage.getItem('transportation');	
				transData = JSON.parse(retrievedObjectTransportation);
				
				$("#fldBarDD" + "0").empty();
				//alert(transData.Data[0].Sections.length);
				for(var i=0;i<transData.Data[0].Sections.length;i++)
				{							
					for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
					{
						//alert("i = " + i);
						//alert("j = " + j);
						//alert("k = " + transData.Data[0].Sections[i].Fields[j].Subfields.length);

						for(var k=1;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
						{
							var fldName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;
							var isChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
							var isReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Readonly;
							var isDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;

							if(j<transData.Data[0].Sections[i].Fields[j].length-1)
							{
								$("#fldBarDD" + "0").append("<br><input id='chkFld" + j + "' type='checkbox' class='w3-check' style='margin-left:25px'  " + isChecked + "><button id='btn" + "0" + j + "' onclick='addDD(\"" + fldName + "\"," + j + "," + (j+1) + ")' class='w3-border w3-button' style='text-align:left;width:200px;margin-left:5px;margin-bottom:5px;' " + isDisabled + " " + isReadOnly + " contenteditable>" + fldName + "</button>");
							}
							else
							{
								$("#fldBarDD" + "0").append("<br><input id='chkFld" + j + "' type='checkbox' class='w3-check' style='margin-left:25px'  " + isChecked + "><button id='btn" + "0" + j + "' onclick='addDD(\"" + fldName + "\"," + j + "," + (j+1) + ")' class='w3-border w3-button' style='text-align:left;width:300px;margin-left:5px;margin-bottom:5px;' " + isDisabled + " " + isReadOnly + " contenteditable>" + fldName + "</button><img src='Images/add.jpg' onclick='addField(" + (j+1) + ")' style='margin-left:5px;width:20px'/>");
							}								
						}
					}
				}
				*/
				//addDD(secId);								
			}
			else if(importFlag == "sub")
			{
				var subNames = reader.result.split(',');
				var subCount = transData.Data[0].Sections[secId].Fields[0].Subfields.length;
				$("#divDDSubfields" + "0").append("<div id='subBarDD" + "0" + "' class='w3-bar w3-white' style'display:none'></div>");
				alert("adding new subfields");
				
				for(var j=0;j<subNames.length;j++)
				{		
					transData.Data[0].Sections[secId].Fields.push (
						{				
							"Id": "sub00" + subCount + "0",
							"Field": subNames[j],
							"Checked": "Checked",
							"Readonly": "",
							"Disabled": "",
							"Width": "255",
							"Height": "35",
							"Textcolor": "#000000",
							"MarginLeft": "0",
							"Backgroundcolor": "#2b4370",
							"Subfields": [
								{
									"Id": "sub00" + subCount + "0",
									"Subfield": subNames[j],
									"ToolTip": "",
									"Checked": "Checked",
									"Required": "",
									"Key": "",
									"Type": "Button",
									"Readonly": "",
									"Disabled": "",
									"Size": "",
									"Width": "150",
									"Height": "35",
									"Minlength": "9",
									"Maxlength": "50",
									"Textcolor": "#000000",
									"MarginLeft": "30",
									"Backgroundcolor": "#486aa0",
									"Fieldlength": "",
									"Datetype": "",
									"Function1": "",
									"Function2": "",
									"Function3": "",
									"Logic1": "",
									"Logic2": "",
									"Logic3": "",
									"Value1": "",
									"Value2": "",
									"Value3": "",
									"Group1": "",
									"Group2": "",
									"Group3": "",
									"Lists": [
										{
											"Id": "lst00" + subCount + "0",
											"List": "Enter List Name",
											"Checked": "Checked",
											"Readonly": "",
											"Disabled": "",
											"Width": "150",
											"Height": "35",
											"Textcolor": "",
											"MarginLeft": "60",
											"Backgroundcolor": "#7e8faf"
										}
									]
								}					
							]
						} 
					);
					subCount++;		
				}

				localStorage.setItem("transportation", JSON.stringify(transData));
				retrievedObjectTransportation = localStorage.getItem('transportation');	
				transData = JSON.parse(retrievedObjectTransportation);
				
				//$("#subBarDD" + secId).empty();
				//alert(transData.Data[0].Sections.length);
				for(var i=0;i<transData.Data[0].Sections.length;i++)
				{							
					for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
					{					
						for(var k=1;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
						{
							var subName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;
							var subChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
							var subReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Readonly;
							var subDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;

							if(j<transData.Data[0].Sections[i].Fields[j].Subfields.length-1)
							{
								$("#subBarDD" + k).append("<br><input id='chkSub" + k + "' type='checkbox' class='w3-check' style='margin-left:25px'  " + subChecked + "><button id='btn" + "0" + k + "' onclick='addDD(\"" + fldName + "\"," + j + "," + (j+1) + ")' class='w3-border w3-button' style='text-align:left;width:200px;margin-left:5px;margin-bottom:5px;' " + subDisabled + " " + subReadOnly + " contenteditable>" + subName + "</button>");
							}
							else
							{
								$("#subBarDD" + k).append("<br><input id='chkSub" + k + "' type='checkbox' class='w3-check' style='margin-left:25px'  " + subChecked + "><button id='btn" + "0" + k + "' onclick='addDD(\"" + fldName + "\"," + j + "," + (j+1) + ")' class='w3-border w3-button' style='text-align:left;width:300px;margin-left:5px;margin-bottom:5px;' " + subDisabled + " " + subReadOnly + " contenteditable>" + subName + "</button><img src='Images/add.jpg' onclick='addField(" + (k+1) + ")' style='margin-left:5px;width:20px'/>");
							}								
						}
					}
				}
			}
			else if(importFlag == "lst")
			{				
			}
			else if(importFlag == "tbl")
			{	
				//var txt = "  ☐ No symptoms ☐ Epinephrine ☐ Antihistamine Mouth ☐ itching, tingling sensation, swelling of lips, tongue, mouth, or drooling ☐ Epinephrine ☐ Antihistamine Throat ☐ swelling of tongue and throat, difficulty swallowing, itching, tightness/closure, hoarseness, changes in voice ☐ Epinephrine ☐ Antihistamine Skin ☐ hives, itchy rash, redness, swelling ☐ Epinephrine ☐ Antihistamine Gut ☐ nausea, abdominal cramps, vomiting, diarrhea ☐ Epinephrine ☐ Antihistamine Lungs ☐ respiratory difficulty, shortness of breath, cough, shallow respirations, wheezing, stridor ☐ Epinephrine ☐ Antihistamine Heart ☐ weak or thready pulse, heart palpitations, drop in blood pressure, dizziness, lightheadedness, loss of consciousness ☐ Epinephrine ☐ Antihistamine ☐ Other ☐ Epinephrine ☐ Antihistamine ☐ If reaction is progressing (several of the above area affected) give: ☐ Epinephrine ☐ Antihistamine "				
				var rowArray = reader.result.split('\n');
				//curSec = $("#txtSection").val();
				//alert("curSec = " + curSec);
				$("#divSection" + curSec + "Body").append("<table id='tblSymptoms' width='100%' style='padding-top:10px'></table></div>");
				//$("#divSection" + curSec + "Body").append("<textarea id='txt' cols='150' rows='20' />");
				//$("#tblSymptoms").append("<tr><th colspan='4' class='w3-border'><label style='padding-left:5px;padding-bottom:20px'>Driver Details</label></th><tr>");								

				//alert(newArray.length);
				var curRow = -1;
				var nl = "";
				var width = "25";
				
				var curDD = "<input type='number' name='quantity' min='1' max='100' style='margin:5px'></input>";				

				curRow++;
				$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");
					
				var fldCount = 0;
				var subCount = 0;
				var lstCount = 0;
				var tblCount = 0;
				var hdrCount = 0;

				transData.Tables.push({'Id': 'tbl', 'Table': 'Driver Information','THeaders': []});
				localStorage.setItem("transportation", JSON.stringify(transData));
				retrievedObjectTransportation = localStorage.getItem('transportation');	
				transData = JSON.parse(retrievedObjectTransportation);	

				for(var i=0;i<rowArray.length;i++)
				{
					colArray = rowArray[i].split(',');	
					for(var j=0;j<colArray.length;j++)
					{	
						var curCol = colArray[j].trim();	
						if(i==0 && j<3)
						{
							//alert("j = " + j);
							//alert("curCol = " + curCol);
							var curHeader = "thd" + j;
							//alert("curHeader = " + curHeader);
							transData.Tables[tblCount].THeaders.push({"Id": curHeader, "THeader": curCol});
							localStorage.setItem("transportation", JSON.stringify(transData));
							retrievedObjectTransportation = localStorage.getItem('transportation');	
							transData = JSON.parse(retrievedObjectTransportation);
						}
							
						if(j<4 || j==6 || j==9 || j==12)
						{														
							if(curCol != "range")
							{
								transData.Data[0].Sections[curSec].Fields.push (
									{				
										"Id": "fld" + curSec + fldCount + subCount + lstCount,
										"Field": curCol,
										"Checked": "Checked",
										"Readonly": "",
										"Disabled": "",
										"Width": "255",
										"Height": "35",
										"Textcolor": "",
										"MarginLeft": "0",
										"Backgroundcolor": "#2b4370",
										"Subfields": [
											{
												"Id": "sub" + curSec + fldCount + subCount + lstCount,
												"Subfield": curCol,
												"ToolTip": "",
												"Checked": "Checked",
												"Required": "",
												"Key": "",
												"Type": "Button",
												"Readonly": "",
												"Disabled": "",
												"Size": "",
												"Width": "150",
												"Height": "35",
												"Minlength": "9",
												"Maxlength": "50",
												"Textcolor": "",
												"MarginLeft": "30",
												"Backgroundcolor": "#486aa0",
												"Fieldlength": "",
												"Datetype": "",
												"Function1": "",
												"Function2": "",
												"Function3": "",
												"Logic1": "",
												"Logic2": "",
												"Logic3": "",
												"Value1": "",
												"Value2": "",
												"Value3": "",
												"Group1": "",
												"Group2": "",
												"Group3": "",
												"Lists": [
													{
														"Id": "lst" + curSec + fldCount + subCount + lstCount,
														"List": "Enter List Name",
														"Checked": "Checked",
														"Readonly": "",
														"Disabled": "",
														"Width": "150",
														"Height": "35",
														"Textcolor": "",
														"MarginLeft": "60",
														"Backgroundcolor": "#7e8faf"
													}
												]
											}					
										]
									} 
								);
								fldCount++;
							}
						}						
						
						if(curCol == "range")						
						{
							curCol = curDD;
						}

						if(j==0)
						{								
							curRow++;
							$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");				
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'><label style='padding-left:5px;padding-right:5px' contenteditable>" + curCol + "</label></td>");																		
						}										
						else if(j<3)
						{									
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'><label style='padding-left:5px;padding-right:5px' contenteditable>" + curCol + "</label></td>");																		
						}
						else if(j==3)
						{								
							curRow++;											
							$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");				
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'><label style='padding-left:5px;padding-right:5px' contenteditable>" + curCol + "</label></td>");																		
						}
						else if(j<6)
						{							
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'></td>");																		
						}
						else if(j==6)
						{
							curRow++;
							$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'><label style='padding-left:5px;padding-right:5px' contenteditable>" + curCol + "</label></td>");																		
						}
						else if(j<9)
						{
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'></td>");																		
						}					
						else if(j==9)
						{
							curRow++;
							$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'><label style='padding-left:5px;padding-right:5px' contenteditable>" + curCol.replace(/[\r\n\☐]/g,' ') + "</label></td>");																		
						}
						else if(j<12)
						{
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'></td>");																		
						}
						else if(j==12)
						{
							curRow++;
							$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'><label style='padding-left:5px;padding-right:5px' contenteditable>" + curCol.replace(/[\r\n\☐]/g,' ') + "</label></td>");																		
						}
						else if(j<15)
						{
							$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:13px'></td>");																		
						}											
					}
				}					
			}	
			localStorage.setItem("transportation", JSON.stringify(transData));
			retrievedObjectTransportation = localStorage.getItem('transportation');
			transData = JSON.parse(retrievedObjectTransportation);			
			//getFieldData();
			//$("#btnCSV").hide();
		};
		// start reading the file. When it is done, calls the onload event defined above.
		reader.readAsBinaryString(fileInput.files[0]);
		//addDD(curSec);
		
	};
}

function addNames(x)
{
	alert("Add " + x)	
}

function selectAllCompany()
{
	//alert("Select All");
	//alert("secCount = " + secCount);
	$("#divSection" + secCount + "Body").empty();
	//translateMe();
	//curSec = $("#txtSection").val();
	addDD(curSec);
}

function importNew(thing)
{	
	//alert("Import new " + thing);
	var namesArray = "";

	if(thing.indexOf("Form") != -1)
	{	
		alert("Import new Form");		
		importNewForm(transData);
	}
	else if(thing.indexOf("Section") != -1)
	{	
		//alert("Import new Section");		
		//alert("Section length = " + sectionData.Sections.length)	
		importNewSection();		
	}
	else if(thing.indexOf("Field") != -1)
	{	
		alert("Import new Field");
		importNewField();		
	}
	else if(thing.indexOf("Subfield") != -1)
	{	
		alert("Import new Subfield");		
		importNewSubfield(transData);
	}
	else if(thing.indexOf("List") != -1)
	{	
		alert("Import new List");	
		importNewList(transData);	
	}
	else if(thing.indexOf("Table") != -1)
	{	
		alert("Import new Table");	
		importNewList(transData);	
	}
}

function deleteThis(thing)
{
	//alert("Delete " + thing);
	var namesArray = "";

	if(thing.indexOf("Form") != -1)
	{	
		//alert(""Deleting form");		
		deleteForm();
	}
	else if(thing.indexOf("Section") != -1)
	{	
		//alert(""Deleting sections");		
		deleteSection();		
	}
	else if(thing.indexOf("Field") != -1)
	{	
		//alert(""Deleting fields");
		deleteField();		
	}
	else if(thing.indexOf("Subfield") != -1)
	{	
		//alert(""Deleting subfields");		
		deleteSubfield();
	}
	else if(thing.indexOf("List") != -1)
	{	
		//alert(""Deleting lists");	
		deleteList();	
	}
	else if(thing.indexOf("Table") != -1)
	{	
		//alert("Deleting Table");	
		deleteTable();	
	}
}

function addNew(thing)
{	
	//alert("Add new " + thing);
	var namesArray = "";

	if(thing.indexOf("Form") != -1)
	{	
		//alert("Adding to forms");		
		addNewForm();
	}
	else if(thing.indexOf("Section") != -1)
	{	
		//alert("Adding to sections");		
		addNewSection();		
	}
	else if(thing.indexOf("Field") != -1)
	{	
		//alert("Adding to fields");
		addNewField();		
	}
	else if(thing.indexOf("Subfield") != -1)
	{	
		//alert("Adding to subfields");		
		addNewSubfield();
	}
	else if(thing.indexOf("List") != -1)
	{	
		//alert("Adding to Lists");	
		addNewList();	
	}
	else if(thing.indexOf("Table") != -1)
	{	
		//alert("Adding to Table");	
		addNewTable();	
	}
}

function setTotal()
{
	//alert("settotal");	
	$("#txtVehTotal").val(parseInt($("#txtVehQty2").val()) + parseInt($("#txtVehQty3").val()));
}

function deleteForm()
{
	alert("Delete Form");
}

function deleteSection()
{
	//alert("curSec = " + curSec);
	//curSec = $("#txtSection").val();
	//alert("curSec = " + curSec);
	delete transData.Data[0].Sections[curSec];
	localStorage.setItem("transportation", JSON.stringify(transData));
	//alert("Deleted Section " + curSec);
	transData = JSON.parse(retrievedObjectTransportation);
	addSections();
	//alert(transData.Data.length);
}

function deleteField()
{
	alert("Delete Field");
}

function deleteSubfield()
{
	alert("Delete Subfield");
}

function deleteList()
{
	alert("Delete List");
}

function deleteTable()
{
	alert("Delete table");
}

function addNewTable()
{
	alert("addNewTable");

	readFile();

	/*
	var curSec = $("#txtSection").val();
	$("#divSection" + curSec + "Body").append("<div id='divTable' class='w3-margin w3-container w3-left' style='width:100%;text-align:left;padding-right:0px'></div>");											
	var numCols = prompt("Enter # of Columns", "4");

	$("#divTable").append("<table id='tblVI' class='table'><thead id='thead'><tr id='trHead'></tr></thead></table>");	
	$("#tblVI").append("<tr id='tr0'></tr>");			
	for(var i=0;i<numCols;i++)
	{
		//alert("i = " + i);
		var curHead = prompt("Enter header for column " + i, "Column " + i + " header");
		$("#trHead").append("<th class='w3-border w3-padding w3-margin' scope='col'>" + curHead + "</th>");

		if(i==0)
		{
			$("#tr0").append("<td class='w3-border w3-padding w3-margin'><select type='select-one' onfocus='onFocus()' onblur='onBlur()'><option value='-1'>Select a Vehicle Type -1</option><option value='0'>Select a Vehicle Type 0</option><option value='1'>Select a Vehicle Type 1</option><option value='2'>Select a Vehicle Type 2</option></select></td>");
		}
		else if(i==1)
		{
			$("#tr0").append("<td class='w3-border w3-padding w3-margin'><input type='text' id='txtVehTotal' onfocus='onFocus()' onblur='onBlur()' type='number' readonly name='vehicles' value='0' min='0' max='100'></td>");	
		}
		else
		{
			$("#tr0").append("<td class='w3-border w3-padding w3-margin'><input type='number' id='txtVehQty" + i + "' onfocus='onFocus()' onblur='onBlur()' type='number' name='vehicles' min='0' value='0' max='100' onclick='setTotal(this.id)'></td>");	
		}
	}	
	*/

	/*
	var numRows = prompt("Enter # of Columns", "4");
	if (table != null) 
	{		
		//alert("table = " + table);
		var numCols =  table.split(',')[1];
		var numRows =  table.split(',')[2];

		//alert("Number of rows = " + table.split(',')[2]);
		$("#divTable").append("<table id='tblVI'><tr><thead class='w3-border w3-left'>" + table.split(',')[0] + "</thead><thead class='w3-border w3-left'>1</thead><thead class='w3-border w3-left'>2</thead></tr></table>");
		for(var i=0;i<numRows;i++)		
		{
			$("#tblVI").append("<tr id='tr" + i + "'></tr>");
			for(var j=0;j<numCols;j++)		
			{
				$("#tr" + i).append("<td class='w3-margin w3-border w3-left'>" + j + "</td>");
			}
		}
			
		//alert("Number of columns = " + table.split(',')[1]);
		//alert("Number of rows = " + table.split(',')[2]);
	}
	*/

	//$("#divTable").append("<table><></table>");
}

function addNewSubfield()
{	
	alert("addNewSubfield");
	var subNames = prompt("Add new subfield", "Add New subfields seperated by a comma").split(',');	
	//var secNames = reader.result.split(',');
	for(var i=0;i<subNames.length;i++)
	{
		//transData.Data[0].Sections.push ( {"Section":secNames[i],"Fields": [],"Lists": []} );
		
		//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
		//var title = toTitleCase(subNames[i]);

		curSelectedSec = $("#txtSec").val();
		var curFld = 0;		
		var curLst = 0;

		var newSubId = transData.Data[0].Sections[curSec].Fields[curFld].Subfields.length;

		transData.Data[0].Sections[curSec].Fields[curFld].Subfields.push ( 
			{				
				"Id": "sub" + curSec + curFld + newSubId + curLst,
				"Subfield": subNames[i],
				"ToolTip": "",
				"Checked": "Checked",
				"Required": "",
				"Key": "",
				"Type": "Text",
				"Readonly": "",
				"Disabled": "",
				"Size": "",
				"Width": "200",
				"Height": "35",
				"Minlength": "9",
				"Maxlength": "50",
				"Textcolor": "#000000",
				"MarginLeft": "30",
				"Backgroundcolor": "#ffffff",
				"Fieldlength": "",
				"Datetype": "",
				"Function1": "",
				"Function2": "",
				"Function3": "",
				"Logic1": "",
				"Logic2": "",
				"Logic3": "",
				"Value1": "",
				"Value2": "",
				"Value3": "",
				"Group1": "",
				"Group2": "",
				"Group3": "",
				"Lists": [
					{
						"Id": "lst" + curSec + "0" + newSubId + curLst,
						"List": "Enter List Name",
						"Checked": "Checked",
						"Readonly": "",
						"Disabled": "",
						"Width": "150",
						"Height": "35",
						"Textcolor": "",
						"MarginLeft": "60",
						"Backgroundcolor": "#7e8faf"
					}
				]					
			}
		)
		localStorage.setItem("transportation", JSON.stringify(transData));
		retrievedObjectTransportation = localStorage.getItem('transportation');	
		transData = JSON.parse(retrievedObjectTransportation);
		$("#divSecList" + secCount).append("<a onclick='setSection(\"" + title + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + title + "</a>"); 				 					
	}
}

function addFields(fldSelSectionIndex,fldIndex)
{
	//alert("addFields");
	//$("#divGetFields").hide();
	//curField = event.target;
	//alert(curField.id);
	//alert("field index = " + fieldIndex);

	//alert("field name = " + curField.value);
	//curSelectedSec = $("#txtSec").val();
	subCount++;	
	//alert("AddFields curSec = " + curSec);	
	//alert("AddFields curSelectedSec = " + curSelectedSec);
	//alert("j = " + j);
	var fldId = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Id;		
	//alert("fldId = " + fldId);
	var fldField = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Field;		
	//alert("fldField = " + fldField);
	var fldType = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Type;
	var fldWidth = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Width;
	var fldColor = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Color;
	var fldBGColor = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Backgroundcolor;
	var addressId = fldField.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(':','').replace('#','');
	
	/*
	if(fldType == "Address" && fldId.substr(5,1) == "0" && isMobile == false)
	{												
		$("#divSection" + curSec + "Body").append(fldIndex + addressId);											
	}								
	else if(fldType == "Address" && isMobile == false)
	{
		$("#divSection" + curSec + "Body").append(fldIndex + addressId);							
	}
	*/

	/*
	transData.Data[0].Sections[curSec].Fields.push ( 
		{				
			"Id": fldId,
			"Field": fldField,
			"Type": fldType,
			"Checked": "Checked",
			"Readonly": "",
			"Disabled": "",
			"Width": fldWidth,
			"Height": "20",
			"Textcolor": subColor,
			"MarginLeft": "0",
			"Backgroundcolor": subBGColor,
			"Subfields": []
		}
	)
	*/
	
	for(var k=0;k<sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields.length;k++)
	{
		//alert("Add Subfield k2 = " + k);
		//alert("curSelectedSec = " + curSelectedSec);
		//alert("j = " + j);		
		//alert("4");	
		//alert("fldType = " + fldType);	

		var chkSA = document.getElementById("chksec0000");
		//var subId = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Id;
		
		var curField = (transData.Data[0].Sections[curSec].Fields.length-1); 
		var curSub = transData.Data[0].Sections[curSec].Fields[curField].Subfields.length; 		

		var subId = "sub" + curSec + curField + curSub + "0";			
		var subField = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Subfield;
		//alert("Subfield = " + subField);						
		var subChecked = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Checked;
		var subType = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Type;
		//alert("0 subType = " + subType);
		var subWidth = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Width;
		var subHeight = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Height;
		//alert("width = " + subWidth);
		var subSize = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Size;
		var subGroup1 = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Group1;
		var subBGColor = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Backgroundcolor;
		var subColor = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Textcolor;
		var subRequired = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Required;
		var subDisabled = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Disabled;
		var subToolTip = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].ToolTip;
		var subMinlength = sectionData.Sections[fldSelSectionIndex].Fields[fldIndex].Subfields[k].Minlength;				
		//var subColor = subColor;
		//alert(subField);
		//alert(subColor);

		if(subRequired == "Required")
		{
			subColor = "red";
		}

		localStorage.setItem("transportation", JSON.stringify(transData));
		retrievedObjectTransportation = localStorage.getItem('transportation');	
		transData = JSON.parse(retrievedObjectTransportation);
		//var newFldId = transData.Data[0].Sections[curSec].Fields.length;
		
		var nextFieldIndex = (transData.Data[0].Sections[curSec].Fields.length-1);
		//alert("Pushing sub fields to Field = " + nextFieldIndex);
		transData.Data[0].Sections[curSec].Fields[nextFieldIndex].Subfields.push ( 			
			{
				"Id": subId,
				"Subfield": subField,
				"ToolTip": subToolTip,
				"Checked": subChecked,
				"Required": subRequired,
				"Key": "",
				"Type": subType,
				"Readonly": "",
				"Disabled": subDisabled,
				"Size": subSize,
				"Width": subWidth,
				"Height": subHeight,
				"Minlength": subMinlength,
				"Maxlength": "50",
				"Textcolor": subColor,
				"MarginLeft": "30",
				"Backgroundcolor": subBGColor,
				"Fieldlength": "",
				"Datetype": "",
				"Function1": "",
				"Function2": "",
				"Function3": "",
				"Logic1": "",
				"Logic2": "",
				"Logic3": "",
				"Value1": "",
				"Value2": "",
				"Value3": "",
				"Group1": "",
				"Group2": "",
				"Group3": "",
				"Lists": [
				]
			}					
		)

		/*
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Id = subId;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Subfield = subId;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Checked = subChecked;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Type = subType;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Width = subWidth;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Size = subSize;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Group1 = subGroup1;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Backgroundcolor = subBGColor;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Textcolor = subColor;
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].ToolTip = subToolTip
		transData.Data[0].Sections[curSec].Fields[field].Subfields[k].Minlength = subMinlength
		localStorage.setItem("transportation", JSON.stringify(transData));
		*/
		//alert("subField = " + subField);
		//alert("subType = " + subType);	
		//alert("subId.substr(5,1) = " + subId.substr(5,1));
		//alert("isMobile = " + isMobile);	
		if(subChecked == "Checked")
		{
			if(subType == "Address" && subId.substr(5,1) == "0" && isMobile == false)
			{			
				//alert("1 subType = " + subType);									
				//$("#div" + fldIndex + addressId).append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text w3-input w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");								
				//$("#div" + fldIndex + addressId).append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX;width:" + subWidth + "px;height:" + subHeight + "px' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
				//$("#div" + fldIndex + addressId).append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text w3-input w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");								
				$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
			}								
			else if(subType == "Address" && isMobile == false)
			{	
				//alert("2 subType = " + subType);	
				//$("#div" + fldIndex + addressId).append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text w3-input w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");								
				$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
			}
			else if(subType == "List" && isMobile == false)
			{
				//alert("List");
				//$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left w3-dropdown-hover' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='font-size:14px;text-align:left;margin-top:15px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
				//subColor = "black";
				//$("#divSection" + curSec + "Body").append("<div id='divDDC" + curSec + j + "'></div>");			  
				//$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left w3-dropdown-hover' style='width:"+ subWidth +"px;margin-top:0px;margin-right:5px;margin-bottom:5px'></div>");
				//alert("width = " + subWidth);
				$("#div" + subId).append("<label id='lbl" + subId + fldIndex + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:12px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/>");
				$("#div" + subId).append("<div id='divBar" + curSec + fldIndex + "' class='w3-dropdown-content w3-bar-block w3-border'></div>");

				for(var l=0;l<sectionData.Sections[curSelectedSec].Fields[fldIndex].Subfields[k].Lists.length;l++)
				{						
					var curList = sectionData.Sections[curSelectedSec].Fields[fldIndex].Subfields[k].Lists[l].List;						
					$("#divBar" + curSec + fldIndex).append("<a href='#' class='w3-bar-item w3-button'>" + curList + "</a>");					
				}
			}
			else if(subType == "Date")
			{
				//alert("Date");
				subType = "date";
				$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14PX;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:2px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='height:33px;font-size:14PX;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-date w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
			}
			else
			{	
				//alert("#divSection" + curSec + "Body");				
			    $("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:2px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
				//$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text w3-text-" + subColor + "' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");																		
			}
		}
	}
	localStorage.setItem("transportation", JSON.stringify(transData));
	retrievedObjectTransportation = localStorage.getItem('transportation');	
	transData = JSON.parse(retrievedObjectTransportation);
	//getFieldData();
	//getSubfieldData();

	//$("#divLevels").empty();
	//getSectionData();
	getFieldData();
	getSubfieldData();
}

function addNewField()
{
	//alert("sectionData.Sections[curSec].Fields.length = " + sectionData.Sections[0].Fields.length);
	$("#divBottomMenu").empty();
	alert("1: curSec = " + curSec);
	curSelectedSec = $("#txtSec").val();
	alert("2: curSelectedSec = " + curSelectedSec);
	$("#divSection0Body").click();
	//alert(" $('#txtSection').val() = " + $("#txtSection").val());
	accordian("divSection" + curSec + "Body",sectionData.Sections[curSelectedSec].Section,$("#txtSection").val());
	for(var i=0;i<sectionData.Sections[curSelectedSec].Fields.length;i++)
	{
		$("#divTopMenu").append("<button type='button' class='w3-margin w3-yellow w3-btn w3-border' onclick='addFields(" + i + ")'>" + sectionData.Sections[curSelectedSec].Fields[i].Field + "</button>");
	}
}

function addNewSection()
{
	//
	if(transData.Data.length == 0)
	{
		secCount = 0;
		var secNames = prompt("Add new sections items", "Section " + secCount).split(',');	
		//var secNames = reader.result.split(',');
		for(var i=0;i<secNames.length;i++)
		{
			//transData.Data[0].Sections.push ( {"Section":secNames[i],"Fields": [],"Lists": []} );	
			//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
			secTitle = toTitleCase(secNames[i]);
			transData.Data.push ( 
				{
					"Sections": [
						{
							"Id": "sec" + secCount + "000",
							"Section": secTitle,
							"Checked": "",
							"Type": "Profile",
							"Disabled": "",
							"ReadOnly": "",
							"Width": "200",
							"Height": "25",
							"Backgroundcolor": "#000",
							"Textcolor": "#fff",
							"Visibility": "visible",
							"MarginLeft": "5",
							"Fields": []
						}
					]
				}
			)
			localStorage.setItem("transportation", JSON.stringify(transData));

			//this is the dropdown list when hovering over the Section Title and is not currently being used
			//$("#divSecList" + secCount).append("<a onclick='setSection(\"" + title + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + title + "</a>"); 				 					
		}
	}
	else
	{
		var secNames = prompt("Add new sections items", "Section " + secCount).split(',');	
		//var secNames = reader.result.split(',');
		for(var i=0;i<secNames.length;i++)
		{
			//transData.Data[0].Sections.push ( {"Section":secNames[i],"Fields": [],"Lists": []} );
			
			//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
			secTitle = toTitleCase(secNames[i]);
			secCount = transData.Data[0].Sections.length;
			transData.Data[0].Sections.push ( 
				{
					"Id": "sec" + secCount + "000",
					"Section": secTitle,
					"Checked": "",
					"Type": "Profile",
					"Disabled": "",
					"ReadOnly": "",
					"Width": "200",
					"Height": "25",
					"Backgroundcolor": "#000",
					"Textcolor": "#fff",
					"Visibility": "visible",
					"MarginLeft": "5",
					"Fields": []
				}
			)
			localStorage.setItem("transportation", JSON.stringify(transData));

			//this is the dropdown list when hovering over the Section Title and is not currently being used
			//$("#divSecList" + secCount).append("<a onclick='setSection(\"" + title + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + title + "</a>"); 				 					
		}
	}
	//alert(secCount);
	

	$("#divLevels").empty();
	getSectionData(transData);
	$("#divLevels").show();
}

function addNewSectionx()
{
	//
	if(transData.Data.length == 0)
	{
		secCount = 0;
		var secNames = prompt("Add new sections items", "Section " + secCount).split(',');	
		//var secNames = reader.result.split(',');
		for(var i=0;i<secNames.length;i++)
		{
			//transData.Data[0].Sections.push ( {"Section":secNames[i],"Fields": [],"Lists": []} );	
			//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
			var secTitle = toTitleCase(secNames[i]);
			transData.Data.push ( 
				{
					"Sections": [
						{
							"Id": "sec" + secCount + "000",
							"Section": secTitle,
							"Checked": "",
							"Type": "Profile",
							"Disabled": "",
							"ReadOnly": "",
							"Width": "200",
							"Height": "25",
							"Backgroundcolor": "#000",
							"Textcolor": "#fff",
							"Visibility": "visible",
							"MarginLeft": "5",
							"Fields": []
						}
					]
				}
			)
			localStorage.setItem("transportation", JSON.stringify(transData));

			//this is the dropdown list when hovering over the Section Title and is not currently being used
			//$("#divSecList" + secCount).append("<a onclick='setSection(\"" + title + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + title + "</a>"); 				 					
		}
	}
	else
	{
		secCount = transData.Data[0].Sections.length;
		var secNames = prompt("Add new sections items", "Section " + secCount).split(',');	
		//var secNames = reader.result.split(',');
		for(var i=0;i<secNames.length;i++)
		{
			//transData.Data[0].Sections.push ( {"Section":secNames[i],"Fields": [],"Lists": []} );
			
			//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
			var secTitle = toTitleCase(secNames[i]);
			secCount = transData.Data[0].Sections.length;
			transData.Data[0].Sections.push ( 
				{
					"Id": "sec" + secCount + "000",
					"Section": secTitle,
					"Checked": "",
					"Type": "Profile",
					"Disabled": "",
					"ReadOnly": "",
					"Width": "200",
					"Height": "25",
					"Backgroundcolor": "#000",
					"Textcolor": "#fff",
					"Visibility": "visible",
					"MarginLeft": "5",
					"Fields": []
				}
			)
			localStorage.setItem("transportation", JSON.stringify(transData));

			//this is the dropdown list when hovering over the Section Title and is not currently being used
			//$("#divSecList" + secCount).append("<a onclick='setSection(\"" + title + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + title + "</a>"); 				 					
		}
	}
	//alert(secCount);
	

	$("#divLevels").empty();
	getSectionData(transData);
	$("#divLevels").show();
}

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

function test(x,y) {
	alert(y[0]);
}

function addSections() 
{
	console.log("addSection");
	/*
	if(transData.Data[0].Sections != null)
	{
		$("#divLevels").empty();
		
		if(transData.prod == 0)
		{
			getSectionData();
			getFieldData();
			getSubfieldData();
		}

		//alert("addSections");
		//alert("addSections section count = " + transData.Data[0].Sections.length);
		$("#divForm").append("<div id='divSections' class='container' style='width:100%'></div>");	
		$('#divLevels').show();	
		
		$("#divSections").empty();
		//getSectionData();
		
		//for(var h=0;h<transData.Data.length;h++)
		//{
			for(var i=0;i<transData.Data[0].Sections.length;i++)
			{
				var secChecked = transData.Data[0].Sections[i].Checked;
				if(secChecked)
				{		
					$("#divSections").append("<div id='divSection" + i + "' class='autocomplete container' style='background-color: whte;width:100%'></div>");
					
					//translateNow("divSecTitle" + secCount,secTitle); class='w3-accordion-content w3-hide'
					var secTitle = transData.Data[0].Sections[i].Section;
					
					//alert("divSection" + secCount + "Body");
					//alert("divSecTitle" + i);
					$("#divSection" + i).append("<input id='inputTitle" + i + "' onclick='accordian(\"divSection" + i + "Body\",\"" + secTitle +  "\",\"" + i +"\")' style='width:100%;background-color: grey;color:white;font-size:14PX;margin-left:5px;margin-right:5px;margin-bottom:10px;padding-top:10px;height:10px' value='" + secTitle + "' class='w3-border-black w3-center' contenteditable></input>");					
					if(i==0)
					{
						$("#divSection" + i).append("<div id='divSection" + i + "Body' class='w3-white container w3-accordion-content w3-show' style='width:100%;margin:5px'></div>");													
					}
					else
					{
						$("#divSection" + i).append("<div id='divSection" + i + "Body' class='w3-white container w3-accordion-content w3-show' style='width:100%;margin:5px'></div>");													
					}
					addDD(i);	
					//$("#divSecTitle" + secCount).append("<div  id='divSecList" + secCount + "' class='w3-dropdown-content w3-bar-block w3-card-4 w3-left w3-light-white' style='margin-top:10px;width:40%'></div>");     
				}
			}
		//}			
	}
	*/	
}

function addSection() 
{
	//addSection("A","indADepAFrmASecA","Section Title");		
	//document.getElementById("divEEFields").style.display = "none";
			
	//secCount++;
	alert("Add Section = " + secCount);
	dropFlag = 1;
	////fldCount++;
	
}

function update(key, property,value)
{
	//alert(key);
	//alert(property);
	//alert(value);
	curSec = $("#txtCurSec").val();
	curFld = $("#txtCurFld").val();
	curSub = $("#txtCurSub").val();
	curLst = $("#txtCurLst").val();

	//alert("curSec = " + curSec);
	//alert("curFld = " + curFld);
	//alert("curSub = " + curSub);
	//alert("curLst = " + curLst);

	if($("#Subfield").val() == "Logo")
	{
		//alert("value = " + value);
		//alert("key = " + key);
		transData.align = value;
		localStorage.setItem(key, JSON.stringify(transData));	
		retrievedObjectTransportation = localStorage.getItem('transportation');	
		transData = JSON.parse(retrievedObjectTransportation);
		var newAlign = transData.align;
		//alert("value = " + value);
		$("#imgLogo1").align(value);
	}
	else
	{
		//alert("Not Logo");
		for(var i=0;i<transData.Data[0].Sections.length;i++)
		{
			if(i == curSec)
			{
				//alert("match on Sec " + curSec);
				// handle the section updates
				for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
				{
					if(j == curFld)
					{
						//alert("match on Fld " + curFld);
						// handle the field updates
						for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
						{
							//alert("curK = " + k);
							if(k == curSub)
							{
								//alert("match on Sub " + curSub);
								//alert("Updating transData.Data[0].Sections[" + i + "].Fields[" + j + "].Subfields[" + k + "]." + property);
								//alert("Updating " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Id);
								//alert("Updating " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield);
								// handle the subfield updates
								
								var required = "";
								
								if(value == true)
								{
									required = "Required";
								}
								//alert("Required = " + required);

								transData.Data[0].Sections[i].Fields[j].Subfields[k].Required = required;
								localStorage.setItem(key, JSON.stringify(transData));							
								//alert("New width = " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Width);
								var newWidth = transData.Data[0].Sections[i].Fields[j].Subfields[k].Width;
								//$("#sub" + curSec + curFld + curSub + curLst).width(newWidth);
								for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
								{
									//alert("match on " + curLst);
									// handle the list updates
								}
								break;
							}						
						}
						break;
					}				
				}
				break;
			}
		}
		localStorage.setItem("transportation", JSON.stringify(transData));
		addDD(curSec);
	}
}

function getObject(key) {
	return JSON.parse(localStorage.getItem(key));
}

function setObject(key, obj) {
	localStorage.setItem(key, JSON.stringify(obj));
}

function showProps()
{	
	//alert("curField = " + curField);
	$("#divProps").show();	
}

function onMouseOver()
{
	alert("onMouseOver()");
}

function onMouseLeave()
{
	alert("onMouseLeave()");
}

function onClick()
{
	alert("dc onClick()");
	//$("#txtFields").style.backgroundColor = "white";
}

function onFocus()
{
	curField = event.target;
	curField.style.color = "black";
	//alert("onFocus()");
	//alert(curField.id);	

	if(curField.id.indexOf("inputTitle") == 0)
	{
		//alert("A title field has been clicked on");
		$("#divGetFields").show();
		$("#txtFields").focus();
		$("#txtFields").style.backgroundColor = "white";
	}
	else
	{
		var highlightColor = "#FFFFEA";
	}

	//$("#btnLanguage").css('background-color', 'white');
	//$("#google_translate_element").css('background-color', 'white');

	$("#txtCurSec").val(curField.id.substr(3,1)); 
	$("#txtCurFld").val(curField.id.substr(4,1)); 
	$("#txtCurSub").val(curField.id.substr(5,1)); 
	$("#txtCurLst").val(curField.id.substr(6,1)); 

	curSecIndex = $("#txtCurSec").val();
	curFldIndex = $("#txtCurFld").val();
	curSubIndex = $("#txtCurSub").val();
	curLstIndex = $("#txtCurSec").val();

	$("#txtBlurName").val(curField.Name);

	var id = curField.id; 
	//alert(id);
	if(id.indexOf("img") > -1)
	{
		//location.reload();
		//btnLogo.click();
		//getLogo();
		//alert("adjust image properties");
		//var imgWidth = transData.width;
		//$("#Width").val(imgWidth);

		/*
		"Id": "btnLogo",
		"Title": "Logo",
		"Checked": "Checked",
		"Disabled": "",
		"ReadOnly": "",
		"Type": "button",
		"Width": "95",
		"Height": "25",
		"Backgroundcolor": "#2b4370",
		"Color": "white",
		"Visibility": "visible",
		"Align": "left",
		"OnClick": "addLogo('index.jfif')",
		"MarginLeft": "10",
		"MarginBottom": "1"
		*/
		//alert("id = " + id + " and transData.Data[0].Sections[i].Fields[j].Subfields[k].Id = " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Id);
		//var imgKey = transData.SideMenu[0].Key;  
		var imgId = id;
		var imgField = "Logo";
		var imgChecked = "Checked";
		var imgRequired = "Required";
		var imgReadOnly = "Readonly";
		var imgDisabled = "Disabled";
		var imgWidth = transData.width;
		var imgHeight = transData.height;
		//var imgMinLength = transData.SideMenu[0].Minlength;

		//var imgType = transData.SideMenu[0].Type;
		//var imgSize = transData.SideMenu[0].Size;

		//var imgMaxLength = transData.SideMenu[0].Maxlength;
		//var imgTextColor = transData.SideMenu[0].Textcolor;
		var imgMarginLeft = 0;
		//var imgBackGroundColor = transData.SideMenu[0].Backgroundcolor;
		//alert("img height = " + imgHeight);
		
		//$("#" + imgId).css('background-color', 'white');
		//alert(subBackGroundColor);

		//alert("imgId = " + imgId);
		$("#txtBlurId").val(imgId);

		$("#txtBlurId").attr('readonly', true);
		$("#Height").val(imgHeight);
		$("#Minlength").val("");
		$("#Width").val(imgWidth);

		$("#Type").val("Image");
		$("#Size").val("");

		$("#Maxlength").val("");
		//alert("imgField = " + imgField);
		$("#Subfield").val(imgField);
		$("#Subfield").attr('readonly', true);
		
		$("#Textcolor").val("");
		$("#Backgroundcolor").val("");
		
		if(imgChecked == "")
		{
			$("#Checked").prop( "checked", false);
		}
		else
		{
			$("#Checked").prop( "checked", true);
		}

		if(imgRequired == "")
		{
			$("#Required").prop( "checked", false);
		}
		else
		{
			$("#Required").prop( "checked", true);
		}

		if(imgReadOnly == "")
		{
			$("#ReadOnly").prop( "checked", false);
		}
		else
		{
			$("#ReadOnly").prop( "checked", true);
		}
			
		if(imgDisabled == "")
		{
			$("#Disabled").prop( "checked", false);
		}
		else
		{
			$("#Disabled").prop( "checked", true);
		}					
	}
	else
	{
		for(var i=0;i<transData.Data[0].Sections.length;i++) //loop through all sections
		{
			var curCB = "";
			if(transData.Data[0].Sections[i].Fields != null)
			{
				for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++) //loop through all fields
				{
					for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++) //loop through all fields
					{
						//alert("id = " + id + " and transData.Data[0].Sections[i].Fields[j].Subfields[k].Id = " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Id);
						var subKey = transData.Data[0].Sections[i].Fields[j].Subfields[k].Key;  
						var subId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
						var subField = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;
						var subChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
						var subRequired = transData.Data[0].Sections[i].Fields[j].Subfields[k].Required;
						var subReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Readonly;
						var subDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;
						var subWidth = transData.Data[0].Sections[i].Fields[j].Subfields[k].Width;
						var subHeight = transData.Data[0].Sections[i].Fields[j].Subfields[k].Height;
						var subMinLength = transData.Data[0].Sections[i].Fields[j].Subfields[k].Minlength;
		
						var subType = transData.Data[0].Sections[i].Fields[j].Subfields[k].Type;
						var subSize = transData.Data[0].Sections[i].Fields[j].Subfields[k].Size;
		
						var subMaxLength = transData.Data[0].Sections[i].Fields[j].Subfields[k].Maxlength;
						var subTextColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Textcolor;
						var subMarginLeft = transData.Data[0].Sections[i].Fields[j].Subfields[k].MarginLeft;
						var subBackGroundColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Backgroundcolor;
						//alert("Sub height = " + subHeight);
						
						//$("#" + subId).css('background-color', 'white');
						//alert(subBackGroundColor);
						if(id==transData.Data[0].Sections[i].Fields[j].Subfields[k].Id)
						{
							$("#txtBlurId").val(subId);
							$("#txtBlurId").attr('readonly', true);
							$("#Height").val(subHeight);
							$("#Minlength").val(subMinLength);
							$("#Width").val(subWidth);
		
							$("#Type").val(subType);
							$("#Size").val(subSize);
		
							$("#Maxlength").val(subMaxLength);
							$("#Subfield").val(subField);
							$("#Subfield").attr('readonly', true);
							
							$("#Textcolor").val(subTextColor);
							$("#Backgroundcolor").val(subBackGroundColor);
							
							if(subChecked == "")
							{
								$("#Checked").prop( "checked", false);
							}
							else
							{
								$("#Checked").prop( "checked", true);
							}
		
							if(subRequired == "")
							{
								$("#Required").prop( "checked", false);
							}
							else
							{
								$("#Required").prop( "checked", true);
							}
		
							if(subReadOnly == "")
							{
								$("#ReadOnly").prop( "checked", false);
							}
							else
							{
								$("#ReadOnly").prop( "checked", true);
							}
								
							if(subDisabled == "")
							{
								$("#Disabled").prop( "checked", false);
							}
							else
							{
								$("#Disabled").prop( "checked", true);
							}					
						}
					}
				}
			}
		}
	}
	curField.style.backgroundColor = highlightColor;
	curField.style.color = "black";
	$("#btnFormFields").show();
	
	if(transData.prod == 0)
	{
		showProps();	
	}
}

function checkKey(e) {
	e = e || window.event;
	//alert(e.keyCode);
	shift = e.shiftKey;
	alt = e.altKey;
	ctrl = e.ctrlKey;
	
	var thisSec = "";
	var thisField = "";
	var thisSub = "";
	var thisList = "";
	
	var id = curField.id;
	var curDiv = "div" + id;
	//alert(curField.id);

	if(curField.id != null && curField.id.indexOf("Logo") > -1)
	{
		if(shift)
		{
			if (e.keyCode == '37')
			{
				//alert("In shift and Logo and left");
				var imgAlign = ("left");
				$("#divLogoImg").attr("align",imgAlign);								
				$("#divLogoBtns").attr("align",imgAlign);								
				$("#Align").val(imgAlign);								
				transData.align = imgAlign;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
			else if (e.keyCode == '39')
			{
				var imgAlign = ("right");
				$("#divLogoImg").attr("align",imgAlign);								
				$("#divLogoBtns").attr("align",imgAlign);								
				$("#Align").val(imgAlign);								
				transData.align = imgAlign;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
			else if (e.keyCode == '38' || e.keyCode == '40')
			{
				var imgAlign = ("center");
				$("#divLogoImg").attr("align",imgAlign);								
				$("#divLogoBtns").attr("align",imgAlign);								
				$("#Align").val(imgAlign);								
				transData.align = imgAlign;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
			/*
			if (e.keyCode == '37') {
				//alert("Shift Image decrease width");
				var reduceWidth = ((parseInt($(curField).width())-5));
				$(curField).width(reduceWidth);								
				$("#Width").val(reduceWidth);								
				transData.width = reduceWidth;
				localStorage.setItem('transportation', JSON.stringify(transData));	
			}
			if (e.keyCode == '39') {
				//alert("Shift Image increase width");
				var increaseWidth = ((parseInt($(curField).width())+5));
				$(curField).width(increaseWidth);								
				$("#Width").val(increaseWidth);								
				transData.width = increaseWidth;
				localStorage.setItem('transportation', JSON.stringify(transData));	
			}
			else if(e.keyCode == '38') {
				//alert("Shift Image increase height");
				var increaseHeight = ((parseInt($(curField).height())-5));
				$(curField).height(increaseHeight);								
				$("#Width").val(increaseHeight);								
				transData.width = increaseHeight;
				localStorage.setItem('transportation', JSON.stringify(transData));	
			}
			else if(e.keyCode == '40') {
				//alert("Shift Image decrease height");
				var reduceHeight = ((parseInt($(curField).height())+5));
				$(curField).height(reduceHeight);								
				$("#Height").val(reduceHeight);								
				transData.height = reduceHeight;
				localStorage.setItem('transportation', JSON.stringify(transData));	
			}
			*/
		}
		else if(ctrl)
		{
			//alert("Ctrl");
			if (e.keyCode == '37') {
				//alert("Ctrl Image decrease width/height");
				var reduceWidth =  parseInt(transData.width*.9);
				$(curField).width(reduceWidth);								
				$("#Width").val(reduceWidth);								
				transData.width = reduceWidth;

				//alert("Shift/Ctrl Image reduce height");
				/*
				var reduceHeight = (parseInt(transData.height)*.9);
				$(curField).height(reduceHeight);								
				$("#Height").val(reduceHeight);								
				transData.height = reduceHeight;
				localStorage.setItem('transportation', JSON.stringify(transData));
				*/				
			}
			if (e.keyCode == '39') {
				//alert("Ctrl Image increase width/height");
				var increaseWidth = (parseInt(transData.width)*1.1);
				$(curField).width(increaseWidth);								
				$("#Width").val(increaseWidth);								
				transData.width = increaseWidth;

				//alert("Ctrl Image decrease height");
				/*
				var increaseHeight = parseint(transData.height*1.1);
				$(curField).height(increaseHeight);								
				$("#Height").val(increaseHeight);								
				transData.height = increaseHeight;
				localStorage.setItem('transportation', JSON.stringify(transData));	
				*/
			}
			else if(e.keyCode == '38') {

				//alert("Ctrl Image decrease width/height");
				var increaseWidth = (parseInt(transData.width)*1.1);
				$(curField).width(increaseWidth);								
				$("#Width").val(increaseWidth);								
				transData.width = increaseWidth;
				localStorage.setItem('transportation', JSON.stringify(transData));

				//alert("Ctrl Image increase height");
				/*
				var increaseHeight = parseInt(transData.height*1.1);
				$(curField).height(increaseHeight);								
				$("#Height").val(increaseHeight);								
				transData.height = increaseHeight;
				localStorage.setItem('transportation', JSON.stringify(transData));
				*/	
			}
			else if(e.keyCode == '40') {
				//alert("Ctrl Image increase width/height");
				var reduceWidth = (parseInt(transData.width)*.9);
				$(curField).width(reduceWidth);								
				$("#Width").val(reduceWidth);								
				transData.width = reduceWidth;
				localStorage.setItem('transportation', JSON.stringify(transData));

				//alert("Ctrl Image decrease height");
				/*
				var reduceHeight = (parseInt(transData.height)*.9);
				$(curField).height(reduceHeight);								
				$("#Height").val(reduceHeight);								
				transData.height = reduceHeight;
				localStorage.setItem('transportation', JSON.stringify(transData));
				*/	
			}
		}
		else if(alt)
		{
			//alert("alt");
			if (e.keyCode == '37')
			{
				var imgAlign = ("left");
				$(curField).attr("align",imgAlign);								
				$("#Align").val(imgAlign);								
				transData.align = imgAlign;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
			else if (e.keyCode == '39')
			{
				var imgAlign = ("right");
				$(curField).attr("align",imgAlign);								
				$("#Align").val(imgAlign);								
				transData.align = imgAlign;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
			else if (e.keyCode == '38' || e.keyCode == '40')
			{
				var imgAlign = ("center");
				$(curField).attr("align",imgAlign);								
				$("#Align").val(imgAlign);								
				transData.align = imgAlign;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
		}
		else
		{
			if (e.keyCode == '37')
			{
				//alert("Previous Logo");
				prevLogo();
			}
			else if (e.keyCode == '39')
			{
				//alert("Next Logo");
				nextLogo();
			}
		}
	}
	else if(curField.id != null && shift)
	{
		if(curField.id.indexOf("sub") == 0)
		{
			var thisSec = id.substr(3,1);
			var thisField = id.substr(4,1);
			var thisSub = id.substr(5,1);
			var thisList = id.substr(6,1);
			//alert("thisSec = " + thisSec);
			//alert("thisField = " + thisField);
			//alert("thisSub = " + thisSub);
			//alert("thisList = " + thisList);
			//alert("shift adjusting width of text fields");
			if (e.keyCode == '37') {
				//alert("decrease width of div" + curField.id);			
				//$(curDiv).width(($(curDiv).width() - 10));

				var curWidthDown = (parseInt($("#div" + curField.id).width())-5);
				$("#div" + curField.id).width(curWidthDown);
				$("#Width").val(curWidthDown);
				transData.Data[0].Sections[thisSec].Fields[thisField].Subfields[thisSub].Width = curWidthDown;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
			else if (e.keyCode == '39') {
				//alert("increase width of " + curField.id);
				//$(curDiv).width(($(curDiv).width() + 10));

				var curWidthUp = (parseInt($("#div" + curField.id).width())+5);
				$("#div" + curField.id).width(curWidthUp);
				$("#Width").val(curWidthUp);
				transData.Data[0].Sections[thisSec].Fields[thisField].Subfields[thisSub].Width = curWidthUp;
				localStorage.setItem('transportation', JSON.stringify(transData));
			}
		}
	}

	if(ctrl)
	{
		//alert("ctrl");
	}

	if (e.keyCode == '118') {
		//alert("clearCache");				
		clearCache();							
		//alert("RP");							
		location.reload();
		location.reload();
	}
}

function checkKeyx(e) {	
	e = e || window.event;
	alert(e.keyCode);

	shifted = e.shiftKey;
	alt = e.altKey;
	cntrld = e.ctrlKey;	
	alert("shifted = " + shifted);
	alert("alt = " + alt);
	alert("cntrld = " + cntrld);

	if(curField.id.indexOf("ogo") > -1)
	{
		//alert("Image Left");
		var reduceHeight = (parseInt(transData.width)-5);
		$(curField).heigth(reduceHeight);								
		$("#Height").val(reduceHeight);								
		transData.width = reduceHeight;
		localStorage.setItem('transportation', JSON.stringify(transData));																
	}
	else if(shifted && alt)
	{
		alert("shifted/Alt");
		if(e.keyCode == '38')
		{
			//alert('e.keyCode = ' + e.keyCode);
			var redHeight = 500;
			alert(curField.id);
			$(curField).width(($(curField).width() + 10));
			$(curField).height(($(curField).height() + 10));
		}
		else if(e.keyCode == '40')
		{
			alert('e.keyCode = ' + e.keyCode);
			var redHeight = 500;
			alert(curField.id);
			$(curField).width(($(curField).width() - 10));
			$(curField).height(($(curField).height() - 10));
		}

		/*
		else if (e.keyCode == '38') {
			//alert(curField.id);	
			
			//alert("Image Center");
			var imgAlign = ("center");
			$(curField).attr("align",imgAlign);								
			$("#Align").val(imgAlign);								
			transData.align = imgAlign;
			localStorage.setItem('transportation', JSON.stringify(transData));																
		}
		else if (e.keyCode == '37') {
			//alert(curField.id);	
			
			//alert("Image Left");
			var imgAlign = ("left");
			$(curField).attr("align",imgAlign);								
			$("#Align").val(imgAlign);								
			transData.align = imgAlign;
			localStorage.setItem('transportation', JSON.stringify(transData));																
		}
		else if (e.keyCode == '39') {
			//alert(curField.id);	
			
			//alert("Image Right");
			var imgAlign = ("right");
			$(curField).attr("align",imgAlign);								
			$("#Align").val(imgAlign);								
			transData.align = imgAlign;
			localStorage.setItem('transportation', JSON.stringify(transData));																
		}
		*/
	}
	else if(shifted)
	{	
		alert("shifted");
		var chkFldSize = document.getElementById("chkFldSize");
		//alert("curLabel = lbl" + curField.id);
		//curField.width(curField.value.length*10);
		//var curDiv = "div" + curField.id;
		//var curLbl = "lbl" + curField.id;
		//alert("curDiv = " + curDiv);
		//$("#" + curDiv).width($("#" + curLbl).html().length*10);
		//$("#" + curLbl).width($("#" + curLbl).html().length*8);	
		//alert("curField isNull = '" + (curField.value == null));

		if (e.keyCode == '17')
		{
			alert("shifted and Control");
			//alert("Cntrl curField = '" + curField.id + "'");	
			chkFldSize.checked = true;
			$("#" + curField.id).focus();	
		}
		
		if(e.keyCode == '18')
		{
			alert("shifted and Alt");
			chkFldSize.checked = false;
			$("#" + curField.id).focus();	
		}
		
		if(curField != null && chkFldSize.checked)
		{			
			//alert("Adjust width of " + curField.id);
			if($("#" + curField.id).val().length == 0)
			{							
				if (e.keyCode == '38') {
					//alert("Up");
					if(curField.id.indexOf("ogo") > -1)
					{
						//alert("Image Left");
						var reduceHeight = (parseInt(transData.width)-5);
						$(curField).heigth(reduceHeight);								
						$("#Height").val(reduceHeight);								
						transData.width = reduceHeight;
						localStorage.setItem('transportation', JSON.stringify(transData));																
					}

					/*
					
					//alert("Width of div" + curField.id + " in element = " + $("#div" + curField.id).width());				
					curWidthUp = parseInt($("#div" + curField.id).width()+5);
					
					//$("#" + curField.id).val(curWidthUp+10);				
					//alert("Up After " + $("#div" + curField.id).width());							
					
					for (var i=0;i<transData.Data[0].Sections.length;i++) 
					{
						for (var j=0;j<transData.Data[0].Sections[i].Fields.length;j++) 
						{
							for (var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++) 
							{
								var id = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
								if (transData.Data[0].Sections[i].Fields[j].Subfields[k].Id == curField.id) {
									$("#Width").val(transData.Data[0].Sections[i].Fields[j].Subfields[k].Width);								
									transData.Data[0].Sections[i].Fields[j].Subfields[k].Width = curWidthUp;
									$("#div" + curField.id).width(curWidthUp);
									localStorage.setItem('transportation', JSON.stringify(transData));								
									//alert("Width of div" + curField.id + " in element = " + $("#div" + curField.id).width());				
									//alert("Width of div" + curField.id + " in transData = " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Width);
								}
							}
						}
					}
					//$("#" + curField.id).width($("#" + curField.id).width()+5);
					*/
				}											
				else if (e.keyCode == '40') {
					//alert("Down");
					if(curField.id.indexOf("ogo") > -1)
					{
						//alert("Image Center");
						var imgAlign = ("center");
						$(curField).attr("align",imgAlign);								
						$("#Align").val(imgAlign);								
						transData.align = imgAlign;
						localStorage.setItem('transportation', JSON.stringify(transData));
		
						//document.getElementById(curField.id).						
						//$("#Align").val(imgAlign);	
						//margin-left: auto;
						//margin-right: auto;
						//width: 50%;							
						transData.align = imgAlign;
						localStorage.setItem('transportation', JSON.stringify(transData));																
					}

					/*
					//alert("Down");
					//alert("Width of div" + curField.id + " in element = " + $("#div" + curField.id).width());				
					curWidthDown = parseInt($("#div" + curField.id).width()-5);
					$("#div" + curField.id).width(curWidthDown);
					//$("#" + curField.id).val(curWidthDown+10);				
					//alert("Up After " + $("#div" + curField.id).width());							
					
					for (var i=0;i<transData.Data[0].Sections.length;i++) 
					{
						for (var j=0;j<transData.Data[0].Sections[i].Fields.length;j++) 
						{
							for (var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++) 
							{
								var id = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
								if (transData.Data[0].Sections[i].Fields[j].Subfields[k].Id == curField.id) {
									$("#Width").val(transData.Data[0].Sections[i].Fields[j].Subfields[k].Width);								
									transData.Data[0].Sections[i].Fields[j].Subfields[k].Width = curWidthDown;
									localStorage.setItem('transportation', JSON.stringify(transData));								
								}
							}
						}
					}
					//$("#" + curField.id).width($("#" + curField.id).width()+5);					
					*/
				}
				else if (e.keyCode == '37') {
					//alert("Left");
					//alert(curField.id);	
					if(curField.id.indexOf("ogo") > -1)
					{
						//alert("Image Center");
						var imgAlign = ("left");
						$(curField).attr("align",imgAlign);								
						$("#Align").val(imgAlign);								
						transData.align = imgAlign;
						localStorage.setItem('transportation', JSON.stringify(transData));																
					}
					else
					{												
						for (var i=0;i<transData.Data[0].Sections.length;i++) 
						{
							for (var j=0;j<transData.Data[0].Sections[i].Fields.length;j++) 
							{
								for (var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++) 
								{
									var id = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
									if (id == curField.id) {																																
										var curWidthDown = (parseInt(transData.Data[0].Sections[i].Fields[j].Subfields[k].Width)-5);
										$("#div" + curField.id).width(curWidthDown);								
										$("#Width").val(curWidthDown);								
										transData.Data[0].Sections[i].Fields[j].Subfields[k].Width = curWidthDown;
										localStorage.setItem('transportation', JSON.stringify(transData));																
									}
								}
							}
						}		
						//$("#" + curField.id).width($("#" + curField.id).width()-5);
					}
				}
				else if (e.keyCode == '39') {
					//alert(curField.id);	
					if(curField.id.indexOf("ogo") > -1)
					{
						//alert("Image Center");
						var imgAlign = ("right");
						$(curField).attr("align",imgAlign);								
						$("#Align").val(imgAlign);								
						transData.align = imgAlign;
						localStorage.setItem('transportation', JSON.stringify(transData));																
					}
					else
					{								
						for (var i=0;i<transData.Data[0].Sections.length;i++) 
						{
							for (var j=0;j<transData.Data[0].Sections[i].Fields.length;j++) 
							{
								for (var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++) 
								{
									var id = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
									if (id == curField.id) {								
										var curWidthUp = (parseInt(transData.Data[0].Sections[i].Fields[j].Subfields[k].Width)+5);
										$("#div" + curField.id).width(curWidthUp);
										$("#Width").val(curWidthUp);								
										transData.Data[0].Sections[i].Fields[j].Subfields[k].Width = curWidthUp;
										localStorage.setItem('transportation', JSON.stringify(transData));																															
										//alert("Width of div" + curField.id + " in element = " + $("#div" + curField.id).width());				
										//alert("Width of div" + curField.id + " in transData = " + transData.Data[0].Sections[i].Fields[j].Subfields[k].Width);
									}
								}
							}
						}
						//$("#" + curField.id).width($("#" + curField.id).width()+5);	
					}
				}				
			}
		}
	}

	if (e.keyCode == '118') {
		//alert("clearCache");				
		clearCache();							
		//alert("'RP");							
		//reloadPage();
	}
}

function c()
{
	//alert("onChange");
	curField = event.target;
	
	id = curField.id;
	
	if(id="txtAreaLList")
	{
		//alert("txtAreaLList has changed");
		$("#btnAddItem").prop('disabled', false);
	}
	
	//$('textarea').on('change keyup keydown paste cut', 'textarea', function () {
	//alert("test: " + $("#" + curField.id).val().trim().length);
	
	//alert("textarea length = " + $("#" + curField.id).val().trim().length);
	//if($("#" + curField.id).val().trim().length > 20)
	//{
		//alert("textarea length = " + $("#" + curField.id).val().trim().length);
		//$("#" + curField.id).attr('rows',2);
	//}
	//}).find('textarea').change();
}

function checkAdjust()
{
	$("#" + curField.id).focus();	
}

function setSection(secTitle, sec)
{
	//alert("secCount = " + secCount);
	//document.getElementById("divProps").style.display = "none";
	//document.getElementById("divLevels").style.display = "block";	
	
	//selectAllCompany();
	//var curSec = document.getElementById("divSecTitle" + secCount);
	//translateNow("#divSecList" + secCount,secTitle);
	//curSec.innerHTML = secTitle;
	//curSecBody.append = "<input type='text' />";
	//dropSection();
	//addDD(sec);
	/*
	if(secTitle.indexOf("Company Profile") == 0)
	{
		//document.getElementById("divDDFields0").style.display = "block";
		document.getElementById("divTools").style.display = "block";
		document.getElementById("divViewer").style.height = "280px";
		addDD();
	}
	else if(secTitle.indexOf("Vehicle Information") == 0)
	{
		//alert(x);
		document.getElementById("divViewer").style.height = "400px";
		addDD();
		$("#divSection" + secCount + "Body").append("<div id='divVehicle' draggable='true' style='margin-top:10px'><table class='w3-border w3-table w3-table-all' width='100%'><tr class='w3-green'><th>Vehicle Information</th><th class=''>Total</th><th class=''>Owned</th><th class=''>Leased</th></tr><tr><td>Trailer</td><td>10</td><td>4</td><td>6</td></tr><tr><td>Bus</td><td>12</td><td>5</td><td>7</td></tr><tr><td>Tractor</td><td>8</td><td>2</td><td>10</td></tr><tr><td>Haz Mat</td><td>18</th><td>12</td><td>6</td></tr></table></div>");
	}
	else if(secTitle.indexOf("Driver") == 0)
	{
		//document.getElementById("divDepFields").style.display = "block";
	}
	*/
	//setLabel("Enter Label");
	//var curLabel = document.getElementById("LSF" + fldCount);
	//curLabel.focus();
	//var divSecList = document.getElementById("divSecList" + secCount);
	//divSecList.empty();
}

function dropSection() {
	if(dropFlag == 1)
	{
		dropFlag = 0;
		//alert("Drop Section Titles");
		//alert("secCount = " + secCount);
		//alert("divSecList + secCount = '" + "divSecList" + secCount + "'");
		var x = document.getElementById("divSecList" + secCount);
		if (x.className.indexOf("w3-show") == -1) {
			//alert("show");
			x.className += " w3-show";
		} else {
			//alert("hide");
			//x.className = x.className.replace(" w3-show", "");
		}
	}
}

function addBar(_c) 
{
	//alert("c = " + c);
	//alert("d = " + d);
	
	/*
	var x = document.getElementById("divBar" + c);
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");			
	}
	*/
}


function onBlur()
{	
	curField = event.target;	
	var required = transData.Data[0].Sections[curSecIndex].Fields[curFldIndex].Subfields[curSubIndex].Required;
	var id = curField.id;

	secId = $("txtSecIndex").val();

	//if(isFocus && curField.name != undefined)
	//{						
		var fldName = curField.name.replace(':','').replace("FSF","").replace("MSF","").trim();
		var lblId = id.replace("txt","lbl");		
		var subColor = $("#" + lblId).css('color');
		
		if(required == "Required")
		{			
			if(curField.value.length == 0)
			{
				//alert("2: Is required");
				$("#" + id).css('background-color',invalidColor);
			}	
			else if(fldName.indexOf("Social Security") != -1 || fldName == "SSN")
			{
				isSSN();
			}
			else if(fldName.indexOf("Email") != -1)
			{
				isEmail();
			}
			else if(fldName.indexOf("Date") != -1 || fldName.indexOf("DOB") != -1 || fldName.indexOf("Birth") != -1)
			{
				isDate();
			}
			else if(fldName.indexOf("Phone") != -1 || fldName.indexOf("Fax") != -1 || fldName.indexOf("Cell") != -1)
			{
				isPhone();
			}
			else
			{
				curField.value = curField.value.toUpperCase();
				curField.style.color = "black";
				$("#" + id).css('background-color',clearColor);
			}							
		}
		else if(fldName.indexOf("Social Security") != -1 || fldName.indexOf("SSN") != -1)
		{
			isSSN();
		}
		else if(fldName.indexOf("Email") != -1)
		{
			isEmail();
		}
		else if(fldName.indexOf("Date") != -1)
		{
			isDate();
		}
		else if(fldName.indexOf("Phone") != -1 || fldName.indexOf("Fax") != -1 || fldName.indexOf("Cell") != -1)
		{
			isPhone();
		}
		else
		{
			curField.value = curField.value.toUpperCase();
			curField.style.color = "black";
			$("#" + id).css('background-color',clearColor);
		}
	//}
		
	//alert(curField.value);
	//isFocus = true;				
}

function createTable(txt)
{
	alert(txt);

	var newText = "";
	var curData = "";
	var newArray = [];
	var colCount = -1;
	var text = "asdasd";

	jQuery.get('Imports/episd.csv', function(transData) {
		//alert(transData);
		//process text file line by line
		newText = transData.replace('n','');
		//alert("newText + " + newText);
		$("#divTableTextArea").text(newText);
		var colArray = $("#divTableTextArea").text().split('☐');
					
		//$("#divSection" + secCount + "Body").append("<div><table id='tblSymptoms' width='95%' class='w3-margin'></table></div>");
		//$("#divSection" + secCount + "Body").append("<textarea id='txt' cols='150' rows='20' />");
		//$("#tblSymptoms").append("<tr><th width='74%' colspan='2' class='w3-border'><label style='padding-left:5px;padding-bottom:20px'>Symptoms</label></th><th width='26%' colspan='2' class='w3-border w3-center'>Give Checked Medication<br><label style='font-size:10px'>Physician authorized treatment</th></th><tr>");
		//alert(colArray.length);
		
		for(var i=0;i<colArray.length;i++)
		{
			//var colArray = rowArray[i].split('☐');
			curData = colArray[i];
			//alert(curData.replace(/[\n\r\â]/g, '').length);
			if(curData.indexOf('\n') == -1)
			{
				newArray.push(curData);
			}
			else if(curData.length > 50)
			{
				newArray.push(curData.replace(/[\n\r\â]/g,''));
				//alert("0 = " + newArray[i].length);	
			}
			else
			{						
				var lastColArray = curData.split('\n');						
				newArray.push(lastColArray[0]);										
				newArray.push(lastColArray[1]);							
			}		
		}		

		//alert(newArray.length);
		var curRow = -1;
		var nl = "";
		var width = "50";
		//alert(newArray.length)
		var curCheck = "<input type='checkbox' style='margin-left:5px;margin-bottom:10px' class='w3-check' checked>";
		for(var i=0;i<newArray.length;i++)
		{					
			curCol = newArray[i];					
			if(curCol.length == 1)
			{
				//alert(i);
				//alert("'" + curCol + "'");
			}

			if(i==0 || i==4 || i==8 || i==12 || i==16 || i==20 || i==24 || i==28 || i==32 || i==36 || i==40)
			{
				curRow++;
				width = 8;
				curCheck = "";
				$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");
			}
			else if(i==1 || i==5 || i==9 || i==13 || i==17 || i==21 || i==25 || i==29 || i==33 || i==37 || i==41)
			{
				curCheck = "<input type='checkbox' style='margin-left:5px;margin-bottom:10px' class='w3-check'>";
				width = 68;						
				$("#tblSymptoms").append("<tr id='tr" + curRow + "'></tr>");
			}
			else
			{
				curCheck = "<input type='checkbox' style='margin-left:5px;margin-bottom:10px' class='w3-check'>";
				width = 12;						
			}
			
			if(curCol.replace(/[\r\n\☐]/g,' ').length>1)
			{	
				alert("Add " + curCol + " to section");			
				transData.Data[0].Sections[0].Fields.push({"Field":curCol});
				$("#tr" + curRow).append("<td class='w3-border' style='width:" + width + "%;font-size:10px'>"  + curCheck + "<label style='padding-left:5px;padding-right:5px'>" + curCol.replace(/[\r\n\☐]/g,' ') + "</label></td>");																
			}										
		}
	});
}

function docViewer()
{	
	//alert("DocViewer");
	if($("#btnDocViewer").html("Hide Viewer"))
	{
		$("#divFooter").hide();
		$("#btnDocViewer").html("Show Viewer");
		$("#divProps").hide();
		$("#divLevels").hide();
	}
	else
	{
		//$("#divFooter").show();
		$("#btnDocViewer").html("Hide Viewer");
		$("#btnDocViewer").html("Show Viewer");
		$("#btnDocViewer").html("Show Viewer");
		$("#divProps").hide();
		$("#divLevels").show();
	}
}

function updateField(curField, curSec, curFld,  curType)
{
	//alert("Add a subfield to section " + curSec + " and field " +  curFld);

	var nextSubfieldIndex = transData.Data[0].Sections[curSec].Fields[curFld].Subfields.length;
	subId = "sub" + curSec + curFld + nextSubfieldIndex + "0";
	subField = curField;
	subType = curType;
	subToolTip = "";
	subChecked = "Checked";
	subRequired = "";
	subtype = curType;
	subDisabled = "";
	subSize = "10";
	subWidth = "150";
	subHeight = "35";
	subMinlength = "0";
	subColor = "#00ff00";
	subBGColor = "#ffffff";
	localStorage.setItem("transportation", JSON.stringify(transData));
	retrievedObjectTransportation = localStorage.getItem('transportation');	
	transData = JSON.parse(retrievedObjectTransportation);
	//addDD(curSec);
}

function addField(curField, curSec, curFld,  curType)
{
	alert("Add a subfield to section " + curSec + " and field " +  curFld);

	var nextSubfieldIndex = transData.Data[0].Sections[curSec].Fields[curFld].Subfields.length;
	subId = "sub" + curSec + curFld + nextSubfieldIndex + "0";
	subField = curField;
	subType = curType;
	subToolTip = "";
	subChecked = "Checked";
	subRequired = "";
	subtype = curType;
	subDisabled = "";
	subSize = "10";
	subWidth = "150";
	subHeight = "35";
	subMinlength = "0";
	subColor = "#00ff00";
	subBGColor = "#ffffff";

	transData.Data[0].Sections[curSec].Fields[curFld].Subfields.push ( 			
		{
			"Id": subId,
			"Subfield": subField,
			"ToolTip": subToolTip,
			"Checked": subChecked,
			"Required": subRequired,
			"Key": "",
			"Type": subType,
			"Readonly": "",
			"Disabled": subDisabled,
			"Size": subSize,
			"Width": subWidth,
			"Height": subHeight,
			"Minlength": subMinlength,
			"Maxlength": "50",
			"Textcolor": subColor,
			"MarginLeft": "30",
			"Backgroundcolor": subBGColor,
			"Fieldlength": "",
			"Datetype": "",
			"Function1": "",
			"Function2": "",
			"Function3": "",
			"Logic1": "",
			"Logic2": "",
			"Logic3": "",
			"Value1": "",
			"Value2": "",
			"Value3": "",
			"Group1": "",
			"Group2": "",
			"Group3": "",
			"Lists": [
			]
		}					
	)

	localStorage.setItem("transportation", JSON.stringify(transData));
	retrievedObjectTransportation = localStorage.getItem('transportation');	
	transData = JSON.parse(retrievedObjectTransportation);
	//addDD(curSec);
}

function addDD(curSec)
{
	//alert("curSec = " + curSec);
	//alert("addDD section Index = " + $("#txtSecIndex").val());
	$("#divSection" + curSec + "Body").empty();
	//alert(transData.Data[0].Sections[curSec].Fields.length);

	var isCheckedVisible = "";
	var contenteditable = "contenteditable";
	
	//alert("transData.prop = " + transData.prod)	

	if(transData.prod == 1)
	{
		isCheckedVisible = "hidden";
		contenteditable = "";
	}

	//alert("isCheckedVisible = " + isCheckedVisible)
	
	//alert("transData.prop = " + transData.prod)

	//alert(transData.Data[0].Sections.length);
	for(var j=0;j<transData.Data[0].Sections[curSec].Fields.length;j++)
	{
		//alert("j = " + j);
		var fldId = transData.Data[0].Sections[curSec].Fields[j].Id;		
		//alert("fldId = " + fldId);
		var fldField = transData.Data[0].Sections[curSec].Fields[j].Field;		
		//alert("fldField = " + fldField);
		var fldType = transData.Data[0].Sections[curSec].Fields[j].Type;
		//alert("fldType = " + fldType);		
		var addressId = fldField.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(':','').replace('#','') + curSec;
		
		//alert("fldField = " + fldField);
		//alert("fldType = " + fldType);
		//alert("fldId.substr(5,1) = " + fldId.substr(5,1));
		//alert("isMobile = " + isMobile);
		if(fldType == "Address" && fldId.substr(5,1) == "0" && isMobile == false)
		{	
			//alert("X fldType = " + fldType);											
			$("#divSection" + curSec + "Body").append("<div id='div" + j + addressId + "' class='w3-left' style='width:100%;text-align:left;padding-right:0px'></div>");											
		}								
		else if(fldType == "Address" && isMobile == false)
		{
			//alert("XX fldType = " + fldType);
			$("#divSection" + curSec + "Body").append("<div id='div" + j + addressId + "M' class='w3-left' style='width:100%;text-align:left;padding-right:1px'></div>");							
		}

		//alert("4");
		for(var k=0;k<transData.Data[0].Sections[curSec].Fields[j].Subfields.length;k++)
		{
			//alert("curSec = " + curSec);
			//alert("j = " + j);		
			//alert("4");
			subCount++;			
			
			var chkSA = document.getElementById("chksec0000");
			var subId = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Id;			
			var subField = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Subfield;						
			var subChecked = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Checked;
			var subType = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Type;
			//alert("subType = " + subType);
			var subWidth = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Width;
			//alert("width = " + subWidth);
			var subHeight = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Height;
			//alert("width = " + subWidth);
			var subSize = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Size;
			var subGroup1 = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Group1;
			var subBGColor = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Backgroundcolor;
			var subColor = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Textcolor;
			//alert("subColor = " + subColor);
			var subRequired = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Required;
			var subToolTip = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].ToolTip;
			var subMinlength = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Minlength;				
			var subColor = subColor;
			
			if(subRequired == "Required")
			{
				subColor = "red";
			}
			//alert("subColor = " + subColor);
			//alert("subField = " + subField);
			//alert("subType = " + subType);
			//alert("subId.substr(5,1) = " + subId.substr(5,1));
			//alert("isMobile = " + isMobile);
			if(subChecked == "Checked")
			{
				if(subType == "Address" && subId.substr(5,1) == "0" && isMobile == false)
				{		
					//alert("3 subType = " + subType);										
					$("#div" + j + addressId).append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' " + contenteditable + " style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' " + isCheckedVisible + " /><input style='font-size:14PX' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subId.substr(3) + "' id='" + subId + "'/></div>");													
				}								
				else if(subType == "Address" && isMobile == false)
				{			
					//alert("4 subType = " + subType);	
					$("#div" + j + addressId).append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' " + contenteditable + " style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' " + isCheckedVisible + " /><input style='font-size:14PX' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subId.substr(3) + "' id='" + subId + "'/></div>");								
				}
				else if(subType == "List" && isMobile == false)
				{
					//alert("List");
					//$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left w3-dropdown-hover' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='font-size:14px;text-align:left;margin-top:15px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");													
					//subColor = "black";
					//$("#divSection" + curSec + "Body").append("<div id='divDDC" + curSec + j + "'></div>");			  
					$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left w3-dropdown-hover' style='width:"+ subWidth +"px;margin-top:0px;margin-right:5px;margin-bottom:5px'></div>");
					//alert("width = " + subWidth);
					$("#div" + subId).append("<label id='lbl" + subId + j + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' " + contenteditable + " style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/>");
					$("#div" + subId).append("<div id='divBar" + curSec + j + "' class='w3-dropdown-content w3-bar-block w3-border'></div>");

					for(var l=0;l<transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Lists.length;l++)
					{						
						var curList = transData.Data[0].Sections[curSec].Fields[j].Subfields[k].Lists[l].List;						
						$("#divBar" + curSec + j).append("<a href='#' class='w3-bar-item w3-button'>" + curList + "</a>");					
					}
				}
				else if(subType == "Date" || subType == "date")
				{
					//alert("Date field");
					$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' " + contenteditable + " style='color:" + subColor + ";font-size:14PX;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:2px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' " + isCheckedVisible + " /><input style='height:33px;font-size:14PX;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-date w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subId.substr(3) + "' id='" + subId + "'/></div>");													
				}
				else
				{	
					//alert("Else = " + subField + " : " + subType);	
					//alert("#divSection" + curSec + "Body");	
					//alert(isCheckedVisible);
					//alert(contenteditable);		
					//alert("subColor = " + subColor);										
					$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' " + contenteditable + " style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:2px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' " + isCheckedVisible + " /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subId.substr(3) + "' id='" + subId + "'/></div>");													
                    //$("#divSection" + curSec + "Body").append("<div id='div" + subId + "' class='w3-left' style='margin-right:5px;min-width:" + subMinlength + "px;width:" + subWidth + "px;text-align:left;padding-right:0px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text' contenteditable style='color:" + subColor + ";font-size:14px;text-align:left;margin-top:15px;padding-left:5px' for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:10px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14px;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-input w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + subType + "' name='FSF" + subCount + "' id='" + subId + "'/></div>");																		
				}
			}
		}
	}
	//id= "divSection" + curSec + "Body";
	//title
	//secIndex = 0;
	//accordian(id,title,curSec);
}

function myFunction(c) 
{
	var x = document.getElementById("divBar" + c);
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function addDDx(curSec)
{
	//$("#btnLanguage").focus();
	curField = null;
	//alert("curSec = " + curSec);
	//alert(document.getElementById("radMod").checked);
	var x = "Classification";
	
	//alert("x = " + x);
	//alert("i = " + i);
	//alert("j = " + j);
		
	var fldType = "text";
	var w3 = "input"		

	if(isMobile)
	{
		menuAlign = "center"; //allgn the text
		menuwidth = "100";
		$("#divMenu").css("margin-left","10px");
		$("#divMenu").css("padding-left","10px");
		$("#divForm").css("margin-left","0px");
		$("#divTools").css("padding-left","15px");
		$("#divTools").prop("align","left");
	}
	else
	{
		menuAlign = "left"; //align the text	
		menuBorder = "";
		menuwidth = "80";
		$("#divMenu").css("padding-left","20px");
		$("#divTools").css("padding-left","0px");
		$("#divTools").prop("align","right");
	}
	
	//$("#divPreview").append("<div id='divPDD' style='margin-top:50px'>");
	//$("#divPDD").append("<div class='form-group w3-left' style='text-align:left;padding:5px'><label id='lbl" + fldCount + "' name='LSF" + fldCount + "' class='w3-left w3-text-blue' contenteditable style='width:200px;text-align:left;margin:5px' for='label'>" + ddName + "</label><input style='margin-bottom:10px' id='chkFSF" + secCount + "' type='checkbox' class='w3-check' checked='checked' /><input class='w3-" + w3 + " w3-border' onfocus='onFocus()' onblur='onBlur()' placeholder=' + ddName + "' pattern='\d{1,5}' maxlength='20' size='20' type='" + fldType + "' name='FSF" + fldCount + "' id='txtFSF" + fldCount + "'/></div>");				
	//$("#divPreview").append("</div>");
	
	//$("#divDDList").show();
	
	if (x.indexOf("Type") == -1)
	{
		//$("#divPDD" + fldCount).append("<div id='divSel" + fldCount + "' class='form-group w3-left' style='text-align:left;padding:5px'><label id='lbl" + fldCount + "' name='LSF" + fldCount + "' class='w3-left w3-text-blue' contenteditable style='width:185px;text-align:left;margin:5px' for='label'>" + x + "</label><input style='margin-bottom:10px' id='chkFSF" + secCount + "' type='checkbox' class='w3-check' checked='checked' onclick='delField(\"" + j + "\")'/><input onclick='addBar(\"" + fldCount + "\")' class='w3-" + w3 + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + x + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='txtSelect" + fldCount + "'/></div>");				
	}
	else
	{
		//$("#divPDD" + fldCount).append("<div id='divSel" + fldCount + "' class='form-group w3-left' style='text-align:left;padding:5px'><label id='lbl" + fldCount + "' name='LSF" + fldCount + "' class='w3-left w3-text-yellow' contenteditable style='width:185px;text-align:left;margin:5px' for='label'>" + x + "</label><input style='margin-bottom:10px' id='chkFSF" + secCount + "' type='checkbox' class='w3-check' checked='checked' /><textarea onclick='addBar(\"" + fldCount + "\")' class='w3-" + w3 + " w3-border' rows='1' cols='24' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + x + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='txtSelect" + fldCount + "'/></div>");													
	}

	//$("#divSel" + fldCount).append("<label id='lbl" + fldCount + "' onclick='myFunction(\"" + fldCount + "\")' class='w3-button w3-white w3-text-blue' /><b>" + x +"</b></button><input style='margin-bottom:10px' id='chkFSF" + secCount + "' type='checkbox' class='w3-check' checked='checked' />");
	//$("#divSel" + fldCount).append("<input id='txtSelect" + fldCount + "' onclick='addBar(\"" + fldCount + "\")' class='w3-button w3-white w3-text-blue' placeholder='" + x + "' /></input>");
	//$("#divSel" + fldCount).append("<div id='divBar" + fldCount + "' class='w3-dropdown-content w3-bar-block w3-card-4 w3-animate-zoom'></div>");
					
	//$("#divBar" + fldCount).empty();
	//$("#divDDList").empty();
	//alert(transData.Data[0].Sections[secId].Fields[5].Subfields[0].Lists.length);
	//$("#divSel" + fldCount).append("<div style='width:350px;margin-bottom:10px' class='w3-center w3-label'>Dropdown Items</div>");
	
	var fldCount = 0;
	//alert("fldCount = " + fldCount);
	var checkAllFlag = -1;
	
	//$("#divSection" + secCount + "Body").empty();
	
	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{
		//$("#divSection" + i + "Body").empty();
		if(i == curSec)
		{			
			//alert("match on " + curSec)
			if(transData.Data[0].Sections[i].Checked)
			{
				//alert("1");
				for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
				{
					//alert("2");
					var fldId = transData.Data[0].Sections[i].Fields[j].Id;
					var fldField = transData.Data[0].Sections[i].Fields[j].Field;
					if(transData.Data[0].Sections[i].Fields[j].Checked)
					{
						//alert("3");
						var groupFlag = 0;					
						var addressId = "";
						for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
						{
							//alert("4");
							fldCount++;
							$("#divSection" + secCount + "Body").append("<div id='divPDD" + fldCount + "' style='margin-top:0px'></div>");
							
							var chkSA = document.getElementById("sec0000");
							var subId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
							var subField = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;													
							var subType = transData.Data[0].Sections[i].Fields[j].Subfields[k].Type;
							var subGroup1 = transData.Data[0].Sections[i].Fields[j].Subfields[k].Group1;
							var subBGColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Backgroundcolor;
							var subColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Textcolor;
							var subRequired = transData.Data[0].Sections[i].Fields[j].Subfields[k].Required;
							var subToolTip = transData.Data[0].Sections[i].Fields[j].Subfields[k].ToolTip;
							var subMinlength = transData.Data[0].Sections[i].Fields[j].Subfields[k].Minlength;				
							//alert("subMinlength = " + subMinlength);
							var subColor = "green";

							if(subRequired == "Required")
							{
								subColor = "red";
							}
							//alert(x);

							var omo = " ";
							var oml = " ";
							//alert("subId = " + subId);
							if(subField.indexOf("CA #") == 0)
							{
								//omo = "  onmouseover='toolTipShow(\"" + subId + "\")'";
							}

							if(subField.indexOf("DOT #") == 0)
							{
								//omo = "  onmouseover='toolTipShow(\"" + subId + "\")'";
							}

							if(subField.indexOf("CA #") == 0)
							{
								//oml = "  onmouseleave='toolTipShow(\"" + subId + "\")'";
							}

							if(subField.indexOf("DOT #") == 0)
							{
								//oml = "  onmouseleave='toolTipShow(\"" + subId + "\")'";
							}

							//alert(omo);
							
							var subWidth = transData.Data[0].Sections[i].Fields[j].Subfields[k].Width;
							if(subId == "sub0120")
							{
								//alert("subWidth of id sub0120 in transData = " + subWidth);
							}
							
							var subSize = transData.Data[0].Sections[i].Fields[j].Subfields[k].Size;
							if(transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked)
							{	
								//alert("5");
								//Field = subField;
								//curSubId = subId;
								//document.getElementById("sourceText").value = subField;							
								//alert(document.getElementById("translation").value);
								/*
								if(subGroup1 == fldField)
								{
									if(groupFlag == 0)
									{
										groupFlag = 1;
										//alert("Create a new group Div");
										$("#divPDD" + fldCount).append("<div id='divGroup" + fldId + "' class='w3-left' style='text-align:left;padding-right:10px'>");
										$("#divGroup" + fldId).append("<div id='div" + subId + "' class='w3-left' style='text-align:left;padding-right:10px'><label id='lbl" + subId + "' name='LSF" + subId + "' class='popup w3-left w3-text-" + subColor + "' contenteditable style='width:" + (subWidth-25) + "px;text-align:left;margin-top:18px'" + omo + oml + "for='label'>" + subField + "<span class='popuptext' id='pop" + subId + "'>" + subToolTip + "</span></label><input style='margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check' checked='checked' /><input style='width:" + subWidth + "px' onclick='addBar(\"" + fldCount + "\")' class='w3-" + w3 + " w3-border' size='50' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='" + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
									}
									else
									{
										//alert("Add a field to the new group Div");
										$("#divGroup" + fldId).append("<div id='div" + subId + "' class='w3-left' style='text-align:left;padding-right:10px'><label id='lbl" + subId + "' name='LSF" + subId + "' class='popup w3-left w3-text-" + subColor + "' contenteditable style='width:" + (subWidth-25) + "px;text-align:left;margin-top:18px'" + omo + oml + "for='label'>" + subField + "<span class='popuptext' id='pop" + subId + "'>" + subToolTip + "</span></label><input style='margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check' checked='checked' /><input style='width:" + subWidth + "px' onclick='addBar(\"" + fldCount + "\")' class='w3-" + w3 + " w3-border' size='5' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='" + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
									}
								}
								else
								{
								*/
									//alert("Not a group Field");
									//groupFlag = 0;
									//$("#divPDD" + fldCount).append("<div id='div" + subId + "' class='w3-left' style='text-align:left;padding-right:10px'><label id='lbl" + subId + "' name='LSF" + subId + "' class='popup w3-left w3-text-" + subColor + "' contenteditable style='width:" + (subWidth-25) + "px;text-align:left;margin-top:18px'" + omo + oml + "for='label' size='" + subSize + "'>" + subField + "<span class='popuptext' id='pop" + subId + "'>" + subToolTip + "</span></label><input style='margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check' checked='checked' /><input style='width:" + subWidth + "px' onclick='addBar(\"" + fldCount + "\")' class='w3-" + w3 + " w3-" + subBGColor + " w3-border' size='50' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='" + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
									
									var toolTip = "";

									//if(subToolTip.length>0)
									//{
										//toolTip = "<span class='popuptext' id='pop" + subId + "'>" + subToolTip + "</span>";
									//}

									//subWidth = subField.length*10;
										
									//if(subId == "sub0120")
									//{
										//alert("subWidth of sub0120 in transData = " + subWidth);
									//}
									//add fields to a section

									var px = "px";								
									var subFieldNS = subField.replace(' ','').replace(' ','').replace(' ','').replace(' ','').replace(':','');								

									if(i==0)
									{
										//alert("Add fields to yellow");
										//$("#divSection" + i + "Body").append("<div id='div" + subId + "' class='w3-yellow w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidth + px + ";text-align:left;padding-right:10px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='width:100%:text-align:left;margin-top:18px'" + omo + oml + " for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-" + w3 + " w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");
									}
									else if(i==1)
									{
										//alert("Add fields to black");
										//$("#divSection" + i + "Body").append("<div id='div" + subId + "' class='w3-black w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidth + px + ";text-align:left;padding-right:10px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='width:100%:text-align:left;margin-top:18px'" + omo + oml + " for='label'>" + subField + "</label><input onclick='ischecked()' style='margin-left:0px;margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-text-" + subColor + " w3-" + w3 + " w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");
									}
			
									//alert(isMobile);									

									if(subType == "Address" && subId.substr(5,1) == "0" && isMobile == false)
									{	
										//alert("6");								
										var subWidthAdd = "100%";
										addressId = subFieldNS;
										px = "";
										//alert("1: divSection" + i + "Body");
										$("#divPDD" + fldCount).append("<div id='div" + addressId + "' class='w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidthAdd + px + ";text-align:left;padding-right:10px'></div>");								
										px = "px";
										//alert("Add '" + subField + "' to div" + addressId);
										$("#div" + addressId).append("<div id='div" + subId + "' class='w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidth + px + ";text-align:left;padding-right:11px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='font-size:14px;width:100%;text-align:left;margin-top:18px'" + omo + oml + " for='label'>" + subField + "</label><input onclick='checkSubfields()' style='margin-left:0px;margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-" + w3 + " w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
									}								
									else if(subType == "Address" && isMobile == false)
									{
										//alert("7");
										//alert("2: divSection" + i + "Body");
										$("#divPDD" + fldCount).append("<div id='div" + addressId + "' class='w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidthAdd + px + ";text-align:left;padding-right:11px'></div>");								
										$("#div" + addressId).append("<div id='div" + subId + "' class='w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidth + px + ";text-align:left;padding-right:10px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='font-size:14px;width:100%;text-align:left;margin-top:18px'" + omo + oml + " for='label'>" + subField + "</label><input onclick='checkSubfields()' style='margin-left:0px;margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-" + w3 + " w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
									}
									else if(subType == "List" && isMobile == false)
									{
										alert("List");
									}
									else									
									{
										//alert("8");
										//alert("3: divSection" + i + "Body");
										//alert(subField);
										//alert("secCount = " + secCount);										
										$("#divPDD" + fldCount).append("<div id='div" + subId + "' class='w3-left' style='min-width:" + subMinlength + px + ";width:" + subWidth + px + ";text-align:left;padding-right:10px'><label id='lbl" + subId + "' onblur='lblBlur()' name='LSF" + subId + "' class='notranslate popup w3-left w3-text-" + subColor + "' contenteditable style='font-size:14px;width:100%;text-align:left;margin-top:18px'" + omo + oml + " for='label'>" + subField + "</label><input onclick='checkSubfields()' style='margin-left:0px;margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check w3-right' checked='checked' /><input style='font-size:14PX;width:100%' onclick='addBar(\"" + fldCount + "\")' class='formField w3-" + w3 + " w3-" + subBGColor + " w3-border' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='Enter " + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
									}
									
									//$("#div" + subId).width(100);
									/*var curDiv = "div" + subId;
									var curLbl = "lbl" + subId;
									//alert("curDiv = " + curDiv);
									$("#" + curDiv).width($("#" + curLbl).html().length*10);
									$("#" + curLbl).width($("#" + curLbl).html().length*8);
									
									if(subId == "sub0120")
									{
										//alert("subWidth of sub0120 in field = " + $("#divsub0120").width());
										//alert(subId);
									}*/
								//}
								
								//$("#divForm" + fldId).append("<div id='div" + subId + "' class='w3-left' style='text-align:left;padding-right:10px'><label id='lbl" + subId + "' name='LSF" + subId + "' class='w3-left w3-text-black' contenteditable style='width:" + subWidth + "px;text-align:left;margin-top:18px' for='label'>" + subField + "</label><input style='margin-bottom:0px' id='chkFSF" + subId + "' type='checkbox' class='w3-check' checked='checked' /><input onclick='addBar(\"" + fldCount + "\")' class='w3-" + w3 + " w3-border' size='10' onfocus='onFocus()' onblur='onBlur()' onchange='onChange()' placeholder='" + subField + "' pattern='\d{1,5}' type='" + fldType + "' name='FSF" + fldCount + "' id='" + subId + "'/></div>");								
							}
								//transData.Data[0].Sections[i].Fields[j].Checked = "Checked";

							//$("#divDDList" + fldCount).empty();
							for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
							{
								if(l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length-1)
								{	
									//alert(transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List);					
									$("#divBar" + fldCount).append("<a href='#' onclick='setBar(\"" + fldCount + "\",\"" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List + "\")' class='w3-button w3-bar-item w3-border w3-light-grey' contenteditable>" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List + "</a>");				 
									//if(showList == 1)
									//{
										$("#divSelect").append("<div class='w3-row'><img src='Images/remove.jpg' style='width:20px'/><input onfocus='onFocus()' onblur='onBlur()' class='w3-button w3-light-grey w3-border w3-animate-zoom' style='width:300px;margin-left:10px;margin-bottom:3px;padding:10px' contenteditable value='" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List + "'></input></div>");				 				  
									//}
								}
								else
								{					
									$("#divBar" + fldCount).append("<a href='#' onclick='setBar(\"" + fldCount + "\",\"" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List + "\")' class='w3-button w3-bar-item w3-border w3-light-grey' contenteditable>" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List + "</a>");				 
									//if(showList == 1)
									//{
										$("#divSelect").append("<div class='w3-row'><img src='Images/remove.jpg' style='width:20px'/><input onfocus='onFocus()' onblur='onBlur()' class='w3-button w3-light-grey w3-border w3-animate-zoom' style='width:300px;margin-left:10px;margin-bottom:3px;margin-right:5px;padding:10px' contenteditable value='" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List + "'></input><img src='Images/add.jpg' onclick='addItem(" + secCount + "," + j + "," + k + ")'style='width:20px' /></div>");
									//}
								}			 				  
							}
						}
					}
					
					/*
					for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Lists.length;k++)
					{
						if(k==transData.Data[0].Sections[i].Fields[j].Lists.length-1)
						{				
							$("#divBar" + fldCount).append("<a href='#' onclick='setBar(\"" + fldCount + "\",\"" + transData.Data[0].Sections[i].Fields[j].Lists[k].List + "\")' class='w3-button w3-bar-item w3-border w3-light-grey' contenteditable>" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "</a>");				 
							//if(showList == 1)
							//{
								$("#divDDList").append("<div class='w3-row'><img src='Images/remove.jpg' style='width:20px'/><input onfocus='onFocus()' onblur='onBlur()' class='w3-button w3-light-grey w3-border w3-animate-zoom' style='width:300px;margin-left:10px;margin-bottom:3px;margin-right:5px;padding:10px' contenteditable value='" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "'></input><img src='Images/add.jpg' onclick='addItem(" + secCount + "," + j + "," + k + ")'style='width:20px' /></div>");
							//}
						}
						else
						{					
							$("#divBar" + fldCount).append("<a href='#' onclick='setBar(\"" + fldCount + "\",\"" + transData.Data[0].Sections[i].Fields[j].Lists[k].List + "\")' class='w3-button w3-bar-item w3-border w3-light-grey w3-button' contenteditable>" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "</a>");				 
							//if(showList == 1)
							//{
								$("#divDDList").append("<div class='w3-row'><img src='Images/remove.jpg' style='width:20px'/><input onfocus='onFocus()' onblur='onBlur()' class='w3-button w3-light-grey w3-border w3-animate-zoom' style='width:300px;margin-left:10px;margin-bottom:3px;padding:10px' contenteditable value='" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "'></input></div>");				 				  
							//}
						}			 				  
					}
					*/

					//alert("2: checkAllFlag " + checkAllFlag);
					/*			
					if(transData.Data[0].Sections[secId].Fields[k].Subfields.length > 0)
					{
						//alert(x);
						alert("Subfields length = " + transData.Data[0].Sections[secId].Fields[k].Subfields.length);
						for(var l=0;l<transData.Data[0].Sections[secId].Fields[k].Subfields.length;l++)
						{
							//alert(transData.Data[0].Sections[i].Fields[k].Subfields[l].subfield);
						}
					}
					*/
				}
			}
		}
	}
	//localStorage.setItem("transportation", JSON.stringify(transData));
	
	
	//alert("checkAllFlag " + checkAllFlag);
	if(checkAllFlag == 1)
	{
		//chkSA.checked = true;	
	}
	else
	{
		//chkSA.checked = false;		
	}
	
	
	
						
	//$("divListControls").empty();
	//if(fldCount==0)
	//{
		//$("#divTools").append("<div id='divListControls' class='w3-left'>");
		//$("#divListControls").append("<div id='divNewItem' class='w3-animate-zoom' style='margin-top:10px;margin-bottom:10px;padding:1px'><textarea id='txtAreaList' cols='39' onfocus='onFocus()' onblur='onBlur()' onkeyup='onChange()' maxlength='100' type='Text' class='w3-text' placeholder='Enter new item' style='margin-top:5px;display:block' /></div>");				 				  														
		//$("#divListControls").append("<input id='btnAddItem' type='button' onclick='addItem(" + secCount + "," + j + "," + k + ")' style='margin-top:10px;margin-bottom:5px' class='w3-button w3-border w3-green ' value='Add Item' disabled/></div>")										
		//$("#divListControls").append("<input type='file' name='file' id='file' style='margin-left:0px;margin-top:10px'/>")																			
	//}
	
	//$("#divListControls").append("<div class='w3-left'><input type='button' style='margin-top:15px' onclick='modifyList(" + j + "," + k + ")' class='w3-button w3-green' value='Update List' /></div>")
	/////////document.getElementById('file').onchange = function()
	/*{		
		//alert("File change");
		
		var file = this.files[0];

		var reader = new FileReader();
		reader.onload = function(progressEvent)
		{
			// Entire file
			console.log(this.result);

			// By lines						
			var lines = this.result.split('\n');
			for(var line = 0; line < lines.length; line++)
			{
				//alert((lines[line]));
				var newItem = lines[line].replace("\r","");
				//alert(newItem);
				transData.Data[0].Sections[secId].Fields[j].Lists.push(
					{List: newItem}
				);
				localStorage.setItem("transportation", JSON.stringify(transData));
				
				$("#divBar" + fldCount).empty();
				$("#divDDList").empty();
				for(var k=0;k<transData.Data[0].Sections[secId].Fields[j].Lists.length;k++)
				{
					if(k<transData.Data[0].Sections[secId].Fields[j].Lists.length-1)
					{
						$("#divBar" + fldCount).append("<a href='#' onclick='setBar(\"" + fldCount + "\",\"" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "\")' class='w3-bar-item w3-button' contenteditable>" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "</a>");				 
						$("#divDDList").append("<div class='w3-row'><img src='Images/remove.jpg' style='width:20px'/><input onfocus='onFocus()' onblur='onBlur()' class='w3light-grey w3-animate-zoom' style='width:300px;margin-top:0px;margin-bottom:3px;padding:10px' contenteditable value='" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "'></input></div>");				 				  
					}
					else
					{
						$("#divBar" + fldCount).append("<a href='#' onclick='setBar(\"" + fldCount + "\",\"" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "\")' class='w3-bar-item w3-button' contenteditable>" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "</a>");				 
						$("#divDDList").append("<div class='w3-row'><img src='Images/remove.jpg' style='width:20px'/><input onfocus='onFocus()' onblur='onBlur()' class='w3light-grey w3-animate-zoom' style='width:300px;margin-top:0px;margin-bottom:3px;padding:10px' contenteditable value='" + transData.Data[0].Sections[secId].Fields[j].Lists[k].List + "'></input><img src='Images/add.jpg' onclick='addItem(" + secCount + "," + j + "," + k + ")'style='width:20px' /></div>");
					}	
				}
				//$("#divDDList").append("<div class='w3-center'><input id='btnAddItem' type='button' onclick='modifyList(" + secCount + "," + j + "," + k + ")' class='w3-button w3-orange w3-margin' value='Add Item' /></div>")								
			}
		};
		reader.readAsText(file);
	};*/	

	//var input = document.getElementsByClassName("formField");
	//var inputList = Array.prototype.slice.call(input);
	//alert(inputList.length);
	//inputList.forEach(ShowResults);
}

function ShowResults(_value, _index, _ar) {
	//alert(index);
}

function checkSections()
{
	alert("Refresh Sections");
}

function checkFields()
{
	alert("Refresh Fields");
}

function checkSubfields()
{
	alert("Refresh Subfields");
}

function checkLists()
{
	alert("Refresh Lists");
}

function ischecked()
{
	curField = event.target;
	//alert(curField.id);
	var id = curField.id.replace("FSF","");
	//alert("id = " + id);

	var fldType = id.substr(3,3); 
	var secIndex = id.substr(6,1);
	var fldIndex = id.substr(7,1);
	var subIndex = id.substr(8,1);
	var lstIndex = id.substr(9,1);

	var selectAllSecFlag = 1;
	var selectAllFldFlag = 1;
	var selectAllSubFlag = 1;
	var selectAllLstFlag = 1;

	//alert("selectAllSubFlag = " + selectAllSubFlag);
	//alert(fldType + secIndex + fldIndex + subIndex + lstIndex);
	
	var curCB = document.getElementById(id);
	//alert("button id = " + "btn" + fldType + i + j + k + l);
	var curButton = document.getElementById("btn" + fldType + secIndex + fldIndex + subIndex + lstIndex);
	var curChk = document.getElementById(id);
	//alert(curButton.id);
	//var btnSelectAll = document.getElementById("btn0" + j);
	
	//this section handles the all checkbox to reflect if all checkboxes are checked or not and then check or uncheck the All checkbox
	if(id.indexOf(secIndex + fldIndex + subIndex + lstIndex + "SA") != -1) //Select All has been clicked
	{
		//alert("All CB");
		if(id.indexOf("sec") != -1)		
		{		
			//alert("All Sec CB");
			//alert("Manage all Section check boxes");
			var curChkSec = "";
			var curBtn = "";

			if(curField.checked)
			{
				//alert("All Sec Cb IS checked");			
				for(var i=0;i<transData.Data[0].Sections.length;i++)
				{
					curChkSec = "chksec" + i + fldIndex + subIndex + lstIndex;
					curBtn = document.getElementById("btnsec" + i + fldIndex + subIndex + lstIndex);				
					document.getElementById(curChkSec).checked = true;
					curBtn.disabled = false;
					transData.Data[0].Sections[i].Checked = "Checked";
					transData.Data[0].Sections[i].Disabled = "";
					//selectField(id,1);

					curDivSec = "divsec" + i + fldIndex + subIndex + lstIndex;							
					var w = document.getElementById(curDivSec);			

					if(i==0)
					{
						w.className = w.className.replace(" w3-hide", " w3-show");					
					}
					else
					{
						w.className = w.className.replace(" w3-show", " w3-hide");
					}
				}			
			}
			else
			{
				//alert("SA Sec is NOT checked");				
				for(var i=0;i<transData.Data[0].Sections.length;i++)
				{
					curChkSec = "chksec" + i + fldIndex + subIndex + lstIndex;
					//alert(curChkSec);
					curBtn = document.getElementById("btnsec" + i + fldIndex + subIndex + lstIndex);
									
					document.getElementById(curChkSec).checked = false;
					curBtn.disabled = true;
					transData.Data[0].Sections[i].Checked = "";
					transData.Data[0].Sections[i].Disabled = "Disabled";
					//selectField(id,0);		
					
					curDivSec = "divsec" + i + fldIndex + subIndex + lstIndex;						
					var w = document.getElementById(curDivSec);			
									
					w.className = w.className.replace(" w3-show", " w3-hide");				
				}
			}			
		}

		if(id.indexOf("fld") != -1)		
		{		
			//alert("Manage all Field check boxes");
			var curChkFld = "";
			var curBtn = "";

			if(curField.checked)
			{
				//alert("SA Fields IS checked");			
				for(var j=0;j<transData.Data[0].Sections[secIndex].Fields.length;j++)
				{
					curChkFld = "chkfld" + secIndex + j + subIndex + lstIndex;
					curBtn = document.getElementById("btnfld" + secIndex + j + subIndex + lstIndex);				
					document.getElementById(curChkFld).checked = true;
					curBtn.disabled = false;
					transData.Data[0].Sections[secIndex].Fields[j].Checked = "Checked";
					transData.Data[0].Sections[secIndex].Fields[j].Disabled = "";
					//selectField(id,1);

					var curFld = "divfld" + secIndex + j + "00";						
					var w = document.getElementById(curFld);			

					if(i==0)
					{
						w.className = w.className.replace(" w3-hide", " w3-show");					
					}
					else
					{
						w.className = w.className.replace(" w3-show", " w3-hide");
					}
				}			
			}
			else
			{
				//alert("SA Fields is NOT checked");				
				for(var j=0;j<transData.Data[0].Sections[secIndex].Fields.length;j++)
				{
					curChkFld = "chkfld" + secIndex + j + subIndex + lstIndex;
					curBtn = document.getElementById("btnfld" + secIndex + j + subIndex + lstIndex);
									
					document.getElementById(curChkFld).checked = false;
					curBtn.disabled = true;
					transData.Data[0].Sections[secIndex].Fields[j].Checked = "";
					transData.Data[0].Sections[secIndex].Fields[j].Disabled = "Disabled";
					//selectField(id,0);		
					
					var curFld = "divfld" + secIndex + j + subIndex + lstIndex;						
					var w = document.getElementById(curFld);			
									
					w.className = w.className.replace(" w3-show", " w3-hide");

					var curSecBody = "divSection" + secIndex + "Body";
					var x = document.getElementById(curSecBody);			
					x.empty;					
				}
			}			
		}
		if(id.indexOf("sub") != -1)		
		{		
			//alert("Manage all Subfield check boxes");
			var curChkSub = "";
			var curBtn = "";

			if(curField.checked)
			{
				//alert("All Sub CB IS checked");			
				for(var k=0;k<transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields.length;k++)
				{
					//alert("k = " + k);	
					curChkSub = "chksub" + secIndex + fldIndex + k + lstIndex;
					curBtn = document.getElementById("btnsub" + secIndex + fldIndex + k + lstIndex);				
					document.getElementById(curChkSub).checked = true;
					curBtn.disabled = false;
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[k].Checked = "Checked";
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[k].Disabled = "";
					//selectField(id,1);

					var curSub = "divsub" + secIndex + fldIndex + k + lstIndex;						
					var w = document.getElementById(curSub);			

					if(i==0)
					{
						w.className = w.className.replace(" w3-hide", " w3-show");					
					}
					else
					{
						w.className = w.className.replace(" w3-show", " w3-hide");
					}
				}			
			}
			else
			{
				//alert("SA Sub is NOT checked");				
				for(var k=0;k<transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields.length;k++)
				{
					curChkSub = "chksub" + secIndex + fldIndex + k + lstIndex;						
					curBtn = document.getElementById("btnsub" + secIndex + fldIndex + k + lstIndex);
									
					document.getElementById(curChkSub).checked = false;
					curBtn.disabled = true;
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[k].Checked = "";
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[k].Disabled = "Disabled";
					//selectField(id,0);		
					
					var curSub = "divsub" + secIndex + fldIndex + k + lstIndex;						
					var w = document.getElementById(curSub);			
									
					w.className = w.className.replace(" w3-show", " w3-hide");				
				}
			}			
		}
		if(id.indexOf("lst") != -1)		
		{		
			//alert("Manage all List check boxes");
			var curChkLst = "";
			var curBtn = "";

			if(curField.checked)
			{
				//alert("SA IS checked");			
				for(var l=0;l<transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists.length;l++)
				{
					curChkLst = "chklst" + secIndex + fldIndex + fldIndex + l;
					curBtn = document.getElementById("btnlst" + secIndex + fldIndex + fldIndex + l);				
					document.getElementById(curChkLst).checked = true;
					curBtn.disabled = false;
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[l].Checked = "Checked";
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[l].Disabled = "";
					//selectField(id,1);

					var curLst = "divlst" + secIndex + fldIndex + fldIndex + l;						
					var w = document.getElementById(curLst);			

					if(i==0)
					{
						w.className = w.className.replace(" w3-hide", " w3-show");					
					}
					else
					{
						w.className = w.className.replace(" w3-show", " w3-hide");
					}
				}			
			}
			else
			{
				//alert("SA is NOTchecked");				
				for(var l=0;l<transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists.length;l++)
				{
					curChkLst = "chklst" + secIndex + fldIndex + fldIndex + l;
					curBtn = document.getElementById("btnlst" + secIndex + fldIndex + fldIndex + l);
									
					document.getElementById(curChkLst).checked = false;
					curBtn.disabled = true;
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[l].Checked = "";
					transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[l].Disabled= "Disabled";
					//selectField(id,0);		
					
					var curLst = "divlst" + secIndex + fldIndex + fldIndex + l;						
					var w = document.getElementById(curLst);			
									
					w.className = w.className.replace(" w3-show", " w3-hide");				
				}
			}			
		}
	}
	else
	{		
		if(id.indexOf("sec") !=  -1)
		{
			//alert("Sec is chk not SA");
			for(var i=0;i<transData.Data[0].Sections.length;i++)
			{
				//alert("chksec" + i + fldIndex + subIndex + lstIndex);
				curCheck = document.getElementById("chksec" + i + fldIndex + subIndex + lstIndex);
				//alert("curCheck.id = " + curCheck);
				if(curCheck.checked == false)
				{
					//alert("not checked");
					selectAllSecFlag = 0;
					break;
				}
			}

			if(selectAllSecFlag == 1)
			{
				document.getElementById("chksec0000SA").checked = true;
				transData.Buttons[0].SelectAll[0].Checked = "Checked";
				transData.Buttons[0].SelectAll[0].Disabled = "";
			}
			else if(selectAllSecFlag == 0)
			{
				document.getElementById("chksec0000SA").checked = false;
				transData.Buttons[0].SelectAll[0].Checked = "";
				transData.Buttons[0].SelectAll[0].Disabled = "Disabled";
			}
		}
		else if(id.indexOf("fld") !=  -1)
		{
			//alert("Field is chk not SA");
			for(var j=0;j<transData.Data[0].Sections[secIndex].Fields.length;j++)
			{
				curCheck = document.getElementById("chkfld" + secIndex + j + subIndex + lstIndex);
				//alert("curCheck.id = " + curCheck.id);
				if(curCheck.checked == false)
				{
					//alert("not checked");
					selectAllFldFlag = 0;
					break;
				}
			}
		
			if(selectAllFldFlag == 1)
			{
				document.getElementById("chkfld" + secIndex + "000SA").checked = true;
				transData.Buttons[0].SelectAll[1].Checked = "Checked";
				transData.Buttons[0].SelectAll[1].Disabled = "";
			}
			else if(selectAllFldFlag == 0)
			{
				//alert("chkfld" + secIndex + fldIndex + "00SA");
				document.getElementById("chkfld" + secIndex + "000SA").checked = false;
				transData.Buttons[0].SelectAll[1].Checked = "";
				transData.Buttons[0].SelectAll[1].Disabled = "Disabled";
			}
		}
		else if(id.indexOf("sub") !=  -1)
		{			
			for(var k=0;k<transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields.length;k++)
			{
				curCheck = document.getElementById("chksub" + secIndex + fldIndex + k + lstIndex);		
				if(curCheck.checked == false)
				{
					selectAllSubFlag = 0;
					break;
				}
			}
			//alert("selectAllSubFlag = " + selectAllSubFlag);
			if(selectAllSubFlag == 1)
			{
				document.getElementById("chksub" + secIndex + fldIndex + "00SA").checked = true;
				transData.Buttons[0].SelectAll[2].Checked = "Checked";
				transData.Buttons[0].SelectAll[2].Disabled = "";
			}
			else if(selectAllSubFlag == 0)
			{
				//alert("chksub" + secIndex + fldIndex + "00SA");
				document.getElementById("chksub" + secIndex + fldIndex + "00SA").checked = false;
				transData.Buttons[0].SelectAll[2].Checked = "";
				transData.Buttons[0].SelectAll[2].Disabled = "Disabled";
			}
		}
		else if(id.indexOf("lst") !=  -1)
		{
			
			for(var l=0;l<transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists.length;l++)
			{
				curCheck = document.getElementById("chklst" + secIndex + fldIndex + subIndex + l);
				//alert("curCheck.id = " + curCheck.id);
				if(curCheck.checked == false)
				{
					//alert("not checked");
					selectAllLstFlag = 0;
					break;
				}
			}

			if(selectAllLstFlag == 1)
			{
				document.getElementById("chklst" + secIndex + fldIndex + subIndex + lstIndex + "SA").checked = true;
				transData.Buttons[0].SelectAll[3].Checked = "Checked";
				transData.Buttons[0].SelectAll[3].Disabled = "";
			}
			else if(selectAllLstFlag == 0)
			{
				document.getElementById("chklst" + secIndex + fldIndex + subIndex + lstIndex + "SA").checked = false;
				transData.Buttons[0].SelectAll[3].Checked = "";
				transData.Buttons[0].SelectAll[3].Disabled = "Disabled";
			}
		}

		//alert("selectAllFlag = " + selectAllFlag);
		//This sections turns off the check for the appropriate selection made 
		if(curField.checked) 
		{				
			//alert("Is checked");
			if(id.indexOf("sec") !=  -1)
			{	
				//alert("sec is checked");				
				curChk.checked = true;
				curButton.disabled = false;
				transData.Data[0].Sections[secIndex].Checked = "Checked";
				transData.Data[0].Sections[secIndex].Disabled = "";				
				//selectAllCompany();
				//alert("sec");	
			}
			else if(id.indexOf("fld") !=  -1)
			{	
				//alert("fld is checked");				
				curChk.checked = true;
				curButton.disabled = false;
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Checked = "Checked";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Disabled = "";
				//selectAllCompany();
				//alert("fld");	
			}
			else if(id.indexOf("sub") !=  -1)
			{	
				//alert("sec is checked");
				curChk.checked = true;
				curButton.disabled = false;
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Checked = "Checked";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Disabled = "";
				//selectAllCompany();
				//alert("sub");
			}				
			else if(id.indexOf("lst") !=  -1)
			{	
				//alert("lst is checked");
				curChk.checked = true;	
				curButton.disabled = false;
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[lstIndex].Checked = "Checked";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[lstIndex].Disabled = "";
				//selectAllCompany();	
				//alert("lst");
			}				
		}
		else
		{
			//alert("Is NOT checked"); 
			var sa = document.getElementById("chksec0000SA");
			sa.checked = false;

			if(id.indexOf("sec") !=  -1)
			{	
				//alert("sec is NOT checked");
				//alert("curButton = " + curButton.id);	
				curChk.checked = false;		
				curButton.disabled = true;
				transData.Data[0].Sections[secIndex].Checked = "";
				transData.Data[0].Sections[secIndex].Disabled = "Disabled";
				transData.Data[0].Sections[secIndex].Textcolor = "#000000";
				//alert("curButton text color = " + transData.Data[0].Sections[secIndex].Textcolor);	
				//selectAllCompany();
			}
			else if(id.indexOf("fld") !=  -1)
			{	
				//alert("fld is NOT checked");
				//alert("curButton = " + curButton.id);	
				curChk.checked = false;		
				curButton.disabled = true;
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Checked = "";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Disabled = "Disabled";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Textcolor = "#000000";
				//selectAllCompany();
			}
			else if(id.indexOf("sub") !=  -1)
			{
				//alert("sub is NOT checked");
				//alert("curChk id = " + curChk.id);
				//alert("curChk is checked = " + curChk.checked);
				curChk.checked = false;	
				//alert(curChk.checked);	
				curButton.disabled = true;
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Checked = "";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Disabled = "Disabled";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Textcolor = "#000000";
				//selectAllCompany();
			}				
			else if(id.indexOf("lst") !=  -1)
			{
				//alert("lst");
				curChk.checked = false;		
				curButton.disabled = true;
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[lstIndex].Checked = "";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[lstIndex].Disabled = "Disabled";
				transData.Data[0].Sections[secIndex].Fields[fldIndex].Subfields[subIndex].Lists[lstIndex].Textcolor = "#000000";
				//selectAllCompany();	
			}				
		}
	}

	localStorage.setItem("transportation", JSON.stringify(transData));
	retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	

	var thisSec = $("#txtSection").val();	
	//addSections();
	curSec = secIndex;	
	addDD(curSec);
	
	//selectAllCompany();
	//accordian(curButton.id); //this matches the id expected for the division
}

function accordian(id,title,secIndex)
{	curField = event.target;
	//alert("accordian");
	//alert("id = " + id);
	//alert("title = " + title);
	//alert("secIndex = " +  secIndex);		
	
	retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	
	
	var levelPrefix = "";

	var curBody = "";
	var curButton = "";
	var curSecBody = "";
	var curSecButton = "";

	var fldNumber = "";
	var subNumber = "";
	var lstNumber = "";

	//alert("id = " + id);
	if(id.indexOf("Body") != -1)
	{
		levelPrefix = id.substr(0,10);
		//curSec = id.substr(10,1);
	}
	else
	{
		levelPrefix = id.substr(0,6);
		//curSec = id.substr(6,1);
	}

	//alert("levelPrefix = '" + levelPrefix + "'");
	if(levelPrefix == "divSection")
	{
		//alert("1: divSection");
		//alert("1: id = " + id);
		curSec = id.substr(10,1);
		//alert("1: curSec = " + curSec);
		fldNumber = id.substr(11,1);
		subNumber = id.substr(12,1);
		lstNumber = id.substr(13,1);
	}
	else if(levelPrefix == "divsec")
	{
		//alert("2: divSec");
		//alert("2: id = " + id);
		curSec = id.substr(6,1);
		//alert("2: curSec = " + curSec);
		fldNumber = id.substr(7,1);
		subNumber = id.substr(8,1);
		lstNumber = id.substr(9,1);
	}

	//alert("curSec = " + curSec);
	
	/*
	if(levelPrefix == "divSection")
	{		
		for(var i=0;i<transData.Data[0].Sections.length;i++)
		{
			//alert("curSec = divsec" + i + "000");
			curDivSec = "divsec" + i + "000";						
			var w = document.getElementById(curDivSec);
			
			if(w != null)
			{
				//alert("i = " + i + " secLevel = " +  secLevel);
				if(i==curSec)
				{
					//alert("Ignore this " + curLevel.id);				
				}
				else
				{
					var curBody = "divSection" + i + "Body";
					var a = document.getElementById(curBody);
					a.className = a.className.replace(" w3-show", " w3-hide");
					w.className = w.className.replace(" w3-show", " w3-hide");
				}
				
				for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
				{
					var curFld = "divfld" + i + j + "00";												
					var x = document.getElementById(curFld);						
					if(i==curSec)
					{
						//alert("Ignore this " + curLevel.id);
					}
					else
					{
						x.className = x.className.replace(" w3-show", " w3-hide");
					}

					for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
					{
						var curSub = "divsub" + i + j + k + "0";
						//alert("curSub = " +  curSub);
						var y = document.getElementById(curSub);							
						
						if(i==curSec)
						{
							//alert("Ignore this " + curLevel.id);						
						}
						else
						{
							y.className = y.className.replace(" w3-show", " w3-hide");
						}

						for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
						{
							var curLst = "divlst" + i + j + k + l;						
							var z = document.getElementById(curSub);							
							if(i==curSec)
							{
								//alert("Ignore this " + curLevel.id);					
							}
							else
							{
								z.className = z.className.replace(" w3-show", " w3-hide");
							}

							//z.className = z.className.replace(" w3-show", " w3-hide");
						}
					}
				}
			}
		}

		curSec = id.substr(10,1);
		//alert(id);

		curBody = "divSection" + curSec + "Body";
		curButton = "divsec" + curSec + "000";
		curSecBody = document.getElementById(curBody);
		curSecButton = document.getElementById(curButton);	
		//alert("curSecBody.className = " + curSecBody.className);
		//alert("curSecButton.className = " + curSecButton.className);
		//alert("curSecBody Hide index = " + curSecBody.className.indexOf(" w3-hide"));
		//alert("curSecBody Show index = " + curSecBody.className.indexOf(" w3-show"));
		//alert("curSecButton Show index = " + curSecButton.className.indexOf(" w3-hide"));

		if (curSecBody.className.indexOf(" w3-show") > 0) {	
			//alert("Hide this section");					
			curSecBody.className = curSecBody.className.replace(" w3-show", " w3-hide");
			curSecButtonclassName = curSecButton.className.replace(" w3-show", " w3-hide");		
		} else if (curSecBody.className.indexOf(" w3-hide") > 0) {	
			//alert("Show this section");					
			curSecBody.className = curSecBody.className.replace(" w3-hide", " w3-show");
			curSecButton.className = curSecButton.className.replace(" w3-hide", " w3-show");		
		}
	}
	*/

	if(levelPrefix == "divSection" || levelPrefix == "divsec")
	{
		//curSec = $("#txtSection").val();
		//alert("levelPrefix = " + levelPrefix);
		//alert("curSec = " + curSec);
		for(var i=0;i<transData.Data[0].Sections.length;i++)
		{
			//alert("curSec = divsec" + i + "000");
			curDivSec = "divsec" + i + "000";						
			var w = document.getElementById(curDivSec);
			
			//alert("i = " + i + " secLevel = " +  secLevel);
			if(i==curSec)
			{
				//alert("Ignore this " + curLevel.id);				
			}
			else
			{
				w.className = w.className.replace(" w3-show", " w3-hide");
			}
			var curBody = "divSection" + i + "Body";
			//alert("curBody = " + curBody);
			var a = document.getElementById(curBody);
			
			if(a!=null)
			{
				a.className = a.className.replace(" w3-show", " w3-hide");	
			}
			
			for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
			{				
				var curFld = "divfld" + i + j + "00";
				//alert("curFld = " + curFld);													
				var x = document.getElementById(curFld);						
				
				 if(i==curSec)
				{
					//alert("Ignore this " + curFld);
				}
				else
				{					
					x.className = x.className.replace(" w3-show", " w3-hide");
				}
				
				for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
				{
					var curSub = "divsub" + i + j + k + "0";				
					var y = document.getElementById(curSub);							
					if(i==curSec)
					{
						//alert("Ignore this " + curSub);						
					}
					else
					{
						y.className = y.className.replace(" w3-show", " w3-hide");
					}

					for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
					{
						var curLst = "divlst" + i + j + k + l;						
						var z = document.getElementById(curSub);							
						if(i==curSec)
						{
							//alert("Ignore this " + curLevel.id);					
						}
						else
						{
							z.className = z.className.replace(" w3-show", " w3-hide");
						}

						z.className = z.className.replace(" w3-show", " w3-hide");
					}
				}				
			}
		}	
		
		curBody = "divSection" + curSec + "Body";
		curButton = "divsec" + curSec + "000";
		curSecBody = document.getElementById(curBody);
		curSecButton = document.getElementById(curButton);		

		if (curSecButton.className.indexOf(" w3-show") != -1) {						
			curSecBody.className = curSecBody.className.replace(" w3-show", " w3-hide");
			curSecButton.className = curSecButton.className.replace(" w3-show", " w3-hide");		
		} else if (curSecButton.className.indexOf(" w3-hide") > 0) {						
			curSecBody.className = curSecBody.className.replace(" w3-hide", " w3-show");
			curSecButton.className = curSecButton.className.replace(" w3-hide", " w3-show");		
		}
	}
	else if(levelPrefix == "divfld")
	{
		//alert("1: levelPrefix = " + levelPrefix);
		//alert("1: id = " + curField.id);
		//alert("id.substr(7,1) = " + curField.id.substr(7,1))
		$("#txtCurFld").val(id.substr(7,1));
		//alert("Value = " + $("#" + curField.id).html());
		$("#txtCurSelFld").val($("#" + curField.id).html());
		//alert();
		for(var i=0;i<transData.Data[0].Sections.length;i++)
		{
			for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
			{
				var curFld = "divfld" + i + j + "00";
				var x = document.getElementById(curFld);						
				x.className = x.className.replace(" w3-show", " w3-hide");
				for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
				{
					var curSub = "divsub" + i + j + k + "0";					
					//lert("curSub = " + curSub);							
					var y = document.getElementById(curSub);					
					y.className = y.className.replace(" w3-show", " w3-hide");
					for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
					{
						var curLst = "divlst" + i + j + k + l;						
						var z = document.getElementById(curSub);							
						z.className = z.className.replace(" w3-show", " w3-hide");
					}
				}
			}
		}

		//alert(id);
		curSec = id.substr(6,1);
		fldNumber = id.substr(7,1);
		subNumber = id.substr(8,1);
		lstNumber = id.substr(9,1);
		
		//alert(curSec);
		//alert(fldNumber);
		//alert(subNumber);
		//alert(lstNumber);

		curButton = "divfld" + curSec + fldNumber + "00";
		curFldButton = document.getElementById(curButton);		
		//alert("1: curButton = " + curFldButton.id);
		if (curFldButton.className.indexOf(" w3-show") != -1) {		
			//alert("Hide subfields for " + curButton);							
			curFldButton.className = curFldButton.className.replace(" w3-show", " w3-hide");		
		} else if (curFldButton.className.indexOf(" w3-hide") > 0) {						
			//alert("Show subfield for " + curButton);							
			curFldButton.className = curFldButton.className.replace(" w3-hide", " w3-show");		
		}
	}
	else if(levelPrefix == "divsub")
	{
		//alert("1: levelPrefix = " + levelPrefix);
		for(var i=0;i<transData.Data[0].Sections.length;i++)
		{
			for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
			{
				for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
				{
					var curSub = "divsub" + i + j + k + "0";
					//alert("curSub = " + curSub);					
					var y = document.getElementById(curSub);
												
					y.className = y.className.replace(" w3-show", " w3-hide");
					for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
					{
						var curLst = "divlst" + i + j + k + l;						
						var z = document.getElementById(curSub);							
						z.className = z.className.replace(" w3-show", " w3-hide");
					}
				}
			}
		}
	}
	else if(levelPrefix == "divlst")
	{
		for(var i=0;i<transData.Data[0].Sections.length;i++)
		{
			for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
			{
				for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
				{
					for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
					{
						var curLst = "divlst" + i + j + + k + l;						
						var z = document.getElementById(curSub);							
						z.className = z.className.replace(" w3-show", " w3-hide");
					}
				}
			}
		}
	}	

	/*
	if(id.indexOf("Body") != -1)
	{	
		curSec = id.substr(10,1);

		curBody = "divSection" + curSec + "Body";
		curButton = "divsec" + curSec + "000";
		curSecBody = document.getElementById(curBody);
		curSecButton = document.getElementById(curButton);	
		
		if (curSecBody.className.indexOf(" w3-show") > 0) {						
			//alert("Hide this " + curSecBody.id);
			//alert("Hide this " + curSecButton.id);
			curSecBody.className = curSecBody.className.replace(" w3-show", " w3-hide");
			curSecButton.className = curSecButton.className.replace(" w3-show", " w3-hide");		
		} else if (curSecBody.className.indexOf(" w3-hide") > 0) {						
			//alert("Show this " +  curSecBody.id);
			//alert("Show this " + curSecButton.id);
			curSecBody.className = curSecBody.className.replace(" w3-hide", " w3-show");
			curSecButton.className = curSecButton.className.replace(" w3-hide", " w3-show");		
		}
	}
	else
	{
		curSec = id.substr(6,1);
		fldNumber = id.substr(7,1);
		subNumber = id.substr(8,1);
		lstNumber = id.substr(9,1);

		curBody = "divSection" + curSec + "Body";
		curButton = "divsec" + curSec + "000";
		//alert(curButton);
		curSecBody = document.getElementById(curBody);
		curSecButton = document.getElementById(curButton);		

		if (curSecButton.className.indexOf(" w3-show") != -1) {						
			//alert("Hide this " + curSecBody.id);
			//alert("Hide this " + curSecButton.id);
			curSecBody.className = curSecBody.className.replace(" w3-show", " w3-hide");
			curSecButton.className = curSecButton.className.replace(" w3-show", " w3-hide");		
		} else if (curSecButton.className.indexOf(" w3-hide") > 0) {						
			//alert("Show this " +  curSecBody.id);
			//alert("Show this " + curSecButton.id);
			curSecBody.className = curSecBody.className.replace(" w3-hide", " w3-show");
			curSecButton.className = curSecButton.className.replace(" w3-hide", " w3-show");		
		}
	}	
	*/
	//$("#txtSection").val(secIndex);
}	

function changeBG(selColor)
{
	//alert(selColor);
	$(".footer").css("background-color", selColor);
}

function changeText(selColor)
{
	//alert(selColor);
	$(".footer").css("color", selColor);
}

function newForm()
{	

	/*
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);	
	//alert("Sections Length  = " + transData.Data[0].Sections.length);
	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{	
		//alert(transData.Data[0].Sections[i].Section);
		$("#divLevels").append("<div id='div" + i + "' style='margin-top:5px;margin-right:5px'></div>");	//this is the container for all of the buttons on the right tools menu			
		
		//These variables will be used to create/configure/manage each section on the form
		var secId = transData.Data[0].Sections[i].Id;
		//alert("id = " + secId);
		var secName = transData.Data[0].Sections[i].Section;		
		//alert(secName);
		var secChecked = transData.Data[0].Sections[i].Checked;
		var secDisabled = transData.Data[0].Sections[i].Disabled;
		var secReadOnly = transData.Data[0].Sections[i].Readonly;		
		var secWidth = transData.Buttons[0].Sections[0].Width;
		var secHeight = transData.Data[0].Sections[i].Height;		
		var secBGColor = transData.Data[0].Sections[i].Backgroundcolor;				
		var secColor = transData.Data[0].Sections[i].Color;
		var secVisibility = transData.Data[0].Sections[i].Visibility;				
		var secMarginLeft = transData.Data[0].Sections[i].MarginLeft;						
		
		//These variables will be used to create and configure a button for each of the sections
		var secBtnId = transData.Data[0].Sections[i].Id;
		var secBtnName = transData.Data[0].Sections[i].Section;
		var secBtnChecked = transData.Data[0].Sections[i].Checked;
		var secBtnDisabled = transData.Data[0].Sections[i].Disabled;
		var secBtnReadOnly = transData.Data[0].Sections[i].ReadOnly;

		//These buttons will always share the same properties
		var secBtnWidth = transData.Buttons[0].Sections[0].Width;
		var secBtnHeight = transData.Buttons[0].Sections[0].Height;			
		var secBtnBGColor = transData.Buttons[0].Sections[0].Backgroundcolor;			
		var secBtnColor = transData.Buttons[0].Sections[0].Color;
		var secBtnVisibility = transData.Buttons[0].Sections[0].Visibility;				
		var secBtnMarginLeft = transData.Buttons[0].Sections[0].MarginLeft;		

		//These variables will be used to create and configure a Select All Sections NOTE: 0 is the index of Select All Sections
		var secSABtnId = transData.Buttons[0].SelectAll[0].Id;
		var secSABtnName = transData.Buttons[0].SelectAll[0].Section;
		var secSABtnChecked = transData.Buttons[0].SelectAll[0].Checked;
		var secSABtnDisabled = transData.Buttons[0].SelectAll[0].Disabled;
		var secSABtnReadOnly = transData.Buttons[0].SelectAll[0].ReadOnly;
		var secSABtnWidth = transData.Buttons[0].SelectAll[0].Width;
		var secSABtnHeight = transData.Buttons[0].SelectAll[0].Height;			
		var secSABtnBGColor = transData.Buttons[0].SelectAll[0].Backgroundcolor;			
		var secSABtnColor = transData.Buttons[0].SelectAll[0].Color;
		var secSABtnVisibility = transData.Buttons[0].SelectAll[0].Visibility;	
		var secSABtnMarginLeft = transData.Buttons[0].SelectAll[0].MarginLeft;	
		var secBtnColorPicker = "";

		if(i==0)
		{
			$("#div" + i).append("<div style='padding:0px'><input id='chk" + secId + "SA' type='checkbox' class='w3-check' style='margin-left:" + secSABtnMarginLeft + "px' onclick='ischecked()' " + secSABtnChecked + "><label id='lbl" + secId + "SA' style='width:" + secBtnWidth + "px;color:" + secSABtnColor + ";margin-left:5px' align='left'>" + secSABtnName + "</label><img src='Images/colors.jpg' onclick='selectLevel(\"Select All\")' style='margin-left:5px;width:25px'/></div>");										
			$("#div" + i).append("<div style='padding:0px'><input id='chk" + secId + "' type='checkbox' class='w3-check' style='margin-left:" + secBtnMarginLeft + "px' onclick='ischecked()' " + secChecked + "><button id='btn" + secId + "' onclick='accordian(\"div" + secId + "\",\"" + secBtnName  + "\",\"" + i + "\")' class='secBtn w3-border w3-btn' style='font-size:14px;color:" + secBtnColor + ";background-color:" + secBtnBGColor + ";text-align:left;height:" + secBtnHeight + "px;width:" + secBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + secBtnDisabled + " " + secBtnReadOnly + " contenteditable>" + secBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Sections\")' style='margin-left:5px;width:25px'/></div>");						
			$("#div" + i).append("<div style='padding:0px' id='div" + secId + "' class='w3-accordion-content w3-hide'></div>");				
		}
		else
		{
			$("#div" + i).append("<div style='padding:0px'><input id='chk" + secId + "' type='checkbox' class='w3-check' style='margin-left:" + secBtnMarginLeft + "px' onclick='ischecked()' " + secChecked + "><button id='btn" + secId + "' onclick='accordian(\"div" + secId + "\",\"" + secBtnName  + "\",\"" + i + "\")' class='secBtn w3-border w3-btn' style='font-size:14px;color:" + secBtnColor + ";background-color:" + secBtnBGColor + ";text-align:left;height:" + secBtnHeight + "px;width:" + secBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + secBtnDisabled + " " + secBtnReadOnly + " contenteditable>" + secBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
			$("#div" + i).append("<div id='div" + secId + "' style='padding:0px' class='w3-accordion-content w3-hide'></div>");				
		}
		
		for(var j=0;j<transData.Data[0].Sections[i].Fields.length;j++)
		{			
			//These variables will be used to create/configure/manage each section on the form
			var fldId = transData.Data[0].Sections[i].Fields[j].Id;
			var fldName = transData.Data[0].Sections[i].Fields[j].Field;		
			//alert(fldName);
			var fldChecked = transData.Data[0].Sections[i].Fields[j].Checked;
			var fldDisabled = transData.Data[0].Sections[i].Fields[j].Disabled;
			var fldReadOnly = transData.Data[0].Sections[i].Fields[j].Readonly;		
			var fldWidth = transData.Buttons[0].Sections[0].Width;
			var fldHeight = transData.Data[0].Sections[i].Fields[j].Height;		
			var fldBGColor = transData.Data[0].Sections[i].Fields[j].Backgroundcolor;				
			var fldColor = transData.Data[0].Sections[i].Fields[j].Color;
			var fldVisibility = transData.Data[0].Sections[i].Fields[j].Visibility;				
			var fldMarginLeft = transData.Data[0].Sections[i].Fields[j].MarginLeft;						
			
			//These variables will be used to create and configure a button for each of the fields
			var fldBtnId = transData.Data[0].Sections[i].Fields[j].Id;
			var fldBtnName = transData.Data[0].Sections[i].Fields[j].Field;
			var fldBtnChecked = transData.Data[0].Sections[i].Fields[j].Checked;
			var fldBtnDisabled = transData.Data[0].Sections[i].Fields[j].Disabled;
			var fldBtnReadOnly = transData.Data[0].Sections[i].Fields[j].ReadOnly;

			//These button will always share the same properties
			var fldBtnWidth = transData.Buttons[0].Fields[0].Width;
			var fldBtnHeight = transData.Buttons[0].Fields[0].Height;			
			var fldBtnBGColor = transData.Buttons[0].Fields[0].Backgroundcolor;	
			//alert("Field button color = " + fldBtnBGColor);		
			var fldBtnColor = transData.Buttons[0].Fields[0].Color;
			var fldBtnVisibility = transData.Buttons[0].Fields[0].Visibility;				
			var fldBtnMarginLeft = transData.Buttons[0].Fields[0].MarginLeft;		

			//These variables will be used to create and configure a Select All Fields NOTE: 0 is the index of Select All Fields
			var fldSABtnId = transData.Buttons[0].SelectAll[1].Id;
			var fldSABtnName = transData.Buttons[0].SelectAll[1].Field;
			var fldSABtnChecked = transData.Buttons[0].SelectAll[1].Checked;
			var fldSABtnDisabled = transData.Buttons[0].SelectAll[1].Disabled;
			var fldSABtnReadOnly = transData.Buttons[0].SelectAll[1].ReadOnly;
			var fldSABtnWidth = transData.Buttons[0].SelectAll[1].Width;
			var fldSABtnHeight = transData.Buttons[0].SelectAll[1].Height;			
			var fldSABtnBGColor = transData.Buttons[0].SelectAll[1].Backgroundcolor;			
			var fldSABtnColor = transData.Buttons[0].SelectAll[1].Color;
			var fldSABtnVisibility = transData.Buttons[0].SelectAll[1].Visibility;	
			var fldSABtnMarginLeft = transData.Buttons[0].SelectAll[1].MarginLeft;	
			//alert(fldSABtnMarginLeft);
			//this is the select all sections field which needs the colorpicker 
			//var secSABtnColorPicker = "<input id='clr" + secId + "SA' type='color' onchange='getSecSABtnColor()' onclick='getSecSABtnColor()' value='" + secSABtnColor + "' style='background-color:" + secSABtnBGColor + ";width:25px;margin-left:5px;visibility:" + secSABtnVisibility + "'/>";			
			//var secSABtnColorPicker = "";			
			
			if(j==0)
			{				
				$("#div" + secId).append("<div><input id='chk" + fldId + "SA' type='checkbox' class='w3-check' style='margin-left:" + fldSABtnMarginLeft + "px' onclick='ischecked()' " + fldSABtnChecked + "><label id='lbl" + fldId + "SA' style='width:" + fldBtnWidth + "px;color:" + fldSABtnColor + ";margin-left:5px' align='left'>Select All Fields</label><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");										
				$("#div" + secId).append("<div><input id='chk" + fldId + "' type='checkbox' class='w3-check' style='margin-left:" + fldBtnMarginLeft + "px' onclick='ischecked()' " + fldChecked + "><button id='btn" + fldId + "' onclick='accordian(\"div" + fldId + "\",\"" + secBtnName  + "\",\"" + i + "\")' class='fldBtn w3-border w3-btn' style='font-size:14px;color:" + fldBtnColor + ";background-color:" + fldBtnBGColor + ";text-align:left;height:" + fldBtnHeight + "px;width:" + fldBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + fldBtnDisabled + " " + fldBtnReadOnly + " contenteditable>" + fldBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Fields\")' style='margin-left:5px;width:25px'/></div>");						
				$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content w3-hide'></div>");	
			}
			else
			{
				$("#div" + secId).append("<div><input id='chk" + fldId + "' type='checkbox' class='w3-check' style='margin-left:" + fldBtnMarginLeft + "px' onclick='ischecked()' " + fldChecked + "><button id='btn" + fldId + "' onclick='accordian(\"div" + fldId + "\",\"" + secBtnName  + "\",\"" + i + "\")' class='fldBtn w3-border w3-btn' style='font-size:14px;color:" + fldBtnColor + ";background-color:" + fldBtnBGColor + ";text-align:left;height:" + fldBtnHeight + "px;width:" + fldBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + fldBtnDisabled + " " + fldBtnReadOnly + " contenteditable>" + fldBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
				$("#div" + secId).append("<div id='div" + fldId + "' class='w3-accordion-content w3-hide'></div>");	
			}	
			
			for(var k=0;k<transData.Data[0].Sections[i].Fields[j].Subfields.length;k++)
			{			
				//These variables will be used to create/configure/manage each section on the form
				var subId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
				var subName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;		
				//alert(subName);
				var subChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
				var subDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;
				var subReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Readonly;		
				var subWidth = transData.Buttons[0].Subfields[0].Width;
				var subHeight = transData.Data[0].Sections[i].Fields[j].Subfields[k].Height;		
				var subBGColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Backgroundcolor;				
				var subColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Color;
				var subVisibility = transData.Data[0].Sections[i].Fields[j].Subfields[k].Visibility;				
				var subMarginLeft = transData.Data[0].Sections[i].Fields[j].Subfields[k].MarginLeft;						
				
				//These variables will be used to create and configure a button for each of the fields
				var subBtnId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Id;
				var subBtnName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield;
				var subBtnChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Checked;
				var subBtnDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Disabled;
				var subBtnReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].ReadOnly;

				//These button will always share the same properties
				var subBtnWidth = transData.Buttons[0].Subfields[0].Width;
				var subBtnHeight = transData.Buttons[0].Subfields[0].Height;			
				var subBtnBGColor = transData.Buttons[0].Subfields[0].Backgroundcolor;	
				//alert("Field button color = " + subBtnBGColor);		
				var subBtnColor = transData.Buttons[0].Subfields[0].Color;
				var subBtnVisibility = transData.Buttons[0].Subfields[0].Visibility;				
				var subBtnMarginLeft = transData.Buttons[0].Subfields[0].MarginLeft;		

				//These variables will be used to create and configure a Select All Fields NOTE: 0 is the index of Select All Fields
				var subSABtnId = transData.Buttons[0].SelectAll[2].Id;
				var subSABtnName = transData.Buttons[0].SelectAll[2].Subfield;
				var subSABtnChecked = transData.Buttons[0].SelectAll[2].Checked;
				var subSABtnDisabled = transData.Buttons[0].SelectAll[2].Disabled;
				var subSABtnReadOnly = transData.Buttons[0].SelectAll[2].ReadOnly;
				var subSABtnWidth = transData.Buttons[0].SelectAll[2].Width;
				var subSABtnHeight = transData.Buttons[0].SelectAll[2].Height;			
				var subSABtnBGColor = transData.Buttons[0].SelectAll[2].Backgroundcolor;			
				var subSABtnColor = transData.Buttons[0].SelectAll[2].Color;
				var subSABtnVisibility = transData.Buttons[0].SelectAll[2].Visibility;	
				var subSABtnMarginLeft = transData.Buttons[0].SelectAll[2].MarginLeft;

				//alert(subSABtnMarginLeft);
				//this is the select all sections field which needs the colorpicker 
				//var subSABtnColorPicker = "<input id='clr" + subId + "SA' type='color' onchange='getSubSABtnColor()' onclick='getSABtnColor()' value='" + secSABtnColor + "' style='background-color:" + secSABtnBGColor + ";width:25px;margin-left:5px;visibility:" + secSABtnVisibility + "'/>";			
				//var subSABtnColorPicker = "";			
				
				if(k==0)
				{				
					$("#div" + fldId).append("<div><input id='chk" + subId + "SA' type='checkbox' class='w3-check' style='margin-left:" + subSABtnMarginLeft + "px' onclick='ischecked()' " + subSABtnChecked + "><label id='lbl" + subId + "SA' style='width:" + subBtnWidth + "px;color:" + subSABtnColor + ";margin-left:5px' align='left'>Select All Subfields</label><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");										
					$("#div" + fldId).append("<div><input id='chk" + subId + "' type='checkbox' class='w3-check' style='margin-left:" + subBtnMarginLeft + "px' onclick='ischecked()' " + subChecked + "><button id='btn" + subId + "' onclick='accordian(\"div" + subId + "\",\"" + subBtnName  + "\",\"" + i + "\")' class='subBtn w3-border w3-btn' style='font-size:14px;color:" + subBtnColor + ";background-color:" + subBtnBGColor + ";text-align:left;height:" + subBtnHeight + "px;width:" + subBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + subBtnDisabled + " " + subBtnReadOnly + " contenteditable>" + subBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Subfields\")' style='margin-left:5px;width:25px'/></div>");						
					$("#div" + fldId).append("<div id='div" + subId + "' class='w3-accordion-content w3-hide'></div>");	
				}
				else
				{
					$("#div" + fldId).append("<div><input id='chk" + subId + "' type='checkbox' class='w3-check' style='margin-left:" + subBtnMarginLeft + "px' onclick='ischecked()' " + subChecked + "><button id='btn" + subId + "' onclick='accordian(\"div" + subId + "\",\"" + subBtnName  + "\",\"" + i + "\")' class='subBtn w3-border w3-btn' style='font-size:14px;color:" + subBtnColor + ";background-color:" + subBtnBGColor + ";text-align:left;height:" + subBtnHeight + "px;width:" + subBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + subBtnDisabled + " " + subBtnReadOnly + " contenteditable>" + subBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
					$("#div" + fldId).append("<div id='div" + subId + "' class='w3-accordion-content w3-hide'></div>");	
				}	
				//alert(transData.Data[0].Sections[i].Fields[j].Subfields[k].Field);
				for(var l=0;l<transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists.length;l++)
				{			
					//These variables will be used to create/configure/manage each section on the form				
					var lstId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Id;
					var lstName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List;
					//alert(lstName);		
					var lstChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Checked;
					var lstDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Disabled;
					var lstReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Readonly;		
					var lstWidth = transData.Buttons[0].Subfields[0].Width;
					var lstHeight = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Height;		
					var lstBGColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Backgroundcolor;				
					var lstColor = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Color;
					var lstVisibility = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Visibility;				
					var lstMarginLeft = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].MarginLeft;						
					
					//These variables will be used to create and configure a button for each of the fields
					var lstBtnId = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Id;
					var lstBtnName = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].List;
					var lstBtnChecked = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Checked;
					var lstBtnDisabled = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].Disabled;
					var lstBtnReadOnly = transData.Data[0].Sections[i].Fields[j].Subfields[k].Lists[l].ReadOnly;

					//These button will always share the same properties
					var lstBtnWidth = transData.Buttons[0].Lists[0].Width;
					var lstBtnHeight = transData.Buttons[0].Lists[0].Height;			
					var lstBtnBGColor = transData.Buttons[0].Lists[0].Backgroundcolor;	
					//alert("Field button color = " + lstBtnBGColor);		
					var lstBtnColor = transData.Buttons[0].Lists[0].Color;
					var lstBtnVisibility = transData.Buttons[0].Lists[0].Visibility;				
					var lstBtnMarginLeft = transData.Buttons[0].Lists[0].MarginLeft;		

					//These variables will be used to create and configure a Select All Fields NOTE: 0 is the index of Select All Fields
					var lstSABtnId = transData.Buttons[0].SelectAll[3].Id;
					var lstSABtnName = transData.Buttons[0].SelectAll[3].List;
					var lstSABtnChecked = transData.Buttons[0].SelectAll[3].Checked;
					var lstSABtnDisabled = transData.Buttons[0].SelectAll[3].Disabled;
					var lstSABtnReadOnly = transData.Buttons[0].SelectAll[3].ReadOnly;
					var lstSABtnWidth = transData.Buttons[0].SelectAll[3].Width;
					var lstSABtnHeight = transData.Buttons[0].SelectAll[3].Height;			
					var lstSABtnBGColor = transData.Buttons[0].SelectAll[3].Backgroundcolor;			
					var lstSABtnColor = transData.Buttons[0].SelectAll[3].Color;
					var lstSABtnVisibility = transData.Buttons[0].SelectAll[3].Visibility;	
					var lstSABtnMarginLeft = transData.Buttons[0].SelectAll[3].MarginLeft;

					//alert(lstSABtnMarginLeft);
					//this is the select all sections field which needs the colorpicker 
					//var lstSABtnColorPicker = "<input id='clr" + lstId + "SA' type='color' onchange='getSubSABtnColor()' onclick='getSABtnColor()' value='" + secSABtnColor + "' style='background-color:" + secSABtnBGColor + ";width:25px;margin-left:5px;visibility:" + secSABtnVisibility + "'/>";			
					//var lstSABtnColorPicker = "";			
					
					if(l==0)
					{				
						$("#div" + subId).append("<div><input id='chk" + lstId + "SA' type='checkbox' class='w3-check' style='margin-left:" + lstSABtnMarginLeft + "px' onclick='ischecked()' " + lstSABtnChecked + "><label id='lbl" + lstId + "SA' style='width:" + lstBtnWidth + "px;color:" + lstSABtnColor + ";margin-left:5px' align='left'>Select All Lists</label><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");										
						$("#div" + subId).append("<div><input id='chk" + lstId + "' type='checkbox' class='w3-check' style='margin-left:" + lstBtnMarginLeft + "px' onclick='ischecked()' " + lstChecked + "><button id='btn" + lstId + "' onclick='accordian(\"div" + lstId + "\",\"" + lstBtnName  + "\",\"" + i + "\")' class='lstBtn w3-border w3-btn' style='font-size:14px;color:" + lstBtnColor + ";background-color:" + lstBtnBGColor + ";text-align:left;height:" + lstBtnHeight + "px;width:" + lstBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + lstBtnDisabled + " " + lstBtnReadOnly + " contenteditable>" + lstBtnName + "</button><img src='Images/colors.jpg' onclick='selectLevel(\"Lists\")' style='margin-left:5px;width:25px'/></div>");						
						$("#div" + subId).append("<div id='div" + lstId + "' class='w3-accordion-content w3-hide'></div>");	
					}
					else
					{
						$("#div" + subId).append("<div><input id='chk" + lstId + "' type='checkbox' class='w3-check' style='margin-left:" + lstBtnMarginLeft + "px' onclick='ischecked()' " + lstChecked + "><button id='btn" + lstId + "' onclick='accordian(\"div" + lstId + "\",\"" + lstBtnName  + "\",\"" + i + "\")' class='lstBtn w3-border w3-btn' style='font-size:14px;color:" + lstBtnColor + ";background-color:" + lstBtnBGColor + ";text-align:left;height:" + lstBtnHeight + "px;width:" + lstBtnWidth + "px;margin-left:5px;margin-bottom:0px' " + lstBtnDisabled + " " + lstBtnReadOnly + " contenteditable>" + lstBtnName + "</button><button style='background-color:transparent;width:30px;border:0px solid transparent'/></div>");						
						$("#div" + subId).append("<div id='div" + lstId + "' class='w3-accordion-content w3-hide'></div>");	
					}	
				}
			}
		}
	}		
	*/
	/*
	$("#divMenu").empty();
	//$("#divMenu").append('<form id="menuForm" class="col-sm-10 form-inline w3-left"></form>');
	//$("#menuForm").append('<div id="divRemoveLogo" class="w3-center w3-margin"><input type="button" id="btnRemoveLogo" style="width:200px" class="w3-button w3-blue w3-border" value="Remove Logo"></div>');				
	
	var curLanguage = "English";
	/*
	//$("#navMain").append("<div id='divLogoLabel' style='text-align:left;font-size:12px;display:none;' class='w3-White'>Select Logo</div>");					
	//$("#navMain").append("<container id='divLogo' style='display:none;' class='w3-light-grey'></container>");			
	//$("#divLogo").append("<div id='divLogoTitle' class='w3-center' contenteditable>Add Logo</div>");			
	
	$("#divMenu").append('<div id="divHeader" class="w3-left"><input type="button" onclick="addHeader()" style="background-color:#2b4370;margin-bottom:1px;margin-top:0px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnHeader" value="Header"></div>');						
	$("#divMenu").append('<div id="divFaxHeader" class="w3-left"><input type="button" onclick="addFaxHeader()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnFaxHeader" value="Fax Header"></div>');			
	$("#divMenu").append('<div id="divTitle" class="w3-left"><input type="button" onclick="addTitle()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnTitle" value="Title"></div>');	
	$("#divMenu").append('<div id="divInstructions" class="w3-left"><input type="button" onclick="addInstructions()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnInstructions" value="Instructions"></div>');			
	
	
	//$("#divMenu").append('<div id="divSections" class="w3-right"><input type="button" onclick="addSection()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:right" class="w3-btn w3-text-white w3-left" id="btnAddSection" value="Section"></div>');									
	var lstSABtnColor = transData.Buttons[0].SelectAll[3].Color;	

	for(var i=0;i<transData.Menus.length;i++)
	{
		var menuAlign = transData.Menus[i].Align;
		
		var menuOnClick = transData.Menus[i].OnClick;
		//alert(menuOnClick);
		var menuId = transData.Menus[i].Id;
		
		$("#divMenu").append('<div id="div' + transData.Menus[i].Id + '" class="w3-'+ menuAlign +'"><input type="button" onclick="' + menuOnClick + '" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-right" id="'+ menuId +'" value="Section"></div>');										
	}

	$("#divMenu").append('<div id="divContact" class="w3-left"><input type="button" onclick="addContact()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnAddContact" value="Contact Information"></div>');									
	$("#divMenu").append('<div class="w3-left"><input type="button" onclick="addFooter()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnFooter" value="Footer"></input></div>');
	$("#divMenu").append('<div class="w3-left"><input type="button" onclick="addSubmit()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnSubmit" value="Submit"></input></div>');		
	$("#divMenu").append('<div id="divGroupLabel" class="w3-left"><input type="button" onclick="addGroupLabel()" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white w3-left" id="btnGroupLabel" value="Group Label"></div>');						
	$("#divMenu").append('<div id="divTextbox" onclick="setLabel(\'' + "Date" + '\')" class="w3-left"><input type="button" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white" id="btnAddTextbox" value="Textbox"></div>');						
	$("#divMenu").append('<div id="divCheckbox" onclick="setLabel(\'' + "Checkbox" + '\')" class="w3-left"><input type="button" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white" id="btnAddCheckbox" value="Checkbox"></div>');						
	$("#divMenu").append('<div id="divRadio" onclick="setLabel(\'' + "Radio" + '\')" class="w3-left"><input type="button" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white" id="btnAddRadio" value="Radio"></div>');						
	$("#divMenu").append('<div id="divDropdown" onclick="setLabel(\'' + "Dropdown" + '\')" class="w3-left"><input type="button" style="background-color:#2b4370;margin-bottom:1px;width:160px;text-align:left" class="w3-btn w3-text-white" id="btnAddDropdown" value="Dropdown"></div>');						
	$("#divMenu").append('<div id="divDownload" class="w3-left"><input type="button" onclick="download()" style="margin-bottom:1px;width:160px;text-align:left;background-color:#2b4370" class="w3-btn w3-text-white w3-text w3-left" id="btnDownload" value="Download"></div>');	
	$("#divMenu").append("<div><p id='pLanguage' class='notranslate w3-bold w3-left' style='margin-top:25px;font-size:20px;color:green;display:none'>" + curLanguage + "</p></div>");	
	
	
	for(var i=0;i<transData.Menus.length;i++)
	{
		//alert(menuOnClick);
		var menuId = transData.Menus[i].Id;
		var menuTitle = transData.Menus[i].Title;
		var menuChecked = transData.Menus[i].Checked;
		var menuHeight = transData.Menus[i].Height;
		var menuWidth = transData.Menus[i].Width;
		var menuAlign = transData.Menus[i].Align;		
		var menuOnClick = transData.Menus[i].OnClick;
		var menuBGColor = transData.Menus[i].Backgroundcolor;
		var menuColor = transData.Menus[i].Color;		
		var menuType = transData.Menus[i].Type;		
		var menuMarginLeft = transData.Menus[i].MarginLeft;		
		var menuMarginBottom = transData.Menus[i].MarginBottom;				
		var menuBorder = "w3-border";
		var menuLogo = "url";
		
		if(menuChecked)
		{
			//alert(isMobile);
			if(isMobile)
			{
				menuAlign = "center"; //allgn the text
				menuwidth = "100";
				$("#divMenu").css("margin-left","10px");
				$("#divMenu").css("padding-left","10px");
				$("#divForm").css("margin-left","0px");
				$("#divTools").css("padding-left","15px");
			}
			else
			{
				menuAlign = "left"; //align the text	
				menuBorder = "";
				menuwidth = "80";
				$("#divMenu").css("padding-left","20px");
				$("#divTools").css("padding-left","0px");
			}
			//alert(menuAlign);                                                                                                           
			$("#divMenu").append('<button id="btn'+ menuId +'" type=" ' + menuType + '" onclick="' + menuOnClick + '" style="color:' + menuColor + ';background-color:' + menuBGColor + ';width:' + menuWidth + 'px;font-size:14px;margin-left:' + menuMarginLeft + 'px;margin-bottom:' +  menuMarginBottom + 'px;text-align:' + menuAlign + '" class="w3-btn ' + menuBorder + '">'  + menuTitle + '</button>');										
			//$("#divMenu").append('<div id="div' + transData.Menus[i].Id + '"><button type=" ' + menuType + '" onclick="' + menuOnClick + '" style="width:100%;font-size:9px;color:black;margin-bottom:"' + menuMarginBottom + 'px";text-align:'+ menuAlign +'" id="' + menuId + '">'  + menuTitle + '</button></div>');										
			//$("#divMenu").append('<div id="div' + transData.Menus[i].Id + '"><button type=" ' + menuType + '" onclick="' + menuOnClick + '" style="width:100%;font-size:9px;color:' + menuColor + ';background-color:' + menuBGColor + ';margin-bottom:"' + menuMarginBottom + 'px";text-align:'+ menuAlign +'" id="' + menuId + '">'  + menuTitle + '</button></div>');										
			
			//$("#divMenu").append('<div><button>Button ' + i + '</div>');										
		}
	}
	//$("#divMenu").append('<div id="divDownload" class="w3-left"><button type="button" onclick="download()" style="margin-bottom:1px;width:100px;text-align:left;background-color:#2b4370" class="w3-btn w3-text-white w3-text w3-left" id="btnDownload" value="Download"></div>');	
	//$("#divMenu").append('<div id="divLanguage" class="w3-left"><div type="button" onclick="addHeader()" style="background-color:#2b4370;margin-bottom:5px;margin-top:5px;width:160px;text-align:left" class="w3-btn w3-left" id="btnLanguage" value="'+ curLanguage + '" /></div>');			
	*/
}

function lblBlur()
{
	var curFld = event.target;
	var curSubId = curFld.id;
	//alert("Label Blur curSubId: '" + curSubId + "'");
	var curSubFld = curFld.innerHTML;
	//alert(curSubFld);

	for (var i=0; i<transData.Data[0].Sections.length; i++) 
	{
		for (var j=0; j<transData.Data[0].Sections[i].Fields.length; j++) 
		{
			for (var k=0; k<transData.Data[0].Sections[i].Fields[j].Subfields.length; k++) 
			{
				var subFldId = "lbl" + transData.Data[0].Sections[i].Fields[j].Subfields[k].Id; 			
				//alert("subFldId: '" + subFldId + "'");
				if (curSubId == subFldId) 
				{	
					curSec = curSubId.substr(6,1);
					curFld = curSubId.substr(7,1);					
					//alert("Match on " + subFldId);
					//alert(curSubFld);
					var curType = "text";
					if(curSubFld.indexOf("Name") != -1)
					{
						curType = "text";
					}
					else if(curSubFld.indexOf("Date") != -1 || curSubFld.indexOf("DOB") != -1)
					{
						curType = "date";
					}
					else if(curSubFld.indexOf("SSN") != -1)
					{
						curType = "text";
					}
					else if(curSubFld.indexOf("Address") != -1)
					{
						curType = "text";
					}
					else if(curSubFld.indexOf("Phone") != -1)
					{
						curType = "tel";
					}

					updateField(curSubFld, curSec,curFld,curSubId,curType);
			
					transData.Data[0].Sections[i].Fields[j].Subfields[k].Subfield = curSubFld;
					transData.Data[0].Sections[i].Fields[j].Subfields[k].Type = curType;
					localStorage.setItem("transportation", JSON.stringify(transData));
					retrievedObject = localStorage.getItem('transportation');
					transData = JSON.parse(retrievedObject);

					addDD(curSec);
				}
			}
		}
	}
}

function download()
{	
	downloadObjectAsJson(transData,"test.json");
	var me = event.target;
	//alert("DL = " + me.id);
	
	/*
	var retrievedObject = localStorage.getItem('transportation');
	var transData = JSON.parse(retrievedObject);
	transData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transData, null, 4));
	
	var a = document.createElement('a');
		
	a.href = 'transData:' + transData;
	a.download = 'transportation.json';
	a.innerHTML = 'download';
	
	var container = document.getElementById('divSideMenu');
	container.display = "none";
	container.appendChild(a)
	*/
}

function showLevels()
{
	alert("showLevels");
	$("#divLevels").css("display","block");
	$("#divProps").css("display","none");	
}

function selectLevel(level)
{	
	//alert(level);
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    	isMobile = true;
	}

	if(isMobile)
	{
		$("#divTools").css("margin-top","0px");
	}
	else{
		$("#divTools").css("margin-top","0px");
	}

	//curLevel = event.target.id;
	//alert(level);
	$("#btnbgcolor").show();	
	$("#btnbgcolor").focus();
	$("#btnbgcolor").click();

	$("#btnSA").css({"color": "black"});
	$("#btnSec").css({"color": "black"});
	$("#btnFld").css({"color": "black"});
	$("#btnSub").css({"color": "black"});
	$("#btnLst").css({"color": "black"});	

	changeBtn = level;
	btnTitle = level;
	$("#btnbgcolor").html(btnTitle);

	if(level == "Select All")
	{
		curColor = "red";  
	}
	else if(level == "Fields")
	{
		curColor = "green";
	}
	else if(level == "Subfields")
	{
		curColor = "blue";
	}
	//alert("curColor = " + curColor);
}

function btnChange(level)
{	
	//alert(level);
	
	//alert("Set Selected title to Blue");               
	if(level == "Sec")
	{
		//alert("Sections is checked");                            
		changeBtn = "Sec";
		btnTitle = "Change 'Sections' color";
		$("#btnbgcolor").html(btnTitle);  
		curColor = "red";  
	}
	else if(level == "SA")
	{
		//alert("Select All is checked");                            
		changeBtn = "SA"; 
		btnTitle = "Change 'Select All' color";
		$("#btnbgcolor").html(btnTitle); 
		curColor = "green";
	}
	else if(level == "sub")
	{
		//alert("Select All is checked");                            
		changeBtn = "Sub"; 
		btnTitle = "Change 'Select 'Sub' color";
		$("#btnbgcolor").html(btnTitle); 
		curColor = "green";
	}

	//alert("curColor = " + curColor);
	//alert("changeBtn = " + changeBtn);
	//$("#bgcolor").click();
	//$("#bgcolor").focus(); 
}   

function importDDFile(fileType)
{
	curField = event.target;
	//alert("curField.id = " + curField.id);
	alert("importDDFile");
	var getFile = document.getElementById("btnCSV");
	//getFile.style.display = "block";
	getFile.click();
	
	if(fileType == "Form")
	{
		//alert("You clicked on 'Import Form'");
		importFlag = "frm";
	}
	else if(fileType == "Section")
	{
		//alert("You clicked on 'Import Sections'");
		importFlag = "sec";
	}
	else if(fileType == "Field")
	{
		//alert("You clicked on 'Import Fields'");
		importFlag = "fld";
	}
	else if(fileType == "Subfield")
	{
		//alert("You clicked on 'Import Subfields'");
		importFlag = "sub";
	}
	else if(fileType == "List")
	{
		//alert("You clicked on 'Import List'");
		importFlag = "lst";
	}else if(fileType == "Table")
	{
		//alert("You clicked on 'Import Table'");
		importFlag = "tbl";
	}
}

function addSectionToJsonFile()
{

}

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {			
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();			
		}
	);
}

function clearCache()
{
	//alert("Clear Cache");
	//var obj = localStorage.getItem('transportation');	
	//saveText( JSON.stringify(obj), "transportation.json" );
	
	localStorage.clear();
}

function getSecSABtnColor()
{
	//alert($("#secBtnBGColorPicker").val());
	var saSecColorPicker = event.target;
	//alert("saSecColorPicker id = " + saSecColorPicker.id);
	var saSecSelectedColor = $("#" + saSecColorPicker.id).val();
	transData.Buttons[0].SelectAll[0].Backgroundcolor = saSecSelectedColor;
	//alert("Selected SA color = " + saSecSelectedColor);	
	
	$('#btnsec0000SA').css({"background-color": saSecSelectedColor});
	localStorage.setItem("transportation", JSON.stringify(transData));
}

function getSecBtnColor()
{
	var secColorPicker = event.target;
	//alert("secColorPicker id = " + secColorPicker.id);
	var secSelectedColor = $("#" + secColorPicker.id).val();
	transData.Buttons[0].Sections[0].Backgroundcolor = secSelectedColor;
	//alert("Selected color = " + secSelectedColor);	

	for(var i=0;i<transData.Data[0].Sections.length;i++)
	{							
		var curSecBtn = "btnsec" + i + "000";
		//alert("curSecBtn + " + curSecBtn);
		$("#" + curSecBtn).css("background-color",secSelectedColor);		
	}
	localStorage.setItem("transportation", JSON.stringify(transData));
}

function addFaxHeader() 
{
	//alert("addFaxHeader");

	var brokerContact = transData.Groups[1].brokerContact;
	var brokerFax = transData.Groups[1].brokerFax;
	var brokerContact = transData.Groups[1].brokerContact;
	var ccFax = "555-1212";

	rowCount++;
	$("#divForm").append("<div id='divRow" + rowCount + "' class='w3-row w3-margin'></div>");
	var faxHeaderResponse = "<div class='w3-margin' contenteditable><b>Date: 09/22/2017</b></div>";
	faxHeaderResponse += "<table class='w3-table-all' style='width:100%'><tr><td style='text-align:right;width:8%' contenteditable>To:</td>";
	faxHeaderResponse += "<td width:25% contenteditable><b>" + brokerContact + "</b></td>";
	faxHeaderResponse += "<td style='text-align:right;width:25%' contenteditable>From:</td>";
	faxHeaderResponse += "<td style='text-align:left;width:25%' contenteditable><b>" + brokerContact + "</b></td>";
	faxHeaderResponse += "</tr><tr></tr><tr><td style='text-align:right' contenteditable>Fax:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + brokerFax + "</b></td>";
	faxHeaderResponse += "<td style='text-align:right' contenteditable>Fax:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + ccFax + "</b></td>";
	faxHeaderResponse += "</tr><tr><td style='text-align:right' contenteditable>Phone:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + brokerFax + "</b></td>";
	faxHeaderResponse += "<td style='text-align:right' contenteditable>Phone:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + groupPhone + "<b></td></tr>";
	faxHeaderResponse += "<tr><td style='text-align:right' contenteditable>eMail:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + groupEmail + "</b></td>";
	faxHeaderResponse += "<td style='text-align:right' contenteditable>eMail:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + brokerEmail + "</b></td></tr>";
	faxHeaderResponse += "<tr><td style='text-align:right' contenteditable>Group:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + groupName + "</b></td>";
	faxHeaderResponse += "<td style='text-align:right' contenteditable>Group #:</td>";
	faxHeaderResponse += "<td contenteditable><b>" + groupNumber + "</b></td></tr></table>";			
	$("#divRow" + rowCount).append(faxHeaderResponse); 
}

function addTitle(title) 
{
	//getTitleProperties("divForm","Form Title");
	$("#divTitle").text(title);	
	//alert("title =" + title);
	transData.title = title;
	localStorage.setItem("transportation", JSON.stringify(transData));		
}

function addInstructions() 
{
	$("#divForm").append("<div id='divInstructions' class='w3-center' contenteditable><textarea w3-left' rows='3' cols='135' placeholder='Enter Instructions' style='margin-bottom:10px;font-size:14PX solid black;border:0px solid black'></textarea></div>");			
	//$("#divForm").append("<div class'w3-left'>Instructions</div><div class'w3-left'><textarea placeholder='Enter Instructions' rows='5' cols='90'></textarea></div>");			
	//$("#divForm").append("<div style='margin-left:4px'><textarea placeholder='Enter Instructions' rows='3' cols='95' style='text-align:center;margin-left:4px;font-size:12px' class='notranslate'></textarea></div>");			
	//$("#divForm").append("<div class'w3-center'>Instructions</div><textarea style='margin-left:8px;margin-right:10px'</textarea></div>");			
	//$("#divForm").append("");			
}

function addFooter() 
{
	//alert("addFooter");
	$("#divForm").append("<div id='divFooterData' style='margin-bottom:10px;margin-top:0px;margin-left:20px' class='row w3-white w3-center w3-border' contenteditable></div>");				
	rowCount++;
	
	//var retrievedObjectDC = localStorage.getItem('dc');														
	//var transData = JSON.parse(retrievedObjectDC);
	
	//alert(transData.header[0].company[0].address[0].street);
	
	var companyName = transData.header[0].company[0].name;
	var street = transData.header[0].company[0].address[0].street;
	var city = transData.header[0].company[0].address[0].city;
	var unit = transData.header[0].company[0].address[0].unit;
	var state = transData.header[0].company[0].address[0].state;
	var zip = transData.header[0].company[0].address[0].zip;
	
	var busPhone = transData.header[0].company[0].phone[0].business;
	var faxPhone = transData.header[0].company[0].phone[0].fax;
	var salesPhone = transData.header[0].company[0].phone[0].sales;
	var supportPhone = transData.header[0].company[0].phone[0].support;
	
	var busEmail = transData.header[0].company[0].email[0].business;
	var salesEmail = transData.header[0].company[0].email[0].sales;
	var supportEmail = transData.header[0].company[0].email[0].support;
	
	//$("#divFooter" + secCount).append("<div id='divCompanyNameRow" + rowCount + "' class='w3-center' style='margin-left:0px'></div>");
	//$("#divFooter" + secCount).append("<div id='divStreetRow" + rowCount + "' class='w3-center' style='margin-left:0px'></div>");
	//$("#divFooter" + secCount).append("<div id='divCityRow" + rowCount + "' class='w3-center' style='margin-left:0px'></div>");
	
	//$("#divForm").append("<div id='divContact" + rowCount + "' class='w3-row' style='margin-left:10px'>Contact Information</div>");
	//$("#divFooter" + secCount).append("<div id='divBusPhoneRow" + rowCount + "' class='w3-center' style='margin-left:0px'></div>");
	//$("#divFooter" + secCount).append("<div id='divFaxPhoneRow" + rowCount + "' class='w3-center' style='margin-left:0px'></div>");
	//$("#divFooter" + secCount).append("<div id='divSalesPhoneRow" + rowCount + "' class='w3-center w3-left' style='margin-left:0px'></div>");
	//$("#divFooter" + secCount).append("<div id='divSupportPhoneRow" + rowCount + "' class='w3-row w3-center' style='margin-left:0px'></div>");
	//$("#divFooter" + secCount).append("<div id='divEmailRow" + rowCount + "' class='w3-row w3-center' style='margin-left:0px'></div>");
	
	var companyNameResponse = "<input id='lblfh1r1' value='"+ companyName +"' size='30' style='font-size:10px;margin-top:0px;margin-left:0px;border:0px solid black;text-align:left' contenteditable></input>";
	var streetResponse = "<input id='lblfh1r1' value='"+ street +"' size='15' style='font-size:10px;border:0px solid black;margin-left:0px;text-align:left'></input>";
	streetResponse += "<input id='lblfh1r1' value='" + city + ", " + state + " " + zip + "' style='font-size:10px;margin-left:10px;border:0px solid black;text-align:left'></input>";
	//cityResponse += "<input id='lblfh1r1' value='"+ state +"' size='3' style='font-size:12px;margin-left:0px;border:1px;text-align:left'></input>";
	//cityResponse += "<input id='lblfh1r1' value='"+ zip +"' size='2' style='font-size:12px;margin-left:0px;border:1px;text-align:left;width'></input>";
	
	var busPhoneResponse = "<input id='lblfh1r1' value='Phone #: "+ busPhone +"' size='15' style='font-size:10px;margin-left:0px;border:0px;text-align:left'></input>";
	var faxPhoneResponse = "<input id='lblfh1r1' value='Fax #: "+ faxPhone +"' size='15' style='font-size:10px;margin-left:0px;border:0px;text-align:left'></input>";
	var salesPhoneResponse = "<input id='lblfh1r1' value='Sales #: "+ salesPhone +"' size='15' style='font-size:10px;margin-left:0px;border:0px;text-align:left'></input>";
	var supportPhoneResponse = "<input id='lblfh1r1' value='Support #: "+ supportPhone +"' size='15' style='font-size:10px;margin-left:0px;border:0px;text-align:left'></input>";
	
	var emailResponse = "<input id='lblfh1r1' value='" +  busEmail + "' size='15' style='font-size:10px;margin-left:0px;text-align:left'></input>";
	
	//var cityResponse = cityResponse + "," + stateResponse + " " + zipResponse;			
	//cityResponse += "<input id='txtfh2r1' value='transData' style='border:0px;text-align:left;width:200'></input>";			
	//cityResponse += "<input id='txtfh2r1' value='transData' style='border:0px;text-align:left;width:200'></input>";			
	//cityResponse += "<input id='txtfh2r1' value='transData' style='border:0px;text-align:left;width:200'></input>";			
	
	$("#divFooterData").append(companyNameResponse);
	$("#divFooterData").append(streetResponse);
	//$("#divFooter").append(cityResponse);
	$("#divFooterData").append(busPhoneResponse);	
	$("#divFooterData").append(salesPhoneResponse);
	$("#divFooterData").append(supportPhoneResponse);
	$("#divFooterData").append(emailResponse);
}

function addContact()
{
	//alert("Contact");
	$("#divForm").append("<form id='frmContact' draggable='true' action='/action_page.php' class='form w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin' style='width:200px'>");
	$("#frmContact").append("<h2 class='w3-center'>Contact Us</h2>");
		
	$("#frmContact").append("<div class='w3-row w3-section'>");
		$("#frmContact").append("<div class='w3-col' style='width:50px'><i class='w3-xxlarge fa fa-user'></i></div>");
		$("#frmContact").append("<div class='w3-rest'>");
			$("#frmContact").append("<input class='w3-input w3-border' name='first' type='text' placeholder='First Name'>");
		$("#frmContact").append("</div>");
	$("#frmContact").append("</div>");

	$("#frmContact").append("<div class='w3-row w3-section'>");
		$("#frmContact").append("<div class='w3-col' style='width:50px'><i class='w3-xxlarge fa fa-user'></i></div>");
		$("#frmContact").append("<div class='w3-rest'>");
			$("#frmContact").append("<input class='w3-input w3-border' name='last' type='text' placeholder='Last Name'>");
		$("#frmContact").append("</div>");
	$("#frmContact").append("</div>");

	$("#frmContact").append("<div class='w3-row w3-section'>");
		$("#frmContact").append("<div class='w3-col' style='width:50px'><i class='w3-xxlarge fa fa-envelope-o'></i></div>");
		$("#frmContact").append("<div class='w3-rest'>");
			$("#frmContact").append("<input class='w3-input w3-border' name='email' type='text' placeholder='Email'>");
		$("#frmContact").append("</div>");
	$("#frmContact").append("</div>");

	$("#frmContact").append("<div class='w3-row w3-section'>");
		$("#frmContact").append("<div class='w3-col' style='width:50px'><i class='w3-xxlarge fa fa-phone'></i></div>");
		$("#frmContact").append("<div class='w3-rest'>");
			$("#frmContact").append("<input class='w3-input w3-border' name='phone' type='text' placeholder='Phone'>");
		$("#frmContact").append("</div>");
	$("#frmContact").append("</div>");

	$("#frmContact").append("<div class='w3-row w3-section'>");
		$("#frmContact").append("<div class='w3-col' style='width:50px'><i class='w3-xxlarge fa fa-pencil'></i></div>");
		$("#frmContact").append("<div class='w3-rest'>");
			$("#frmContact").append("<input class='w3-input w3-border' name='message' type='text' placeholder='Message'>");
		$("#frmContact").append("</div>");
	$("#frmContact").append("</div>");

	$("#frmContact").append("<button class='w3-button w3-block w3-section w3-blue w3-ripple w3-padding'>Send</button>");
	
	$("#divForm").append("</form>");
}

function addSubmit() 
{
	//alert("Submit");
	addFooter();
	$("#divForm").append("<div class='w3-div w3-center'><input id='btnSubmit' type='button' style='width:100px' class='w3-margin w3-btn w3-green w3-border' value='Submit' onclick='submitScratchData()' ></input></div>");			
	$("#divForm").append("<div class='w3-div w3-center'><input id='btnPreview' type='button' style='width:100px' class='w3-btn w3-orange w3-border' value='Preview' onclick='preview()''></input></div>");

	if(transData.prod == 1)
	{
		$("#btnPreview").val("Edit");
		$("#divLogoBtns").hide();
		$("#btnPrev").hide();
		$("#btnNext").hide();
		addSubmitFlag = 0;
	}
	else if(transData.prod == 0)
	{
		$("#btnPreview").val("Preview");		
	}
}

function addCheckbox() 
{	
	//alert("Checkbox");	
}		

function addRadio() 
{
	//alert("Radio");
}

function addSelect() 
{
	//alert("Dropdown");
}

function addLogo(imageName)
{	
	//alert("in logo title = " + title);
	//alert("in addlogo imageName = " + imageName);
	//alert("in logo title = " + title);
		
	var logoWidth = transData.width;
	
	$("#divLogo").empty();
	$("#divLogo").show();

	$("#divLogo").append("<div id='divLogoBox' class='row' style'width:100%'><div id='divLogoImg' style'align:" + imgAlign + ";width:100%'><img id='imgLogo1' class='w3-margin w3-border' style='padding:10px;width:" + logoWidth + "px' src='Images/" + title + "/" + imageName + "' onclick='onFocus()' ></img></div>");
	$("#divLogo").append("<div id='divLogoBtns' class='row' style'align:" + imgAlign + ";width:100%'><input id='btnPrev' class='w3-border w3-button' style='margin-left:15px;margin-right:5px;text-align:center;width:85px;height:30px' value='&#10094;' onclick='prevLogo()'></input><input id='btnNext' class='w3-border w3-button' style='margin-left:5px;margin-right:15px;text-align:center;width:85px;height:30px' value='&#10095;' onclick='nextLogo()'></input></div><div>");								

	var imgAlign = transData.align
	//alert("imgAlign = " + imgAlign);
	$("#divLogoImg").attr("align",imgAlign);								
	$("#divLogoBtns").attr("align",imgAlign);

	transData.url = imageName;
	localStorage.setItem("transportation", JSON.stringify(transData));
}	

function prevLogo()
{
	var logoCount = 0;
	
	if(title == "Transportation")
	{
		logoCount = transData.Images[0].Transportation.length;
	}
	else if(title == "Health")
	{
		logoCount = transData.Images[1].Health.length;
	}
	else if(title == "Hospital")
	{
		logoCount = transData.Images[2].Hospital.length;
	}
	else if(title == "Blank")
	{
		logoCount = transData.Images[3].Blank.length;
	}

	if(curLogo > 0)
	{
		curLogo--;
	}

	var logoName = "";

	if(title == "Transportation")
	{
		logoName = transData.Images[0].Transportation[curLogo].Image;
	}
	else if(title == "Health")
	{
		logoName = transData.Images[1].Health[curLogo].Image;
	}
	else if(title == "Hospital")
	{
		logoName = transData.Images[2].Hospital[curLogo].Image;
	}
	else if(title == "Blank")
	{
		logoName = transData.Images[3].Blank[curLogo].Image;
	}	

	imgAlign = transData.align;
	$("#divLogoImg").attr("align",imgAlign);								
	$("#divLogoBtns").attr("align",imgAlign);
	addLogo(logoName);
}

function nextLogo()
{
	var logoCount = 0;
	
	if(title == "Transportation")
	{
		logoCount = transData.Images[0].Transportation.length;
	}
	else if(title == "Health")
	{
		logoCount = transData.Images[1].Health.length;
	}
	else if(title == "Hospital")
	{
		logoCount = transData.Images[2].Hospital.length;
	}
	else if(title == "Blank")
	{
		logoCount = transData.Images[3].Blank.length;
	}
	
	if(curLogo < logoCount)
	{
		curLogo++;
	}

	var logoName = "";

	if(title == "Transportation")
	{
		logoName = transData.Images[0].Transportation[curLogo].Image;
	}
	else if(title == "Health")
	{
		logoName = transData.Images[1].Health[curLogo].Image;
	}
	else if(title == "Hospital")
	{
		logoName = transData.Images[2].Hospital[curLogo].Image;
	}
	else if(title == "Blank")
	{
		logoName = transData.Images[3].Blank[curLogo].Image;
	}

	imgAlign = transData.align;
	$("#divLogoImg").attr("align",imgAlign);								
	$("#divLogoBtns").attr("align",imgAlign);
	addLogo(logoName);
}

function addHeaderCompany() 
{
	companyName = transData.header[0].company[0].name;
	$("#divForm").append("<div id='divCompanyNameRow" + rowCount + "' class='w3-left' style='font-size:10px;margin-left:30px'>" + companyName + "</div><br>");
}

function addHeaderAddress() 
{
	var street = transData.header[0].company[0].address[0].street;
	$("#divForm").append("<div id='divStreetRow" + rowCount + "' class='w3-left' style='font-size:10px;margin-left:30px'>" + street + "</div><br>");
}

function addHeaderCity() 
{
	city = transData.header[0].company[0].address[0].city;
	unit = transData.header[0].company[0].address[0].unit;
	state = transData.header[0].company[0].address[0].state;
	zip = transData.header[0].company[0].address[0].zip;
	$("#divForm").append("<div id='divCityRow" + rowCount + "' class='w3-left' style='font-size:10px;margin-left:30px'>" + city + ", " + state + " " + zip + "</div><br>");
}

function addHeaderState() 
{
}

function addHeaderZip() 
{
}

function addHeaderEmail() 
{
	supportEmail = transData.header[0].company[0].email[0].support;
	$("#divForm").append("<div id='divEmailRow" + rowCount + "' class='w3-left' style='font-size:10px;margin-left:30px'>" + supportEmail + "</div><br>");
}

function addHeaderPhone() 
{
}

function addHeaderFax() 
{
}	

function addHeaderContact() 
{
}

function addHeader() 
{
	rowCount++;
	
	//alert(transData.header[0].company[0].address[0].street);		
	
	var busPhone = transData.header[0].company[0].phone[0].business;
	var faxPhone = transData.header[0].company[0].phone[0].fax;
	var salesPhone = transData.header[0].company[0].phone[0].sales;
	var supportPhone = transData.header[0].company[0].phone[0].support;		
	var companyName = transData.header[0].company[0].name;
	var companyStreet = transData.header[0].company[0].address.street;
	var companyUnit = transData.header[0].company[0].address.unit;
	var companyCity = transData.header[0].company[0].address.city;
	var companyCounty = transData.header[0].company[0].address.County;
	var companyState = transData.header[0].company[0].address.state;
	var companyZip = transData.header[0].company[0].address.zip;	
	var busEmail = transData.header[0].company[0].email[0].business;
	var salesEmail = transData.header[0].company[0].email[0].sales;
	var supportEmail = transData.header[0].company[0].email[0].support;
	
	$("#divForm").append("<div id='divCompanyNameRow" + rowCount + "' class='w3-center' style='font-size:20px;margin-left:0px'>" + companyName + "</div><br><br>");
			
	//$("#divForm").append("<div id='divContact" + rowCount + "' class='w3-row' style='margin-left:10px'>Contact Information</div>");
	//$("#divForm").append("<div id='divBusPhoneRow" + rowCount + "' class='w3-row w3-left' style='margin-left:0px'></div>");
	//$("#divForm").append("<div id='divFaxPhoneRow" + rowCount + "' class='w3-row w3-left' style='margin-left:0px'></div>");
	//$("#divForm").append("<div id='divSalesPhoneRow" + rowCount + "' class='w3-row w3-left' style='margin-left:0px'></div>");
	//$("#divForm").append("<div id='divSupportPhoneRow" + rowCount + "' class='w3-row w3-left' style='margin-left:0px'></div>");
			
	//var companyNameResponse = "<input id='lblfh1r1' value='" + companyName + "' size='25' style='font-size:12px;margin-left:0px;border:1px;text-align:center'></input>";
	var streetResponse = "<input id='lblfh1r1' value='" + companyStreet + "' size='25' style='font-size:12px;margin-left:0px;border:1px;text-align:center'></input>";
	var cityResponse = "<input id='lblfh1r1' value='" + companyCity + ", " + companyState + " " + companyZip + "' size='20' style='font-size:12px;margin-center:0px;border:1px;text-align:left'></input>";
	cityResponse += "<input id='lblfh1r1' value='"+ companyState +"' size='3' style='font-size:12px;margin-left:0px;border:1px;text-align:center'></input>";
	cityResponse += "<input id='lblfh1r1' value='"+ companyZip +"' size='2' style='font-size:12px;margin-left:0px;border:1px;text-align:center;width'></input>";
	
	var busPhoneResponse = "<input id='lblfh1r1' value='Phone #: "+ busPhone +"' style='font-size:12px;margin-left:10px;border:0px;text-align:left'></input>";
	var faxPhoneResponse = "<input id='lblfh1r1' value='Fax #: "+ faxPhone +"' style='font-size:12px;margin-left:10px;border:0px;text-align:left'></input>";
	var salesPhoneResponse = "<input id='lblfh1r1' value='Sales #: "+ salesPhone +"' style='font-size:12px;margin-left:10px;border:0px;text-align:left'></input>";
	var supportPhoneResponse = "<input id='lblfh1r1' value='Support #: "+ supportPhone +"' style='font-size:12px;margin-left:10px;border:0px;text-align:left'></input>";
	
	var emailResponse = "<input id='lblfh1r1' value='" +  busEmail + "' style='font-size:12px;margin-left:10px;border:0px;text-align:left;width:400px'></input>";
	
	//var cityResponse = cityResponse + "," + stateResponse + " " + zipResponse;			
	//cityResponse += "<input id='txtfh2r1' value='transData' style='border:0px;text-align:left;width:200'></input>";			
	//cityResponse += "<input id='txtfh2r1' value='transData' style='border:0px;text-align:left;width:200'></input>";			
	//cityResponse += "<input id='txtfh2r1' value='transData' style='border:0px;text-align:left;width:200'></input>";			
	
	//$("#divCompanyNameRow" + rowCount).append(companyNameResponse);
	$("#divStreetRow" + rowCount).append(streetResponse);
	$("#divCityRow" + rowCount).append(cityResponse);
	$("#divBusPhoneRow" + rowCount).append(busPhoneResponse);
	$("#divEmailRow" + rowCount).append(emailResponse);
	$("#divSalesPhoneRow" + rowCount).append(salesPhoneResponse);
	$("#divSupportPhoneRow" + rowCount).append(supportPhoneResponse);
}

function importNewSection()
{
	/*
	secData = "{Id: 'sec0000',Section: 'Company Profile'}";

	var retrievedObjectSections = localStorage.getItem('sections');				
	sectionData = JSON.parse(retrievedObjectSections);
	//alert(sectionData.Sections.length);
	
	//alert("sectionsFile = " + sectionsFile);

	//location.reload();
	//alert("import the sections");
	var retrievedObjectSections = localStorage.getItem('sections');				
	sectionData = JSON.parse(retrievedObjectSections);
	//alert(sectionData.Sections.length);
	
	//alert("sectionsFile = " + sectionsFile);

	if(transData.Data.length == 0)
	{
		transData.Data.push(sectionData);
	}
	localStorage.setItem("transportation", JSON.stringify(transData));
	var retrievedObjectTransportation = localStorage.getItem('transportation');				
	transData = JSON.parse(retrievedObjectTransportation);
	alert(transData.Data[0].Sections.length)
	if(transData.Data[0].Sections.length > 0)
	{
		addSections();
	}
	*/
}

function addNewForm(_dataAray)
{
	alert("Add New Form");
	//addLogo("index.png");
	title = prompt("Enter form title!", "");	
	addTitle(title);

	if(title.length == 0)
	{
		title = transData.title;
	}
	
	transData.title = title;
	secCount++;
	var secNames = prompt("Add new sections items", "Section " + secCount).split(',');	
	addLogo("index.png");
	
	for(var i=0;i<secNames.length;i++)
	{
		//transData.Data[0].Sections.push ( {"Section":secNames[i],"Fields": [],"Lists": []} );
		
		//transData.Data[0].Sections[secId].Fields.push ( {"Field": "Enter Field Name","Lists": []});
		var secTitle = toTitleCase(secNames[i]);
		transData.Data[0].Sections.push ( 
			{
				"Id": "sec" + i + "000",
				"Section":secTitle,
				"Fields": [
				]
			}
		)

		localStorage.setItem("transportation", JSON.stringify(transData));
		//$("#divSecList" + secCount).append("<a onclick='setSection(\"" + title + "\")' class='w3-bar-item w3-button w3-light-grey' href='#about'>" + title + "</a>"); 				 					
	}

	$("#divLevels").empty();
	getSectionData(transData);
	$("#divLevels").show();
}

function isSSN()
{
	alert("isSSN");
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

function isEmail() {
	alert("isEmail");
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
	alert(curField.value);
	if(curField.value.length > 0 && curField.value != "(999) 999-9999")
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
	alert("isDate");
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