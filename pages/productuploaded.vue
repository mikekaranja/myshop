<template>
  <div id="congrats-div" class="text-center">
    <sweet-alert class="sweet-alert"></sweet-alert>
    <div class="headline">Product Uploaded Successfully</div>
    <div style="display: inline-grid;">
      <v-btn
        v-show="$vuetify.breakpoint.mdAndUp"
        color="primary"
        rounded
        class="congrats-btn"
        @click="openCatalogue"
        >View your catalogue</v-btn
      >
      <v-btn
        v-show="$vuetify.breakpoint.smAndDown"
        color="primary"
        rounded
        class="congrats-btn"
        to="/catalogue"
        >View your catalogue</v-btn
      >
      <v-btn
        color="primary"
        outlined
        rounded
        class="congrats-btn"
        to="/createproduct"
        >Upload another product</v-btn
      >
    </div>
  </div>
</template>

<script>
import SweetAlert from '~/components/SweetAlertAnimation'
export default {
  components: {
    SweetAlert
  },
  methods: {
    openCatalogue() {
      window.open(
        `https://shop.e-merse.com/?${this.$store.state.user.shopid}`,
        '_blank'
      )
    }
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
