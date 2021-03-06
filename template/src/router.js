import Vue from 'vue'
import Router from 'vue-router'


const routes = [
  {path: '/', name: 'Index', component: () => import('./pages/Index.vue'), meta: {title: '古猫移动端'}}
];

const router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
});

router.beforeEach((to, from, next) => {
  const jump_url = store.pop('jump_url');
  if (jump_url) {
    const [host, path] = jump_url.split('#');
    if (location.search.indexOf('?r=') != -1) {
      location.replace(jump_url);
    } else if (path) {
      next({path, replace: true});
    } else {
      next({path: '/', replace: true});
    }
  }
  // 更新页面标题
  if (to.meta.title) {
    if (typeof to.meta.title == "string") {
      document.title = to.meta.title;
    } else {
      var key = to.meta.title[0];
      if (to.query[key] > 0) {
        document.title = to.meta.title[1];
      } else {
        document.title = to.meta.title[2];
      }
    }
  }

  next();
});

export default router;
