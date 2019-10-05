<template>
  <div>
    <v-card hover max-width="200" class="mx-auto">
      <nuxt-link
        class="links-icon"
        :to="
          `/subcategory?category=${item.category}&subcategory=${item.subcategory}`
        "
      >
        <v-icon :size="76" color="#A7CFFF">mdi-folder</v-icon>
      </nuxt-link>

      <v-card-text style="padding:2px;">
        <nuxt-link
          class="links-text"
          :to="
            `/subcategory?category=${item.category}&subcategory=${item.subcategory}`
          "
        >
          <div id="title" class="subtitle-2 font-weight-bold">
            {{ item.subcategory }}
          </div>
        </nuxt-link>
      </v-card-text>

      <v-card-actions style="padding:2px;">
        <div class="flex-grow-1"></div>
        <v-btn icon>
          <v-icon v-show="item !== 'All'" small @click="edit(item.subcategory)"
            >mdi-pencil</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon
            :style="[item === 'All' ? { marginLeft: '-9px' } : { styleB }]"
            small
            @click="share(item)"
            >mdi-share-variant</v-icon
          >
        </v-btn>
        <div class="flex-grow-1"></div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
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
.mx-auto {
  cursor: pointer;
  text-align: center;
}
#title {
  color: #212121;
}
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
  width: 80%;
  height: 194px;
  padding: 20px;
  cursor: default;
}
.subtitle-1 {
  margin-left: 8px;
  font-weight: 500;
}
</style>
