import coupons from '@/store/modules/dashboard/coupons';
import auth from '@/store/modules/dashboard/auth';
import incomingOrders from '@/store/modules/dashboard/incoming-orders';

export default {
  namespaced: true,
  modules: {
    coupons,
    auth,
    incomingOrders
  }
};
