<template>
    <div style="display: flex;margin: auto;justify-content: center;border: solid black 0px" class="w3-margin">
        <img src="/episdlogo.jpg" style="width: 250px">
    </div>
    <div style="display: flex;margin: auto;justify-content: center;border: solid black 0px">
        <form @submit.prevent="handleSubmit" class="w3-center w-full" style="border: solid black 1px; padding: 20px;">
            <h2 style="margin-top: 0;">Sign Up</h2>
            
            <input 
                type="text" 
                placeholder="Display Name" 
                v-model="displayName" 
                class="w3-input w-24rem w3-margin" 
                style="font-size: 20px;"
                required
            >
            
            <input 
                type="text" 
                placeholder="Username" 
                v-model="username" 
                class="w3-input w-24rem w3-margin" 
                style="font-size: 20px;"
                required
            >
            
            <input 
                type="email" 
                placeholder="Email Address" 
                v-model="email" 
                class="w3-input w-24rem w3-margin" 
                style="font-size: 20px;"
                required
            >
            
            <input 
                type="password" 
                placeholder="Password (min 6 characters)" 
                v-model="password" 
                class="w3-input w-24rem w3-margin" 
                style="font-size: 20px;"
                required
            >
            
            <div class="role-selection w3-margin" style="max-width: 24rem; margin-left: auto; margin-right: auto;">
                <label style="display: block; text-align: left; margin-bottom: 8px; font-weight: 600; font-size: 16px;">
                    Select Role:
                </label>
                <select 
                    v-model="role" 
                    class="w3-select w3-border" 
                    style="font-size: 18px; padding: 10px;"
                >
                    <option value="user">User - Basic permissions</option>
                    <option value="developer">Developer - Advanced permissions</option>
                    <option value="admin">Admin - Full access</option>
                </select>
                
                <div class="role-info" style="margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 5px; text-align: left; font-size: 13px;">
                    <div v-if="role === 'user'">
                        <strong>User Role:</strong> Can create and read data
                    </div>
                    <div v-else-if="role === 'developer'">
                        <strong>Developer Role:</strong> Can create, read, update, delete, and access reports
                    </div>
                    <div v-else-if="role === 'admin'">
                        <strong>Admin Role:</strong> Full access to all features including user management
                    </div>
                </div>
            </div>
            
            <div v-if="error" class="error" style="color: red; margin: 15px 0; font-weight: 600;">
                {{ error }}
            </div>
            
            <div v-if="success" class="success" style="color: green; margin: 15px 0; font-weight: 600;">
                {{ success }}
            </div>
            
            <button 
                class="login w3-margin w3-button w3-blue w-10rem" 
                style="font-weight: 600; font-size: 20px;" 
                v-if="!isPending"
                type="submit"
            >
                Sign Up
            </button>
            <button 
                v-if="isPending" 
                disabled 
                class="w3-button w3-grey w-10rem" 
                style="font-size: 20px;"
            >
                Creating Account...
            </button>
        </form>
    </div>
    <div style="display: flex;margin: auto;justify-content: center">
        <router-link class="w3-btn w3-margin sign-up" :to="{ name: 'Login' }" style="font-size: 20px;">
            Already have an account? Login
        </router-link>
    </div>
</template>

<script>
import useLocalAuth from '@/composables/useLocalAuth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { error, signup, isPending } = useLocalAuth()
        const router = useRouter()

        const displayName = ref('')
        const username = ref('')
        const email = ref('')
        const password = ref('')
        const role = ref('user')
        const success = ref('')

        const handleSubmit = async () => {
            success.value = ''
            const res = await signup(
                email.value, 
                password.value, 
                displayName.value,
                username.value,
                role.value
            )
            
            if (!error.value && res) {
                success.value = 'Account created successfully! Redirecting...'
                console.log('User signed up:', res.user)
                
                // Redirect to home after a short delay
                setTimeout(() => {
                    router.push({ name: 'Home' })
                }, 1500)
            }
        }

        return { 
            email, 
            password, 
            displayName, 
            username,
            role,
            isPending, 
            error, 
            success,
            handleSubmit 
        }
    }
}
</script>

<style scoped>
.role-selection {
    text-align: center;
}

.w3-select {
    width: 100%;
}

.error {
    animation: shake 0.3s;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
</style>