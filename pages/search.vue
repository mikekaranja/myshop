<template>
  <div class="search-wrapper">
    <div class="search-wrapper">
      <v-text-field
        v-model="search"
        label="Search for items"
        append-icon="search"
        :clearable="clear"
      ></v-text-field>
    </div>
    <div class="product-wrapper">
      <v-row
        v-show="filteredList.length > 0"
        style="text-align: center;"
        class="mb-6"
      >
        <v-col
          v-for="item in filteredList.slice(0, 8)"
          :key="item.id"
          cols="6"
          md="4"
        >
          <product-item :item="item"></product-item>
        </v-col>
      </v-row>
      <div v-show="filteredList.length === 0" class="no-products">
        <img class="img-empty" src="empty.jpg" alt="empty" />
        <div class="subtitle-1">No matching result</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '~/components/ProductItem'
export default {
  components: {
    ProductItem
  },
  data() {
    return {
      search: '',
      clear: false,
      noproducts: false
    }
  },
  computed: {
    filteredList() {
      return this.$store.state.products.filter(product => {
        return product.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted() {
    // ga analytics
    this.$ga.event({
      eventCategory: 'Search icon button',
      eventAction: 'Search icon click',
      eventLabel: this.$store.state.user.shopname,
      eventValue: 13
    })
  }
}
</script>

<style scoped>
.search-wrapper {
  padding: 6px;
  width: 97%;
  margin: auto;
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
  font-weight: 700;
}
.img-empty {
  width: 250px;
}
</style>
