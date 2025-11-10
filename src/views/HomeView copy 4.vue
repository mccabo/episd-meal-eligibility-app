<template> 
  <form @submit.prevent="handleSubmit" class="hidden">
    <!-- Form elements like inputs, textareas, etc. -->
    <button type="submit">Submit</button>
  </form>

  <form id="myForm" name="myForm" class="hidden">
    <input type="text" name="username" placeholder="Username">
    <button type="submit">Submit</button>
</form>

  todos IIS 1: {{ todos }}
  <!-- <form style="width: 100%;max-width: none;border: solid black 1px"></form>
  <form @submit.prevent="handleSubmit">
    selected: {{ selected }} -->    
  <form id="frmMain" :action="'http://localhost:3000/appIndex?frmData='+this.selected" method="POST" style="border: solid black 0px;width: 100%;
    max-width: none;border: solid black 0px">    
    <!-- Allows an admin/dev/designer to select the logo-->
    <div style="display: flex;margin: 5px auto;border: solid black 0px">
      <input id="inpLogoURL" @blur="setLogoURL" class="txt hidden" style="text-align: left;font-weight: 600;font-size: 18px;
        background-color: white" placeholder="logo url"/>                          
    </div>

    
    <!-- Accordian button for Utility Section -->
    <div v-if="user=='Mary Lou'" class="w-full" style="display: inline-flex;margin: auto;justify-content: left;color: white;
      border-radius: 5px;margin-bottom: 5px">
      <input id="divUtilities" @click="toggleUtilities()" type="button" class="btn" style="text-align: left;margin-left: 0px;font-size: 25px;
        font-weight: 600;color: white" value="Utilities"/>
    </div>

    <div v-if="user=='Mary Lou'" id="divUtilitiesWrapper" class="divUtilitiesWrapper" style="display: flex;margin: auto;
      justify-content: center;border: solid rgb(0, 0, 0) 0px;">     
    <div style="display: flex;margin: auto;justify-content: center;border: solid black 0px" class="w-full">
      <div style="display: flex;margin: auto;border: solid black 0px;justify-content: center" class="w-full">        
          <div id="divUtilitiesMain" v-for="(search,i) in searches" :key="i" style="display: block;margin: 0px;border: solid black 0px;margin-top: -5px">                                   
            <div v-if="i>11" :id="search.id" class="w-full" style="display: flex;margin: auto;justify-content: center;text-align: center;
              border:solid black 0px;color: #0a58ca;font-size: 18px;font-weight: 700;height: 15px">{{ search.label }}</div>                                    
            <div v-if="i>11" style="display: flex;margin:auto;border: solid black 0px;width: 120px;height: 75px">               
              <div v-for="(input,j) in search.inputs" :key="j" :id="input.id" class="utilities" style="display: flex;margin:auto;border: solid black 0px;
                width: 120px">                                                    
                <!-- <input v-if="i=='11'" type="submit">
                <input v-if="i=='11'" :id="input.id" @mouseover="docEvent(11,0)" :type="input.type" :style="input.style" :class="input.class" :value="input.label" :formaction="input.formaction" hidden/> -->
                <input v-if="i=='11'" :id="input.id" @mouseover="docEvent(11,0)" :type="input.type" :style="input.style" :class="input.class" :value="input.label" :formaction="input.formaction" hidden/> 
                <input v-else-if="i=='12'" :id="input.id" @mouseover="docEvent(12,0)" :type="input.type" :style="input.style" :class="input.class" :value="input.label" :formaction="input.formaction" />                                                                                
                <input v-else-if="i=='13'" :id="input.id" @mouseover="docEvent(13,0)" :type="input.type" :style="input.style" :class="input.class" :value="input.label" :formaction="input.formaction"/>                                                                                
                <input v-else-if="i=='14'" id="chkDocumentation" @mouseover="docEvent(14,0)" @click="setDocumentation()" :type="input.type" :style="input.style" :class="input.class" :value="input.label"/>                                                                                
              </div>                                                             
            </div>                                                    
          </div>          
        </div>              
      </div>    
    </div>

    <!-- Accordian button for Search Section -->
    <div class="w-full" style="display: inline-flex;margin: auto;justify-content: left;border: solid black 0px;color: white;border-radius: 5px;
      margin-bottom: 5px">
      <input id="divApplicationInfo" @click="toggleSearch()" type="button" class="btn" style="text-align: left;margin-left: 0px;font-size: 25px;font-weight: 600;
        ;color: white" value="Search"/>
    </div>
    <div id="divSearchWrapper" class="divSearchWrapper" style="height: 100px">     
      <div style="display: flex;margin: auto;border: solid black 0px;justify-content: center;">
        <div style="display: flex;margin: auto;border: solid black 0px;justify-content: center;">
          <div id="divSearchMain" v-for="(search,i) in searches" :key="i" :style="search.divMainStyle">          
            <div v-if="i!=8 && i<11" :id="search.id" class="w-full">{{ search.label }}</div>            
            <div :class="search.class" :style="search.divSearchStyle">
              <div v-for="(input,j) in searches[i].inputs" :key="j" :id="input.id" style="display: flex;margin: auto;justify-content: left;border: solid rgb(0, 0, 0) 0px" class="search">                          
                <input v-if="i=='0' && j=='0'" :id="input.id" @mouseover="docEvent(0,0)" @click="searchApps('sentTrue','divSearchSent','inpSearchSent','filteredSentTrue','true')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />            
                <input v-else-if="i=='0' && j=='1'" :id="input.id" @mouseover="docEvent(0,1)" @click="searchApps('sentFalse','divSearchSent','inpSearchSent','filteredSentFalse','false')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />            
                <input v-else-if="i=='1' && j=='0'" :id="input.id" @mouseover="docEvent(1,0)" @click="searchApps('printedTrue','divSearchPrinted','inpSearchPrinted','filteredPrintedTrue','true')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />            
                <input v-else-if="i=='1' && j=='1'" :id="input.id" @mouseover="docEvent(1,1)" @click="searchApps('printedFalse','divSearchPrinted','inpSearchPrinted','filteredPrintedFalse','false')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                      
                <input v-else-if="i=='2'" :id="input.id" @mouseover="docEvent(2,0)" @click="searchApps('id','divSearchId','inpSearchId','filteredIds','false')" @keyup="searchApps('id','divSearchId','inpSearchId','filteredIds','false')" maxlength="15" :type="input.type" :style="input.style" :class="input.class" :placeholder="input.placeholder" v-model="Id"/>            
                <input v-else-if="i=='3'" :id="input.id" @mouseover="docEvent(3,0)" @click="searchApps('guardian','divSearchGuardian','filteredGuardian','filtereGuardian','false')" @keyup="searchApps('guardian','divSearchGuardian','inpSearchGuardian','filteredGuardians','false')" :type="input.type" :style="input.style" :class="input.class" :placeholder="input.placeholder" v-model="Guardian"/>            
                <input v-else-if="i=='4'" :id="input.id" @mouseover="docEvent(4,0)" @click="searchApps('student','divSearchStudent','filteredStudents','filteredStudents','false')" @keyup="searchApps('student','divSearchStudent','inpSearchStudent','filteredStudents','false')" maxlength="6" :type="input.type" :style="input.style" :class="input.class" :placeholder="input.placeholder" v-model="Student"/>            
                <input v-else-if="i=='5'" :id="input.id" @mouseover="docEvent(5,0)" @click="searchApps('campus','divSearchCampus','filteredCampus','filteredCamous','false')" @keyup="searchApps('campus','divSearchCampus','inpSearchCampus','filteredCampus','false')" :type="input.type" :style="input.style" :class="input.class" :placeholder="input.placeholder" v-model="Campus"/>                                                       
                <Dropdown v-else-if="i=='6'" v-model="selectedStatus" @mouseover="docEvent(6,0)"  :options="status" filter optionLabel="status" placeholder="Status">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex align-items-center" style="border: solid black 0px">                          
                            <div>{{ slotProps.value.status }}</div>
                        </div>
                        <span v-else style="font-weight: 600;font-size: 14px">
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex align-items-center">
                          <label v-if="slotProps.option.code == 'f'" @click="searchApps('approvedFree','divSearchApproved','inpSearchApproved','filteredApprovedFree','false')">{{ slotProps.option.status }}</label>
                          <label v-else-if="slotProps.option.code == 'r'" @click="searchApps('approvedReduced','divSearchApproved','inpSearchApproved','filteredApprovedReduced','false')">{{ slotProps.option.status }}</label>
                        </div>
                    </template>
                </Dropdown>
                <input v-else-if="i=='7'" :id="input.id" @mouseover="docEvent(7,0)" @click="searchApps('denied','divSearchDenied','inpSearchDenied','filteredDenied','false')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
                <input v-else-if="i=='8'" :id="input.id" @mouseover="docEvent(8,0)" @click="searchApps('recordid','divSearchRecordId','inpRecordId','filteredRecordIds','false')" @keyup="searchApps('recordid','divRecordId','inpRecordId','filteredRecordId','false')" maxlength="15" :type="input.type" :style="input.style" :class="input.class" :placeholder="input.placeholder" v-model="RecordId" hidden/>                          
                <input v-else-if="i=='9'" :id="input.id" @mouseover="docEvent(9,0)" @click="searchApps('batch','divSearchBatch','inpSearchBatch','filteredBatch','false')" @keyup="searchApps('batch','divSearchBatch','inpSearchBatch','filteredBatch','false')" maxlength="15" :type="input.type" :style="input.style" :class="input.class" :placeholder="input.placeholder" v-model="Batch"/>            
                <input v-else-if="i=='10' && j=='0'" :id="input.id" @mouseover="docEvent(10,0)" @click="searchApps('english','divSearchEnglsih','inpSearchEnglsih','filteredEnglsih','false')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                      
                <input v-else-if="i=='10' && j=='1'" :id="input.id" @mouseover="docEvent(10,1)" @click="searchApps('spanish','divSearchSpanish','inpSearchSpanish','filteredSpanish','false')" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                      
                <!-- <input v-else-if="i=='11'" :id="input.id" @mouseover="docEvent(11,0)" @click="showPDFS()" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
                <input v-else-if="i=='12'" :id="input.id" @mouseover="docEvent(12,0)" @click="importApps()" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
                <input v-else-if="i=='13'" :id="input.id" @mouseover="docEvent(13,0)" @click="showConfig()" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
                <input v-else-if="i=='14'" id="chkDocumentation" @mouseover="docEvent(14,0)" @click="setDocumentation()" :type="input.type" :style="input.style" :class="input.class" :value="input.label"/>                                                                                
              -->
              </div>                                        
            </div>                     
          </div>              
        </div>              
      </div>    
    </div>    

    <!-- Accordian button for Application Section -->
    <div class="w-full" style="display: inline-flex;margin: auto;justify-content: left;border: solid black 0px;color: white;border-radius: 5px;
      margin-bottom: 5px">
      <input id="divApplicationInfo" @click="toggleAppInfo()" type="button" class="btn" style="text-align: left;margin-left: 0px;font-size: 25px;font-weight: 600;
        ;color: white" value="Application Information"/>
    </div>
    <!-- Application Select All Section -->
    <div id="divAppsSelectAll" class="divAppWrapper" style="overflow-x: auto;margin: auto;
      border: solid black 0px;border-radius: 0px;justify-content: center;margin-bottom: 10px;border-radius: 0px;
      background-color: rgb(255, 255, 255)">               
    </div>   
    <!-- Applications Section -->
    <div id="divApps" class="divAppWrapper" style="overflow-x: none;margin: 0px auto;max-height: 550px;min-height: 100px;margin-bottom: 15px;
      border: solid black 0px;border-radius: 0px;justify-content: left;margin-top: 0px;border-radius: 10px;background-color: rgb(255, 255, 255)">   
      <table id="tblMain">              
        <tbody>  
          <tr style="text-align: center">
            <th contenteditable="true" style="border: solid black 0px;width: 100px;color: Purple;font-size: 18px">All</th>
            <th contenteditable="true" style="border: solid black 0px;width: 100px;color: black;font-size: 18px" hidden>De-Activate</th>
          </tr>       
          <tr>      
            <td style="height: 40px">
              <div class="w-5rem"></div><input id="checkSelectAll" @click="selectUnselectAll()" type="checkbox" class="w3-check w-3rem"/>            
            </td>
          </tr>
        </tbody>
      </table>      
      <div id="divApps" class="divAppWrapper" style="overflow-x: auto;margin: 0px auto;max-height: 410px;min-height: 200px;margin-bottom: 15px;
      border: solid black 0px;border-radius: 0px;justify-content: left;margin-top: 0px;border-radius: 10px;background-color: rgb(255, 255, 255)">   
        <table id="tblMain" class="table table-light table-hover">      
          <thead>
            <tr style="font-size: 20px">                             
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 100px;padding-left: 20px">Select</th>          
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 80px;padding-left: 0px">Batch #</th>          
              <th id="thActive" contenteditable="true" style="color: purple;border: solid black 0px;width: 80px;padding-left: 10px" class="current">Active</th>                        
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 80px;padding-left: 10px">Emailed</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 125px;padding-left: 25px">Printed</th>          
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 160px;padding-left: 0px;padding-right: 0px;text-align: left;">Application Id</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 110px;padding-left: 0px;padding-right: 0px;text-align: left;">Language</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 150px;padding-left: 0px;padding-right: 0px;text-align: left;">Guardian First</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 150px;padding-left: 0px;padding-right: 0px;text-align: left;">Guardian Last</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;padding-left: 0px;padding-right: 0px;text-align: left;">Guardian Email</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;padding-left: 0px;padding-right: 0px;text-align: left;">Status</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;padding-left: 0px;padding-right: 0px;text-align: left;">Reason</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 75px;padding-left: 0px;padding-right: 0px;text-align: left;">Row</th>
              <th contenteditable="true" style="color: purple;border: solid black 0px;width: 365px;padding-left: 0px;padding-right: 0px;text-align: center;">Actions</th>          
            </tr>        
          </thead>       
          <tbody v-if="filteredIds.length>0">                          
            <tr v-for="(application,index) in filteredIds" :key="index" @mouseover="setOver(index)" @mouseleave="onLeave()" style="font-size: 20px;height: 50px">            
              <td  style="padding-bottom: 15px">                                      
                <input v-if="application.Selected=='true'" @click="addToSelected(index)" :id="'chkSelect'+index" name="inpSelect" type="checkbox" class="w3-check select approw" checked>              
                <input v-else-if="application.Selected=='false'" @click="addToSelected(index)" :id="'chkSelect'+index" name="inpSelect" type="checkbox" class="w3-check select approw">
              </td>
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,application.BatchNum)" style="font-size: 20px;padding-left: 30px;color: red;font-weight: 700">{{ application.BatchNum }}</td>                                
              <td style="padding-bottom: 15px"><input @click="setActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,application.BatchNum)" :id="'inpActive'+index" name="inpSelect" type="radio" class="w3-radio inpActive"></td>            
              <td style="padding-bottom: 15px"><input v-if="application.Sent == 'true'" id="chkSent" name="inpSent" type="checkbox" class="w3-check sent"
                checked disabled>
                <input v-else id="chkSent" name="inpSent" type="checkbox" class="w3-check sent" disabled></td>      
              <td style="padding-bottom: 15px"><input v-if="application.Printed == 'true'" id="chkPrinted" name="inpPrinted" type="checkbox"
                class="w3-check printed" checked disabled>
                <input v-else id="chkPrinted" name="inpPrinted" type="checkbox" class="w3-check printed" disabled></td>        
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" :id="'txtId'+index" 
                style="font-size: 20px;padding-left: 0px;color: black">
                {{ application.Id }}</td>            
              <td v-if="user=='Mary Lou'" @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)"
                style="font-size: 20px;padding-left: 0px;color: black" contenteditable="true">  
                {{ application.Language }}</td>            
                <td v-else @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)"
                style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">  
                {{ application.Language }}</td>            
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" 
                style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">
                {{ application.Guardians[0].FirstName }}</td>            
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" 
                style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">
                {{ application.Guardians[0].LastName }}</td>
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" :id="'txtEmail'+index"
                style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">
                {{ application.Guardians[0].Email }}</td>
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" contenteditable="false" v-if="application.Status[0].Checked=='true'"
                style="color: green;padding-left: 0px">
                {{ application.Status[0].MobileStatus }}</td>          
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" contenteditable="false" v-else-if="application.Status[1].Checked=='true'"
                style="color: green;height: 30px;padding-left: 0px">            
                {{ application.Status[1].MobileStatus }}</td>          
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" contenteditable="false" v-else-if="application.Status[2].Checked=='true'"
                style="color: red;padding-left: 0px">
                {{ application.Status[2].MobileStatus }}</td>
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" contenteditable="false" v-if="application.Reasons[0].Checked=='true'"
                style="padding-left: 0px;color: black">
                {{ application.Reasons[0].MobileReason }}</td>
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" contenteditable="false" v-else-if="application.Reasons[1].Checked=='true'"
                style="padding-left: 0px;color: black">
                {{ application.Reasons[1].MobileReason }}</td>
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" contenteditable="false" style="padding-left: 40px;color: black" v-else></td> 
              <td @click="onActive(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName,
                application.BatchNum)" style="font-size: 20px;padding-left: 0px;color: black;
                width: 25px">{{ application.Index }}</td>            
              <td :id="'divPrint'+index" 
                style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: center;padding-left: 0px;">                          
              <input @click="printData(index)" :id="'inpPrint'+index" name="inpPrint" type="button" class="w3-btn inpPrint" 
                style="display: flex;margin: auto;text-align: center;margin-left: 20px;font-size: 18px;background-color: #F1F5F9;
                color: black;width: 100px;border: solid black 1px" value="Print" disabled></td>
              <td :id="'divEmail'+index" 
                style="display:  inline-flex;margin: auto;border: solid black 0px;justify-content: center">            
              <input @click="submitEmail()" :id="'inpEmail'+index" name="inpEmail" type="button" class="w3-btn inpEmail" 
                style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 18px;background-color: #F1F5F9;
                color: black;width: 100px;border: solid black 1px" value="Email" disabled></td>
              <td :id="'divEmail'+index" 
                style="display:  inline-flex;margin: auto;border: solid black 0px;justify-content: center">            
              <input @click="submitEmail()" :id="'inpUpdate'+index" name="inpEmail" type="button" class="w3-btn inpEmail" 
                style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 18px;background-color: #F1F5F9;
                color: black;width: 100px;border: solid black 1px" value="Update" disabled></td>                
                </tr>
          </tbody>
          <tbody v-else><tr><td colspan="10" style="padding-left: 10px;font-size: 20px;color: red;font-weight: 600">No matching records found</td></tr></tbody>
        </table>
      </div>    
    </div>    
    
    <!-- Accordian button for Student Section -->
    <div class="w-full" style="display: inline-flex;margin: auto;justify-content: left;border: solid black 0px;color: white;border-radius: 5px;
      margin-bottom: 5px">
      <input id="divSearchBy" @click="toggleStudentInfo()" class="btn" type="button" style="text-align: left;font-size: 25px;font-weight: 600;
        color: white" value="Student Information"/>                          
    </div>
    <!-- Students Section -->
    <div v-if="applications.length>0" class="divStudentWrapper hidden" id="divStudentData" style="display: flex;margin: auto;justify-content: left;
      border: solid rgb(0, 0, 0) 0px;background-color: rgb(255, 255, 255);overflow: auto;margin-top: 0px;border-radius: 10px">    
      <div id="divIdStudents" style="display: flex;margin: auto;justify-content: left;
        font-size: 20px;border: solid red 0px;margin-bottom: 5px;flex-direction: column;overflow-y: auto;max-height: 240px" class="w-full">    
        <div v-for="(application,index) in filteredIds" :key="application.Id" style="display: flex;flex-direction: row;float: auto;border: solid green 0px">
          <table v-if="index==activeIndex" class="table table-light table-hover" style="margin-left: 0px;width: 750px">
            <thead>
              <tr>
                <th style="padding-left: 10px;width: 250px">Name</th>          
                <th style="padding-left: 10px;width: 100px">Id</th>
                <th style="padding-left: 10px">Campus</th>          
              </tr>  
            </thead>
            <tbody>
              <tr v-for="student in filteredIds[activeIndex].Students" :key="student.Id">          
                <td style="">{{ student.FirstName + " "  + student.LastName}}</td>
                <td>{{ student.Id }}</td>
                <td>{{ student.Campus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
    </div>

    <!-- Accordian button for Documentation Section -->
    <div v-if="applications.length>0" class="divDocumentationWrapper hidden" id="divDocumentationWrapper" style="display: flex;margin: auto;
      justify-content: left;border: solid rgb(0, 0, 0) 0px;background-color: rgb(255, 255, 255);overflow: auto;margin-top: 5px;
        border-radius: 10px">    
      <div class="w-full" style="display: flex;margin: auto;flex-direction: row;justify-content: center;align-items: center;
        flex-wrap: wrap;border: solid black 0px">
        <input id="divDoc" type="button" class="btn" style="text-align: left;font-size: 25px;font-weight: 600;
          color: white" value="Documentaion"/>                          
      </div>      
    </div>  
    <!-- Documentation Section -->
    <div v-if="setDocFlag==true">
      <label id="lblTooltipTitle" type="text" style="display: flex;margin: auto;justify-content: center;border: solid black 0px;width: 100%;font-size: 40px;font-weight: 600;"></label>
      <div id="lblTooltip" type="text"  style="display: flex;margin: auto;justify-content: center;border: solid black 0px;width: 100%;font-size: 30px;font-weight: 600"></div>
      <div id="divExpected" type="text"  style="display: flex;margin: auto;justify-content: center;border: solid black 0px;width: 100%;font-size: 30px;font-weight: 600">    
        <div v-if="searchtype=='sentTrue'">
          <div style="font-size: 20px;font-weight: 600">Record Count:<label style="margin-left: 10px">2</label></div>
          <div style="font-size: 20px;font-weight: 600">Application Id::<label style="margin-left: 10px">2025952</label><label style="margin-left: 10px">2025975</label></div>                
          <div style="display: flex;margin: auto;width: 250px">
            <div style="display: flex;margin: auto;color: green;width:100px;border: solid black 0px">
              <label style="display: flex;margin: auto;color: green;width:75px;border: solid black 0px">Passed:</label>
              <input id="inpTestSentYesPassed" name="inpTestSentYes" type="radio" class="w3-check"></div>
            <div style="display: flex;margin: auto;color: red;width:100px;border: solid black 0px">
              <label style="display: flex;margin: auto;color: red;width:75px;border: solid black 0px">Failed:</label>
              <input id="inpTestSentYesFailed" name="inpTestSentYes" type="radio" class="w3-check"></div>
          </div>
        </div>      
        <div v-else-if="searchtype=='sentFalse'">
          <div style="font-size: 20px;font-weight: 600">Record Count:<label style="margin-left: 10px">2</label>
            Application Id's<label style="margin-left: 10px">2025951</label>
            <label style="margin-left: 10px">2025953</label>
            <label style="margin-left: 10px">2025961</label>
            <label style="margin-left: 10px">2025962</label>
            <label style="margin-left: 10px">2025971</label>
            <label style="margin-left: 10px">2025972</label>
            <label style="margin-left: 10px">2025973</label>
            <label style="margin-left: 10px">2025974</label>        
            <div style="display: flex;margin: auto;width: 250px">
              <div style="display: flex;margin: auto;color: green;width:100px;border: solid black 0px">
                <label style="display: flex;margin: auto;color: green;width:75px;border: solid black 0px">Passed:</label>
                <input id="inpTestSentNoPassed" name="inpTestSentno" type="radio" class="w3-check"></div>
              <div style="display: flex;margin: auto;color: red;width:100px;border: solid black 0px">
                <label style="display: flex;margin: auto;color: red;width:75px;border: solid black 0px">Failed:</label>
                <input id="inpTestSentNoFailed" name="inpTestSentNo" type="radio" class="w3-check"></div>
            </div>
          </div>      
        </div>      
      </div>
  </div>                                     
    <!-- Print and Send buttons -->      
    <div v-if="applications.length>0" id="divDisplay" style="display: flex;margin: auto;justify-content: center;margin-top: 0px;border: solid black 0px;position:fixed;
      bottom:0px" class="w-full hidden">    
      <div id="divDisplay2" style="display: flex;margin: auto;justify-content: center;margin-top: 0px;margin-bottom: 0px;border: solid black 0px" class="w-full">                    
        <input id="inpPrint" type="submit" value="Print Selected Letters" class="w3-btn w3-margin w-30rem" style="font-size: 24px;background-color: #e1e5e9;color: black;border: solid black 1px" />              
        <input id="inpUpdate" type="submit" value="Show Selected Letters" class="w3-btn w3-margin w-30rem" style="font-size: 24px;background-color: #e1e5e9;color: black;border: solid black 1px" />              
        <input id="inpSend" type="submit" value="Send Selected Letters" class="w3-btn w3-margin w-30rem" style="font-size: 24px;background-color: #e1e5e9;color: black;border: solid black 1px" />        
      </div>            
    </div>   

    <!-- Accordian button for Eligibility Letter Section -->
    <div v-if="user=='Mary Lou'" class="w-full" style="display: flex;margin: auto;flex-direction: row;justify-content: center;
      align-items: center;flex-wrap: wrap;border: solid black 0px;margin-top: 0px">
      <input id="divSearchBy" @click="toggleEditLetter()" type="button" class="btn" style="text-align: left;font-size: 25px;font-weight: 600;
        color: white" value="Eligibility Letter"/>                          
    </div>
    <!-- Letter in HTML Format-->
    <div v-if="applications.length>0" id="divEligibilityLetter" style="display: flex;margin: auto;font-size: 24px;border: solid black 0px;
      padding-top: 20px;justify-content: left;align-items: center;max-height: 500px" class="divEligibilityLetter hidden">
      <div v-if="applications[activeIndex].Language=='English'" class="" style="display: block;margin: auto;margin-top: 0px;font-size: 24px;
        border: dashed black 5px;padding: 40px;justify-content: center;align-items: center;width: 50%">
        <div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">      
          <div id="divTitle" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)"
            style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
            width: 100%" contenteditable="true">{{ english[0].Title }}
            </div>        
        </div>          
        <div class="w-full" style="display: inline-flex;margin: auto; justify-content: left;margin-top: 10px">
          <div id="divDistrict" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" style="font-style: italic;margin-bottom: 10px" 
            contenteditable="true">{{english[0].District }}
          </div>
        </div>
        <div id="divBodyDate" class="w-16rem prop" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">
          {{ english[0].BodyDate }}
        </div>
        <div class="w-full" 
          style="display: inline-flex;margin: auto; justify-content: left;padding-top: 0px">
          <div id="divSalutation" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true" style="margin-right: 10px">
            {{english[0].Salutation }}         
          </div>
          {{ applications[activeIndex].Guardians[0].FirstName }} {{ applications[activeIndex].Guardians[0].LastName }}
        </div>      
        <div class="w-full" 
          style="display: inline-flex;margin: auto; justify-content: left;padding-top: 10px">
          <div id="divReviewed" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true">
            {{english[0].Reviewed }}
          </div>
        </div>      
        <div style="margin-left: 20px">
          <label v-for="student in applications[activeIndex].Students" :key="student.Id" 
            style="border-right: solid transparent 50px;font-weight: 600;" contenteditable="false">
            {{ student.FirstName + " "  + student.LastName + " - "  + student.Campus }}</label>        
        </div>      
        <div style="display: inline-flex;margin: auto; justify-content: center;margin-top: 20px">
          <div id="divStatus" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true">
            {{ english[0].Status }}
          </div>
        </div>    
        <div style="border: solid black 0px;margin-top: 0px;margin-left: 20px">
          <div v-if="applications[activeIndex].Status[0].Checked=='true'" id="divApprovedFree" class="w-full" style="display: inline-flex;margin: auto;border: solid black 0px;
            justify-content: left;margin-bottom: 5px">        
            <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" style="padding-top: 3px" contenteditable="true">
              {{ applications[activeIndex].Status[0].Status }}
            </div>
          </div> 
          <div v-else-if="applications[activeIndex].Status[1].Checked=='true'" id="divApprovedReduced" class="w-full" 
            style="display: inline-flex;margin: auto;border: solid black 0px;
            justify-content: left;margin-bottom: 5px">        
            <div style="padding-top: 3px" contenteditable="true">
              {{ applications[activeIndex].Status[1].Status }}
            </div>
          </div>        
          <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" v-else-if="applications[activeIndex].Status[2].Checked=='true'" id="divDenied" 
            style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: left;margin-bottom: 5px" class="w-full" >        
            <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" style="padding-top: 0px" contenteditable="true">
              {{ applications[activeIndex].Status[2].Status }}
            </div>
            <div id="divDeniedReason">
              <div id="divDeniedReduced" style="display: inline-flex;margin: auto;border: solid black 0px;float: left;justify-content: left;margin-bottom: 0px;margin-left: 10px">
                <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" v-if="applications[activeIndex].Reasons[0].Checked=='true'" 
                  contenteditable="true">
                  {{ applications[activeIndex].Reasons[0].Reason }}
                </div>
                <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" v-else-if="applications[activeIndex].Reasons[1].Checked=='true'" 
                  contenteditable="true">
                  {{ applications[activeIndex].Reasons[1].Reason }}
                </div>
              </div>
            </div>
          </div>
        </div>      
        <div style="display: inline-flex;margin: auto; justify-content: center;margin-top: 10px">
          <div id="divDiscussion" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true">
            {{ english[0].Discussion }}
          </div>
        </div>        
        <div style="border: solid black 0px;margin-top: 10px">      
          <div id="divService" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{english[0].Service }}</div>
          <div id="divStreet" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{english[0].Street }}</div>
          <div id="divCity" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{english[0].City }}</div>
          <div id="divPhone" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{english[0].Phone }}</div>
          <div id="divReapply" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Reapply }}</div>    
          <div id="divClosing" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Closing }}</div>      
          <div id="Director" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Director }}</div>
          <div id="divAccordance1" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Accordance1 }}</div>
          <div id="divAccordance2" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Accordance2 }}</div>
          <div id="divLink1" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Link1 }}</div>
          <div id="divAccordance3" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Accordance3 }}</div>
          <div id="divLink2" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Link2 }}</div>
          <div id="divAccordance4" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{english[0].Accordance4 }}</div>
        </div>      
        <div id="inpPrint" style="display: none;margin: auto;justify-content: center;" class="print submit">
          <input type="button" value="Print" class="w3-btn w3-grey w3-margin w-10rem">
          <input type="submit" value="Send" class="w3-btn w3-blue w3-margin w-10rem">
        </div>
      </div>
      <div v-if="applications[activeIndex].Language=='Spanish'" class="" style="display: block;margin: auto;margin-top: 0px;font-size: 24px;
        border: dashed black 5px;padding: 40px;justify-content: center;align-items: center;width: 50%">        
        <div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">      
          <div id="divTitle" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)"
            style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
            width: 100%" contenteditable="true">{{ spanish[0].Title }}
            </div>        
        </div>      
        <div class="w-full" style="display: inline-flex;margin: auto; justify-content: left;margin-top: 10px">
          <div id="divDistrict" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" style="font-style: italic;margin-bottom: 10px" 
            contenteditable="true">{{spanish[0].District }}
          </div>
        </div>
        <div id="divBodyDate" class="w-16rem prop" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">
          {{ spanish[0].BodyDate }}
        </div>
        <div class="w-full" 
          style="display: inline-flex;margin: auto; justify-content: left;padding-top: 0px">
          <div id="divSalutation" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true" style="margin-right: 10px">
            {{spanish[0].Salutation }}         
          </div>
          {{ applications[activeIndex].Guardians[0].FirstName }} {{ applications[activeIndex].Guardians[0].LastName }}
        </div>      
        <div class="w-full" 
          style="display: inline-flex;margin: auto; justify-content: left;padding-top: 10px">
          <div id="divReviewed" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true">
            {{spanish[0].Reviewed }}
          </div>
        </div>      
        <div style="margin-left: 20px">
          <label v-for="student in applications[activeIndex].Students" :key="student.Id" 
            style="border-right: solid transparent 50px;font-weight: 600;" contenteditable="false">
            {{ student.FirstName + " "  + student.LastName + " - "  + student.Campus }}</label>        
        </div>
        <div style="display: inline-flex;margin: auto; justify-content: center;margin-top: 20px">
          <div id="divStatus" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true">
            {{ spanish[0].Status }}
          </div>
        </div>    
        <div style="border: solid black 0px;margin-top: 0px;margin-left: 20px">
          <div v-if="applications[activeIndex].Status[0].Checked=='true'" id="divApprovedFree" class="w-full" style="display: inline-flex;margin: auto;border: solid black 0px;
            justify-content: left;margin-bottom: 5px">        
            <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" style="padding-top: 3px" contenteditable="true">
              {{ applications[activeIndex].Status[0].Status }}
            </div>
          </div> 
          <div v-else-if="applications[activeIndex].Status[1].Checked=='true'" id="divApprovedReduced" class="w-full" 
            style="display: inline-flex;margin: auto;border: solid black 0px;
            justify-content: left;margin-bottom: 5px">        
            <div style="padding-top: 3px" contenteditable="true">
              {{ applications[activeIndex].Status[1].Status }}
            </div>
          </div>        
          <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" v-else-if="applications[activeIndex].Status[2].Checked=='true'" id="divDenied" 
            style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: left;margin-bottom: 5px" class="w-full" >        
            <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" style="padding-top: 0px" contenteditable="true">
              {{ applications[activeIndex].Status[2].Status }}
            </div>
            <div id="divDeniedReason">
              <div id="divDeniedReduced" style="display: inline-flex;margin: auto;border: solid black 0px;float: left;justify-content: left;margin-bottom: 0px;margin-left: 10px">
                <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" v-if="applications[activeIndex].Reasons[0].Checked=='true'" 
                  contenteditable="true">
                  {{ applications[activeIndex].Reasons[0].Reason }}
                </div>
                <div onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" v-else-if="applications[activeIndex].Reasons[1].Checked=='true'" 
                  contenteditable="true">
                  {{ applications[activeIndex].Reasons[1].Reason }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: inline-flex;margin: auto; justify-content: center;margin-top: 10px">
          <div id="divDiscussion" class="prop" onkeyup="showProps(this.id,this.innerHTML)" onclick="showProps(this.id,this.innerHTML)" contenteditable="true">
            {{ spanish[0].Discussion }}
          </div>
        </div>  
        <div style="border: solid black 0px;margin-top: 10px">
          <div id="divService" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{spanish[0].Service }}</div>
          <div id="divStreet" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{spanish[0].Street }}</div>
          <div id="divCity" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{spanish[0].City }}</div>
          <div id="divPhone" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 0px" contenteditable="true">
            {{spanish[0].Phone }}</div>
          <div id="divReapply" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Reapply }}</div>    
          <div id="divClosing" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Closing }}</div>      
          <div id="divDirector" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Director }}</div>
          <div id="divAccordance1" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Accordance1 }}</div>
          <div id="divAccordance2" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Accordance2 }}</div>        
          <div id="divAccordance3" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Accordance3 }}</div>
          <div id="divAccordance4" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Accordance4 }}</div>
          <div id="divLink" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Link }}</div>
          <div id="divAccordance5" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Accordance5 }}</div>
          <div id="divMail1" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Mail1 }}</div>
          <div id="divMail2" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 40px" contenteditable="true">
            {{spanish[0].Mail2 }}</div>
          <div id="divMail3" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 40px" contenteditable="true">
            {{spanish[0].Mail3 }}</div>
          <div id="divMail4" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 40px" contenteditable="true">
            {{spanish[0].Mail4 }}</div>
          <div id="divFax1" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 0px" contenteditable="true">
            {{spanish[0].Fax1 }}</div>
          <div id="divFax2" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 40px" contenteditable="true">
            {{spanish[0].Fax2 }}</div>
          <div id="diveMail1" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 0px" contenteditable="true">
            {{spanish[0].Email1 }}</div>
          <div id="diveMail2" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-left: 40px" contenteditable="true">
            {{spanish[0].Email2 }}</div>
          <div id="divAccordance6" onkeyup="showProps(this.id,this.innerHTML)" class="prop" onclick="showProps(this.id,this.innerHTML)" style="margin-top: 20px" contenteditable="true">
            {{spanish[0].Accordance6 }}</div>
        </div>
        <div id="inpPrint" style="display: none;margin: auto;justify-content: center;" class="print submit">
          <input type="button" value="Print" class="w3-btn w3-grey w3-margin w-10rem">
          <input type="submit" value="Send" class="w3-btn w3-blue w3-margin w-10rem">
        </div>
      </div>    
      <div class="" style="display: block;margin: auto;margin-top: 0px;font-size: 24px;border: solid black 0px;margin-left: 10px;
        justify-content: center;align-items: center;width: 50%;height: 1100">
        <label style="margin-left: 20px;width: 100px;text-align: left;font-weight: 600">Value:</label>              
        <div style="display: inline-flex;margin: auto;width: 1100px;border: solid black 1px;margin-left: 20px;margin-right: 20px">            
          <textarea  id="txtValue" name="txtValue" type="textkbox" style="margin-left: 0px; font-weight: normal" rows="5" cols="20" placeholder="">
          </textarea>
        </div>
        <div id="divTools" class="tools col-3" style="margin-left:0px">                    
          <div id="divProps" class="w3-container prop" style="margin-top:0px;padding-right:0px;background-Color:#ffffff;padding-top:10px;padding-bottom:10px;margin-right:5px;
            text-align:right;display:block">
            <table id ="tblProps" style="margin-top:10px;margin-right:0px;border: solid black 1px;width: 300px;font-weight: 600">                                  
              <tr style="margin-top:10px;margin-left: 5px;border: solid black 0px">
                <td>
                  <label style="padding-top:0px;width: 120px;padding: 5px">Id:</label>
                </td>
                <td style="text-align:left">
                  <input id="txtId" type="textbox" class="w3-text" style="margin-left:10px;width: 200px;font-weight: 100" onchange="update('index',this.id,this.value)" />
                </td>
              </tr>
              <tr>
                <td>
                  <label style="padding-top:0px;width: 100px;padding: 5px;font-weight: 600">Font Size:</label>
                </td>
                <td style="text-align:left">
                  <input id="Fontsize" type="textbox" class="w3-text" style="margin-left:10px;width: 100px" onchange="update('index',this.id,this.value)" />
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-top:5px;padding: 5px;font-weight: 600">Width:</label>
                </td>
                <td style="text-align:left">
                  <input id="Size" type="textbox" style="margin-left:10px;width: 100px" class="w3-text" onchange="update('index',this.id,this.value)">
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-top:5px;padding: 5px;font-weight: 600">Height:</label>
                </td>
                <td style="text-align:left">
                  <input id="Height" type="textbox" style="margin-left:10px;width: 100px" class="w3-text"  onchange="update('index',this.id,this.value)">
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-top:5px;padding: 5px;font-weight: 600">Text Color:</label>
                </td>
                <td style="text-align:left">
                  <input id="Textcolor" type="color" style="margin-left:10px;height: 35px;width: 100px" onchange="update('index',this.id,this.value)">
                </td>
              </tr>
              <tr>
                <td>
                  <label style="margin-top:5px;padding: 5px;font-weight: 600">BG Color:</label>
                </td>
                <td style="text-align:left">
                  <input id="Backgroundcolor" type="color" style="margin-left:10px;height: 35px;width: 100px" onchange="update('index',this.id,this.value)">
                </td>
              </tr>
              <tr>
                <td>
                  <label style="padding-top:15px;padding: 5px;font-weight: 600" class="">Adjust Size:</label>
                </td>
                <td style="text-align:left">
                  <input id="chkFldSize" type="checkbox" class="w3-check" style="margin-left:20px;margin-bottom: 10px">
                </td>
              </tr>                                          
            </table>                    
          </div>                     
        </div>        
        <div style="padding: 20px">
          <input onclick="update(this.id,value)" id="submit" type="button" class="w3-btn w3-green" value="Update Letter">                             
        </div>
      </div>
    </div>
  <!-- Active PDF Doc display -->
  <embed id="embDoc" :src="selDoc+'#page=1&zoom=200'" style="width: 100%;height: 1100px;overflow-x: hidden;overflow-y: auto" class="w3-margin hidden">
  </form>
  <!-- </form> -->
</template>
<script>
  const uniqueId = require('lodash.uniqueid')
  const axios = require('axios');
  import html2pdf from "html2pdf.js";
  import { ref, onMounted } from 'vue';
  import { useToast } from "primevue/usetoast";
  import { Applications } from 'C:/inetpub/wwwroot/applications.json'  
  import { Test } from 'D:/EPISD/test/applications.json'  
  import { Searches } from 'D:/EPISD/searches.json'
  import { Utilities } from 'D:/EPISD/searches.json'
  import { English } from 'D:/EPISD/letters.json'
  import { Spanish } from 'D:/EPISD/letters.json'
  import printJS from 'print-js'
  import { sites } from '/public/sites.json'
  import HelloWorld from "@/components/HelloWorld.vue";

  //import test from "test.js";
  var ap = require('/autoPrinter.js'); 
  export default {
    components: { HelloWorld },
    name: "apps",
      mounted: function() {
        this.isMobile()               
        this.id = uniqueId()
      },    
      methods: {                        
        importApps() {
          window.location.href = "http://localhost:3000?importApps=1";          
          $('#divCopy').css('display', 'block')
        },
        showConfig() {
          window.location.href = "http://localhost:3000/showConfig";
          
          //$.post("http://localhost:3000/showConfig", {
              //json_string: JSON.stringify({name:"John", phone number:"+410000000"})
          //});
        },
        addToSelected(index) {   
          //alert("appid: "+appid)  
          //alert("email: "+email)  
          var selectChecked = document.getElementById("chkSelect"+i);                               
          var curIndex = this.selected.indexOf(i)          
          var allChecked = false    
          this.selected = []
          this.email = []
          var appid = ''
          var selectCount = 0
          var selectedCount = 0
          document.querySelectorAll('.select').forEach(function(check,index) {
            selectCount++              
          }); 
          //alert("selectCount: "+selectCount)
          this.appArray = []

          for(var i=0;i<selectCount;i++) {              
            if($("#chkSelect"+i).prop("checked")) {
              this.selected.push(this.filteredIds[i].Id)                            
              this.appArray.push(
                {
                  "appid": this.filteredIds[i].Id,
                  "batchnum": this.filteredIds[i].BatchNum,
                  "email": this.filteredIds[i].Guardians[0].Email                  
                }
              )
              selectedCount++           
            };            
          }
          //alert("selectedCount: "+selectedCount)
          
          //alert(this.appArray[0].appid)
          //alert(this.appArray[0].email)
          //txtSelected.value = this.appArray[i]
          //this.appId = this.appArray
          //alert(this.appId)
          txtSelected.value = ''
          for(var i=0;i<this.appArray.length;i++) {
            //alert(this.appArray[i].appid)
            if(txtSelected.value == '') {
              txtSelected.value =  this.appArray[i].appid+"|"+this.appArray[i].batchnum+"|"+this.appArray[i].email+"|"
            } else {
              txtSelected.value +=  ","+this.appArray[i].appid+"|"+this.appArray[i].batchnum+"|"+this.appArray[i].email+"|"
            }
          }            

          if(selectedCount==selectCount) {
            allChecked = true
          } else {
            allChecked = false
          }

          if(allChecked) {
            $("#checkSelectAll").prop("checked", "checked")
            this.selectAll = 'Unselect'
          } else {
            $("#checkSelectAll").prop("checked", "")
            this.selectAll = 'Select'            
          }
          
          if(this.selected.length>0) {
            $("#divDisplay").removeClass('hidden')
          } else {
            $("#divDisplay").addClass('hidden')
          }             
          var checked = "false"                     
          if($("#chkSelect"+i).prop("checked")) {
            checked = 'true'
          }  
          
          const printButton = document.getElementById("inpPrint");          
          printButton.formAction= "http://localhost:3000/printLetters?appIds="+this.selected

          const updateButton = document.getElementById("inpUpdate");          
          updateButton.formAction= "http://localhost:3000/showLetters?appIds="+this.selected

          const sendButton = document.getElementById("inpSend");          
          sendButton.formAction= "http://localhost:3000/sendLetters?appIds="+this.selected
          //submitButton.submit()

          //Create a variable to represent the print button              
          //const printButton = document.getElementById('inpPrint');
        
          //Set a new formaction URL dynamically to print letters             
          //printButton.formAction = 'http://localhost:3000/appIndex?frmData='+this.selected;
        },                     
        isMobile() {
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                console.log("Is Mobile = true");
                return true
            } else {
                console.log("Is Mobile = false");
                return false
            }
        },          
        onChange(e) {
          console.log("id: " + e);
        },
        onFocus(e) {
          console.log("onFocus: " + e);
        },
        onBlur(e) {
          console.log("onBlur: " + e);
          $("#inpSearchApplications").css("background-color","white")
        }, 
        selectUnselectAll() {              
          var checkAll = document.getElementById("checkSelectAll"); //select/unselect all checkbox 
          var appsData = Applications;
          var selectCount = 0
          var selectAllArray = []
          txtSelected.value = ''

          //alert("filteredIds.length: "+this.filteredIds.length )
          if(this.searchtype == "sentTrue") {
            for(var i=0;i<this.filteredSentTrue.length;i++) {    
              this.selected.push(this.filteredIds[i].Id)        
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "sentFalse") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "printedTrue") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "printedFalse") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "id") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "guardian") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              this.selected.push(this.filteredIds[i].Id)        
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "student") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "campus") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "approvedFree") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "approvedReduced") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "denied") {
            for(var i=0;i<this.filteredIds.length;i++) {        
              this.selected.push(this.filteredIds[i].Id)            
              selectAllArray.push(this.filteredIds[i].Id)
              $(".select").prop("checked", "checked")
            }
          }

          if(checkAll.checked == true) {
            $(".select").prop("checked", "checked")
            this.selectAll = 'Unselect'            
            $("#divDisplay").removeClass('hidden')                            

            for(var i=0;i<selectCount;i++) {
              this.selected.push(i)   
              //appsData[i].Selected = 'true'
            } 
            //txtSelected.value = this.selected                       
          } else {
            $(".select").prop("checked", "")
            this.selectAll = 'Select'
            $("#divDisplay").addClass('hidden')
            this.selected = []
            selectAllArray = []
            
            for(var i=0;i<selectCount;i++) {              
              //appsData[i].Selected = 'false'            
            }
            //txtSelected.value =  this.selected                           
          }
          txtSelected.value = selectAllArray                              
          //alert("this.selected: "+this.selected)
          const submitButton = document.getElementById("inpUpdate");          
          const printButton = document.getElementById("inpPrint");          
          printButton.formAction= "http://localhost:3000/printLetters?appIds="+this.selected
          const updateButton = document.getElementById("inpUpdate");          
          updateButton.formAction= "http://localhost:3000/showLetters?appIds="+this.selected
          const sendButton = document.getElementById("inpSend");          
          sendButton.formAction= "http://localhost:3000/sendLetters?appIds="+this.selected
        }       
      },
      data() {
        return {
          apps: Applications,
          english: English,
          spanish: Spanish,
          selected: ref([]),
          reactiveIndex: true,          
          Id: '',
          Sent: '',
          Printed: '',
          Batch: '',
          Language: '',
          Guardian: '',
          Student: '',
          Campus: '',
          Status: '',
          Denied: '',
          sortbySent: 'Sent',
          sortbyPrinted: 'Printed',
          sortbyIds: 'Id',          
          sortbyGuardiansLastName: 'Id',
          sortbyStudentsLastName: 'Id',
          sortbyStudentCampus: 'Id',
          sortbyStatus: 'Id',
          sortbyDenied: 'Id',
          selectAll: 'Select',
          searchBtnWidth: 5,
          language: 'Spanish',
          title: English[0].Title,
          district: English[0].District,
          bodyDate: English[0].BodyDate,
          salutation: English[0].Salutation,
          reviewed: English[0].Reviewed,
          status: English[0].Status,
          discussion: English[0].Discussion,
          service: English[0].Service,
          street: English[0].Street,
          city: English[0].City,
          phone: English[0].Phone,
          reapply: English[0].Reapply,
          closing: English[0].Closing,
          director: English[0].Director,
          accordance: English[0].Accordance,
          id: ''
        };
      },
      computed: {           
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
            if(this.searchtype== 'sentTrue') {          
              return this.applications.filter(
                (applications) =>
                applications.Sent == "true"
              );            
            } else if(this.searchtype== 'sentFalse') {      
              return this.applications.filter(
                (applications) =>
                applications.Sent == "false"
              );            
            } else if(this.searchtype== 'printedTrue') {          
              return this.applications.filter(
                (applications) =>
                applications.Printed == "true"
              );            
            } else if(this.searchtype== 'printedFalse') {          
              return this.applications.filter(
                (applications) =>
                applications.Printed == "false"
              );            
            } else if(this.searchtype== 'id') {
              return this.applications.filter(
                (applications) =>
                applications.Id
                .includes(this.Id)                              
              );
            } else if(this.searchtype== 'batch') {
              return this.applications.filter(
                (applications) =>
                applications.BatchNum == this.Batch
              );
            } else if(this.searchtype== 'english') {
              return this.applications.filter(
                (applications) =>
                applications.Language == "English"
              );
            } else if(this.searchtype== 'spanish') {
              return this.applications.filter(
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
              return this.applications.filter(
                (applications) =>               
                applications.Students[0].LastName.trim().toLowerCase()
                .includes(this.Student.trim().toLowerCase())                      
              );
            } else if(this.searchtype== 'campus') {
              return this.applications.filter(
                (applications) =>
                applications.Students[0].Campus.toLowerCase()
                .startsWith(this.Campus.trim().toLowerCase())                              
              );
            } else if(this.searchtype== 'approvedFree') {          
              return this.applications.filter(
                (applications) =>
                applications.Status[0].Checked == "true"
              );            
            } else if(this.searchtype== 'approvedReduced') {         
              return this.applications.filter(
                (applications) =>
                applications.Status[1].Checked == "true"
              );            
            } else if(this.searchtype== 'denied') {          
              return this.applications.filter(
                (applications) =>
                applications.Status[2].Checked == "true"
              );            
            } else if(this.searchtype== 'recordid') {
              alert("type: "+this.searchtype)            
              return this.applications.filter(
                (applications) =>
                applications.RecordId == this.RecordId
              );            
            }
          } 
        },
        sortedIds() {
          return this.filteredIds.sort((a, b) =>
            a[this.sortbyIds]
            .localeCompare(b[this.sortbyIds])
          );
        }
      },
    el: '#app',
    setup() {
      const toast = useToast()
      const applications = ref(Applications)
      const test = ref(Test)
      const sitesArray = ref(sites)
      const searches = ref(Searches)    
      const utilities = ref(Utilities)    
      const ids = []
      const appId = ref('')
      const email = ref('')
      const guardians = []
      const students = []
      const campus = []
      const english = ref(English)
      const spanish = ref(Spanish)
      const print = printJS
      let activeIndex = ref(0)    
      let overIndex = ref()
      let activeSet = ref(0)        
      let setDocFlag = ref(false)    
      let selDoc = ref('')            
      let searchtype = ref('id')
      let filteredtype = ref('filteredIds')      
      let selectedPrint = ref('false');
      let printType = ref("")
      let user = ref(lblUser.innerHTML)
      let appArray = ref([])
      user = user.value.replace('Welcome ','')  

      //alert(Applications[0].BatchNum)

      const handleSubmit = () => {
        var selectedIndexes = document.getElementById("txtSelected").value;
        alert(appArray.value[0]);
        alert(appArray.value[0].appid);

        var appid = JSON.stringify(appArray.value);
        //alert("appid: "+appid);
        // Example: Send data to an API
        //frmMain.formAction("http://localhost:3000/appIndex?appArray="+appid)
        var submitButton = document.getElementById("inpSubmit");
        frmMain.action("http://localhost:3000/appIndex?appArray="+appid)
        frmMain.submit()
         //axios.post('http://localhost:3000/appIndex?appArray='+appid)
           //.then(response => { /* handle success */ })
           //.catch(error => { /* handle error */ });

        /*
        var selectedIndexes = txtSelected.value
        alert("txtSelected.value: '"+txtSelected.value+"'")
        if(selectedIndexes!='') {
          var processArray = selectedIndexes.split(',');
          setTimeout(function() {
            window.location.href = "http://localhost:3600?appIndex="+processArray;
          }, 300)
        }
        */
      }

      const addSite = () => {
        alert("addSite")
      }

      //Handle Print requests
      const printData = () => {
        //alert("this.selected: "+selected.length)  
        //alert("selected: "+this.selected.value)
        //alert("printDataaaa")
        var appString = ''
        let rowSelected = ''

        const rows = document.getElementsByClassName('approw');
        Array.from(rows).forEach(row => {           
            if(row.id.indexOf('chkSelect') != -1){
              if($("#"+row.id).is(':checked')){              
                rowSelected = 1
              }
            } else if(row.id.indexOf('txtId') != -1){
               if(rowSelected == 1) {
                if(appString=='') {
                  appString = $("#"+row.id).html()
                } else {
                  appString = appString+","+$("#"+row.id).html()
                }
              }              
            } else if(row.id.indexOf('txtEmail') != -1){
               if(rowSelected == 1) {
                appString = appString+": "+$("#"+row.id).html()
                rowSelected = 0
              }              
            }            
        });

        //Create a variable to represent the print button              
        const printButton = document.getElementById('inpPrint');
        
        //Set a new formaction URL dynamically to print letters             
        printButton.formAction = 'http://localhost:3000/appIndex?frmData='+this.selected;
        //Simulate a click on the button to trigger submission with the new formaction
        //printButton.click();        
      }

      //Handle send emails with attachments requests
      const sendData = () => {
        var appString = ''
        let rowSelected = ''

        const rows = document.getElementsByClassName('approw');
        Array.from(rows).forEach(row => {
            if(row.id.indexOf('chkSelect') != -1){
              if($("#"+row.id).is(':checked')){
                rowSelected = 1
              }
            } else if(row.id.indexOf('txtId') != -1){        
               if(rowSelected == 1) {
                if(appString=='') {
                  appString = $("#"+row.id).html()
                } else {
                  appString = appString+","+$("#"+row.id).html()
                }
              }              
            } else if(row.id.indexOf('txtEmail') != -1){
               if(rowSelected == 1) {
                appString = appString+": "+$("#"+row.id).html()
                rowSelected = 0
              }              
            }            
        });

        //Create a variable to represent the Send button              
        const sendButton = document.getElementById('inpSend');
        //Set a new formaction URL dynamically to send emails             
        sendButton.formAction = 'http://localhost:3000/email?appString='+appString;
        //Simulate a click on the button to trigger submission with the new formaction
        sendButton.click();        
      }
          
      //Enable documentantion feature
      const setDocumentation = () => {             
        searchtype.value=""        
        searchtype.value="id"        
        if($("#chkDocumentation").is(':checked')) {
          setDocFlag.value = true
          $("#divDocumentationWrapper").removeClass('hidden')            
        } else {
          setDocFlag.value = false
          $("#lblTooltipTitle").html()                    
          $("#lblTooltip").html()   
          $("#lblTooltipTitle").addClass('hidden')                              
          $("#lblTooltip").addClass('hidden')          
          $("#divDocumentationWrapper").addClass('hidden')          
        }        
      }
      //Display Tooltip on hover over search fields if Documentation is enabled
      const docEvent = (field,subfield) => {
        //alert("setDocFlag.value: "+setDocFlag.value)
        if(setDocFlag.value == true) {
          $("#lblTooltipTitle").html(searches.value[field].inputs[subfield ].tooltipTitle)                    
          $("#lblTooltip").html(searches.value[field].inputs[subfield ].tooltip)} else {}        
      }
      //Display Calendar object to select a date
      const selectDate = () => {
        $( function() {
          $( "#datepicker" ).datepicker();} )
      ;}
      //Print selected rows to PDF in download folder and copy to Letters folder
      const printSelected = () => {
        var selectedIndexes = document.getElementById("txtSelected").value;
        const elements = document.getElementsByClassName('select');
        ap.printSelected(document.getElementById("txtSelected").value,Applications,English,Spanish)}
        
      //Select the logo for Header
      const setLogoURL = () => {
        var url = $("#inpLogoURL").val()
        alert("url: "+url)
        $("#imgLogo").attr("src", url);
        $("#inpLogoURL").addClass("hidden");}
      //send email for active row
      const submitEmail = () => {
        var retrievedObjectApps = localStorage.getItem("apps");
        var appData = JSON.parse(retrievedObjectApps);
        var appIndex = ""
        appIndex = activeIndex.value
        window.location.href = "http://localhost:3000?emailSelected="+appIndex;}    
      //send emails for all selected rows
      const submitEmails = () => {        
        var appData = Applications;
        const elements = document.getElementsByClassName('select');
        var appIndexes = txtSelected.value  
        //alert("appIndexes: "+appIndexes);
        window.location.href = "http://localhost:3000?emailSelected="+appIndexes;}      
       //set current row as active/not active when clicked
      const setActive = (index) => {
        alert("index: "+index)
        if(index==-1) {          
          activeSet.value = 0
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)} else {
          activeIndex.value = index
          activeSet.value = 1
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)             
          $("#inpPrint"+index).prop("disabled", false)   
          $("#inpEmail"+index).prop("disabled", false)} 
      }  
      //Display Student information when hovering over an app or an app is made active by lcicking on it
      const setOver = (index) => {
        overIndex.value = index
        if(activeSet.value == 0 ) {
          activeIndex.value = index} else {}          
        $(".divStudentWrapper").removeClass("hidden")}          
      //Stop Displaying Student information when leaving a row and disable the Printe/Send buttons for that row
      const onLeave = (index) => {
        if(activeSet.value == 0 ) {
          overIndex.value = null                
          $(".divStudentWrapper").addClass("hidden") 
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)}} 
      //Search for apps based on selected search type
      const searchApps = (type,div,input,filter,tf) => {        
        searchtype.value = type
        filteredtype.value = filter
      }
      //Print letter for active row
      const printLetter = (id) => {      
        print({printable:'divEligibility', type:'html','documentTitle': "Test Base64",showModal:false, scanStyles:false });
      }     
      
      function isValidUrlFormat(url) {
        try {
          new URL(url);
          return true;
        } catch (error) {
          return false;
        }
      }

      async function checkUrlResourceExists(url) {
        try {
          const response = await fetch(url, { method: 'HEAD' }); // Use HEAD request for efficiency
          // A status code in the 200-299 range indicates success
          // A status code of 404 indicates the resource was not found
          // Other status codes might indicate other issues (e.g., 403 Forbidden, 500 Server Error)
          return response.ok; // returns true for 2xx status codes, false otherwise
        } catch (error) {
          // Network errors or CORS issues will land here
          console.error("Error checking URL resource:", error);
          return false;
        }
      }

      //Perform duties for active row ie/: enable print/send/ display pdf
      const onActive = (i,id,lname,fname,batchnum) => {
        //alert("id: "+id)
        //alert("lname: "+lname)
        //alert("batchnum: "+batchnum)
        activeIndex.value = i        
        activeSet.value = 1

        selDoc.value = "http://localhost:3600/Eligibility/Letters/Batch%20"+batchnum+"/EPISD%20-%20Meal%20Application_"+id+"_"+lname.replace(' ','%20').replace(' ','%20')+"_"+fname.replace(' ','%20').replace(' ','%20')+".pdf"
        //selDoc.value = "http://localhost:3600/Eligibility/Letters/Batch%20"+"1"+"/EPISD - Meal Application_2025951_John Doe_Tommy.pdf"
        //selDoc.value = "http://Localhos"
        //alert("selDoc.value: "+selDoc.value)
        
        //alert(isValidUrlFormat(selDoc.value)); // true        

          //alert("selDoc.value: "+selDoc.value)
          //selDoc.value = "http://localhost:3600/Eligibility/Letters/Batch%203/EPISD%20-%20Meal%20Application_2025971_Taylor_Johny.pdf"
          //alert("selDoc.value: "+selDoc.value)
          
          $("#embDoc").removeClass("hidden")
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)     
          $("#inpPrint"+i).prop("disabled", false)   
          $("#inpEmail"+i).prop("disabled", false)             
          $("#inpUpdate"+i).prop("disabled", false)             
          $("#divApps tbody tr").click(function() {
          });
          $('.inpActive').each(function(j, obj) {          
            if(j != i) {
              $("#inpActive"+j).prop('checked', false);}
          });        
          if($("#inpActive"+i).prop("checked")) {
            $("#inpActive"+i).prop('checked', false);
            $(".inpPrint").prop("disabled", true)   
            $(".inpEmail").prop("disabled", true)               
            $("#embDoc").addClass("hidden")  
            activeSet.value = 0}
          else {
            $("#inpActive"+i).prop('checked', true);          
            $("#embDoc").removeClass("hidden")          
          }
                   
      }
      //Display/Hide application section
      const toggleUtilities = () => {
        $(".divUtilitiesWrapper").toggleClass("hidden")
        $(".divAppWrapper").toggleClass("hidden")
      }
      //Display/Hide application section
      const toggleSearch = () => {
        $(".divSearchWrapper").toggleClass("hidden")
        $(".divAppWrapper").toggleClass("hidden")
      }
      //Display/Hide application section
      const toggleAppInfo = () => {
        $(".divAppWrapper").toggleClass("hidden")
      }
      //Display/Hide student section
      const toggleStudentInfo = () => {
        $(".divStudentWrapper").toggleClass("hidden")
      } 
      //Display/Hide edit letter section
      const toggleEditLetter = () => {
        //alert("Letter")
        $(".divEligibilityLetter").toggleClass("hidden")
        $(".divSearchWrapper").toggleClass("hidden")    
        $(".divAppWrapper").toggleClass("hidden")                
      }       
      //Variables to handle details of app
      const selectedId = ref();const selectedGuardian = ref();const selectedStudent = ref();const selectedCampus = ref();const selectedSent = ref();const sent = ref([
        { status: 'Yes'},
        { status: 'No'}]);
      const selectedStatus = ref();
      const status = ref([
        { status: 'Approved for free meals', code: 'f' },
        { status: 'Approved for reduced-price meals	', code: 'r' 
      }]);
      const selectedReason = ref();
      const reasons = ref([
          { reason: 'Income is above the maximum allowed for free meals.', code: 'f' },
          { reason: 'Income is above the maximum allowed for reduced-price meals.', code: 'r' 
        }]);
      return { printLetter,onLeave,submitEmail,submitEmails,setOver,setActive,toggleAppInfo,toggleStudentInfo,onActive,searchApps,selectedStatus,status,selectedReason,reasons,
        selectedPrint,searchtype,filteredtype,selectedId,selectedGuardian,printType,activeSet,selectedStudent,selectedCampus,selectedId,selectedSent,overIndex,activeIndex,
        applications,english,spanish,sent,ids,guardians,searches,students,campus,setLogoURL,selDoc,selectDate,docEvent,setDocumentation,setDocFlag,printSelected,test,user,
        toggleEditLetter,toggleSearch,toggleUtilities,utilities,appId,email,appArray,printData,sendData,addSite,handleSubmit }}}
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
