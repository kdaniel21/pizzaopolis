<template>
  <div id="landing-layout">
    <landing-header />
    <div class="snapping-container">
      <section>
        <landing-welcome />
      </section>
      <section id="delivery">
        <landing-delivery />
      </section>
      <section id="menu">
        <landing-menu />
      </section>
      <section id="location">
        <landing-location />
      </section>
    </div>
  </div>
</template>

<script>
import LandingHeader from '../components/landing/LandingHeader';
import LandingWelcome from '../components/landing/LandingWelcome';
import LandingDelivery from '../components/landing/LandingDelivery';
import LandingMenu from '../components/landing/LandingMenu';
import LandingLocation from '../components/landing/LandingLocation';

export default {
  name: 'LandingLayout',
  components: {
    LandingHeader,
    LandingWelcome,
    LandingDelivery,
    LandingMenu,
    LandingLocation
  }
};
</script>

<style>
#landing-layout {
  color: #011627;
  font-family: 'Nunito Sans';
  height: 100vh;
  width: 100vw;
}
.snapping-container {
  width: 100%;
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  overflow-x: hidden;
}
section {
  min-height: 100%;
  width: 100%;
  scroll-snap-align: start;
}

/* GLOBAL */
.btn-primary {
  background-color: #f4bb3a;
  border-radius: 15px;
}
span.orange {
  color: #f4bb3a;
}
.columns {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.column {
  display: flex;
  flex-direction: column;
  width: max(40rem, 40%);
}
h2 {
  text-align: center;
  font-family: 'Arima Madurai';
  font-weight: bold;
  font-size: min(45px, 5vh);
}
</style>
