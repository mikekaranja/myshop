import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'MyShopStore',
      paths: [
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
