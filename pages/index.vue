<template>
  <v-layout class="layout" wrap justify-center align-center>
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
      const query = this.$router.history.current.query
      if (this.$store.state.authenticated) {
        this.$router.push('/inventory')
      } else if (!this.$store.state.authenticated) {
        if (Object.keys(query)[0] === 'login') {
          this.$router.push('/login')
        } else {
          this.$router.push('/login')
        }
      }
    }, 100)
  }
}
</script>

<style scoped>
.btn-1 {
  width: 200px;
  text-transform: none;
}
.btn-2 {
  width: 200px;
  margin-left: 20px;
  text-transform: none;
}
.container {
  padding: 0px;
  max-width: 2000px;
}
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
.text-column {
  margin-top: 140px;
  text-align: left;
  padding-left: 70px;
}
.buttons {
  margin-top: 30px;
}
.display-2 {
  font-weight: 200;
}
.second-column {
  padding-bottom: 50px;
  background: #ebebeb;
}
</style>
