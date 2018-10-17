<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-head">
      <nav class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item" @click="logout">
              Logout
            </a>
          </div>
        </div>
      </nav>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns">
          <div class="column is-two-thirds-tablet is-offset-2-tablet is-half-desktop is-offset-one-quarter-desktop">
            <h1 class="title is-4">Campaigns</h1>
            <Campaign v-for="campaign in campaigns" :key="campaign._id" :campaign="campaign" :end="campaigns.length" />
            <a class="button is-pulled-right" @click="savePriority">Save</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert2';
import Campaign from "./Campaign";
import { mapState, mapActions } from 'vuex';

export default {
  name: "admin",
  components: {
    Campaign
  },
  computed: {
    ...mapState({
      campaigns: state => state.campaigns
    }),
  },
  methods: {
    logout: function() {
      axios.post("/logout")
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          this.$store.commit({
            type: 'changeView',
            view: 'login'
          });
        });
    },
    savePriority: function() {
      const { campaigns } = this.$store.state;

      axios.post("/update_campaigns", {
        campaigns: campaigns
      })
        .catch((err) => {
          swal({
            title: "Something went wrong.",
            type: "warning",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .then((res) => {
          swal({
            title: "Saved!",
            type: "success",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }
}
</script>