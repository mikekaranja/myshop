// src/plugins/vuetify.js
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import InventoryIcon from '~/components/InventoryIcon'
// import AdvertiseIcon from '~/components/AdvertiseIcon'
import AccountIcon from '~/components/AccountIcon'
import LogoutIcon from '~/components/LogoutIcon'
import CalendarIcon from '~/components/CalendarIcon'
Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#953332',
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
        account: {
          component: AccountIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'account'
          }
        },
        logout: {
          component: LogoutIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'logout'
          }
        },
        calendar: {
          component: CalendarIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'calendar'
          }
        },
        myshop: {
          component: LogoutIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'logout'
          }
        },
        inventory: {
          component: InventoryIcon, // you can use string here if component is registered globally
          props: {
            // pass props to your component if needed
            name: 'inventory'
          }
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
