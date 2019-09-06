<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <sweet-alert class="sweet-alert"></sweet-alert>
    <div class="headline">Product Deleted Successfully</div>
    <v-btn color="primary" rounded block class="congrats-btn" to="/inventory"
      >View your catalogue</v-btn
    >
  </div>
</template>

<script>
import SweetAlert from '~/components/SweetAlertAnimation'
export default {
  components: {
    SweetAlert
  }
}
</script>

<style scoped>
.sweet-alert {
  margin: auto;
}
#congrats-div {
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
