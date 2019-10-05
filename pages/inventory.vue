<template>
  <v-layout style="margin-top: 10px;" class="text-center" wrap>
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
    </div>
    <div v-show="$vuetify.breakpoint.smAndDown">
      <div class="display-1 font-weight-bold">
        Categories
      </div>
      <category-card item="All"></category-card>
      <category-card
        v-for="(category, index) in categories"
        :key="index"
        :item="category"
      ></category-card>
    </div>
  </v-layout>
</template>

<script>
import CategoryCard from '~/components/CategoryCard'
import DesktopCategoryCard from '~/components/DesktopCategoryCard'
export default {
  components: {
    CategoryCard,
    DesktopCategoryCard
  },
  data() {
    return {
      no: ['']
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
    }
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
    }
  }
}
</script>
<style scoped>
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
}
</style>
