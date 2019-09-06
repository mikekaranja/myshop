<template>
  <v-banner single-line @click:icon="cancel">
    <v-icon slot="icon">
      clear
    </v-icon>
    <v-avatar size="30">
      <img src="https://emersetest.netlify.com/icon.jpg" alt="icon" />
    </v-avatar>
    Add E-merse as an app
    <template v-slot:actions>
      <v-btn color="primary" small @click="goto">
        install
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  methods: {
    goto() {
      this.$store.commit('addToHomeScreen', '')
      this.$router.push('/addtohomescreen')
    },
    cancel() {
      this.$store.commit('addToHomeScreen', '')
    }
  }
}
</script>

<style scoped>
.v-banner--single-line .v-banner__text {
  font-size: 12px;
  margin-left: 10px;
  font-weight: 700;
}
.v-banner--is-mobile.v-banner--single-line .v-banner__actions {
  margin-left: 10px;
}
</style>
