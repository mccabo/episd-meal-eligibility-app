<template>
  <div>
    <div v-if="jsonData">
      <h2>JSON Data:</h2>
      <pre>{{ jsonData.Applications[0].BatchNum }}</pre>
    </div>
    <div v-else-if="error">
      <p style="color: red;">{{ error }}</p>
    </div>
    <div v-else>
      <p>Loading JSON data...</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      jsonData: null,
      error: null,
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
};
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
