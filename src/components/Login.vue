<template>
  <div class="container is-widescreen">
    <div class="hero is-light is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-two-thirds-tablet is-offset-2-tablet is-half-desktop is-offset-one-quarter-desktop">
              <h5 class="subtitle">Login</h5>
              <div class="field">
                <div class="control">
                  <input class="input is-info" type="text" placeholder="Username" v-model.lazy="username">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-info" type="password" placeholder="Password" v-model.lazy="password" @keyup.enter="submitForm">
                </div>
              </div>
              <a class="button is-info is-pulled-right" @click="submitForm">Go</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submitForm: function() {
      axios.post(`/login?username=${this.username}&password=${this.password}`)
        .catch((err) => {
          console.log('fail');
        })
        .then((res) => {
          const { user } = res.data;
          let view = "dashboard";
          console.log(res.data)

          if (user.hasOwnProperty("role") && user.role === "admin") {
            view = "admin";
          }

          this.$store.commit({
            type: 'changeView',
            view: view
          });

          this.$store.commit({
            type: 'setUser',
            user: res.data.user
          });

          if (res.data.img) {
            this.$store.commit({
              type: 'setImage',
              img: res.data.img
            });
          }
        })
    }
  }
}
</script>