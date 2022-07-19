import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate';
import ApiService from './services/api'
import TokenService from './services/storage'

Vue.config.productionTip = false

Vue.use(Vuelidate);

//ApiService.init("http://localhost:8000/api")
// ApiService.init("http://ringlesoft.com:8007/api")
ApiService.init("https://e824-155-12-100-67.ngrok.io/api")


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

