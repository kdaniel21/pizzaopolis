import axios from 'axios';
import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

export default function setup() {
  axios.interceptors.request.use(config => {
    config.baseURL = process.env.VUE_APP_API_URL;
    if (config.url.startsWith('/')) {
      // Only add withCredentials: true for the requests that go to our own API
      // Else it sends the Laravel XSRF token to 3rd party APIs that are called
      config.withCredentials = true;
    }

    return config;
  });

  axios.defaults.transformResponse = [
    (data, headers) => {
      if (data && headers['content-type'].includes('application/json')) {
        return camelCaseKeys(JSON.parse(data), { deep: true });
      }
    }
  ];

  axios.defaults.transformRequest = [
    (data, headers) => {
      headers['content-type'] = 'application/json';
      if (data && headers['content-type'].includes('application/json')) {
        return JSON.stringify(snakeCaseKeys(data, { deep: true }));
      }
    }
  ];
}
