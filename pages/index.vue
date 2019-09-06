<template>
  <v-layout wrap justify-center align-center>
    <div class="text-center">
      <v-progress-circular
        class="spinner"
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-layout>
</template>

<script>
export default {
  created() {
    setTimeout(() => {
      if (this.$store.state.authenticated) {
        this.$router.push('/inventory')
      } else {
        this.$router.push('/login')
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
