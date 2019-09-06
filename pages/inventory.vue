<template>
  <v-layout style="margin-bottom: 65px;" wrap justify-center align-center>
    <div class="display-1">Categories</div>
    <category-card item="All"></category-card>
    <category-card
      v-for="(category, index) in categories"
      :key="index"
      :item="category"
    ></category-card>
  </v-layout>
</template>

<script>
import CategoryCard from '~/components/CategoryCard'
export default {
  components: {
    CategoryCard
  },
  data() {
    return {
      no: ['']
    }
  },
  computed: {
    categories() {
      // eslint-disable-next-line prefer-const
      let categoriesarray = []
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
.display-1 {
  font-family: 'Open Sans', sans-serif !important;
  font-weight: 700;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
  margin-left: 5px;
}
</style>
