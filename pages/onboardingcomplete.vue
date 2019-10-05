<template>
  <!-- Catelogue ready UI -->
  <div id="congrats-div" class="text-center">
    <sweet-alert class="sweet-alert"></sweet-alert>
    <div class="headline">
      Congrats! You have uploaded your first item. <br />
      <p role="image" aria-label="party">🥳</p>
    </div>
    <v-btn color="primary" rounded class="congrats-btn" @click="continueNext"
      >View your catalogue</v-btn
    >
  </div>
</template>

<script>
import SweetAlert from '~/components/SweetAlertAnimation'
export default {
  components: {
    SweetAlert
  },
  methods: {
    continueNext() {
      this.$store.commit('authUser', true)
      this.$store.commit('addToHomeScreen', 'newshop')
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.$router.push('/inventory')
      } else {
        this.$router.push('/catalogue')
      }
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
  margin-top: 90px;
}
.congrats-image {
  width: 100%;
}
.congrats-btn {
  text-transform: capitalize;
  margin-top: 40px;
  font-weight: 700;
}
</style>
