<template>
  <v-card id="dashboard-login" width="500" class="mx-auto fill-height">
    <v-card-title>Login</v-card-title>

    <v-form @submit.prevent="login">
      <v-card-text>
        <v-text-field label="Email" v-model="formData.email"></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="formData.password"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" block class="d-block" type="submit">Login</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'DashboardLogin',
  data() {
    return {
      formData: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions('dashboard', ['getUser']),
    login() {
      axios
        .get('/csrf-cookie')
        .then(() => axios.post('/login', this.formData))
        .then(() => this.getUser())
        .then(() => this.$router.push({ name: 'incoming' }));
    }
  }
};
</script>
