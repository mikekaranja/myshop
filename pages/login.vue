<template>
  <div class="text-center">
    <img
      class="top-logo"
      src="https://myshop.e-merse.com/icon.jpg"
      alt=""
    />
    <p>We're <span style="font-weight:500;">pumped</span> to see you!</p>
    <firebase-ui></firebase-ui>
  </div>
</template>

<script>
import firebaseUi from '~/components/firebaseUi'
export default {
  components: {
    firebaseUi
  },
  created() {
    setTimeout(() => {
      if (this.$store.state.authenticated === true) {
        this.$router.push('/inventory')
      }
    }, 50)
  }
}
</script>

<style>
.top-logo {
  width: 40%;
  margin-top: 80px;
}
</style>
