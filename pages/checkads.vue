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
  data() {
    return {
      ads: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const shopid = this.$store.state.user.shopid
      const data = await this.$axios.$get(
        `https://e-merse.firebaseio.com/pwa/ads/${shopid}.json`
      )
      // const orderbydatearray = Object.values(data).sort((a, b) => {
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.date_created) - new Date(a.date_created)
      // })
      if (data) {
        this.$router.push('/addashboard')
      } else {
        this.$router.push('/adempty')
      }
      // this.ads = Object.values(data)
      // if (Object.values(data).length > 0) {
      //   console.log('kuna', Object.values(data))
      //   this.$router.push('/addashboard')
      // } else {
      //   console.log(Object.values(data))
      //   this.$router.push('/adempty')
      // }
      return Object.values(data)
      // this.ads = orderbydatearray
      // return orderbydatearray
    }
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
