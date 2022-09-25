<template>
  <div class="">
    <nav class="bg-primary text-3xl font-bold py-6 px-4 text-violet-50 max-w-lg mx-auto ">
      <p>Contacts List</p>
    </nav>


    <template>
      <v-card max-width="512" class="mx-auto">
        <!-- <v-img :src="contact.img" dark>
          <v-row class="fill-height">
            <v-card-title>
              <v-btn dark icon>
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-4">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-12 pt-12">
              <div class="text-h4 pl-12 pt-12">
                {{ contact.name }} </div>
            </v-card-title>
          </v-row>
        </v-img> -->
        <div class="mx-auto text-center">
          <v-avatar color="brown" size="100" class="my-6">
            <img :src="contact.img" :alt="contact.name">
          </v-avatar>
          <h3>{{ contact.name }}</h3>
          <p class="text-caption mt-1">
            +{{ contact.phone }}
          </p>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text>
            <router-link :to="'/contacts/' + contact.id+'/edit'" class="flex py-4 ">
              Edit Account
            </router-link>
          </v-btn>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text>
            Delete
          </v-btn>
        </div>
        <v-divider class="my-3"></v-divider>
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>- {{ contact.phone }}</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>


          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-email
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ contact.email }}</v-list-item-title>
              <v-list-item-subtitle>Personal</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>



          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>

              <v-list-item-subtitle v-for="address in contact.addressLines">
                {{ address }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>


    </template>


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
      contact: {},
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
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

