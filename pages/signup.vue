<template>
  <div>
    <div
      v-show="$vuetify.breakpoint.smAndDown"
      class="text-center"
      style="padding:5px;"
    >
      <img class="top-logo" src="https://myshop.e-merse.com/icon.jpg" alt="" />
      <!-- <p>We're <span style="font-weight:500;">pumped</span> to see you!</p> -->
      <div class="title bold">Your online presence begins today</div>
      <p style="margin-top: 15px;">
        Start your 24hr trial by creating an account
      </p>
      <mobilefirebase-ui style="display:none;"></mobilefirebase-ui>
    </div>
    <div v-show="$vuetify.breakpoint.mdAndUp" class="text-center">
      <v-container style="padding: 0px;">
        <v-row :class="mb - 6" no-gutters style="min-height: 100vh;">
          <v-col class="first-column">
            <div id="wording" class="text-center">
              <div
                style="font-family: 'Open Sans', sans-serif !important;color:white;"
                class="display-1 font-weight-bold"
              >
                {{ headline }}
              </div>
              <div
                class="subtitle-1 font-weight-light"
                style="margin-top: 20px;color:white;"
              >
                {{ subtitle }}
              </div>
            </div>
          </v-col>
          <v-col class="second-column">
            <div class="text-center" style="padding:5px;">
              <img
                class="desktop-logo"
                src="https://myshop.e-merse.com/icon.jpg"
                alt=""
              />
              <div class="subtitle-1 font-weight-bold">
                Sign into your account
              </div>
              <firebase-ui></firebase-ui>
              <div
                v-if="signin"
                class="caption font-weight-bold"
                style="color:gray"
              >
                Don't have an account?
                <span class="free-trial" @click="changeTitle('signup')"
                  >Start a free trial</span
                >
              </div>
              <div v-else class="caption font-weight-bold" style="color:gray">
                Already have an account?
                <span class="free-trial" @click="changeTitle('signin')"
                  >Login</span
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import firebaseUi from '~/components/FirebaseUi'
// import mobilefirebaseUi from '~/components/MobileFirebaseUi'
export default {
  components: {
    firebaseUi
  },
  data() {
    return {
      mobile: '',
      desktop: '',
      signin: false,
      headline: 'Get more sales by showcasing your products online',
      subtitle:
        'Keep updating your stock and sharing your products with customers'
    }
  },
  created() {
    if (this.$vuetify.breakpoint.smAndDown) {
      this.mobile = 'block'
      this.desktop = 'none'
    } else {
      this.mobile = 'none'
      this.desktop = 'block'
    }
    setTimeout(() => {
      if (this.$store.state.authenticated === true) {
        this.$router.push('/inventory')
      }
    }, 50)
  },
  methods: {
    changeTitle(title) {
      if (title === 'signin') {
        this.signin = true
        this.headline = 'Welcome Back!'
        this.subtitle =
          'Keep updating your stock and sharing your products with customers'
      } else if (title === 'signup') {
        this.signin = false
        this.headline = 'Get more sales by showcasing your products online'
        this.subtitle = 'Start your 24 hr free trial by creating an account'
      }
    }
  }
}
</script>

<style>
.desktop-logo {
  width: 30%;
  margin-top: 10px;
}
.first-column {
  background: #5f3a41;
}
#wording {
  position: relative;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.free-trial {
  color: #ff9800;
  cursor: pointer;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .top-logo {
    width: 40%;
    margin-top: 80px;
  }
}
</style>
