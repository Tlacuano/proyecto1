import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Vue Bootstrap
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: (h: (arg0: any) => any) => h(App)
}).$mount('#app')
