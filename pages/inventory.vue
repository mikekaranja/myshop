<template>
  <v-layout class="text-center" wrap>
    <div v-show="$vuetify.breakpoint.mdAndUp" class="desktop-div">
      <div v-if="noproducts === 1">
        <div id="categories-header-desktop" class="display-2 font-weight-bold">
          My Products
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
      </div>
      <div v-if="noproducts === 2">
        <img id="empty-img" src="/emptystate.svg" alt="empty" />
        <div id="nada-text" class="body-2">No products yet</div>
      </div>
      <div v-if="noproducts === 0" class="gif-text-center">
        <v-progress-circular
          class="spinner"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>
    <div
      v-show="$vuetify.breakpoint.smAndDown"
      style="width: 100%;min-height: 50vh;"
    >
      <div v-if="noproducts === 0" class="gif-text-center">
        <v-progress-circular
          class="spinner"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="noproducts === 1">
        <div class="display-1 font-weight-bold">
          My Products
        </div>
        <category-card
          v-for="(category, index) in categories"
          :key="index"
          :item="category"
        ></category-card>
      </div>
      <div v-if="noproducts === 2">
        <img id="empty-img" src="/emptystate.svg" alt="empty" />
        <div id="nada-text" class="body-2">No products yet</div>
      </div>
    </div>
    <div v-show="$store.state.tour === true" id="tap-here">
      <img src="/screen1.svg" alt="screen" />
      <div
        id="add-text"
        style="color:white;"
        class="body-2 font-weight-regular"
      >
        Tap here to add a product
      </div>
      <v-btn id="ok-got" color="#979797" depressed small @click="removeOk"
        >Ok, Got it</v-btn
      >
    </div>
    <div v-show="$store.state.tour === true" v-if="showaddhere" id="add-here">
      <img style="width: 98%;" src="/screen2.svg" alt="screen" />
      <div
        id="add-here-text"
        style="color:white;"
        class="body-2 font-weight-regular"
      >
        Add a product here
      </div>
      <v-btn id="ok-got-it" color="#979797" depressed small @click="removeOk"
        >Ok, Got it</v-btn
      >
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
      noproducts: 0,
      showaddhere: false,
      no: [''],
      close: true,
      snackbar: true,
      text: ''
    }
  },
  computed: {
    categories() {
      // eslint-disable-next-line prefer-const
      let categoriesarray = ['All Products']
      this.$store.state.categories.map(item =>
        categoriesarray.push(item.categoryname)
      )
      return categoriesarray
    },
    ...mapState(['adbanner', 'tour'])
  },
  mounted() {
    setTimeout(() => {
      if (this.$store.state.products.length > 0) {
        this.noproducts = 1
      } else if (this.$store.state.products.length < 1) {
        this.noproducts = 2
      }
    }, 2500)
    if (
      this.$store.state.products.length < 1 &&
      this.$store.state.tour !== 'done'
    ) {
      this.$store.commit('setTour', true)
    }
    setTimeout(() => {
      if (this.$store.state.authenticated) {
        this.$bus.$emit('showbottomandtop', true)
      }
    }, 1000)
  },
  created() {
    this.$bus.$on('reloadCategories', value => {
      this.getData()
    })
    this.$bus.$on('reloadShopdetails', value => {
      this.getUserData()
    })
    this.$bus.$on('showcaption', value => {
      this.showaddhere = true
    })
    this.$bus.$on('hidecaption', value => {
      this.showaddhere = false
    })
    setTimeout(() => {
      if (!this.$store.state.authenticated) {
        this.$router.push('/login')
      } else if (this.$store.state.authenticated) {
        this.getData()
        this.getUserData()
      }
    }, 50)
  },
  methods: {
    removeOk() {
      this.$store.commit('setTour', 'done')
    },
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
      console.log('hello', orderbydatearray)
      return this.$router.push('/inventory')
    },
    async getUserData() {
      const shopid = this.$store.state.user.shopid
      const data = await this.$axios.$get(
        `https://e-merse.firebaseio.com/pwa/users.json?orderBy="shopid"&equalTo="${shopid}"`
      )
      return this.$store.commit('setUserData', Object.values(data)[0])
    },
    openOptions() {
      this.$bus.$emit('OpenBottomNav', true)
    }
  }
}
</script>

<style scoped>
.gif-text-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 75vh;
}
#add-here-text {
  color: white;
  margin-top: -37%;
  margin-left: 15px;
}
#add-here {
  position: fixed;
  bottom: 305px;
  right: 0;
  z-index: 999;
}
#add-text {
  color: white;
  margin-top: -36%;
}
#tap-here {
  display: none;
}
#empty-img {
  width: 35%;
  margin: auto;
  margin-top: 5%;
}
#nada-text {
  text-align: center;
  color: grey;
  margin-top: 30px;
}
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
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  #tap-here {
    display: block;
    position: fixed;
    bottom: 141px;
    right: 53px;
  }
  #empty-img {
    width: 65%;
    margin: auto;
    margin-top: 15%;
  }
  #nada-text {
    text-align: center;
    color: grey;
    margin-top: 30px;
  }
  #ok-got {
    margin-left: 33%;
    margin-top: 4px;
    text-transform: none;
    color: white;
  }
  #ok-got-it {
    margin-left: 23%;
    margin-top: 4px;
    text-transform: none;
    color: white;
  }
}
</style>
