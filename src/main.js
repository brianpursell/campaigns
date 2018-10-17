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
    user: {},
    campaigns: []
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
    },
    updateCampaigns(state, payload) {
      state.campaigns = payload.campaigns;
    },
    changePriority(state, payload) {
      const { _id, val, campaign_priority } = payload;
      const campaigns = state.campaigns.slice();

      state.campaigns = campaigns
        .map(c => {
          if (c._id === _id) {
            c.campaign_priority += val;
          } else if (c.campaign_priority === campaign_priority + val) {
            c.campaign_priority -= val;
          }

          return c;
        })
        .sort((a, b) => {
          return a.campaign_priority > b.campaign_priority;
        });
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
