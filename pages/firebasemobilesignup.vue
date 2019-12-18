<template>
  <div id="container">
    <div class="top-nav">
      <v-btn class="mx-2" fab small text to="/mobilesignup">
        <v-icon color="black">mdi-arrow-left</v-icon>
      </v-btn>
    </div>
    <div v-if="!verify" class="text-center" style="padding:5px;">
      <img class="top-logo" src="https://myshop.e-merse.com/icon.jpg" alt="" />
      <v-form id="form-inputs" ref="form" v-model="valid" lazy-validation>
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

        <v-btn
          style="color:white;font-weight:700;"
          :disabled="!valid"
          color="#B13D00"
          class="mr-4"
          block
          x-large
          @click="validate"
        >
          Create my shop
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
    <div v-if="verify" id="verify-sms">
      <img class="top-logo" src="https://myshop.e-merse.com/icon.jpg" alt="" />
      <div id="fire-div" class="subtitle-1 font-weight-bold">Sign in with:</div>
      <firebase-ui v-show="verify"></firebase-ui>
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
      verify: true,
      valid: true,
      numberRules: [
        v => !!v || 'Phone Number is required',
        v =>
          (v && v.length === 9) || 'Phone Number must be equal to 9 characters'
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
      this.verify = true
    },
    validate() {
      // User sign up
      this.$ga.event({
        eventCategory: 'Create my shop button',
        eventAction: 'New sign up button clicked attempt',
        eventLabel: this.shop,
        eventValue: 100
      })
      if (this.$refs.form.validate()) {
        // User sign up
        this.$ga.event({
          eventCategory: 'Create my shop click button',
          eventAction: 'New sign up button clicked successfully',
          eventLabel: this.shop,
          eventValue: 200
        })
        window.localStorage.setItem('shopname', this.shop)
        window.localStorage.setItem('website', this.website)
        this.verify = true
      }
    }
  }
}
</script>

<style>
#fire-div {
  margin-top: 30%;
}
#already-account {
  margin-top: 30px;
}
.free-trial {
  color: #ff9800;
  cursor: pointer;
}
#verify-sms {
  text-align: center;
}
#form-inputs {
  margin-top: 15%;
}
#container {
  padding: 12px;
}
.mr-4 {
  text-transform: capitalize;
  margin-top: 25%;
}
.first-column {
  background: #5f3d42;
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
    margin-top: 8px;
  }
}
</style>
