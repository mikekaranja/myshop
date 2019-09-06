<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <sweet-alert class="sweet-alert"></sweet-alert>
    <div class="display-1">Payment Successful.</div>
    <div class="subtitle-1">Thank you for your Payment.</div>
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
    setTimeout(() => {
      // change name in store
      this.$store.commit('changeExpiryDate', this.addDays(30).toString())
      window.location.href = 'https://emersetest.netlify.com/inventory'
    }, 6000)
  },

  methods: {
    addDays(days) {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date
    },
    refresh() {
      window.location.href = 'https://emersetest.netlify.com/inventory'
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
