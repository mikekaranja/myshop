export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'My Shop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favic.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
      },
      {
        rel: 'stylesheet',
        href: '/progressiveimg.css'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.5/cropper.min.css'
      }
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.5/cropper.min.js'
      },
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.3/mobile-detect.min.js'
      },
      { src: 'https://unpkg.com/progressive-image@1.2.0/dist/index.js' },
      {
        src:
          'https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver'
      },
      {
        src: 'https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#B13D00' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/vue-clipper',
    '~plugins/vue-rx',
    '~plugins/hotjar',
    '~plugins/vuetify',
    '~/plugins/bus',
    '~/plugins/firebase',
    { src: '~/plugins/vue-cropper', mode: 'client' },
    { src: '~/plugins/localStorage', ssr: false },
    { src: '~plugins/quill', mode: 'client' }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-121366089-30'
      }
    ],
    ['@nuxtjs/google-tag-manager', { id: 'GTM-W4D4RWD' }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  // manifest
  manifest: {
    name: 'E-merse',
    short_name: 'MyShop',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    description: 'Launch your WhatsApp connected shop on E-merse.'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
