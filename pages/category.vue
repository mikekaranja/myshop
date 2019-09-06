<template>
  <v-layout wrap justify-center align-center>
    <v-breadcrumbs class="bread-crumb" :items="items">
      <template v-slot:divider>
        <v-icon @click="scroll">chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <subcategory-card
      v-show="items[1].text !== 'All'"
      :item="{ category: items[1].text, subcategory: 'All' }"
    ></subcategory-card>
    <subcategory-card
      v-for="(subcategory, index) in subcategories"
      v-show="items[1].text !== 'All'"
      :key="index"
      :item="{ category: items[1].text, subcategory: subcategory }"
    ></subcategory-card>
    <v-row v-show="items[1].text === 'All'" class="mb-6">
      <v-col v-for="(item, index) in products" :key="index" cols="6" md="4">
        <product-item :item="item"></product-item>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import SubcategoryCard from '~/components/SubcategoryCard'
import ProductItem from '~/components/ProductItem'
export default {
  components: {
    SubcategoryCard,
    ProductItem
  },
  data() {
    return {
      category: '',
      items: [
        {
          text: 'All Categories',
          disabled: false,
          to: '/inventory'
        },
        {
          text: '',
          disabled: true,
          to: ''
        }
      ],
      subcategories: []
    }
  },
  computed: {
    ...mapState(['products'])
  },
  mounted() {
    this.items[1].text = this.$router.history.current.query.category
    if (this.items[1].text !== 'All') {
      // fill subcategories
      const sub = this.$store.state.categories.filter(
        el => el.categoryname === this.items[1].text
      )
      if (sub[0].subcategories) {
        this.subcategories = sub[0].subcategories
      } else {
        this.subcategories = []
      }
    }
    this.scroll()
  },
  methods: {
    scroll() {
      setTimeout(() => {
        window.scroll(0, 2)
      }, 200)
    }
  }
}
</script>
<style scoped>
.subtitle-1 {
  font-weight: 600;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
}
.bread-crumb {
  width: 100%;
  padding-left: 1px;
  padding-top: 1px;
  margin-left: 6px;
}
</style>
