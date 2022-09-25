import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ContactsList from '../modules/contacts/pages/ContactsList.vue'
import ContactsTemplate from '../modules/contacts/pages/ContactsTemplate.vue'
import ContactDetail from '../modules/contacts/pages/ContactDetail.vue'
import EditContact from '../modules/contacts/pages/EditContact.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsTemplate,
      children: [
        { path: '/', component: ContactsList },
        {
          path: ':contactId',
          name: 'contact-id',
          component: ContactDetail,
          props: true
        },
        {
          path: ':contactId/edit',
          name: 'contact-edit',
          component: EditContact,
          props: true
        },

      ]
    },
    // {
    //   path: '/contacts/:contactId',
    //   name: 'contacts-parent',
    //   props: true,
    //   component: ContactDetail,
    // },
  ]
})

export default router
