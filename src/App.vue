
<template>
    <div class="content" style="margin-top: 0px;border: solid black 0px">
        <Toast />
        <Navbar/>
        <router-view/>
    </div>   
</template>

<script>  
  import Navbar from './components/Navbar.vue'
  import HelloWorld from "@/components/HelloWorld.vue";
  import Toast from 'primevue/toast';

  export default {
    components: { Navbar, HelloWorld, Toast },
    setup() {
    }
  }
  
</script>