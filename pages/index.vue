<template>
  <v-layout class="layout" wrap justify-center align-center>
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
      <v-container>
        <v-row :class="mb - 6" no-gutters>
          <v-col class="first-column">
            <div class="text-column">
              <img width="100" src="icon.png" alt="icon" />
              <div class="display-2">
                Download E-merse from <br />
                your mobile phone
              </div>
              <div class="buttons">
                <v-btn
                  class="btn-1"
                  rounded
                  :outlined="!iphone"
                  color="primary"
                  dark
                  @click="btnClick(1)"
                  >iOS</v-btn
                >
                <v-btn
                  class="btn-2"
                  rounded
                  :outlined="iphone"
                  color="primary"
                  dark
                  @click="btnClick(2)"
                  >Android</v-btn
                >
              </div>
            </div>
          </v-col>
          <v-col class="second-column">
            <img width="290" :src="image" alt="phone" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      desktop: false,
      image: 'iphone.png',
      iphone: true
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
  },
  methods: {
    btnClick(num) {
      if (num === 1) {
        this.image = 'iphone.png'
        this.iphone = true
      } else {
        this.image = 'android.png'
        this.iphone = false
      }
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
.layout {
  margin: -12px;
}
.container {
  padding: 0px;
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
  margin-top: 150px;
  text-align: left;
  padding-left: 50px;
}
.buttons {
  margin-top: 30px;
}
.display-2 {
  font-weight: 200;
}
.second-column {
  padding-bottom: 160px;
  background: #ebebeb;
}
</style>
