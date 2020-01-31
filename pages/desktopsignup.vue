<template>
  <div>
    <div v-show="$vuetify.breakpoint.mdAndUp" class="text-center">
      <v-container style="padding: 0px;">
        <v-row :class="mb - 6" no-gutters style="min-height: 100vh;">
          <v-col class="first-column" cols="5">
            <div v-show="!verify" id="wording" class="text-center">
              <img
                class="desktop-logo"
                src="https://myshop.e-merse.com/icon.jpg"
                alt=""
              />
              <v-form
                id="form-inputs"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="shop"
                  :rules="shopRules"
                  label="Shop Name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="website"
                  :rules="websiteRules"
                  label="Preferred Website Name"
                  hint="e.g www.example.co.ke"
                  persistent-hint
                  required
                ></v-text-field>

                <v-text-field
                  v-model="number"
                  :rules="numberRules"
                  label="WhatsApp Number"
                  required
                ></v-text-field>

                <v-btn
                  style="color: white;font-size: x-large;height: 75px;"
                  :disabled="!valid"
                  color="#B13D00"
                  class="mr-4"
                  block
                  x-large
                  @click="validate"
                >
                  Start free trial
                </v-btn>
                <div
                  id="already-account"
                  class="body-2 font-weight-bold"
                  style="color:gray"
                >
                  Already have an account?
                  <span class="free-trial" @click="login">Login here</span>
                </div>
              </v-form>
            </div>
            <div v-show="verify" id="wordings" class="text-center">
              <img
                class="desktop-logo"
                src="https://myshop.e-merse.com/icon.jpg"
                alt=""
              />
              <firebase-ui v-show="verify"></firebase-ui>
            </div>
          </v-col>
          <v-col class="second-column" cols="7">
            <div id="image" class="text-center" style="padding:5px;">
              <div id="tag-line" class="title font-weight-bold">
                Get more sales by showcasing your products online
              </div>
              <img id="landing-img" src="/landing.svg" alt="" />
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
      number: '',
      shop: '',
      website: '',
      verify: false,
      valid: true,
      numberRules: [
        v => !!v || 'Phone Number is required',
        v => (v && v.length === 10) || 'Phone Number must be valid'
      ],
      shopRules: [
        v => !!v || 'Shop Name is required',
        v =>
          (v && v.length <= 70) || 'Shop Name must be less than 70 characters'
      ],
      websiteRules: [
        v => !!v || 'Website is required',
        v => (v && v.length <= 50) || 'Website must be less than 50 characters'
      ]
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
  mounted() {
    // const x = window.document.getElementsByClassName('firebaseui-title')
    // x[0].textContent = 'Enter your phone number'
    // const y = window.document.getElementsByClassName('firebaseui-button')
    // y[0].textContent = 'Continue'
  },
  methods: {
    login() {
      this.$router.push('/firebasedesktopsignup')
    },
    validate() {
      // User sign up
      this.$ga.event({
        eventCategory: 'Start free trial button',
        eventAction: 'New sign up button clicked attempt',
        eventLabel: this.shop,
        eventValue: 100
      })
      if (this.$refs.form.validate()) {
        // User sign up
        this.$ga.event({
          eventCategory: 'Start free trial button',
          eventAction: 'New sign up button clicked successfully',
          eventLabel: `${this.shop}, ${this.number}`,
          eventValue: 200
        })
        window.localStorage.setItem('shopname', this.shop)
        window.localStorage.setItem('website', this.website)
        window.localStorage.setItem('number', this.number)
        this.$router.push('/firebasedesktopsignup')
      }
    }
  }
}
</script>

<style>
#already-account {
  margin-top: 30px;
}
#tag-line {
  text-align: center;
  margin-left: -53%;
  color: #f0cfbe;
  margin-bottom: 15px;
}
#landing-img {
  width: 70%;
}
#image {
  position: relative;
  left: 60%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#form-inputs {
  margin-top: 10%;
}
.mr-4 {
  text-transform: capitalize;
  margin-top: 15%;
  color: white;
  font-weight: 700;
}
.desktop-logo {
  width: 48%;
  margin-top: 0px;
}
.first-column {
  background: #ffffff;
}
.second-column {
  background: #bc6537;
}
#wording {
  width: 70%;
  position: relative;
  left: 50%;
  top: 40%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#wordings {
  width: 70%;
  position: relative;
  left: 50%;
  top: 40%;
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
