import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import LandingLayout from '../views/LandingLayout';
import OrderLayout from '../views/OrderLayout';
import OrderSuccess from '../components/order/OrderSuccess';
import OrderStepper from '../components/order/order-steps/OrderStepper';
import DashboardLayout from '../views/dashboard/DashboardLayout';
import DashboardLogin from '../views/dashboard/DashboardLogin';
import Orders from '../components/dashboard/incoming-order/Orders';
import DetailOverview from '@/components/dashboard/incoming-order/details/DetailOverview';
import Table from '@/components/dashboard/order-history/Table';
import Layout from '@/components/dashboard/coupon/Layout';
import FoodsTable from '@/components/dashboard/foods/FoodsTable';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingLayout
  },
  {
    path: '/order',
    component: OrderLayout,
    children: [
      { path: '', redirect: 'menu' },
      { path: 'success', name: 'OrderSuccess', component: OrderSuccess },
      {
        path: ':step',
        name: 'Order',
        component: OrderStepper
      }
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: { name: 'auth' },
    children: [
      {
        path: 'auth',
        name: 'auth',
        component: DashboardLogin,
        meta: { noAuthOnly: true }
      },
      {
        path: 'incoming',
        name: 'incoming',
        component: Orders,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'orders-history',
        component: Table,
        meta: { requiresAuth: true }
      },
      {
        path: 'orders/:id',
        name: 'order-detail',
        component: DetailOverview,
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: Layout,
        meta: { requiresAuth: true }
      },
      {
        path: 'menu',
        name: 'menu',
        component: FoodsTable,
        meta: { requiresAuth: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Auto authentication before the first load
let firstAttempt = true;
router.beforeEach((to, from, next) => {
  if (!firstAttempt) return next();

  firstAttempt = false;

  store.dispatch('dashboard/getUser').then(() => next());
});

// Auth guard
router.beforeEach((to, from, next) => {
  // Only auth
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.getters['dashboard/isLoggedIn']
  ) {
    return next({ name: 'auth' });
  }

  // Only no auth
  if (
    to.matched.some(record => record.meta.noAuthOnly) &&
    store.getters['dashboard/isLoggedIn']
  ) {
    console.log('no auth');
    return next({ name: 'incoming' });
  }

  next();
});

export default router;
