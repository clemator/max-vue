import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import { routes, globalBeforeGuard } from '@/router';
import store from '@/store';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach(globalBeforeGuard);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
