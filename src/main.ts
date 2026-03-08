import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import { routes, globalBeforeGuard } from '@/router';

const pinia = createPinia();
const app = createApp(App);

const AppRouter = createRouter({
  history: createWebHistory('/app/'),
  routes: routes,
});

AppRouter.beforeEach(globalBeforeGuard);

app.use(AppRouter);
app.use(pinia);

app.mount('#app');
