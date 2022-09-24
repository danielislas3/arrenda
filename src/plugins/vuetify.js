import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '../assets/styles/material-icons.css';

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'md',
  },
}

export default new Vuetify(opts)