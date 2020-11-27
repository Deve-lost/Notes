// Axios
import axios from 'axios'
window.axios = axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Toasted
import Toasted from 'vue-toasted';

Vue.use(Toasted)

try {
	window.Popper = require('popper.js').default;
	window.$ = window.jQuery = require('jquery');

	require('bootstrap');
} catch (e) {}

// Vue
import Vue from 'vue'

// Vue Router
import VueRouter from 'vue-router'

// Routes
import routes from './router'

// Use
Vue.use(VueRouter)

// Vue Component
Vue.component('navigation', require('./components/Navigation.vue').default);


const app = new Vue({
	el: '#parsinta',
	router: new VueRouter(routes),
});
