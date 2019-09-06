<template>
  <div class="text-center">
    <div :style="{ marginTop: top }" class="second-row">
      <iframe ref="iframe" class="iframed" :src="src"></iframe>
    </div>
    <!-- show loading overlay -->
    <v-overlay :value="overlay" light>
      <v-progress-circular
        :size="50"
        :width="7"
        indeterminate
        color="white"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      overlay: false,
      top: ''
    }
  },

  computed: {
    src() {
      return `https://shop.e-merse.com/?${this.$store.state.user.shopid}`
    }
  },

  mounted() {
    this.overlay = true
    setTimeout(() => {
      this.overlay = false
    }, 4400)
    const expirydate = new Date(this.$store.state.user.expiry_date)
    const signupdate = new Date(this.$store.state.user.sign_up_date)
    const today = new Date()
    this.setPaymentMessage(today, expirydate, signupdate)
  },

  methods: {
    setPaymentMessage(today, expirydate, signupdate) {
      const hours = this.date_signup_diff_hours(signupdate, today)
      // Before 24 hours
      if (hours <= 24 && expirydate > today) {
        // before 24 hours
        this.top = '43px'
      } else if (hours > 24 && expirydate < today) {
        // after 24 hours
        this.top = '43px'
      }
    },
    date_signup_diff_hours(dt2, dt1) {
      let diff = (dt2.getTime() - dt1.getTime()) / 1000
      diff /= 60 * 60
      return Math.abs(Math.round(diff))
    }
  }
}
</script>

<style scoped>
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.second-row {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 56px;
  background-color: white;
}
.second-row iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}

.container {
  padding: 0px !important;
}
.open-dialog {
  text-decoration-color: white;
  text-decoration-line: underline;
  cursor: pointer;
}
.navbar-alert {
  width: 100%;
  text-align: center;
  padding: 12px;
  background: #92302f;
  border-radius: 4px;
  color: white;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 10;
}
/* width */
.iframed::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.iframed::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.iframed::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

/* Handle on hover */
.iframed::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.iframed {
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}
.fixed-btm {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
  height: 56px;
}
</style>
