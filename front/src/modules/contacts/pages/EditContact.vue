<template>
  <div>
    <template>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" class="mx-auto text-center">
              <v-avatar size="107">
                <img :src="contact.img" :alt="contact.name">
              </v-avatar>
              <v-file-input label="Upload picture profile" v-model='file' accept="image/*" @change="upload">
              </v-file-input>
              <!-- <v-avatar color="primary" size="107">
                <v-file-input hide-input truncate-length="1"></v-file-input>
              </v-avatar> -->
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field v-model="contact.name" :rules="nameRules" :counter="10" label="First name" required>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="8">
              <v-text-field v-model="contact.phone" :rules="phoneRules" :counter="10" label="phone" required>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="8">
              <v-text-field v-model="contact.email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field v-model="contact.addressLines[0]" label="Address 1"></v-text-field>
            </v-col>
            <v-col cols="12" md="8">
              <v-text-field v-model="contact.addressLines[1]" label="Address 2"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <!-- <Categories /> -->

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" :loading="loading" color="purple" text @click="updateContact">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-form>
    </template>

  </div>
</template>


<script>
import { userServices } from '@/services/Api.js'
import Categories from '@/modules/contacts/Categories.vue'
export default {
  name: 'EditContact',
  components: { Categories },

  mounted() {
    this.getContact()
    console.log('query', this.$route.params.contactId
    );
  },


  data: () => ({
    contact: {
      name: '',
      phone: '',
      email: '',
      addressLines: [],
      img: '',
      categories: []
    },

    userId: "fc8b4ed1-22b0-4bfc-a905-053641391fa6",

    loading: false,
    file: null,
    valid: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 25 || 'Name must be less than 25 characters',
    ],
    phoneRules: [
      v => !!v || 'Phone is required',
      v => v.length <= 13 || 'Phone must be less than 13 characters',
    ],

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    async getContact() {
      try {
        const { data } = await userServices.getUser(this.$route.params.contactId, this.userId)
        console.log('dataaa', data);
        this.contact = { ...this.contact, ...data }
      } catch (error) {
        console.log(error)
      }

    },
    upload() {
      // the file object is not empty
      console.log(this.file);
      this.contact.img = URL.createObjectURL(this.file)
      // post file to server
      const formData = new FormData();
      formData.append('file', this.file);

      const options = {
        method: 'POST',
        body: formData,
      };

      // fetch('https://httpbin.org/post', options).then(response => response.json())
      //   .then(data => console.log(data));
    },
    next() {
      this.loading = true

      this.updateContact()
    },
    async updateContact() {
      console.log('updateContact', this.contact);
      const { data } = await userServices.updateContact(this.contact.id, this.contact)
      console.log("data", data)
    },
  }
}
</script>

<style >

</style>