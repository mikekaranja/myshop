<template>
  <div id="firebaseui-auth-container" />
</template>

<script>
import { db, auth, authProviders } from '~/plugins/firebase'
export default {
  name: 'Login',
  mounted() {
    if (process.browser) {
      const firebaseui = require('firebaseui')
      const ui =
        firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)

      const config = {
        signInOptions: [
          authProviders.Google,
          authProviders.Facebook,
          authProviders.Email
        ],
        signInSuccessUrl: '/',
        tosUrl: '/',
        privacyPolicyUrl: '/',
        callbacks: {
          signInSuccessWithAuthResult: function(authResult) {
            const uid = authResult.user.providerData[0].uid
            const email = authResult.user.providerData[0].email
            this.checkIfNewUser(uid, email)
          }.bind(this),
          uiShown: function() {
            // eslint-disable-next-line no-console
            console.log('')
          }
        }
      }

      ui.start('#firebaseui-auth-container', config)
    }
  },
  methods: {
    checkIfNewUser(uid, email) {
      return db
        .ref('pwa/users')
        .orderByChild('uid')
        .equalTo(uid)
        .on('value', snapshot => {
          // check if user has signed up
          if (snapshot.exists()) {
            const values = Object.values(snapshot.val())
            const key = Object.keys(snapshot.val())
            // set cookie user data
            const shopdata = {
              id: key[0],
              uid: values[0].uid,
              name: values[0].name,
              email: values[0].email,
              phonenumber: values[0].phonenumber,
              shopid: values[0].shopid,
              shopname: values[0].shopname,
              expiry_date: values[0].expiry_date,
              sign_up_date: values[0].sign_up_date,
              payment_plan: values[0].payment_plan
            }
            // insert user data into vuex
            this.$store.commit('authUser', true)
            this.$store.commit('setUserData', shopdata)
            // set router
            this.$router.push('/inventory')
            return false
          } else {
            this.$store.commit('setOnboardingUid', uid)
            this.$store.commit('setOnboardingEmail', email)
            this.$router.push('/onboarding')
          }
        })
    }
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
