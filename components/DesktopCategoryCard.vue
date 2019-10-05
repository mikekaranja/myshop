<template>
  <div>
    <v-card hover max-width="200" class="mx-auto">
      <nuxt-link class="links-icon" :to="`/category?category=${item}`">
        <v-icon :size="76" color="#A7CFFF">mdi-folder</v-icon>
      </nuxt-link>

      <v-card-text style="padding:2px;">
        <nuxt-link class="links-text" :to="`/category?category=${item}`">
          <div id="title" class="subtitle-2">{{ item }}</div>
        </nuxt-link>
      </v-card-text>

      <v-card-actions style="padding:2px;">
        <div class="flex-grow-1"></div>
        <v-btn v-show="item !== 'All'" icon>
          <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon
            :style="[item === 'All' ? { marginLeft: '-9px' } : { styleB }]"
            small
            @click="emitShareDialog(item)"
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
      auto: 'auto',
      styleA: {
        marginLeft: '-35px'
      },
      styleB: {
        marginLeft: '8px'
      }
    }
  },
  methods: {
    edit(name) {
      this.$bus.$emit('editCategoryDialog', name)
    },
    emitShareDialog(name) {
      this.$bus.$emit('shareCategory', name)
    }
  }
}
</script>

<style scoped>
#title {
  color: #212121;
}
.links-text {
  cursor: pointer;
  text-decoration: none;
  color: black;
  margin-top: 5px;
  width: 100%;
}
.links-icon {
  cursor: pointer;
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
