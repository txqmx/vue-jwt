/* eslint-disable consistent-return */
import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';

// 路由白名单
const whiteList = ['/'];
router.beforeEach(async (to, from, next) => { // 路由的渲染流程 钩子的执行顺序
  // 要校验一下，当前用户的登录状态
  if (whiteList.includes(to.path)) {
    return next();
  }
  const flag = await store.dispatch('validate');
  if (flag) {
    if (to.name === 'login') {
      next('/');
    } else {
      next(); // 登录过而且不是login 直接跳转
    }
  } else {
    // 没有登录，如果这条路由还需要登录就跳转到登录页
    const flag1 = to.matched.some(item => item.meta.needLogin);
    if (flag1) {
      next('/login');
    } else {
      next();
    }
  }
});

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
