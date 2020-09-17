import coupons from '@/store/modules/dashboard/coupons';
import auth from '@/store/modules/dashboard/auth';
import incomingOrders from '@/store/modules/dashboard/incoming-orders';
import foods from '@/store/modules/dashboard/foods';

export default {
  namespaced: true,
  modules: {
    coupons,
    auth,
    incomingOrders,
    foods
  }
};
