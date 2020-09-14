import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// import colors from 'vuetify/lib/util/colors';

// Place autocomplete
Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#F4BB3A',
        secondary: '#98b344'
      }
    }
  }
});
