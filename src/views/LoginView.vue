

<template>
  <main>
    <Login @toggleView="toogleLogin" v-if="hasAccount" />
    <Singup @toggleView="toogleLogin" v-else />
  </main>
</template>
<script>
import Login from '../modules/login/Login.vue';
import Singup from '../modules/login/Singup.vue';

export default {
  name: 'LoginView',
  components: { Login, Singup },

  data() {
    return {
      hasAccount: true
    }
  },
  methods: {
    toogleLogin() {
      this.hasAccount = !this.hasAccount
    }
  },
}
</script>
