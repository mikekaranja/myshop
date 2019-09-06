<template>
  <v-layout style="margin-top:30px;" column justify-center align-center>
    <v-btn class="cancel-btn" text icon @click="backBtn">
      <v-icon>clear</v-icon>
    </v-btn>
    <div id="title" class="subtitle-1">How to add E-merse as an app</div>
    <img
      v-show="image === 'android.png'"
      class="img-sys"
      :src="image"
      alt="image"
    />
    <img
      v-show="image === 'ios.png'"
      class="img-sys-ios"
      :src="image"
      alt="image"
    />
    <div class="fixed-btm">
      <v-btn
        style="width: 58%;margin-top:10px;font-weight:700;text-transform:none;"
        color="primary"
        rounded
        depressed
        @click="done"
        >Got it</v-btn
      >
      <v-btn
        color="primary"
        text
        block
        rounded
        style="margin-top:5px;text-transform:none;font-weight:700;"
        @click="done"
      >
        Don't show this again</v-btn
      >
    </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      androidcolor: 'primary',
      ioscolor: '',
      text: '',
      image: ''
    }
  },
  mounted() {
    const md = new window.MobileDetect(window.navigator.userAgent)
    if (md.os() === 'AndroidOS') {
      this.image = 'android.png'
    } else {
      this.image = 'ios.png'
    }
  },
  methods: {
    backBtn() {
      this.$router.push('/inventory')
    },
    done() {
      this.$router.push('/inventory')
    }
  }
}
</script>

<style>
#title {
  margin-bottom: 30px;
}
.cancel-btn {
  position: absolute;
  top: 0;
  right: 5px;
  margin: 5px;
}
.sys-btn {
  text-transform: none;
  font-weight: 700;
}
.done-btn {
  text-transform: none;
  font-weight: 700;
  color: white;
  width: 100%;
  margin: 17px;
  font-size: large;
  text-align: center;
}
.img-sys {
  width: 15%;
  margin-top: 15px;
}
.fixed-btm {
  background: white;
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: block;
  justify-content: center;
  padding: 10px;
  text-align: center;
}
@media only screen and (max-width: 768px) {
  .done-btn {
    text-transform: none;
    font-weight: 700;
  }
  .img-sys {
    width: 65%;
    margin-top: 5px;
  }
  .img-sys-ios {
    width: 57%;
    margin-top: 5px;
  }
}
</style>
