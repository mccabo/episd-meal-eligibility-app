var data = [];

$(document).ready(function()
{
	//alert("ready");
	loadData();
});	

function loadData(local)
{		
	alert("local = " + local);
	//localData = local;
	//clear divMain
	//$("#divMain").empty();
	//set async to false
	jQuery.ajaxSetup({async:false});

	var url = "";
	url = "ajax/build.json";
	
	$.ajax(
	{				
	  url: url,				
	  async: false,
	  dataType: 'json',
	  success: function (json) {
		data = json;
		alert(data.items.length);
		localStorage.setItem('build', JSON.stringify(data));
	  }
	});
}

function addItem()
{
	var retrievedObject = localStorage.getItem('build');
	var data = JSON.parse(retrievedObject);
	//alert("2: Item count = " + dataz.items.length);
	alert("2: Section count = " + data.sections.length);
	var secId = (data.sections.length+1);
	
	var secName = document.getElementById("txtSecName").value;
	data.sections.push({id: secId, name: secName});	
	
	//localStorage.setItem('build', JSON.stringify(dataz));
	
	//var retrievedObjecty = localStorage.getItem('build');
	//var datay = JSON.parse(retrievedObjecty);
	
	//alert("2: Item count = " + datay.items.length);
	//var obj = {a: 123, b: "4 5 6"};
	data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 4));
	
	var a = document.createElement('a');
	a.display = "none";
	a.href = 'data:' + data;
	a.download = 'data.json';
	a.innerHTML = 'download JSON';

	var container = document.getElementById('divMain');
	container.appendChild(a);
	//alert("1: Item count = " + data.items.length);
	a.click();
}

		
	