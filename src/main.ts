import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import { routes, globalBeforeGuard } from '@/router';
import store from '@/store/index';

const app = createApp(App);

app.config.productionTip = false;

const AppRouter = createRouter({
  history: createWebHistory('/app/'),
  routes: routes,
});

AppRouter.beforeEach(globalBeforeGuard);

app.use(AppRouter);

app.mount('#app');
