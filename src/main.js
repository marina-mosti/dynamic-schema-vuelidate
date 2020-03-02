import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'

import BaseInput from './components/BaseInput'
import BaseSelect from './components/BaseSelect'

Vue.config.productionTip = false

Vue.use(Vuelidate)

Vue.component('BaseInput', BaseInput)
Vue.component('BaseSelect', BaseSelect)

new Vue({
  render: h => h(App)
}).$mount('#app')
