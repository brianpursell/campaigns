<template>
  <div class="notification level">
    <div class="level-left">
      <div class="level-item has-text-dark">{{campaign.campaign_priority}}</div>
    </div>
    <div class="level-item has-text-dark" v-if="campaign.geo">Geo: {{campaign.geo}}</div>
    <div class="level-item has-text-dark" v-if="campaign.industry">Industry: {{campaign.industry}}</div>
    <div class="level-item has-text-dark" v-if="campaign.company_size">Company size: {{campaign.company_size && campaign.company_size.min + 
      (campaign.company_size.min === 1000 ? '+' : '-' + campaign.company_size.max)}}
    </div>
    <div class="level-right">
      <p class="level-item buttons">
        <a class="button" 
          :disabled="campaign.campaign_priority === 1" 
          @click="campaign.campaign_priority > 1 ? changePriority(campaign._id, -1, campaign.campaign_priority) : null"
        >
          <span class="icon is-small">
            <i class="fas fa-arrow-up"></i>
          </span>
        </a>
        <a class="button" 
          :disabled="campaign.campaign_priority === end" 
          @click="campaign.campaign_priority < end ? changePriority(campaign._id, 1, campaign.campaign_priority) : null"
        >
          <span class="icon is-small">
            <i class="fas fa-arrow-down"></i>
          </span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "campaign",
  props: ["campaign", "end"],
  computed: {
    ...mapState({
      campaigns: state => state.campaigns
    }),
  },
  methods: {
    changePriority: function(_id, val, campaign_priority) {
      this.$store.commit({
        type: 'changePriority',
        _id,
        val,
        campaign_priority
      });
    },
  }
}
</script>