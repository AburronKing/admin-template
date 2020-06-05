import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      children: [
        {
          path: '/indexesMaintain',
          name: 'indexesMaintain',
          component: () => import('@/views/indexesMaintain'),
          meta: {
            menu: '指标维护'
          }
        },
        {
          path: '/indexMaintain',
          name: 'indexMaintain',
          component: () => import('@/views/indexesMaintain'),
          meta: {
            menu: '评估执行'
          }
        },
        {
          path: '/indexMaintain',
          name: 'indexMaintain',
          component: () => import('@/views/indexesMaintain'),
          meta: {
            menu: '查询统计'
          }
        },
        {
          path: '/indexMaintain',
          name: 'indexMaintain',
          component: () => import('@/views/indexesMaintain'),
          meta: {
            menu: '评估查询'
          }
        }
      ]
    }
    // { //history模式下，404页面
    //   path: '*',
    //   component: () => import("@/views/404.vue"),
    //   hidden: true
    // }
  ]
});
