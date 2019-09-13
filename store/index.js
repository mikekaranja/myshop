import Vuex from 'vuex'
import { db } from '~/plugins/firebase'
const MyShopStore = () => {
  return new Vuex.Store({
    state: {
      authenticated: false,
      category: '',
      uid: '',
      email: '',
      useronboarding: {},
      user: {},
      categories: [],
      products: [],
      addtohomescreen: ''
    },
    getters: {},
    mutations: {
      authUser(state, user) {
        state.authenticated = user
      },
      clearUser(state, user) {
        state.user = {}
        state.categories = []
        state.products = []
      },
      saveUser(state, user) {
        const newPostKey = db
          .ref()
          .child('pwa/users')
          .push().key

        user.id = newPostKey

        const md = new window.MobileDetect(window.navigator.userAgent)
        if (md.os() === 'AndroidOS') {
          user.phoneos = 'android'
        } else {
          user.phoneos = 'iphone'
        }

        const updates = {}
        updates['pwa/users/' + newPostKey] = user

        return db
          .ref()
          .update(updates)
          .then(snap => {
            state.user = user
          })
      },
      setOnboardingUid(state, uid) {
        state.uid = uid
      },
      setOnboardingEmail(state, email) {
        state.email = email
      },
      setOnboardingCategory(state, category) {
        state.category = category
      },
      setUserData(state, shopdata) {
        state.user = shopdata
      },
      addCategories(state, payload) {
        state.categories = payload
      },
      addProducts(state, payload) {
        state.products = payload
      },
      addToHomeScreen(state, payload) {
        state.addtohomescreen = payload
      },
      changeShopName(state, payload) {
        state.user.shopid = payload.shopid
        state.user.shopname = payload.shopname
        state.user.email = payload.email
        state.user.phonenumber = payload.phonenumber
      },
      changeExpiryDate(state, payload) {
        state.user.expiry_date = payload
      }
    },
    actions: {}
  })
}

export default MyShopStore
