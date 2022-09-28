import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '../assets/styles/material-icons.css';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'md',
    iconfont: 'mdiSvg',
  },
}

export default new Vuetify(opts)