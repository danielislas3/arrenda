<template lang="">

<div class="min-h-screen bg-purple-400 flex justify-center items-center">
	
	<div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
		<div>
			<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Create an Account
	</h1>
	<v-alert dense border="left" type="warning" dismissible  v-model="alert" >
     {{message}}
    </v-alert>
			<p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an account to save your contacts</p>
		</div>
		<div class="space-y-4">
			<input type="text" placeholder="Name" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" v-model="user.name" />
			<input type="email" placeholder="Email " class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" v-model="user.email" />
			<input type="password" placeholder="Password" v-model="user.password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />

			<input type="text" placeholder="Phone number" v-model="user.phone" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
    </div>
			<div class="text-center mt-6">
				<v-btn class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-700" @click="register" :loading="loading" >Create Account</v-btn>
				<p class="mt-4 text-sm" >Already Have An Account? 
          <span class="underline cursor-pointer" @click="$emit('toggleView')" >
             Sign In
            </span>
				</p>
			</div>
		</div>
		<div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
		<div
			class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
		</div>
    
	</div>
  
</template>

<script>
import { userServices } from '@/services/Api.js'

export default {
	name: 'Login',
	data() {
		return {
			loading: false,
			message: '',
			type: 'warning',
			alert: false,
			user: {
				email: '',
				password: '',
				phone: '',
				name: '',
			}
		}
	},
	methods: {
		async register() {


			try {
				this.loading = true
				const resp = await userServices.singup(this.user)
				const data = await resp.json()
				if (data.user) {
					// this.$store.commit('setUser', data)

					this.alert = true
					this.message = "Account created successfully"
					this.type = "success"
					setTimeout(() => {
						this.$emit('toggleView')
					}, 2000);
				} else {
					this.alert = true
					this.message = data.message
					this.loading = false
					console.log(data.message)
				}
			} catch (error) {

			}

		}
	}
}
</script>



