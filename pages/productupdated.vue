<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <sweet-alert class="sweet-alert"></sweet-alert>
    <div class="headline">Product Updated Successfully</div>
    <v-btn
      v-show="$vuetify.breakpoint.mdAndUp"
      color="primary"
      rounded
      class="congrats-btn"
      to="/inventory"
      >View your Inventory</v-btn
    >
    <v-btn
      v-show="$vuetify.breakpoint.smAndDown"
      color="primary"
      rounded
      class="congrats-btn"
      to="/catalogue"
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
