<template>
  <div id="welcome">
    <div class="overlay">
      <h1>Pizzaopolis</h1>
      <h2>
        The pizza from <span class="orange">artisans</span> directly to your
        table.
      </h2>
      <button class="btn-primary">Order Now</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
};
</script>

<style scoped>
#welcome {
  height: 100vh;
  background: url('~@/assets/images/background.jpg') no-repeat center center
    fixed;
  background-size: cover;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  padding-top: clamp(3rem, 20vh, 16rem);
  padding-left: clamp(0.5rem, 9%, 12rem);
}
h1 {
  font-size: min(15.5vw, 90px);
  color: #f4bb3a;
  font-family: 'Merienda One';
}
h2 {
  font-size: min(12vw, 40px);
  color: #98b344;
  font-family: 'Arima Madurai';
  text-align: left;
}
.btn-primary {
  width: min(70vw, 15rem);
  height: min(8vh, 6rem);
  font-size: min(1.4rem);
  margin: auto;
  display: block;
  margin-top: 4%;
}
</style>
