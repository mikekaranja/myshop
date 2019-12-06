import Vuex from 'vuex'
import { db } from '~/plugins/firebase'
const MyShopStore = () => {
  return new Vuex.Store({
    state: {
      ad: '',
      landingpage: '',
      authenticated: false,
      onboardingcategory: '',
      uid: '',
      email: '',
      useronboarding: {},
      user: {},
      categories: [],
      products: [],
      addtohomescreen: '',
      onboardingshopid: '',
      onboardingshopname: '',
      onboardinguser: {},
      adbanner: true,
      addata: {}
    },
    getters: {},
    mutations: {
      SetAdConversions(state, data) {
        state.ad = data.adname
        state.landingpage = data.landingpagename
      },
      authUser(state, user) {
        state.authenticated = user
      },
      clearUser(state, user) {
        state.user = {}
        state.categories = []
        state.products = []
      },
      saveUserBeforeAddProduct(state, user) {
        state.onboardinguser = user
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

        // ad channel
        const ad = window.localStorage.getItem('ad')
        const landingpage = window.localStorage.getItem('landingpage')

        if (ad) {
          user.ad = ad
          user.landingpage = landingpage
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
        state.onboardingcategory = category
      },
      setUserData(state, shopdata) {
        state.user = shopdata
      },
      setOnboardingShopID(state, shopdata) {
        state.onboardingshopid = shopdata.shopid
        state.onboardingshopname = shopdata.shopname
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
      },
      AdFormData(state, payload) {
        state.addata = { ...state.addata, ...payload }
      },
      closeAdBanner(state, payload) {
        state.adbanner = payload
      }
    },
    actions: {}
  })
}

export default MyShopStore
