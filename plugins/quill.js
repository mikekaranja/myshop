import Vue from 'vue'

if (process.client) {
  const VueEditor = require('vue2-editor') // tried normal import as wel
  Vue.use(VueEditor)
}
