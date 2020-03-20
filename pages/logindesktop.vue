<template>
  <div>
    <div v-show="$vuetify.breakpoint.mdAndUp" class="text-center">
      <v-container style="padding: 0px;">
        <v-row :class="mb - 6" no-gutters style="min-height: 100vh;">
          <v-col class="first-column-lo">
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
          <v-col class="second-column-lo">
            <div class="text-center" style="padding:5px;">
              <a href="https://e-merse.com" target="_blank">
                <img
                  class="desktop-logo-lo"
                  src="https://myshop.e-merse.com/icon.jpg"
                  alt=""
                />
              </a>
              <div
                style="margin-bottom: 20px;"
                class="subtitle-1 font-weight-bold"
              >
                {{ sign }}
              </div>
              <firebase-ui></firebase-ui>
              <div
                v-if="signin"
                class="caption font-weight-bold"
                style="color:gray; margin-top: 20px;"
              >
                Don't have an account?
                <span class="free-trial" @click="changeTitle('signup')"
                  >Sign up</span
                >
              </div>
              <div v-else class="caption font-weight-bold" style="color:gray">
                Already have an account?
                <span class="free-trial" @click="changeTitle('signin')"
                  >Login here</span
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
export default {
  components: {
    firebaseUi
  },
  data() {
    return {
      sign: 'Login to your account',
      mobile: '',
      desktop: '',
      signin: true,
      headline: 'Welcome Back!',
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
        this.sign = 'Login to your account'
        this.signin = true
        this.headline = 'Welcome Back!'
        this.subtitle =
          'Keep updating your stock and sharing your products with customers'
      } else if (title === 'signup') {
        if (this.$vuetify.breakpoint.smAndDown) {
          this.$router.push('/mobilesignup')
        } else {
          this.$router.push('/desktopsignup')
        }
      }
    }
  }
}
</script>

<style>
.desktop-logo-lo {
  width: 30%;
  margin-top: 70px;
}
.first-column-lo {
  background: #bc6537 !important;
}
.second-column-lo {
  background: #ffffff !important;
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
