<template>
  newName: {{ newFName }}
  <form id="frmMain" :action="'http://localhost:3000/updateRow?appId=2025975&fname='+newFName" method="POST" style="border: solid black 0px;width: 100%">
    <div>
      <div v-if="jsonData">
        <h2>Batch # Good</h2>
        <div  v-for="(app,index) in filteredIds"  :key="index">
          {{ app.BatchNum }}
        </div>

        <h2>First Name</h2>
        <input @blur="onBlur('inpFName')" id="inpFName" :value="jsonData.Applications[9].Guardians[0].FirstName">

        <input id="inpUpdate0" name="inpEmail" type="submit" class="w3-btn inpEmail" 
          style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 18px;background-color: #F1F5F9;
          color: black;width: 100px;border: solid black 1px" value="Update">
      </div>
      <div v-else-if="error">
        <p style="color: red;">{{ error }}</p>
      </div>
      <div v-else>
        <p>Loading JSON data...</p>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, onMounted, ReactiveEffect, reactive } from 'vue';
const uniqueId = require('lodash.uniqueid')
export default {
  data() {
    return {
      jsonData: null,
      error: null,
      searchtype: 'id',
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost/applications.json'); // Replace with your URL
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.jsonData = await response.json();
    } catch (error) {
      this.error = 'Failed to fetch JSON data: ' + error.message;
      console.error(error);
    }
  },  
  mounted: function() {
    this.id = uniqueId()
  },  
  computed: {          
    filteredIdss() {   
      //alert(this.jsonData.Applications[0].Guardians[0].FirstName)   
      return this.jsonData.Applications.filter(
        (applications) =>
        applications.Id == "2025975"
      );                    
    },
    filteredIds() {   
      if($("#chkDocumentation").is(':checked')) {
        if(this.searchtype== 'sentTrue') {          
          return this.test.filter(
            (test) =>
            test.Sent == "true"
          );            
        } else if(this.searchtype== 'sentFalse') {      
          return this.test.filter(
            (test) =>
            test.Sent == "false"
          );            
        } else if(this.searchtype== 'printedTrue') {          
          return this.test.filter(
            (test) =>
            test.Printed == "true"
          );            
        } else if(this.searchtype== 'printedFalse') {          
          return this.test.filter(
            (test) =>
            test.Printed == "false"
          );            
        } else if(this.searchtype== 'id') {
          return this.test.filter(
            (test) =>
            test.Id
            .includes(this.Id)                              
          );
        } else if(this.searchtype== 'batch') {
          return this.test.filter(
            (test) =>
            test.BatchNum == this.Batch
          );
        } else if(this.searchtype== 'english') {
          return this.test.filter(
            (test) =>
            test.Language == "English"
          );
        } else if(this.searchtype== 'spanish') {
          return this.test.filter(
            (test) =>
            test.Language == "Spanish"
          );
        } else if(this.searchtype== 'guardian') {
          return this.test.filter(
            (test) =>
            test.Guardians[0].FirstName.trim().toLowerCase()
            .startsWith(this.Guardian.trim().toLowerCase()) ||
            test.Guardians[0].LastName.trim().toLowerCase()
            .includes(this.Guardian.trim().toLowerCase())
          );
        } else if(this.searchtype== 'student') {          
          return this.test.filter(
            (test) =>               
            test.Students[0].LastName.trim().toLowerCase()
            .includes(this.Student.trim().toLowerCase())                      
          );
        } else if(this.searchtype== 'campus') {
          return this.test.filter(
            (test) =>
            test.Students[0].Campus.toLowerCase()
            .startsWith(this.Campus.trim().toLowerCase())                              
          );
        } else if(this.searchtype== 'approvedFree') {          
          return this.test.filter(
            (test) =>
            test.Status[0].Checked == "true"
          );            
        } else if(this.searchtype== 'approvedReduced') {         
          return this.test.filter(
            (test) =>
            test.Status[1].Checked == "true"
          );            
        } else if(this.searchtype== 'denied') {          
          return this.test.filter(
            (test) =>
            test.Status[2].Checked == "true" 
          );            
        } else if(this.searchtype== 'recordid') {
          alert("type: "+this.searchtype)            
          return this.test.filter(
            (test) =>
            test.RecordId == this.RecordId
          );            
        }
      } else {
        //alert(this.jsonData)
        if(this.searchtype== 'sentTrue') {          
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Sent == "true"
          );            
        } else if(this.searchtype== 'sentFalse') {      
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Sent == "false"
          );            
        } else if(this.searchtype== 'printedTrue') {          
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Printed == "true"
          );            
        } else if(this.searchtype== 'printedFalse') {          
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Printed == "false"
          );            
        } else if(this.searchtype== 'id') {
          //alert(this.applications)
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Id == '2025975'
            
          );
        } else if(this.searchtype== 'batch') {
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.BatchNum == this.Batch
          );
        } else if(this.searchtype== 'english') {
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Language == "English"
          );
        } else if(this.searchtype== 'spanish') {
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Language == "Spanish"
          );
        } else if(this.searchtype== 'guardian') {
          return this.applications.filter(
            (applications) =>
            applications.Guardians[0].FirstName.trim().toLowerCase()
            .startsWith(this.Guardian.trim().toLowerCase()) ||
            applications.Guardians[0].LastName.trim().toLowerCase()
            .includes(this.Guardian.trim().toLowerCase())
          );
        } else if(this.searchtype== 'student') {          
          return this.jsonData.Applications.filter(
            (applications) =>               
            applications.Students[0].LastName.trim().toLowerCase()
            .includes(this.Student.trim().toLowerCase())                      
          );
        } else if(this.searchtype== 'campus') {
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Students[0].Campus.toLowerCase()
            .startsWith(this.Campus.trim().toLowerCase())                              
          );
        } else if(this.searchtype== 'approvedFree') {          
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Status[0].Checked == "true"
          );            
        } else if(this.searchtype== 'approvedReduced') {         
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Status[1].Checked == "true"
          );            
        } else if(this.searchtype== 'denied') {          
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.Status[2].Checked == "true"
          );            
        } else if(this.searchtype== 'recordid') {
          alert("type: "+this.searchtype)            
          return this.jsonData.Applications.filter(
            (applications) =>
            applications.RecordId == this.RecordId
          );            
        }
      } 
    },
  },
  setup() {
    let newFName = ref('')
    const onBlur = (inpId) => {    
      //alert("inp Id: "+inpId)  
      newFName.value = $("#"+inpId).val()
      alert("newFName: "+newFName.value)
    }
    return { onBlur,newFName }
  }  
}
</script>
<style>
.tooltip {position: relative;display: inline-block;border-bottom: 1px dotted black; /* If you want dots under the hoverable text */}
.tooltip .tooltiptext {visibility: hidden;width: 120px;background-color: black;color: #fff;text-align: center;padding: 5px 0;border-radius: 6px;position: absolute;z-index: 1;}
.tooltip:hover .tooltiptext {visibility: visible;}
:root {--font-1: rgba(0, 0, 0, 0.75);--font-2: rgba(0, 0, 0, 1);--color-1: rgba(232, 227, 207, 0.457);--color-2: rgba(70, 130, 180, 0.25);}
body {margin-left: 0px;}
.searchBy {width: 100%;border: solid rgb(34, 0, 255) 0px;justify-content: center;text-align: center;margin: 20px;font-size: 20px;}
.filter {width: 13rem!important;justify-content: center!important;margin: 5px; font-size: 20px;} 
.searchButtons {border: solid red 0px;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;}
.divSearchBy {width: 90%!important;}
.divStudentInfo {width: 100%!important;}
.divSent {width: 130px!important;}
.divPrinted {width: 130px!important;}
@media only screen and (max-width: 600px) {.searchButtons {border: solid red 0px;display: flex;flex-direction: row;flex-wrap: wrap;justify-content: center;}
.filter {width: 105px!important;height: 30px!important;font-size: 20px!important;}
.searchBy {border: solid rgb(77, 255, 0) 1px;}
.divSearchBy {width: 95%!important;}.divAppInfo {width: 95%!important;}.divStudentInfo {width: 95%!important;}.divSent {width: 140px!important;}.divPrinted {width: 140px!important;}}
@media print { .divNav {display: none!important;  }.eligibility {overflow-y: hidden;border: none!important;width: 1000px!important;height: 100%!important;font-size: 20px!important;}
.eligibility2 {overflow-y: hidden;border: none!important;width: 1000px!important;height: 100%!important;font-size: 20px!important;}
.divMain {display: none!important;}.divDisplay {display: none!important;}
.divApps {display: none!important;}.viewer {
display: none!important;}
.checkbox input:checked {border-color: red;background-color: red;}}
.highlight {background-color: rgba(235, 227, 194, 0.457);}
tbody>tr{background-color: rgb(255, 255, 255);}
header {padding: 1rem;display: grid;grid-template-columns: auto 1fr;align-items: center;}
thead th {z-index: 1;position: sticky;top: 0;background-color: rgb(255, 255, 255);padding: 0rem;height: 50px;color: rgb(0, 0, 0);  border: solid rgb(255, 255, 255) 1px;
  padding: 10px;}
#app {margin-top: 60px;}
.btn {
  background-color: #0a58ca;
}
.btn:hover {
  background-color: rgb(151, 151, 165); /* Background color on hover */
  color: rgb(0, 0, 0); /* Optional: Change text color for better contrast */
}
</style>
