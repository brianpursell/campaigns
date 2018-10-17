import Vue from "vue";
import Vuex from "vuex";
import Admin from "./components/Admin.vue";
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";
import bulma from "bulma";

Vue.use(Vuex);

const NotFound = { template: "<p>Page not found</p>" };

const views = {
  login: Login,
  dashboard: Dashboard,
  admin: Admin
};

const store = new Vuex.Store({
  state: {
    img: require("./img/shrug.jpg"),
    currentView: views.login,
    user: {}
  },
  mutations: {
    setImage(state, payload) {
      state.img = require(`./img/${payload.img}`);
    },
    changeView(state, payload) {
      state.currentView = views[payload.view];
    },
    setUser(state, payload) {
      state.user = payload.user;
    }
  }
});

new Vue({
  el: "#app",
  store,
  render(h) {
    return h(store.state.currentView || NotFound);
  }
});
