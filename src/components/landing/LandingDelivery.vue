<template>
  <div id="landing-delivery">
    <h2>Delivery in <span class="orange">4 Easy</span> Steps</h2>
    <div class="columns">
      <div class="column" v-for="(column, index) in columns" :key="index">
        <div class="step" v-for="step in column" :key="step.img">
          <component :is="step.img" class="step-img" />
          <p class="step-description">{{ step.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chef from '@/assets/images/chef.svg';
import Delivery from '@/assets/images/delivery.svg';
import Order from '@/assets/images/order.svg';
import Share from '@/assets/images/share.svg';
import Clock from '@/assets/images/clock.svg';

export default {
  name: 'LandingDelivery',
  components: {
    Chef,
    Delivery,
    Order,
    Share,
    Clock
  },
  data() {
    return {
      columns: [
        [
          {
            img: 'order',
            text: '1. Order fast and easily through our website'
          },
          {
            img: 'chef',
            text:
              '2. We prepare your order with maximum precisity as fast as possible.'
          },
          {
            img: 'delivery',
            text: '3. We deliver it to you faster than the light.'
          }
        ],
        [
          {
            img: 'clock',
            text:
              'Did you know? We have the fastest guys to make sure your food arrives hot!'
          },
          {
            img: 'share',
            text: '4. Share & enjoy your pizza.'
          }
        ]
      ]
    };
  }
};
</script>
<style scoped>
#landing-delivery {
  width: 100vw;
  min-height: 100vh;
  padding-top: clamp(4rem, 5%, 9rem);
  padding-left: clamp(0.5rem, 3%, 5rem);
  padding-right: clamp(0.5rem, 3%, 5rem);
  padding-bottom: clamp(15rem, 15%, 20rem);
}
.step {
  display: flex;
  flex-wrap: wrap;
  height: min(14rem, 40vh);
  width: 100%;
  justify-content: center;
  margin-bottom: 1rem;
}
.step-img {
  width: 40%;
  height: 100%;
}
.step-description {
  align-self: center;
  font-weight: bold;
  font-size: 25px;
  line-height: 25px;
  width: max(50%, 20rem);
  margin-left: 4rem;
}
</style>
