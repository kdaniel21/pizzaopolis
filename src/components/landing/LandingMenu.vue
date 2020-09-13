<template>
  <div id="landing-menu">
    <h2>Our Menu</h2>
    <div class="menu">
      <div class="menu-item" v-for="(food, index) in menu" :key="food.name">
        <div class="name">
          {{ index + 1 + '.' + food.name }}
          <div class="toppings">{{ stringifyToppings(food.toppings) }}</div>
        </div>
        <span class="price">{{ food.price.toFixed(2) }}€</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingMenu',
  data() {
    return {
      menu: [
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        },
        {
          name: 'Pizza One',
          price: 11.9,
          toppings: ['tomato sauce', 'cheese', 'tuna', 'onions']
        }
      ]
    };
  },
  methods: {
    stringifyToppings(toppings) {
      const stringifiedToppings = toppings.toString().replace(/,/g, ', ');
      return '(' + stringifiedToppings + ')';
    }
  }
};
</script>

<style scoped>
#landing-menu {
  width: 100%;
  height: 100%;
  padding: 5% 10%;
}
h2 {
  margin-bottom: 2rem;
}
.menu {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}
.menu-item {
  display: flex;
  flex-wrap: wrap;
  flex-grow: -1;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
@media only screen and (min-width: 1400px) {
  .menu-item:nth-child(5) {
    page-break-after: always;
  }
  .menu-item {
    width: 45%;
  }
}
.name {
  text-transform: capitalize;
  font-size: 25px;
  font-weight: bold;
}
.toppings {
  text-transform: capitalize;
  font-size: 22px;
  font-style: italic;
}
.price {
  font-size: 25px;
  font-weight: bold;
}
</style>
