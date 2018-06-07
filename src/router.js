import Vue from 'vue';
import Router from 'vue-router';
import Config from './config';

/* 授权页面 */
import Authorize from './views/authorize/index.vue';
import Wap from './views/authorize/wap.vue';
import Rf from './views/authorize/rf.vue';
import Wx from './views/authorize/wx.vue';
import Alipay from './views/authorize/alipay.vue';

/* 旧版本路由 */
import OldRoutes from './router.old';

Vue.use(Router);

const routes = [
  /* 授权页面 */
  {
    path: '/authorize',
    name: 'authorize',
    component: Authorize,
    children: [
      {
        path: '/',
        component: Wap,
      },
      {
        path: 'wx',
        component: Wx,
      },
      {
        path: 'alipay',
        component: Alipay,
      },
      {
        path: 'rf',
        component: Rf,
      },
    ],
  },
];

const router = new Router({
  routes,
  base: Config.path,
});

/* 合并旧版路由 */
router.addRoutes(OldRoutes);

export default router;
