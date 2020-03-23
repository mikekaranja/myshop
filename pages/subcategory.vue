<template>
  <v-layout wrap justify-center align-center>
    <v-breadcrumbs class="bread-crumb" :items="items">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row
      v-show="products.length > 0"
      id="product-images-holder"
      class="mb-6"
      style="text-align: center;"
    >
      <v-col v-for="(item, index) in products" :key="index" cols="6" md="4">
        <product-item :item="item"></product-item>
      </v-col>
    </v-row>
    <div v-show="noproducts" class="no-products">
      <img class="img-empty" src="empty.jpg" alt="empty" />
      <div class="subtitle-1">No products here</div>
    </div>
  </v-layout>
</template>

<script>
import ProductItem from '~/components/ProductItem'
export default {
  components: {
    ProductItem
  },
  data() {
    return {
      noproducts: false,
      category: '',
      products: [],
      items: [
        {
          text: 'All Categories',
          disabled: false,
          to: '/inventory'
        },
        {
          text: '',
          disabled: false,
          to: `/category?category=${this.$router.history.current.query.category}`
        },
        {
          text: '',
          disabled: true,
          to: ''
        }
      ]
    }
  },
  mounted() {
    this.items[1].text = this.$router.history.current.query.category
    this.items[2].text = this.$router.history.current.query.subcategory
    if (this.items[2].text === 'All Products') {
      const validcategory = this.$store.state.products.filter(el => el.category)
      this.products = validcategory.filter(item =>
        item.category.includes(this.items[1].text)
      )
      if (this.products.length === 0) {
        this.noproducts = true
      }
    } else {
      const validsubcategory = this.$store.state.products.filter(
        el => el.subcategory
      )
      this.products = validsubcategory
        .filter(item => item.category.includes(this.items[1].text))
        .filter(item => item.subcategory.includes(this.items[2].text))
      // eslint-disable-next-line no-console
      if (this.products.length === 0) {
        this.noproducts = true
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
.img-empty {
  width: 250px;
}
.no-products {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 30vh;
}
.subtitle-1 {
  font-weight: 600;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}
.bread-crumb {
  width: 100%;
  padding-left: 1px;
  padding-top: 1px;
  margin-left: 40px;
  margin-top: 30px;
}
#product-images-holder {
  margin-left: 12px !important;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .bread-crumb {
    margin-left: 6px;
    margin-top: 0px;
  }
  #product-images-holder {
    margin-left: -10px !important;
  }
}
</style>
