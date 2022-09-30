<template>

	<div class="min-h-screen bg-purple-400 flex justify-center items-center">

		<div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20 min-h-full">
			<div>
				<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Login Account</h1>
				<v-alert dense border="left" type="warning" dismissible v-model="alert">
					{{message}}
				</v-alert>
				<p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Login to your
					account and find your folks</p>
			</div>
			<div class="space-y-4">
				<input type="email" placeholder="Email " v-model="user.email"
					class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
				<input type="password" placeholder="Password" v-model="user.password"
					class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			</div>
			<div class="text-center mt-6">
				<button class="py-3 w-64 text-xl text-white bg-purple-400  hover:bg-purple-700 rounded-2xl" @click="login">Log
					in</button>
				<p class="mt-4 text-sm">Don't have an account ? <span class="underline cursor-pointer"
						@click="$emit('toggleView')">
						Sign Up</span>
				</p>
			</div>
		</div>
		<div class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
		<div class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
		</div>

	</div>

</template>

<script>
import { userServices } from '@/services/Api.js'

export default {
	name: 'Login',
	methods: {

	},
	data() {
		return {
		
			loading: false,
			message: '',
			type: 'warning',
			alert: false,
			user: {
				email: '',
				password: ''
			}

		}
	},
	methods: {
		async login() {
			try {
				const resp = await userServices.login(this.user);
				const data = await resp.json()
			if (resp.status === 200) {
					this.$router.push('/contacts');
				}	

				if (data.message) {
					this.message = resp.message
					this.loading = false
										this.message = data.message
										this.alert = true

				}
				

			}
			catch (error) {
				console.log(error);
			}
		}
	}
}
</script>

<style >

</style>

