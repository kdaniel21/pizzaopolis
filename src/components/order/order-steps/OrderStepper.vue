<template>
  <div id="order-stepper">
    <!-- ASK WHETHER USER WANTS TO RECOVER ORDER -->
    <recover-order-dialog />
    <!-- STEPPER -->
    <v-stepper v-model="currentStep">
      <!-- HEADER -->
      <v-stepper-header>
        <template v-for="(step, index) in steps">
          <v-stepper-step
            :key="step.label"
            :step="index + 1"
            :editable="isStepCompleted(index)"
            :complete="isStepCompleted(index)"
          >
            {{ step.label }}
          </v-stepper-step>
          <v-divider v-if="index < steps.length - 1" :key="index"></v-divider>
        </template>
      </v-stepper-header>

      <!-- CONTENT -->
      <v-stepper-items>
        <v-stepper-content
          v-for="(step, index) in steps"
          :key="step.label"
          :step="index + 1"
          editable
          :complete="isStepCompleted(index + 1)"
        >
          <component
            :is="step.component"
            v-on:next-step="currentStep++"
          ></component>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import RecoverOrderDialog from '../RecoverOrderDialog';
import OrderStepSelectFood from './OrderStepSelectFood';
import OrderStepCoupon from './OrderStepCoupon';
import OrderStepPersonalData from './OrderStepPersonalData';
import OrderStepSummary from './OrderStepSummary';

export default {
  name: 'OrderStepper',
  components: { RecoverOrderDialog },
  data() {
    return {
      currentStep: null,
      steps: [
        {
          label: 'Select Foods',
          route: 'menu',
          component: OrderStepSelectFood
        },
        { label: 'Redeem Coupon', route: 'coupon', component: OrderStepCoupon },
        {
          label: 'Add Shipping Address',
          route: 'shipping',
          component: OrderStepPersonalData
        },
        {
          label: 'Finish Your Payment',
          route: 'summary',
          component: OrderStepSummary
        }
      ]
    };
  },
  computed: {
    routeStep() {
      if (!this.$route.params.step) return 1;

      return (
        this.steps.findIndex(step => step.route === this.$route.params.step) + 1
      );
    }
  },
  watch: {
    routeStep(stepNumber) {
      this.currentStep = stepNumber;
    },
    currentStep(stepNumber) {
      if (this.routeStep !== stepNumber) {
        this.navigateToStep(stepNumber);
      }
    }
  },
  methods: {
    navigateToStep(stepNumber) {
      const route = this.steps[stepNumber - 1].route;
      this.$router.push({ path: `/order/${route}` });
    },
    isStepCompleted(stepNumber) {
      return this.currentStep > stepNumber;
    }
  },
  created() {
    this.currentStep = this.routeStep;
  }
};
</script>
