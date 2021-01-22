import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import '@/assets/css/index.scss';
import { actRoute } from '@/router/actRoute.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

const toRoute = function(menu) {
  // 主路由 '/'  子路由寄存处
  const route = router.options.routes[0];
  route.children = setMenu(menu);
  return route;
};

let routes = []
const setMenu = function(menu) {
  for (const i of menu) {
    if (i.children && i.children.length) {
      setMenu(i.children)
    } else {
      const item = {
        path: i.path,
        name: i.path.split('/').splice(-1,1)[0],
        component: () => import(`@/views${i.path}/index.js`),
        meta: {
          breadcrumb: i.name,
          id: i.id
        }
      }
      routes.push(item)
    }
  }
  return routes;
};
// 生成路由
const generateRoute = toRoute(actRoute);
//动态添加路由
router.addRoutes([generateRoute]);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
