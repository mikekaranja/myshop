<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <sweet-alert class="sweet-alert"></sweet-alert>
    <div class="display-1">Subscription cancelled Successfully.</div>
    <div class="subtitle-1">We are sad to see you leave.</div>
    <v-btn
      style="text-transform:none;"
      color="primary"
      rounded
      block
      class="congrats-btn"
      @click="refresh"
      >Continue</v-btn
    >
  </div>
</template>

<script>
import SweetAlert from '~/components/SweetAlertAnimation'
export default {
  components: {
    SweetAlert
  },

  mounted() {
    // ga analytics
    this.$ga.event({
      eventCategory: 'cancel button',
      eventAction: 'Subscription cancelled click',
      eventLabel: this.$store.state.user.shopname,
      eventValue: 26
    })
    setTimeout(() => {
      window.location.href = 'https://myshop.e-merse.com/inventory'
    }, 5000)
  },

  methods: {
    refresh() {
      window.location.href = 'https://myshop.e-merse.com/inventory'
    }
  }
}
</script>

<style scoped>
.sweet-alert {
  margin: auto;
}
#congrats-div {
  margin-top: 20px;
  padding: 25px;
  text-align: center;
}
.congrats-image {
  width: 100%;
}
.congrats-btn {
  text-transform: capitalize;
  margin-top: 40px;
}
</style>
