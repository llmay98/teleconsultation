import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/openseadragon'
import axios from 'axios'

Vue.prototype.$axios=axios;
Vue.config.productionTip = false;

new Vue({
  router,
  data(){
    return{
      MID:0,
      MeetingMessage: {
        id: '',
        name: '',
        room: '',
      }
    };
  },
  render: h => h(App)
}).$mount('#app');
