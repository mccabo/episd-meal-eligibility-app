<template>
  <div class="hello">
    <h1>{{ msg }}</h1>         
  </div>
  <div style="display: flex;;justify-content: space-evenly">
      <Toast />
        <Button label="Spanish"  @click="spanish,visible=true" :model="spanishGenres" />
        <Button label="English" @click="english,visible=true" :model="englishGenres" />
  </div>
  <Sidebar :visible="visible">
      <h2>Sidebar</h2>
      <input type="button" style="width: 50px" class="w3-btn w3-green w3-margin" value="Go!" @click="showMessage('Hello Richie')">
      <input type="button" style="width: 50px" class="w3-btn w3-blue w3-margin" value="no!" @click="showMessage('Hello Richie Rich')">
  </Sidebar>
  <Button icon="pi pi-arrow-right" @click="visible=true" style="position: absolute;bottom: 100px" /> 
  
  <div class="flex-1 flex flex-column align-items-center">            
      <label for="cp-hex" style="color: black;position: absolute;bottom: 60px"> BG Color </label>
      <input type="color" id="cpBG" oninput="setBGColor(this.value)" style="color: white;position: absolute;bottom: 10px;height: 50px" value="#e66465" />                        
  </div>
</template>

<script>
import { ref } from 'vue';
export default {  
  name: 'HelloWorld',
  methods: {
    showMessage(msg) {
      alert(msg)
    }
  },
  props: {
    msg: String
  },
  setup() {  
    const visible = ref(false);  

    return { visible }
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
