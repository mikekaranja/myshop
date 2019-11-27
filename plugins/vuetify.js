// src/plugins/vuetify.js
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import InventoryIcon from '~/components/InventoryIcon'
import AdvertiseIcon from '~/components/AdvertiseIcon'
import MyshopIcon from '~/components/MyshopIcon'
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#92302F',
          accent: colors.deepPurple.accent3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent4
        }
      }
    },
    icons: {
      values: {
        inventory: {
          component: InventoryIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'inventory'
          }
        },
        advertise: {
          component: AdvertiseIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'advertise'
          }
        },
        myshop: {
          component: MyshopIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'myshop'
          }
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
