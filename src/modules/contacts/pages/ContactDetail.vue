<template>
  <div class="">
    <img :src="contact.img" :alt="contact.name">
    <p>this is my asdasdasd {{ contactId }}</p>
    <template>
      <v-container fluid style="height: 300px">
        <v-row justify="center">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar color="brown" size="48">
                  <span class="white--text text-h5">{{ contact.name }}</span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="brown">
                    <span class="white--text text-h5">{{ contact.name }}</span>
                  </v-avatar>
                  <h3>{{ contact.name }}</h3>
                  <p class="text-caption mt-1">
                    {{ contact.phone }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>
                    Edit Account
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>
                    Disconnect
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </v-container>
    </template>
    <router-view></router-view>

  </div>
</template>

<script>
import { userServices } from '@/services/Api.js'

export default {
  name: 'ContactDetail',
  props: {
    contactId: String,
  },
  data() {
    return {
      contact: {}
    }
  },
  async mounted() {
    this.getContact()
  },
  methods: {
    async getContact() {
      try {
        this.contact = await userServices.getUser(this.contactId)
      } catch (error) {
        console.log(error)
      }

    },
  },
}
</script>

