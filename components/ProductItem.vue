<template>
  <div id="scroll-item" class="product-item">
    <div class="progressive">
      <nuxt-link :to="{ path: '/editproduct?item=' + item.title }" replace>
        <img
          id="img"
          class="preview lazy"
          src="/blur.jpg"
          :data-src="item.imageUrls[0]"
        />
      </nuxt-link>
    </div>
    <div class="product-content">
      <div style="display: block;text-align:center;">
        <h5 class="item-name">
          <nuxt-link class="item-name" :to="`/editproduct?item=${item.title}`">
            {{ item.name }}
          </nuxt-link>
        </h5>
        <nuxt-link class="item-price" :to="`/editproduct?item=${item.title}`">
          <span class="item-price">{{
            item.price > 2
              ? 'Ksh ' +
                item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '-'
          }}</span>
        </nuxt-link>
      </div>
      <div style="display: flex;margin-top:10px;">
        <v-btn
          style="text-transform:capitalize;font-weight:bold;"
          block
          small
          outlined
          rounded
          color="blue"
          @click="emitShareDialog"
        >
          <v-icon left dark>share</v-icon>
          Share
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['item'],
  mounted() {
    new window.Progressive({
      el: '#scroll-item',
      lazyClass: 'lazy',
      removePreview: true,
      scale: true
    }).fire()
  },
  methods: {
    emitShareDialog() {
      this.$bus.$emit('shareProduct', {
        name: this.item.name,
        id: this.item.id
      })
    }
  }
}
</script>

<style scoped>
.preloader1 {
  text-align: center;
  padding-top: 39%;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
#place-img {
  margin: 100px;
}
.product-item {
  text-align: center;
  display: inline-block;
  cursor: pointer;
  transition: 0.3s;
  width: 285px;
  margin-top: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  box-shadow: none;
}
.product-item img {
  width: 285px;
  height: 285px;
  object-fit: cover;
  border-radius: 6px;
}
#otherimage {
  width: 285px;
  height: 285px;
  object-fit: cover;
}
.otherimage-div {
  height: 285px;
}
.product-content {
  text-align: center;
  margin-top: 12px;
}
.product-content .item-name {
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: small;
}
.product-content .item-price {
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: auto;
  font-size: small;
  margin-top: 10px;
  color: gray;
  text-align: center;
}
.item-name {
  color: black;
  margin-top: 10px;
}
.item-price {
  text-decoration: none;
  color: black;
  font-weight: 600;
}
.whatsapp-btn {
  width: 86%;
  margin-top: 7px;
  text-transform: capitalize;
  font-weight: 700;
  font-size: 12px;
}
.addtocart-btn {
  text-transform: capitalize;
  font-weight: 700;
  margin-bottom: 10px;
}
@media only screen and (max-width: 767px) {
  .ma-2 {
    display: none;
  }
  .whatsapp-btn {
    width: 100%;
    font-size: 9px;
  }
  #img {
    object-fit: cover;
    border-radius: 7px;
  }
  .progressive img {
    object-fit: cover;
  }
  .product-item img {
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  #whatsapp-img {
    margin-left: 3%;
  }
  .product-item {
    width: 100%;
    height: auto;
  }
  #otherimage {
    width: 100%;
    height: 183px;
  }
  .otherimage-div {
    height: 183px;
  }
  .product-item:hover {
    box-shadow: none;
  }
  .product-item-image:hover {
    box-shadow: none;
  }
  .product-content .item-name {
    font-size: small;
    text-align: center;
  }
  .product-content .item-price {
    font-size: small;
    text-align: right;
  }
}
</style>
