
<template>  
  <!-- Allows an admin/dev/designer to select the logo-->
  <div style="display: flex;margin: 5px auto;border: solid black 0px">
    <input id="inpLogoURL" @blur="setLogoURL" class="txt hidden" style="text-align: left;font-weight: 600;font-size: 18px;
      background-color: white" placeholder="logo url"/>                          
  </div>

<div id="divSearchWrapper" class="divSearchWrapper" style="display: flex;margin: auto;justify-content: center;float: auto;flex-direction: row;
    flex-wrap: wrap;border: solid rgb(0, 0, 0) 0px;"> 
    <div id="divSearchId" style="display: flex;margin: auto;justify-content: center;justify-content: space-around; border: solid black 0px" class="w-full search">
      <input id="inpSearchId" class="w-18rem w3-input w3-margin hidden" style="display: flex;float: auto;text-align: left;
      border: solid black 1px;border-radius: 5px" type="text" 
      placeholder="Search by App Id" v-model="Id" />    
    </div> 
    <div style="display: flex;margin: auto;justify-content: center;border: solid black 0px">
      <div style="display: flex;margin: auto;border: solid black 0px;justify-content: left;">
        <div id="divSearchMain" v-for="(search,i) in searches" :key="i" :style="search.divMainStyle">          
          <div v-if="i!=8" :id="search.id" class="w-full">{{ search.label }}</div>            
          <div :class="search.class" :style="search.divSearchStyle" >
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
                      <span v-else>
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
              <input v-else-if="i=='11'" :id="input.id" @mouseover="docEvent(11,0)" @click="showPDFS()" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
              <input v-else-if="i=='12'" :id="input.id" @mouseover="docEvent(12,0)" @click="importApps()" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
              <input v-else-if="i=='13'" :id="input.id" @mouseover="docEvent(13,0)" @click="showConfig()" :type="input.type" :style="input.style" :class="input.class" :value="input.label" />                                                                                
              <input v-else-if="i=='14'" id="chkDocumentation" @mouseover="docEvent(14,0)" @click="setDocumentation()" :type="input.type" :style="input.style" :class="input.class" :value="input.label"/>                                                                                
            </div>                                        
          </div>                     
        </div>              
      </div>              
    </div>    
  </div>    
  
  <!-- Accordian button for Application Section -->
  <div class="w-full" style="display: inline-flex;margin: auto;justify-content: left;border: solid black 0px;background-color: #0a58ca;color: white;border-radius: 5px;margin-bottom: 5px">
    <input id="divApplicationInfo" @click="toggleAppInfo()" type="button" class="btn" style="text-align: left;margin-left: 0px;font-size: 18px;font-weight: 600;background-color: #0a58ca;
      color: white" value="Application Information"/>
  </div>

  <!-- Application Select All Section -->
  <div id="divAppsSelectAll" class="divAppWrapper" style="overflow-x: auto;margin: auto;
    border: solid black 0px;border-radius: 0px;justify-content: center;margin-bottom: 10px;border-radius: 0px;
    background-color: rgb(255, 255, 255)">         
    <table id="tblMain">              
      <tbody>  
        <tr style="text-align: center">
          <th contenteditable="false" style="border: solid black 0px;width: 100px;color: black;font-size: 18px">{{ selectAll }} All</th>
          <th contenteditable="false" style="border: solid black 0px;width: 100px;color: black;font-size: 18px" hidden>De-Activate</th>
        </tr>       
        <tr>      
          <td style="height: 40px">
            <div class="w-5rem"></div><input id="checkSelectAll" @click="selectUnselectAll()" type="checkbox" class="w3-check w-3rem"/>            
          </td>
          <td style="height: 40px" hidden>
            <input @click="setActive(-1)" id="inpActive" name="inpSelect" type="radio" class="w3-radio inpActive" checked>            
          </td>
        </tr>
      </tbody>
    </table>
  </div>  
  
  <!-- Applications Section -->
  <div v-if="applications.length>0" id="divApps" class="divAppWrapper" style="overflow-x: auto;margin: 0px auto;max-height: 350px;min-height: 100px;
    border: solid black 0px;border-radius: 5px;justify-content: left;margin-top: 0px;border-radius: 10px;
    background-color: rgb(255, 255, 255)">         
    <table id="tblMain" class="table table-light table-hover">      
      <thead>
        <tr style="font-size: 20px">                             
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 100px;padding-left: 20px">Select</th>          
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 80px;padding-left: 0px">Batch #</th>          
          <th id="thActive" contenteditable="false" style="color: purple;border: solid black 0px;width: 80px;padding-left: 10px" class="current">Active</th>          
          
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 80px;padding-left: 10px">Emailed</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 80px;padding-left: 15px">Printed</th>          
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 150px;padding-left: 0px;padding-right: 0px;text-align: left;">Application Id</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 110px;padding-left: 0px;padding-right: 0px;text-align: left;">Language</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 150px;padding-left: 0px;padding-right: 0px;text-align: left;">Guardian First</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 150px;padding-left: 0px;padding-right: 0px;text-align: left;">Guardian Last</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;padding-left: 0px;padding-right: 0px;text-align: left;">Guardian Email</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;padding-left: 0px;padding-right: 0px;text-align: left;">Status</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;padding-left: 0px;padding-right: 0px;text-align: left;">Reason</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 75px;padding-left: 0px;padding-right: 0px;text-align: left;">Id</th>
          <th contenteditable="false" style="color: purple;border: solid black 0px;width: 175px;padding-left: 0px;padding-right: 0px;text-align: left;">Actions</th>          
        </tr>        
      </thead>       
      <tbody v-if="filteredIds.length>0">                          
        <tr v-for="(application,index) in filteredIds" :key="index" @mouseover="setOver(index)" @mouseleave="onLeave()" style="font-size: 20px;height: 50px">            
          <td  style="padding-bottom: 15px">                                      
            <input v-if="application.Selected=='true'" @click="addToSelected(index)" :id="'chkSelect'+index" name="inpSelect" type="checkbox" class="w3-check select" checked>              
            <input v-else-if="application.Selected=='false'" @click="addToSelected(index)" :id="'chkSelect'+index" name="inpSelect" type="checkbox" class="w3-check select">              
          </td>
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 30px;color: red;font-weight: 700">{{ application.BatchNum }}</td>                                
          <td  style="padding-bottom: 15px">                   
            <input @click="setActive(index)" :id="'inpActive'+index" name="inpSelect" type="radio" class="w3-radio inpActive">              
          </td>            
          <td  style="padding-bottom: 15px">
            <input v-if="application.Sent == 'true'" id="chkSent" name="inpSent" type="checkbox" class="w3-check sent" checked disabled>
            <input v-else id="chkSent" name="inpSent" type="checkbox" class="w3-check sent" disabled>
          </td>      
          <td  style="padding-bottom: 15px">
            <input v-if="application.Printed == 'true'" id="chkPrinted" name="inpPrinted" type="checkbox" class="w3-check printed" checked disabled>
            <input v-else id="chkPrinted" name="inpPrinted" type="checkbox" class="w3-check printed" disabled>
          </td>        
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 0px;color: black">{{ application.Id }}</td>            
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 0px;color: black">{{ application.Language }}</td>            
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">{{ application.Guardians[0].FirstName }}</td>            
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">{{ application.Guardians[0].LastName }}</td>
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 0px;color: black" contenteditable="false">{{ application.Guardians[0].Email }}</td>

          <td @click="onSelected(index)" contenteditable="false" v-if="application.Status[0].Checked=='true'" style="color: green;padding-left: 0px">
            {{ application.Status[0].MobileStatus }}
          </td>          
          <td @click="onSelected(index)" contenteditable="false" v-else-if="application.Status[1].Checked=='true'" style="color: green;height: 30px;padding-left: 0px">            
            {{ application.Status[1].MobileStatus }}
          </td>          
          <td @click="onSelected(index)" contenteditable="false" v-else-if="application.Status[2].Checked=='true'" style="color: red;padding-left: 0px">
            {{ application.Status[2].MobileStatus }}
          </td>
          <td @click="onSelected(index)" contenteditable="false" v-if="application.Reasons[0].Checked=='true'" style="padding-left: 0px;color: black">
            {{ application.Reasons[0].MobileReason }}
          </td>
          <td @click="onSelected(index)" contenteditable="false" v-else-if="application.Reasons[1].Checked=='true'" style="padding-left: 0px;color: black">
            {{ application.Reasons[1].MobileReason }}
          </td>
          <td @click="onSelected(index)" contenteditable="false" style="padding-left: 40px;color: black" v-else> 
                        
          </td> 
          <td @click="onSelected(index,application.Id,application.Guardians[0].LastName,application.Guardians[0].FirstName)" style="font-size: 20px;padding-left: 0px;color: black;width: 25px">{{ application.Index }}</td>            
          <td :id="'divPrint'+index" style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: center;padding-left: 0px;">              
            
              <!-- <input v-if="index==0" @click="onClick()" :id="'inpPrint'+index" name="inpPrint" type="button" class="btn btn-primary inpPrint" style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 14px" value="Print"> -->
              <input @click="printLetter(index)" :id="'inpPrint'+index" name="inpPrint" type="button" class="w3-btn inpPrint" style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 14px;background-color: #0a58ca;color: white" value="Print" disabled>
            
          </td>
          <td :id="'divEmail'+index" style="display:  inline-flex;margin: auto;border: solid black 0px;justify-content: center">
            
              <!-- <input v-if="index==0" @click="submitEmail()" :id="'inpEmail'+index" name="inpEmail" type="button" class="btn btn-primary inpEmail" style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 14px" value="Email"> -->
              <input @click="submitEmail()" :id="'inpEmail'+index" name="inpEmail" type="button" class="w3-btn inpEmail" style="display: flex;margin: auto;text-align: center;margin-left: 0px;font-size: 14px;background-color: #0a58ca;color: white" value="Email" disabled>
            
          </td>         
          
        </tr>
      </tbody>
      <tbody v-else>  
        <tr>      
          <td colspan="10" style="padding-left: 10px;font-size: 20px;color: red;font-weight: 600">
            No matching records found
          </td>
        </tr>
      </tbody>
    </table>
  </div>  
  
  <!-- Accordian button for Student Section -->
  <div class="w-full" style="display: flex;margin: auto;flex-direction: row;justify-content: center;align-items: center;
  flex-wrap: wrap;border: solid black 0px">
    <input id="divSearchBy" @click="toggleStudentInfo()" type="button" class="btn border" style="text-align: left;font-size: 18px;font-weight: 600;background-color: #0a58ca;color: white" value="Student Information"/>                          
  </div>

  <!-- Students Section -->
  <div v-if="applications.length>0" class="divStudentWrapper hidden" id="divStudentData" style="display: flex;margin: auto;justify-content: left;border: solid rgb(0, 0, 0) 0px;
  background-color: rgb(255, 255, 255);overflow: auto;margin-top: 0px;border-radius: 10px">    
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
  <div v-if="applications.length>0" class="divDocumentationWrapper hidden" id="divDocumentationWrapper" style="display: flex;margin: auto;justify-content: left;
    border: solid rgb(0, 0, 0) 0px;background-color: rgb(255, 255, 255);overflow: auto;margin-top: 0px;border-radius: 10px">    
    <div class="w-full" style="display: flex;margin: auto;flex-direction: row;justify-content: center;align-items: center;
      flex-wrap: wrap;border: solid black 0px">
      <input id="divDoc" type="button" class="btn border" style="text-align: Center;font-size: 18px;font-weight: 600;background-color: green;
        color: white" value="Documentaion"/>                          
    </div>      
  </div>
  
  <!-- Documentation Section -->
  <div><label id="lblTooltipTitle" type="text"  style="display: flex;margin: auto;justify-content: center;border: solid black 0px;width: 100%;font-size: 40px;font-weight: 600;"></label></div>                                   
  <div id="lblTooltip" type="text"  style="display: flex;margin: auto;justify-content: center;border: solid black 0px;width: 100%;font-size: 30px;font-weight: 600"></div>

  <!-- Print and Send buttons -->
  <div v-if="applications.length>0" id="divDisplay" style="display: flex;margin: auto;justify-content: center;margin-top: 0px;border: solid black 0px;position:fixed;bottom:0px" class="w-full">        
      <div id="divDisplay2" style="display: flex;margin: auto;justify-content: center;margin-top: 0px;margin-bottom: 0px;border: solid black 0px" class="w-full">            
        <input id="inpPrint" type="button" @click="printTest()" value="Print Selected Letters" class="btn btn-primary w3-margin w-30rem" style="font-size: 24px" />              
        <input id="inpSend" type="button" @click="submitEmails()" value="Send Selected Letters" class="btn btn-primary w3-margin w-30rem" style="font-size: 24px" />        
      </div>      
  </div>  

  <!-- Letter in HTML Format-->
  <div v-if="applications.length>0" id="divEligibility" class="eligibility app hidden" style="margin-top: 0px;width: 1200px;font-size: 24px;border: solid black 1px;padding: 20px">
    <div style="display: flex;margin: auto;justify-content: space-between;border: solid black 0px;width: 100%">
      <div style="display: flex;margin: auto;border: solid black 0px;flex-wrap: wrap;width: 40%" contenteditable="true">
        {{ english[0].HeaderLeft }}
      </div>  
      <div style="display: flex;margin: auto; justify-content: right;border: solid black 0px;width: 60%" contenteditable="true">        
        {{ english[0].HeaderRight }}               
      </div>
    </div>
    <div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">
      <div style="display: flex;margin: auto;border: solid black 0px;width: 80%">

      </div>  
      <div style="display: flex;margin: auto; justify-content: right;border: solid black 0px;text-align: right;width: 20%" contenteditable="true">        
        {{ english[0].HeaderDate }}               
      </div>
    </div>

    <div style="display: flex;margin: auto; justify-content: space-between;border: solid black 0px;width: 100%">      
      <div v-if="applications[activeIndex].Language=='English'" id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
        width: 100%" contenteditable="true">        
        {{ english[0].Title }}      
      </div>
      <div v-else-if="applications[activeIndex].Language=='Spanish'" id="divTitle2" style="display: flex;margin: auto; justify-content: center;border: solid black 0px;
        width: 100%" contenteditable="true">        
        {{ spanish[0].Title }}      
      </div>
    </div>
    <br>
    <div v-if="applications[activeIndex].Language=='English'" class="w-full" style="display: inline-flex;margin: auto; justify-content: left">
      <div style="font-style: italic;margin-bottom: 10px" contenteditable="false">{{english[0].District }}</div>
    </div>
    <div v-else class="w-full" style="display: inline-flex;margin: auto; justify-content: left">
      <div style="font-style: italic;margin-bottom: 10px" contenteditable="false">{{spanish[0].District }}</div>
    </div>
    <div v-if="applications[activeIndex].Language=='English'" class="w-16rem" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">
      {{ english[0].BodyDate }}
    </div>
    <div v-else class="w-16rem" style="display: inline-flex;margin: auto;margin-bottom: 20px; justify-content: left;margin-left: 0px">
      {{ spanish[0].BodyDate }}
    </div>
    <div v-if="applications[activeIndex].Language=='English'" class="w-full" style="display: inline-flex;margin: auto; justify-content: left;padding-top: 0px">
      <div contenteditable="false">Dear Mr./Ms.: {{ applications[activeIndex].Guardians[0].FirstName }} {{ applications[activeIndex].Guardians[0].LastName }}</div>
    </div>
    <div v-else class="w-full" style="display: inline-flex;margin: auto; justify-content: left;padding-top: 0px">
      <div contenteditable="false">Estimado Sr/a: {{ applications[activeIndex].Guardians[0].FirstName }} {{ applications[activeIndex].Guardians[0].LastName }}</div>
    </div>

    <div v-if="applications[activeIndex].Language=='English'" class="w-full" style="display: inline-flex;margin: auto; justify-content: left;padding-top: 10px">
      <div contenteditable="false">{{english[0].Reviewed }}</div>
    </div>

    <div v-else class="w-full" style="display: inline-flex;margin: auto; justify-content: left;padding-top: 10px">
      <div contenteditable="false">{{spanish[0].Reviewed }}</div>
    </div>

    <table style="margin-left : 20px;margin-top: 10px;margin-bottom: 10px">      
      <thead>
        <td style="border-right: solid transparent 50px;font-weight: 600;">Name</td>        
        <td style="border-right: solid transparent 50px;font-weight: 600;">Id</td>
        <td style="border-right: solid transparent 50px;font-weight: 600;">Campus</td>
      </thead>
      <tr v-for="student in applications[activeIndex].Students" :key="student.Id">
        <td style="border-right: solid transparent 50px">{{ student.FirstName + " "  + student.LastName}}</td>
        <td style="border-right: solid transparent 50px">{{ student.Id }}</td>
        <td style="border-right: solid transparent 50px">{{ student.Campus }}</td>
      </tr>
    </table>

    <div v-if="applications[activeIndex].Language=='English'" style="display: inline-flex;margin: auto; justify-content: center;margin-top: 0px">
      <div contenteditable="false">{{english[0].Status }}</div>
    </div>
    <div v-else style="display: inline-flex;margin: auto; justify-content: center;margin-top: 0px">
      <div contenteditable="false">{{ spanish[0].Status }}</div>
    </div>
    
    <div style="border: solid black 0px;margin-top: 10px;margin-left: 20px">
      <div v-if="applications[activeIndex].Status[0].Checked=='true'" id="divApprovedFree" class="w-full" style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: left;margin-bottom: 5px">
        
        <div style="padding-top: 3px" contenteditable="false">
          {{ applications[activeIndex].Status[0].Status }}
        </div>
      </div>
      <div v-else-if="applications[activeIndex].Status[1].Checked=='true'" id="divApprovedReduced" class="w-full" style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: left;margin-bottom: 5px">
        
        <div style="padding-top: 3px" contenteditable="false">
          {{ applications[activeIndex].Status[1].Status }}
        </div>
      </div>
      <div v-else-if="applications[activeIndex].Status[2].Checked=='true'" id="divDenied" class="w-full" style="display: inline-flex;margin: auto;border: solid black 0px;justify-content: left;margin-bottom: 5px">
        
        <div style="padding-top: 0px" contenteditable="false">
          {{ applications[activeIndex].Status[2].Status }}
        </div>

        <div id="divDeniedReason">
          <div id="divDeniedReduced" style="display: inline-flex;margin: auto;border: solid black 0px;float: left;justify-content: left;margin-bottom: 0px;margin-left: 10px">
            <div v-if="applications[activeIndex].Reasons[0].Checked=='true'" contenteditable="false">
              {{ applications[activeIndex].Reasons[0].Reason }}
            </div>
            <div v-else-if="applications[activeIndex].Reasons[1].Checked=='true'" contenteditable="false">
              {{ applications[activeIndex].Reasons[1].Reason }} 
            </div>
          </div>
        </div>
      </div>             
    </div>
    <div v-if="applications[activeIndex].Language=='English'" style="border: solid black 0px;margin-top: 10px">      
    <div style="margin-left: 0px" contenteditable="false">{{english[0].Service }}</div>
    <div style="margin-left: 0px" contenteditable="false">{{english[0].Street }}</div>
    <div style="margin-left: 0px" contenteditable="false">{{english[0].City }}</div>
    <div style="margin-left: 0px" contenteditable="false">{{english[0].Phone }}</div>
    <div style="margin-top: 20px" contenteditable="false">{{english[0].Reapply }}</div>    
    <div style="margin-top: 20px" contenteditable="false">{{english[0].Closing }}</div>      
    <div style="margin-top: 20px" contenteditable="false">{{english[0].Director }}</div>
    <div style="margin-top: 20px" contenteditable="false">{{english[0].Accordance }}</div>
  </div>

  <div v-else style="border: solid black 0px;margin-top: 10px">
    
    <div style="margin-left: 0px" contenteditable="false">{{spanish[0].Service }}</div>
    <div style="margin-left: 0px" contenteditable="false">{{spanish[0].Street }}</div>
    <div style="margin-left: 0px" contenteditable="false">{{spanish[0].City }}</div>
    <div style="margin-left: 0px" contenteditable="false">{{spanish[0].Phone }}</div>
    <div style="margin-top: 20px" contenteditable="false">{{spanish[0].Reapply }}</div>    
    <div style="margin-top: 20px" contenteditable="false">{{spanish[0].Closing }}</div>      
    <div style="margin-top: 20px" contenteditable="false">{{spanish[0].Director }}</div>
    <div style="margin-top: 20px" contenteditable="false">{{spanish[0].Accordance }}</div>
  </div>
  
  <div id="inpPrint" style="display: none;margin: auto;justify-content: center;" class="print submit">
    <input type="button" value="Print" class="w3-btn w3-grey w3-margin w-10rem">
    <input type="submit" value="Send" class="w3-btn w3-blue w3-margin w-10rem">
  </div> 
  </div>

  <!-- Active PDF Doc display -->
 <embed id="embDoc" :src="selDoc+'#page=1&zoom=200'" style="width: 100%;height: 1100px;overflow-x: hidden;overflow-y: auto" class="w3-margin hidden">

</template>
<script>
  const uniqueId = require('lodash.uniqueid')
  import html2pdf from "html2pdf.js";
  import { ref, onMounted } from 'vue';
  import { useToast } from "primevue/usetoast";
  import { Applications } from 'D:/Projects/EPISD/deploy template/public/applications.json'  
  //import  { Applications } from '../assets/json/applications.json'
  import { Searches } from '../assets/json/searches.json'
  import { English } from 'D:/Projects/EPISD/deploy template/public/applications.json'
  import { Spanish } from 'D:/Projects/EPISD/deploy template/public/applications.json'
  import printJS from 'print-js'
  import { sites } from '/public/sites.json'
  //import { emails } from '/public/emails.csv'

  import HelloWorld from "@/components/HelloWorld.vue";
  var ap = require('/autoPrinter.js'); 

  export default {
    components: { HelloWorld },
    name: "apps",
      mounted: function() {
        this.isMobile()               
        this.id = uniqueId()
      },    
      methods: {
        printPDFS() {
          var appsToPrint = ''
          alert("printPDFS")
          for(var i=0;i<Applications.length;i++) {
            //alert(Applications[i].Printed)
            if(Applications[i].Printed=='false') {
              //alert("Yes")
              //updatePrinted = "true"
              if(appsToPrint.length==0) {
                appsToPrint = Applications[i].Index
              } else {
                appsToPrint += ","+Applications[i].Index              
              }
            }
          }

          //alert("Update Printed: "+updatePrinted)
          if(appsToPrint=='0') {
            alert(appsToPrint)
            //$("#btnAPI").click()
            setTimeout(function() {
              window.location.href = "http://localhost:8100?setPrinted="+appsToPrint;
            }, 3000)
          }
        },        
        showPDFS() {
          var selectedIndexes = txtSelected.value
          //alert("selectedIndexes: "+selectedIndexes)

          //alert(processArray.length)
          if(selectedIndexes!='') {
            var processArray = selectedIndexes.split(',');
            setTimeout(function() {
              window.location.href = "http://DESKTOP-DJNVAF5:8100?appIndex="+processArray;
              //window.location.href = "http://DESKTOP-DJNVAF5:80?appIndex="+processArray;
            }, 300)
          }
        },
        importApps() {
          window.location.href = "http://localhost:8100?importApps=1";          
          $('#divCopy').css('display', 'block')
        },
        showConfig() {
          window.location.href = "http://localhost:8100?showConfig=1";
        },
        addToSelected(i) {     
          var selectChecked = document.getElementById("chkSelect"+i);                               
          var curIndex = this.selected.indexOf(i)          
          var allChecked = false
          
          this.selected = []

          var selectCount = 0
          document.querySelectorAll('.select').forEach(function(check,index) {
            selectCount++              
          }); 

          for(var i=0;i<selectCount;i++) {              
            if($("#chkSelect"+i).prop("checked")) {
              this.selected.push(this.filteredIds[i].Index)              
            }           
          }        
              
          if(allChecked) {
            $("#checkSelectAll").prop("checked", "checked")
            this.selectAll = 'Unselect'
          } else {
            $("#checkSelectAll").prop("checked", "")
            this.selectAll = 'Select'            
          }

          txtSelected.value = this.selected

          //alert("this.selected.length: "+this.selected.length)

          if(this.selected.length>0) {
            $("#divDisplay").removeClass('hidden')
          } else {
            $("#divDisplay").addClass('hidden')
          }
             
          var checked = "false"           
          
          if($("#chkSelect"+i).prop("checked")) {
            checked = 'true'
          } 

          //console.log("setSelecteddd: "+ i);
          //window.location.href = "http://localhost:8100?setSelected="+i+"&checked="+checked;
          //window.location.href = "http://localhost:8100?setSelected="+txtSelected.value  
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
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "sentFalse") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "printedTrue") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "printedFalse") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "id") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "guardian") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "student") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "campus") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "approvedFree") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "approvedReduced") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
              $(".select").prop("checked", "checked")
            }
          } else if(this.searchtype == "denied") {
            for(var i=0;i<this.filteredIds.length;i++) {            
              selectAllArray.push(this.filteredIds[i].Index)
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
          
          /*
          document.querySelectorAll('.select').forEach(function(check,index) {
              selectCount++
              //alert("check: "+check.id)
          });
          //alert("selectCount: "+selectCount)          
          if(checkAll.checked == true) {
            $(".select").prop("checked", "checked")
            this.selectAll = 'Unselect'            
            $("#divDisplay").removeClass('hidden')                            

            for(var i=0;i<selectCount;i++) {
              this.selected.push(i)   
              //appsData[i].Selected = 'true'
            } 
            txtSelected.value = this.selected                       
          } else {
            $(".select").prop("checked", "")
            this.selectAll = 'Select'
            $("#divDisplay").addClass('hidden')
            this.selected = []
            
            for(var i=0;i<selectCount;i++) {              
              //appsData[i].Selected = 'false'            
            }
            txtSelected.value =  this.selected                           
          }
            */
          //window.location.href = "http://localhost:8100?setSelected="+txtSelected.value       
        }       
      },
      data() {
        return {
          apps: Applications,
          english: English,
          spanish: Spanish,
          appData: ref([]),
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
      const sitesArray = ref(sites)
      const searches = ref(Searches)    
      const ids = []
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

      const setDocumentation = () => {             
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

      //Documentation has been enabled/disabled
      const docEvent = (field,subfield) => {
        if(setDocFlag.value == true) {
          $("#lblTooltipTitle").html(searches.value[field].inputs[subfield ].tooltipTitle)                    
          $("#lblTooltip").html(searches.value[field].inputs[subfield ].tooltip)                    
        } else {
        }        
      }

      const selectDate = () => {
        $( function() {
          $( "#datepicker" ).datepicker();
        } );
      }

      const sendEmail = () => {
        const recipient = "mvc757@gmail.com";
        const subject = "Important Information";
        const linkText = "click on this lick to see the letter";
        const httpLink = "https://storage.googleapis.com/staging.deploy-template-397316.appspot.com/Letters/EPISD%20-%20Meal%20Application_000000000000_Doe_John.pdf";
        const emailBody = `Please ${linkText} at: ${httpLink}`;

        // URL-encode the email body
        const encodedBody = encodeURIComponent(emailBody);

        // Construct the mailto URL
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodedBody}`;

        // Open the default email client
        window.location.href = mailtoUrl;
      }

      const sendEmailx = () => {
        var recipient = 'mvc757@gmail.com';
        var subject = 'Eligibility for the 2025-2026 school year';
        var body =             
            `
            Hello,
            
            Please see the attached eligibility letter.  Let us know if you have any questions.


            Have a nice day.


            El Paso ISD Non-discrimination disclaimer http://www.episd.org/Page/1115 "It Starts With Us"`;  
        var mailto_link = 'mailto:' + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        
        window.open(mailto_link);
      }

      const printTest = () => {
        var selectedIndexes = document.getElementById("txtSelected").value;
        //alert("Applications.length: "+Applications.length)              

        //alert("Applications: "+Applications)
        //window.location.href = "http://localhost:8100?setSelected="+selectedIndexes

        //alert("English: "+English[0].HeaderLeft)
        //alert("Spanish: "+Spanish[0].HeaderLeft)

        const elements = document.getElementsByClassName('select');

        // Using Array.from() and forEach (to convert HTMLCollection to an array)
        //document.getElementById("txtSelected").value = ''
        /*
        var selecteIndex = ''
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if(element.checked) {
            //alert(i + " is checked")
            if(document.getElementById("txtSelected").value.length == 0) {
              document.getElementById("txtSelected").value += i;
            } else {
              document.getElementById("txtSelected").value += ","+i;
            }              
          }
          // Perform actions on the element
          //console.log(element.textContent);
        }
        */
        ////document.getElementById("txtSelected").value = '2,3,4,5,6,7,8';
        alert(document.getElementById("txtSelected").value)
        
        ap.TestPrinter(document.getElementById("txtSelected").value,Applications,English,Spanish)
        //ap.printTest()
        //ud.updatePrinted(applications,"0,1,2,3,4,5,6")
        //alert(ap.printTest());
      }

      const setLogoURL = () => {
        var url = $("#inpLogoURL").val()
        alert("url: "+url)
        $("#imgLogo").attr("src", url);
        $("#inpLogoURL").addClass("hidden");
      }

      const setPrinted = (index) => {
        //window.location.href = "http://localhost:8000?setPrinted="+index;
      }

      const copyPDFS = () => {
        var index = document.getElementById("txtSelected").value;
        if(index.length>0) {
          //window.location.href = "http://localhost:8100?copyPDF="+index;
        } else {
          //alert("Nothing new to copy");
        }
        //alert("txtSelected: "+ document.getElementById("txtSelected").value)
      }

      const setSelected = (index) => {
        //var appData = Applications;
        //window.location.href = "http://localhost:8100?setSelected="+index;
      }
      
      const submitEmails = () => {
        //var retrievedObjectApps = localStorage.getItem("apps");
        var appData = Applications;

        const elements = document.getElementsByClassName('select');

        // Using Array.from() and forEach (to convert HTMLCollection to an array)
        var selecteIndex = ''
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          if(element.checked) {
            //alert(i + " is checked")
            if(document.getElementById("txtSelected").value.length == 0) {
              document.getElementById("txtSelected").value += i;
            } else {
              document.getElementById("txtSelected").value += ","+i;
            }              
          }
          // Perform actions on the element
          //console.log(element.textContent);
        }
        
        var appIndexes = txtSelected.value  
        window.location.href = "http://localhost:8100?emailSelected="+appIndexes;
      }

      const test = () => {        
      }  
      
      const setActive = (index) => {
        //alert(index)        

        if(index==-1) {
          //activeIndex.value = 0
          activeSet.value = 0
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)                       
        } else {
          activeIndex.value = index
          activeSet.value = 1
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)             
          $("#inpPrint"+index).prop("disabled", false)   
          $("#inpEmail"+index).prop("disabled", false) 
        } 
        
        //var inpAtive = document.getElementsByClassName("inpActive")
        //inpAtive.checked = false 

        //alert("inpAtive.checked: "+inpAtive.checked)
      }  

      const setOver = (index) => {
        //alert(index)
        
        overIndex.value = index
        if(activeSet.value == 0 ) {
          activeIndex.value = index  
        } else {            
          //alert();
        }          
        $(".divStudentWrapper").removeClass("hidden")                
      } 
            
      const onLeave = (index) => {
        if(activeSet.value == 0 ) {
          overIndex.value = null                
          $(".divStudentWrapper").addClass("hidden") 
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)        
        }
      } 

      const searchApps = (type,div,input,filter,tf) => {  
        //alert("searchApps: "+type )
        searchtype.value = type
        filteredtype.value = filter
      }

      const searchAppsT = () => {  
        console.log("search T: "+ filter.value)        
      }

      const searchAppsF = () => {  
        searchtype.value = type
        filteredtype.value = filter

        console.log("search F: "+ searchtype.value)   
        console.log("searchtype: " + searchtype)      
        console.log("filteredtype: " + filteredtype)      
      }
      
      const searchAppsx = (type,div,input,filter) => {  
        console.log("search: " + type + " " + div + " " + input + " " + filter)        
        $(".search").addClass('hidden')
        $("#"+div).removeClass('hidden')
        $("#"+input).css("background-color","#ffffe0")
        $("#"+input).val("")        
        searchtype.value = type
        filteredtype.value = filter

        console.log("searchtype: " + searchtype)      
        console.log("filteredtype: " + filteredtype)      
        
        $("#"+input).focus()
          alert("search: " + type + " " + div + " " + input + " " + filter)        
          $(".filter").removeClass('btn-success')
          $(".filter").addClass('btn-primary')        
          $("#inp"+type).removeClass('btn-primary')
          $("#inp"+type).addClass('btn-success')        
      }

      const printLetter = (id) => {
        console.log("printLetter: " + id)        
        print({printable:'divEligibility', type:'html','documentTitle': "Test Base64",showModal:false, scanStyles:false });
      }
      
      const onSelected = (i,id,lname,fname) => {
        activeIndex.value = i        
        activeSet.value = 1

        //alert("app: http://localhost:8083/EPISD - Meal Application_"+id+"_"+lname+"_"+fname+".pdf")
        selDoc.value = "http://DESKTOP-DJNVAF5:8083/EPISD%20-%20Meal%20Application_"+id+"_"+lname+"_"+fname+".pdf"

        //alert("selDoc.value: "+selDoc.value)
        $("#embDoc").removeClass("hidden")

        $(".inpPrint").prop("disabled", true)   
        $(".inpEmail").prop("disabled", true)     

        $("#inpPrint"+i).prop("disabled", false)   
        $("#inpEmail"+i).prop("disabled", false)     
        
        $("#divApps tbody tr").click(function() {
          //$("#divApps tbody tr").removeClass("highlight");
          //$(this).addClass("highlight");                  
        });


        $('.inpActive').each(function(j, obj) {
          
          if(j != i) {
            $("#inpActive"+j).prop('checked', false);                        
          }

        });
        
        if($("#inpActive"+i).prop("checked")) {
          $("#inpActive"+i).prop('checked', false);
          $(".inpPrint").prop("disabled", true)   
          $(".inpEmail").prop("disabled", true)               
          $("#embDoc").addClass("hidden")  
          activeSet.value = 0
        } else {
          $("#inpActive"+i).prop('checked', true);          
          $("#embDoc").removeClass("hidden")          
        }         
      }

      const selectAllSend = () => {
        console.log("selectAllSend")
      }

      const sendSelected = () => {
        console.log("sendSelected")        
        //this.sendEmail()
      }

      const selectAllPrint = () => {
        console.log("selectAllPrint")
        
      }

      const printSelectedxxx = () => {
        console.log("printSelected")
        //selectedPrint.value = 'true'
        //console.log("Print: " + selectedPrint)
        print({printable:'divEligibility', type:'html'});
        //print()
      }

      const toggleSearch = () => {
        $(".divSearchWrapper").toggleClass("hidden")
      }

      const toggleAppInfo = () => {
        $(".divAppWrapper").toggleClass("hidden")
      }

      const toggleStudentInfo = () => {
        $(".divStudentWrapper").toggleClass("hidden")
      }
      
      const toggleStudents = () => {
        console.log("toggleStudents")
        $(".students").toggleClass("hidden")
        if($(".students").hasClass("hidden")) {
          $("#inpToggleShowStudents").val("Show Students")
          $("#inpToggleShowStudents").css("background-color","grey")
          $("#inpToggleShowStudents").css("color","white")
        } else {
          $("#inpToggleShowStudents").val("Hide Students")
          $("#inpToggleShowStudents").css("background-color","green")
          $("#inpToggleShowStudents").css("color","white")
        }
      }      

      const toggleApp = () => {
        console.log("toggleApp")
        $(".app").toggleClass("hidden")
        if($(".app").hasClass("hidden")) {
          $("#inpToggleShowApp").val("Show Application")
          $("#inpToggleShowApp").removeClass("btn-success")
          $("#inpToggleShowApp").addClass("btn-primary")
        } else {
          $("#inpToggleShowApp").val("Hide Application")
          $("#inpToggleShowApp").addClass("btn-success")
        }
      }      

      const printToPDF = (i) => {
        //alert("i: "+i) 
        //alert("activeIndex: "+activeIndex.value) 
        printType.value = "active"               
        $(".pdf").removeClass("hidden")                
      } 

      const togglePDF = () => {
        console.log("togglePDF")   
        printType.value = "selected"        
        $(".pdf").toggleClass("hidden")
        if($(".pdf").hasClass("hidden")) {
          $("#inpToggleShowPDF").val("Show Letters")
          $("#inpToggleShowPDF").removeClass("btn-success")
          $("#inpToggleShowPDF").addClass("btn-primary")
        } else {
          $("#inpToggleShowPDF").val("Hide Letters")
          $("#inpToggleShowPDF").addClass("btn-success")
        }
      } 

      for(var i=0;i<applications.value.length;i++) {        
        ids.push( { "id": applications.value[i].Id, code: 'iof'})               
      }
      
      for(var i=0;i<applications.value.length;i++) {
        for(var j=0;j<applications.value[i].Guardians.length;j++) {          
          guardians.push( { "name": applications.value[i].Guardians[j].LastName + ", " + applications.value[i].Guardians[j].FirstName, code: 'iof'})       
        }       
      }

      for(var i=0;i<applications.value.length;i++) {
        for(var j=0;j<applications.value[i].Students.length;j++) {          
          students.push( { "id": applications.value[i].Students[j].Id + " : " + applications.value[i].Students[j].LastName + ", " + applications.value[i].Students[j].FirstName, code: 'iof'})       
        }       
      }

      for(var i=0;i<applications.value.length;i++) {
        for(var j=0;j<applications.value[i].Students.length;j++) {          
          campus.push( { "name": applications.value[i].Students[j].Campus, code: 'iof'})       
        }       
      }

      //console.log("guardians: " + JSON.stringify(guardians))
      
      const selectedId = ref();
      const selectedGuardian = ref();
      const selectedStudent = ref();
      const selectedCampus = ref();
      
      const selectedSent = ref();
      const sent = ref([
        { status: 'Yes'},
        { status: 'No'}
      ]);

      const selectedStatus = ref();
      const status = ref([
          { status: 'Approved for free meals', code: 'f' },
          { status: 'Approved for reduced-price meals	', code: 'r' 
        }
      ]);

      const selectedReason = ref();
      const reasons = ref([
          { reason: 'Income is above the maximum allowed for free meals.', code: 'f' },
          { reason: 'Income is above the maximum allowed for reduced-price meals.', code: 'r' 
        }
      ]);

      return { setPrinted,printLetter,printToPDF,onLeave,submitEmail,submitEmails,setOver,setActive,test,toggleAppInfo,toggleStudentInfo,toggleSearch,onSelected,selectAllSend,searchAppsT,searchAppsF,selectAllPrint,searchApps,
        sendSelected,toggleApp,togglePDF,toggleStudents,selectedStatus,status,selectedReason,reasons,selectedPrint,searchtype,filteredtype,selectedId,selectedGuardian,
        printType,activeSet,selectedStudent,selectedCampus,selectedId,selectedSent,overIndex,activeIndex,applications,english,spanish,sent,ids,guardians,searches,students
        ,campus,copyPDFS,printTest,setSelected, setLogoURL,selDoc,sendEmail,selectDate,docEvent,setDocumentation,setDocFlag
      } 
    }
  }
</script>

<style>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

:root {
  --font-1: rgba(0, 0, 0, 0.75);
  --font-2: rgba(0, 0, 0, 1);
  --color-1: rgba(232, 227, 207, 0.457);
  --color-2: rgba(70, 130, 180, 0.25);
}

body {
  margin-left: 0px;
}

.searchBy {
  width: 100%;
  border: solid rgb(34, 0, 255) 0px;
  justify-content: center;
  text-align: center;
  margin: 20px;
  font-size: 20px;
}

.filter {
  /*display: none!important;*/
  width: 13rem!important;
  justify-content: center!important;
  margin: 5px; 
  font-size: 20px;
 } 

 .searchButtons {
  border: solid red 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.divSearchBy {
  width: 90%!important;
}


.divStudentInfo {
  width: 100%!important;
}

.divSent {
    width: 130px!important;
  }

  .divPrinted {
    width: 130px!important;
  }

@media only screen and (max-width: 600px) {
  .searchButtons {
    border: solid red 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
 
  .filter {
    width: 105px!important;
    height: 30px!important;
    font-size: 20px!important;
  }

  .searchBy {
    border: solid rgb(77, 255, 0) 1px;
  }

  .divSearchBy {
    width: 95%!important;
  }

  .divAppInfo {
    width: 95%!important;
  }

  .divStudentInfo {
    width: 95%!important;
  }

  .divSent {
    width: 140px!important;
  }

  .divPrinted {
    width: 140px!important;
  }
}

@media print { 

 .divNav {
  display: none!important;  
 }

 .eligibility {
  overflow-y: hidden;
  border: none!important;
  width: 1000px!important;
  height: 100%!important;
  font-size: 20px!important;
 }

 .eligibility2 {
  overflow-y: hidden;
  border: none!important;
  width: 1000px!important;
  height: 100%!important;
  font-size: 20px!important;
 }

 .divMain {
  display: none!important;  
 }

 .divDisplay {
  display: none!important;  
 }
 
 .divApps {
  display: none!important;  
 }

 .viewer {
  display: none!important;  
 }

 .checkbox input:checked {
    border-color: red;
    background-color: red;
  }
}

.highlight {
  background-color: rgba(235, 227, 194, 0.457);
}

tbody > tr {
  background-color: rgb(255, 255, 255);      
}

header {
  padding: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}

thead th {
  z-index: 1;
  position: sticky;
  top: 0;
  background-color: rgb(255, 255, 255);
  padding: 0rem;
  height: 50px;
  color: rgb(0, 0, 0);  
  border: solid rgb(255, 255, 255) 1px;
  padding: 10px;
}

#app {
  margin-top: 60px;
}


</style>
