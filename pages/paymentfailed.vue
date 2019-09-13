<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <error-alert class="error-alert"></error-alert>
    <div class="display-1">Payment Failed.</div>
    <div class="subtitle-1">Uh-oh! We were unable to process your payment.</div>
    <v-btn
      style="text-transform:none;"
      color="primary"
      rounded
      block
      class="congrats-btn"
      @click="refresh"
      >Try Again</v-btn
    >
  </div>
</template>

<script>
import ErrorAlert from '~/components/ErrorAlertAnimation'
export default {
  components: {
    ErrorAlert
  },

  mounted() {
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
.error-alert {
  margin: auto;
}
#congrats-div {
  padding: 25px;
  text-align: center;
  margin-top: 20px;
}
.congrats-image {
  width: 100%;
}
.congrats-btn {
  text-transform: capitalize;
  margin-top: 40px;
}
</style>
