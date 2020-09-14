<template>
  <div id="landing-location">
    <h2>Location</h2>
    <div class="columns">
      <div class="mapouter">
        <div class="gmap_canvas">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=15&ie=UTF8&iwloc=&output=embed"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
      <div class="location-name">
        <h3 class="shop-name">Pizzaopolis New York</h3>
        <div class="address">
          <p>New York, NY</p>
          <p>68th Street 97/C.</p>
        </div>
        <div class="opening-time">
          <p>Open Everyday</p>
          <p>10-22h</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingLocation'
};
</script>

<style scoped>
#landing-location {
  padding: 6% 3%;
}
.columns {
  justify-content: center;
}
.mapouter {
  position: relative;
  text-align: right;
  height: 60vh;
  width: 60%;
  margin-right: 1.5rem;
}
.gmap_canvas {
  overflow: hidden;
  background: none !important;
  height: 100%;
  width: 100%;
}
.shop-name {
  font-family: 'Merienda One';
  font-size: 35px;
}
.location-name {
  font-size: 30px;
  font-family: 'Arima Madurai';
  font-weight: bold;
}
.address {
  margin-top: 1.5rem;
}
.opening-time {
  margin-top: 3rem;
}
</style>
