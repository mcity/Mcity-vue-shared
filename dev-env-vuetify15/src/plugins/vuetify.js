import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    // Michigan colors http://med.umich.edu/branding/color.html
    primary: '#00274C',
    secondary: '#FFC400',
    pop: '#575294',
    accent: '#989c97',
    error: '#9A3324',
    arbblue: '#0174BB',
    canhamblue: '#587abc',
    lsaorange: '#cc6600',
    hillbrown: '#7a121c',
    rackhamgreen: '#83b2a8'
  },
  iconfont: 'md',
})
