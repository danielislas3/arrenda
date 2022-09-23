<template lang="">

<div class="min-h-screen bg-purple-400 flex justify-center items-center">
	
	<div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
		<div>
			<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">Create an Account
</h1>
			<p class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an account to save your contacts</p>
		</div>
		<div class="space-y-4">
			<input type="text" placeholder="Email Addres" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
			<input type="password" placeholder="Password" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />

			<input type="text" placeholder="Phone number" class="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
    </div>
			<div class="text-center mt-6">
				<button class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-700">Create Account</button>
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
export default {
  name: 'Login'
}
</script>

<style lang="">
  
</style>

