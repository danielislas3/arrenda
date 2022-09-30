<template>
  <div>


    <main>
      <ul class="py-8 ">
        <li v-for="contact in orderAlphabetically(contacts)" :key="contact.id">
          <router-link :to="{path: `/contacts/${contact.id}`}" class="flex py-4 ">
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
  name: "ContactsList",
  data() {
    return {
      contacts: [],
      userId: "fc8b4ed1-22b0-4bfc-a905-053641391fa6"
    };
  },
  methods: {
    //TODO: Arreglar la carga en cache
    async getContatcs() {
      try {
        const { data } = await userServices.getContacts(this.userId);
        this.contacts = data;
      }
      catch (error) {
        console.log(error);
      }
    },
    orderAlphabetically() {
      return [...this.contacts].sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
  },
  async mounted() {
    console.log("mounted");
    await this.getContatcs();
  },
}
</script>

<style >

</style>