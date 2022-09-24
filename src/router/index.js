import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Contacts from '../modules/contacts/pages/Contacts.vue'
import ContactDetail from '../modules/contacts/pages/ContactDetail.vue'
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
      component: Contacts,

    },
    {
      path: '/contact/:contactId',
      name: 'contacts-parent',
      props: true,
      component: ContactDetail,
      // children: [{ path: '', name: 'contact', component: ContactDetail }],
    },
  ]
})

export default router
