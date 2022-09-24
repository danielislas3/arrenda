<template>
  <div>
    <nav class="bg-primary text-3xl font-bold py-6 px-4 text-violet-50">
      <p>Contacts List</p>
    </nav>

    <main>
      <ul class="py-8 ">
        <li v-for="contact in orderAlphabetically(contacts)" :key="contact.id">
          <router-link :to="'/contact/' + contact.id" class="flex py-4 ">
            <img class="mx-4" :src=" contact.img" alt="profile">

            <div>
              <p class="text-2xl font-bold text-violet-900">{{ contact.name }}</p>
              <p class="text-xl font-semibold text-violet-900">{{ contact.phone }}</p>
              <p class="text-xl font-semibold text-violet-900">{{ contact.email }}</p>
            </div>

          </router-link>


        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { userServices } from '@/services/Api.js'
export default {
  name: 'Contacts',
  data() {
    return {
      contacts: []
    }
  },


  methods: {
    //TODO: Arreglar la carga en cache
    async getContatcs() {
      try {
        const data = await userServices.getContacts()
        this.contacts = data
      } catch (error) {
        console.log(error)
      }

    },
    orderAlphabetically() {
      return [...this.contacts].sort((a, b) => (a.name > b.name) ? 1 : -1)
    }
  },
  async mounted() {
    console.log('mounted');
    await this.getContatcs()
  },

}
</script>

<style >

</style>