<template>
  <v-card ripple max-width="100%" class="mx-auto">
    <v-row no-gutters>
      <v-col cols="8">
        <div style="display: flex;">
          <nuxt-link
            class="links-icon"
            :to="
              `/subcategory?category=${item.category}&subcategory=${item.subcategory}`
            "
          >
            <v-icon color="#A7CFFF">folder</v-icon>
          </nuxt-link>
          <nuxt-link
            class="links-text"
            :to="
              `/subcategory?category=${item.category}&subcategory=${item.subcategory}`
            "
          >
            <div class="subtitle-1">{{ item.subcategory }}</div>
          </nuxt-link>
        </div>
      </v-col>
      <v-col cols="4">
        <div style="display: flex;">
          <v-btn
            v-show="item.subcategory !== 'All Products'"
            style="margin-left: auto;"
            text
            icon
            @click="edit(item.subcategory)"
          >
            <v-icon>create</v-icon>
          </v-btn>
          <v-btn
            :style="{
              marginLeft: `${item.subcategory !== 'All Products' ? '' : 'auto'}`
            }"
            class="share-btn"
            text
            icon
            @click="share(item)"
          >
            <v-icon>share</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      auto: 'auto'
    }
  },
  methods: {
    edit(name) {
      this.$bus.$emit('editSubcategoryDialog', name)
    },
    share(item) {
      this.$bus.$emit('shareSubcategory', item)
    }
  }
}
</script>

<style scoped>
.links-text {
  text-decoration: none;
  color: black;
  margin-top: 5px;
  width: 100%;
}
.links-icon {
  text-decoration: none;
  margin-top: 5px;
}
.mx-auto {
  margin-top: 12px;
  width: 95%;
  padding: 12px;
  cursor: pointer;
}
.subtitle-1 {
  margin-left: 8px;
  font-weight: 500;
}
</style>
