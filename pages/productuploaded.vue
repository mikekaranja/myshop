<template>
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
    <div class="headline">Product Uploaded Successfully</div>
    <div style="display: inline-grid;">
      <v-btn
        v-show="$vuetify.breakpoint.mdAndUp"
        color="primary"
        rounded
        class="congrats-btn"
        @click="openCatalogue"
        >Preview Shop</v-btn
      >
      <v-btn
        v-show="$vuetify.breakpoint.smAndDown"
        color="primary"
        rounded
        class="congrats-btn"
        to="/catalogue"
        >Preview Shop</v-btn
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
