import '@mdi/font/css/materialdesignicons.css' //
import '@fortawesome/fontawesome-free/css/all.css' 
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },

    theme: {
        themes: {
           
          // light: {
          //   primary: '#136772',
          //   secondary: '#B97016',
          // }
        },
      }
});
