<template>
  <v-layout wrap justify-center align-center>
    <div v-show="!desktop" class="text-center">
      <v-progress-circular
        class="spinner"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-show="desktop" class="text-center">
      <img style="margin-top:50px;" width="250" src="icon.jpg" alt="icon" />
      <div class="display-2">
        This website is only available on mobile for now. <br />
        Please sign in to the mobile version to use E-merse. <br />
        Thank you and apologies for the inconvenience.
      </div>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      desktop: false
    }
  },
  created() {
    setTimeout(() => {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.desktop = true
      } else if (this.$vuetify.breakpoint.smAndDown) {
        if (this.$store.state.authenticated) {
          this.$router.push('/inventory')
        } else {
          this.$router.push('/login')
        }
      }
    }, 80)
  }
}
</script>

<style scoped>
.text-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 75vh;
}
</style>
