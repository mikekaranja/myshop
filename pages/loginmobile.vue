<template>
  <div>
    <div
      v-show="$vuetify.breakpoint.smAndDown"
      class="text-center"
      style="padding:5px;"
    >
      <a href="https://e-merse.com" target="_blank">
        <img
          class="top-logo"
          src="https://myshop.e-merse.com/icon.jpg"
          alt=""
        />
      </a>
      <!-- <p>We're <span style="font-weight:500;">pumped</span> to see you!</p> -->
      <div class="title bold">Welcome Back!</div>
      <p style="margin-top: 15px;">
        Keep updating your stock and sharing your products with customers
      </p>
      <firebase-ui></firebase-ui>
      <div
        class="caption font-weight-bold"
        style="color:gray; margin-top: 20px;"
      >
        Don't have an account?
        <span class="free-trial" @click="changeTitle">Sign up</span>
      </div>
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
      this.$router.push('/mobilesignup')
    }
  }
}
</script>

<style>
.desktop-logo {
  width: 30%;
  margin-top: 70px;
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
    margin-top: 80px;
  }
}
</style>
