import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate';
import ApiService from './services/api'
import TokenService from './services/storage'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

//ApiService.init("http://localhost:8000/api")
ApiService.init("https://doss.ringlesoft.com/api")
//ApiService.init("https://4e75-102-215-31-51.ngrok.io/api")


require('@/store/subscriber');

ApiService.mount401Interceptor();

store.dispatch('attempt',TokenService.getToken()).then(()=>{

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

})

