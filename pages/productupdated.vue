<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <v-btn
      style="float: right;"
      class="ma-2"
      text
      icon
      color="red"
      to="/inventory"
    >
      <v-icon large>mdi-close</v-icon>
    </v-btn>
    <sweet-alert style="margin-top:80px;" class="sweet-alert"></sweet-alert>
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
      >Preview Shop</v-btn
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
