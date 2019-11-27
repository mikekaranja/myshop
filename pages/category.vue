<template>
  <v-layout wrap justify-center align-center>
    <v-breadcrumbs class="bread-crumb" :items="items">
      <template v-slot:divider>
        <v-icon @click="scroll">chevron_right</v-icon>
      </template>
    </v-breadcrumbs>
    <div
      v-if="$vuetify.breakpoint.mdAndUp"
      class="desktop-div"
      :style="{ display: desktopheight }"
    >
      <v-row class="mb-6">
        <v-col cols="6" md="2">
          <desktop-subcategory-card
            v-if="$vuetify.breakpoint.mdAndUp"
            v-show="items[1].text !== 'All'"
            :item="{ category: items[1].text, subcategory: 'All' }"
          ></desktop-subcategory-card>
        </v-col>
        <v-col
          v-for="(subcategory, index) in subcategories"
          :key="index"
          cols="6"
          md="2"
        >
          <desktop-subcategory-card
            :item="{ category: items[1].text, subcategory: subcategory }"
          ></desktop-subcategory-card>
        </v-col>
      </v-row>
    </div>
    <!-- mobile screen -->
    <subcategory-card
      v-if="$vuetify.breakpoint.smAndDown"
      v-show="items[1].text !== 'All'"
      :item="{ category: items[1].text, subcategory: 'All' }"
    ></subcategory-card>
    <subcategory-card
      v-for="(subcategory, index) in subcategories"
      v-show="$vuetify.breakpoint.smAndDown"
      :key="index"
      :item="{ category: items[1].text, subcategory: subcategory }"
    ></subcategory-card>
    <v-row
      v-show="items[1].text === 'All'"
      id="product-images-holder"
      class="mb-6"
      style="text-align:center;"
    >
      <v-col v-for="(item, index) in products" :key="index" cols="6" md="4">
        <product-item :item="item"></product-item>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import SubcategoryCard from '~/components/SubcategoryCard'
import DesktopSubcategoryCard from '~/components/DesktopSubcategoryCard'
import ProductItem from '~/components/ProductItem'
export default {
  components: {
    SubcategoryCard,
    ProductItem,
    DesktopSubcategoryCard
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
      subcategories: [],
      desktopheight: 'block'
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
    } else {
      this.desktopheight = 'none'
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
.desktop-div {
  width: 100%;
  margin-left: 25px;
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
