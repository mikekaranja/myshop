<template>
  <v-layout class="text-center" wrap>
    <div v-show="$vuetify.breakpoint.mdAndUp" class="desktop-div">
      <div id="categories-header-desktop" class="display-2 font-weight-bold">
        Categories
      </div>
      <v-row class="mb-6" style="padding-left: 23px;">
        <v-col
          v-for="(category, index) in categories"
          :key="index"
          cols="6"
          md="2"
        >
          <desktop-category-card :item="category"></desktop-category-card>
        </v-col>
      </v-row>
      <!-- <v-snackbar
        v-if="adbanner"
        v-model="snackbar"
        :timeout="0"
        color="success"
      >
        {{ text }}
        <v-btn color="white" text @click="openAdsPage">
          Get started
        </v-btn>
      </v-snackbar> -->
    </div>
    <div
      v-show="$vuetify.breakpoint.smAndDown"
      style="width: 100%;min-height: 100vh;"
    >
      <!-- <div v-if="adbanner" id="card-notice" style="text-align:end;">
        <div style="display:flex;padding:10px;padding-bottom: 0px;">
          <v-icon color="white" @click="closeBanner">mdi-close</v-icon>
          <div
            style="margin-top: 1px;margin-left: 10px;"
            class="subtitle-2 font-weight-bold"
          >
            Advertise on google!
          </div>
        </div>
        <div class="caption">
          Get seen by thousands of customers on the internet.
        </div>
        <div style="padding-bottom:5px;">
          <v-btn
            style="text-transform:none;margin-left:auto;text-decoration:underline;text-align:center;"
            text
            color="white"
            to="/adbuying"
          >
            Get started
          </v-btn>
        </div>
      </div> -->
      <div class="display-1 font-weight-bold">
        Categories
      </div>
      <!-- <category-card item="All"></category-card> -->
      <category-card
        v-for="(category, index) in categories"
        :key="index"
        :item="category"
      ></category-card>
      <!-- <v-btn
        id="fab-btn"
        class="mx-2"
        fab
        dark
        color="primary"
        @click="openOptions"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn> -->
    </div>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import CategoryCard from '~/components/CategoryCard'
import DesktopCategoryCard from '~/components/DesktopCategoryCard'
export default {
  components: {
    CategoryCard,
    DesktopCategoryCard
  },
  data() {
    return {
      no: [''],
      close: true,
      snackbar: true,
      text:
        'Advertise on google! Get seen by thousands of customers on the internet.'
    }
  },
  computed: {
    categories() {
      // eslint-disable-next-line prefer-const
      let categoriesarray = ['All']
      this.$store.state.categories.map(item =>
        categoriesarray.push(item.categoryname)
      )
      return categoriesarray
    },
    ...mapState(['adbanner'])
  },
  mounted() {
    setTimeout(() => {
      if (this.$store.state.authenticated) {
        this.$bus.$emit('showbottomandtop', true)
      }
    }, 1000)
  },
  created() {
    setTimeout(() => {
      if (!this.$store.state.authenticated) {
        this.$router.push('/login')
      } else if (this.$store.state.authenticated) {
        this.getData()
      }
    }, 50)
  },
  methods: {
    openAdsPage() {
      this.closeBanner()
      this.$router.push('/checkads')
    },
    closeBanner() {
      // this.close = false
      this.$store.commit('closeAdBanner', false)
    },
    async getData() {
      const shopid = this.$store.state.user.shopid
      const data = await this.$axios.$get(
        `https://e-merse.firebaseio.com/pwa/products.json?orderBy="shopid"&equalTo="${shopid}"`
      )
      const orderbydatearray = Object.values(data).sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date_created) - new Date(a.date_created)
      })
      // filter by category
      const categories = orderbydatearray.filter(el => el.categoryname)
      this.$store.commit('addCategories', categories)
      // filter by products
      const items = orderbydatearray.filter(el => el.title)
      this.$store.commit('addProducts', items)
      return this.$router.push('/inventory')
    },
    openOptions() {
      this.$bus.$emit('OpenBottomNav', true)
    }
  }
}
</script>
<style scoped>
#card-notice {
  background: rgb(92, 185, 91);
  color: white;
  margin-left: -12px;
  margin-right: -12px;
  text-align: end;
}
#fab-btn {
  position: absolute;
  right: 0;
  bottom: 61px;
}
.caption {
  text-align: initial;
  margin-left: 44px;
}
.desktop-div {
  width: 100%;
  margin-left: 26px;
}
#categories-header-desktop {
  text-align: left;
  margin-left: 25px;
  margin-bottom: 20px;
  margin-top: 30px;
}
.display-1 {
  font-family: 'Open Sans', sans-serif !important;
  font-weight: 700;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-top: 18px;
}
</style>
