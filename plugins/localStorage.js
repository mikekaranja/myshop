import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'MyShopStore',
      paths: [
        'tour',
        'ad',
        'landingpage',
        'authenticated',
        'addtohomescreen',
        'user',
        'categories',
        'products',
        'adbanner'
      ]
    })(store)
  })
}
