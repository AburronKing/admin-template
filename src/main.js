import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import '@/assets/css/index.scss';
import { Button, Menu, Submenu, MenuItem, MenuItemGroup, Select, Table, TableColumn, Breadcrumb,
  BreadcrumbItem } from 'element-ui';

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
