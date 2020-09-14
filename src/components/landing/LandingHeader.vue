<template>
  <nav id="header" :class="{ 'dark-bg': darkNav }">
    <div class="navbar-brand">
      <pizza-logo />
    </div>
    <ul class="navbar-items">
      <a :href="'#' + item" v-for="item in navItems" :key="item">
        <li class="navbar-item">
          {{ item }}
        </li>
      </a>
      <button class="navbar-btn btn-primary">Order Online</button>
    </ul>
  </nav>
</template>

<script>
import PizzaLogo from '@/assets/images/logo.svg';

export default {
  name: 'Header',
  components: {
    PizzaLogo
  },
  data() {
    return {
      navItems: ['delivery', 'menu', 'location'],
      scrollPosition: null,
      screenHeight: window.innerHeight
    };
  },
  methods: {
    // Manually getting the scroll and screen height
    updateScroll() {
      this.scrollPosition = document.querySelector(
        '.snapping-container'
      ).scrollTop;
    },
    updateHeight() {
      this.screenHeight = window.innerHeight;
    }
  },
  computed: {
    darkNav() {
      return this.scrollPosition >= this.screenHeight;
    }
  },
  mounted() {
    // Listening to scroll and resize (to determine navbar color)
    document
      .querySelector('.snapping-container')
      .addEventListener('scroll', this.updateScroll);
    window.addEventListener('resize', this.updateHeight);
  }
};
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  font-family: 'Nunito Sans';
  font-size: clamp(15px, 19px, 4rem);
  text-transform: capitalize;
}
.dark-bg {
  background-color: rgba(0, 0, 0, 0.5);
}
.navbar-brand {
  width: 50px;
  margin-left: 1.5rem;
}
.navbar-items {
  margin-left: auto;
  list-style-type: none;
  padding: 0;
  display: flex;
  align-items: center;
}
a,
a:hover,
a:focus,
a:active {
  text-decoration: none;
  color: inherit;
}
.navbar-item {
  color: #ffffff;
}
.navbar-item,
.navbar-btn {
  margin-right: 2rem;
}
.btn-primary {
  width: min(9.7rem, 15vw);
  height: min(2.8rem, 10vh);
}
</style>
