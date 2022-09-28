<template>
  <div>
    <v-card max-width="512" class="mx-auto">
      <Navbar />
      <router-view></router-view>
    </v-card>
  </div>
</template>

<script>
import Navbar from '@contacts/shared/Navbar.vue'
export default {
  name: 'ContactsTemplate',
  components: { Navbar },

}
</script>

<style lang="scss" scoped>

</style>