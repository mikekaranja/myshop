<template>
  <div id="firebaseui-auth-container" />
</template>

<script>
import { db, auth, authProviders } from '~/plugins/firebase'
export default {
  name: 'Login',
  data() {
    return {
      ad: '',
      landingpage: '',
      ipuserdata: {}
    }
  },
  mounted() {
    this.ipdata()
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
        signInSuccessUrl: '/inventory',
        tosUrl: '/terms',
        privacyPolicyUrl: '/privacy',
        callbacks: {
          signInSuccessWithAuthResult: function(authResult) {
            const shopname = window.localStorage.getItem('shopname')
            const website = window.localStorage.getItem('website')
            console.log(authResult.user.providerData[0].uid, shopname, website)
            const uid = authResult.user.providerData[0].uid
            const email = authResult.user.providerData[0].email
            this.checkIfNewUser(uid, email, shopname, website)
          }.bind(this),
          // .bind(this)
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
    checkIfNewUser(uid, email, shopname, website) {
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
            this.$bus.$emit('showpaymentplan', true)
            // set router
            this.$router.push('/inventory')
            // User sign in
            this.$ga.event({
              eventCategory: 'Sign in button',
              eventAction: 'Logins',
              eventLabel: values[0].shopname,
              eventValue: 1
            })
            // set userId
            this.$ga.set('userId', values[0].shopname)
            return false
          } else {
            this.saveNewShop(uid, shopname, website)
            this.$router.push('/inventory')
            // User sign up
            this.$ga.event({
              eventCategory: 'Successful Sign up from new page',
              eventAction: 'New sign up',
              eventLabel: shopname,
              eventValue: 300
            })
          }
        })
    },
    async ipdata() {
      const data = await this.$axios.$get(
        'https://api.ipdata.co?api-key=371d9162f88bdd60ac87cbb7381fc0cefbe25c087b12040aac8d1d01'
      )
      this.ipuserdata = data
      return data
    },
    saveNewShop(uid, shopname, website) {
      const shopName = shopname
        .trim()
        .replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        .toLowerCase()
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      if (uid.startsWith('@')) {
        uid = uid.substr(1)
        uid = uid.slice(0, -1)
      }
      const user = {
        website: website,
        uid: uid,
        currency: 'Ksh',
        name: shopName,
        email: '',
        shopname: shopName,
        shopid: shopId,
        phonenumber: uid,
        payment_plan: '1 - 50 products $8/month',
        sign_up_date: new Date().toString(),
        expiry_date: this.addDays(1).toString(),
        ipdata: this.ipuserdata
      }
      this.snackbarText = ''
      this.snackbar = !this.snackbar
      return this.$store.commit('saveUser', user)
    },
    addDays(days) {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date
    }
  }
}
</script>

<style src="~/node_modules/firebaseui/dist/firebaseui.css"></style>
