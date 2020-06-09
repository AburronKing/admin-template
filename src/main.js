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

// 路由配置
export const menu = [
  {
    path: '/indexesMaintain',
    name: '指标维护',
    breadcrumb: '指标维护',
    index: '1',
    icon: 'bg-menu_icon_zbwh'
  },
  {
    path: '/assessExecute',
    name: '评估执行',
    breadcrumb: '评估执行',
    index: '2',
    icon: 'bg-menu_icon_pgzx'
  }
];

const toRoute = function(menu) {
  const route = {
    path: '/',
    component: () => import('@/views/Home.vue'),
    name: 'home',
    children: []
  };
  route.children = setMenu(menu);
  return route;
};

let routes = []
const setMenu = function(menu) {
  for (const i of menu) {
    if (i.children) {
      setMenu(i.children)
    } else {
      const item = {
        path: i.path,
        name: i.path.split('/').splice(-1,1)[0],
        component: () => import(`@/views${i.path}/index.js`),
        meta: {
          breadcrumb: i.breadcrumb,
          index: i.index
        }
      }
      routes.push(item)
    }
  }
  return routes;
};

const actRoute = toRoute(menu);
//动态添加路由
router.addRoutes([actRoute]);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
