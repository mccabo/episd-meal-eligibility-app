<template>
    <div style="display: flex;margin: auto;justify-content: center;border: solid black 0px" class="w3-margin">
        <img src="/episdlogo.jpg" style="width: 150px">
    </div> 
    <div style="display: flex;margin: auto;justify-content: center;border: solid black 0px">
        <form @submit.prevent="handleSubmit" class="w3-center w-full" style="border: solid black 1px; padding: 20px;">
            <h2 style="margin-top: 0;">Login</h2>
            <input type="text" placeholder="Email or Username" v-model="email" class="w3-input w-24rem w3-margin" style="font-size: 20px;">    
            <input type="password" placeholder="Password" v-model="password" class="w3-input w-24rem w3-margin" style="font-size: 20px;">
            <div v-if="error" class="error" style="color: red; margin: 10px 0;">{{ error }}</div>
            <button class="login w3-margin w3-button w3-blue w-10rem" style="font-weight: 600; font-size: 20px;" v-if="!isPending">Login</button>
            <button v-if="isPending" disabled class="w3-button w3-grey w-10rem" style="font-size: 20px;">Loading...</button>
            
            <div class="demo-credentials" style="margin-top: 30px; padding: 15px; background: #f5f5f5; border-radius: 5px; text-align: left;">
                <h4 style="margin-top: 0;">Demo Credentials:</h4>
                <div style="font-size: 14px; line-height: 1.6;">
                    <strong>Admin:</strong> admin@episd.com / admin123<br>
                    <strong>Developer:</strong> dev@episd.com / dev123<br>
                    <strong>User:</strong> user@episd.com / user123<br>
                    <small style="color: #666;">You can also use username instead of email</small>
                </div>
            </div>
        </form>        
    </div>
    <div style="display: flex;margin: auto;justify-content: center">
        <router-link class="w3-btn w3-margin sign-up" :to="{ name: 'Signup' }" style="font-size: 20px;">Signup</router-link>
    </div>
</template>

<script>
import useLocalAuth from '@/composables/useLocalAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { error, login, isPending } = useLocalAuth()
        const router = useRouter()

        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            if(!error.value) {
                console.log('user logged in')
                router.push({ name: 'Home' })
            }
        }

        return {email, password, handleSubmit, error, isPending}
    }
}
</script>

<style>
  h3 {
    margin-top: 0px;
  }
 .login {    
    padding: 5px 10px 5px 10px ;
 }
</style>