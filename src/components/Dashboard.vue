<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" @click="handleClick">
              Logout
            </a>
          </div>
        </div>
      </nav>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <img :src="img" />
        <ul class="content" style="text-transform:capitalize;">
          <li style="text-transform:none;">Username: {{user.username}}</li>
          <li>geo: {{user.geo}}</li>
          <li>industry: {{user.industry}}</li>
          <li>company size: {{user.company_size.min + 
            (user.company_size.min === 1000 ? '+' : '-' + user.company_size.max)}}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Navbar from "./Navbar";
import { mapState } from 'vuex'
import axios from "axios";

export default {
  name: "dashboard",
  components: {
    Navbar
  },
  computed: {
    ...mapState({
      img: state => state.img,
      user: state => state.user
    }),
  },
  methods: {
    handleClick: function() {
      axios.post("/logout")
        .catch((err) => {
          console.log('fail');
        })
        .then((res) => {
          this.$store.commit({
            type: 'changeView',
            view: 'login'
          });
        });
    }
  }
}
</script>