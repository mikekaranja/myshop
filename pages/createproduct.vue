<template>
  <div>
    <div class="headline">
      Create a product
    </div>
    <div class="scrolling-wrapper">
      <input
        ref="opengallery"
        style="display: none;"
        type="file"
        accept="image/*"
        @change="setImage($event)"
      />
      <!-- product images aligned -->
      <div v-for="n in 6" :key="n" class="product-images">
        <div
          v-show="productimages[n].length === 0"
          class="image-placeholder"
          @click.native="addImage(n)"
        >
          <v-btn text icon color="black" @click.native="addImage(n)">
            <v-icon large>mdi-plus-circle-outline</v-icon>
          </v-btn>
          <div class="add-image" @click.native="addImage(n)">
            Add Image
          </div>
        </div>
        <div v-show="productimages[n].length > 0" style="text-align:center;">
          <img
            v-show="productimages[n].length > 0"
            :ref="`image${n}`"
            class="product-image"
            :src="productimages[n]"
            alt=""
          />
          <v-btn text icon color="black" @click.native="addImage(n)">
            <v-icon>autorenew</v-icon>
          </v-btn>
          <v-btn text icon color="black" @click.native="deleteImage(n)">
            <v-icon>delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <v-form ref="form" v-model="valid" style="margin-top:40px;" lazy-validation>
      <v-text-field
        v-model="name"
        :counter="100"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="price"
        :rules="priceRules"
        type="number"
        label="Price"
        required
        @keypress="isNumber"
      ></v-text-field>

      <v-select
        v-model="category"
        :items="categories"
        attach
        chips
        label="Select categories"
        multiple
      ></v-select>

      <v-select
        v-model="subcategory"
        :items="subcategories"
        attach
        chips
        label="Select subcategories"
        multiple
      ></v-select>

      <div class="subtitle-2">Product description</div>
      <vue-editor
        v-model="description"
        style="margin-top:10px;margin-bottom: 40px;"
        :editor-toolbar="customToolbar"
      ></vue-editor>

      <v-btn
        class="create-product-btn"
        color="primary"
        rounded
        depressed
        block
        @click="validate"
        >Create Product</v-btn
      >
    </v-form>
    <!-- snackbar to show too many items to be uploaded at a time -->
    <v-snackbar v-model="snackbar">
      {{ snackbartext }}
    </v-snackbar>
    <!-- show upload overlay -->
    <v-overlay :value="overlay" light>
      <v-progress-circular
        v-show="!uploaddone"
        :size="50"
        :width="7"
        indeterminate
        color="white"
      ></v-progress-circular>
    </v-overlay>
    <!-- compress images at the bottom of the screen -->
    <div class="compress-below" :style="{ display: imageuploaddone }">
      <!-- compress image holder -->
      <img ref="imgSrc" style="width:100%;opacity:0;" />
      <!-- compressed image result -->
      <img
        id="imgResult"
        ref="imgResult"
        style="width:200px;margin-top:10px;opacity:0;"
      />
    </div>
  </div>
</template>

<script>
import { db, storage } from '~/plugins/firebase'
export default {
  data() {
    return {
      initialimage: '',
      myImage: {},
      cropImageDialog: false,
      uploaddone: false,
      overlay: false,
      snackbar: false,
      snackbartext: '',
      imageselected: 0,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters'
      ],
      price: '',
      priceRules: [
        v => !!v || 'Price is required'
        // v => (v && v > 0) || 'Price must be valid'
      ],
      category: '',
      // categories: ['mike', 'koko', 'jiko'],
      subcategory: '',
      subcategories: [],
      description: '',
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ],
      productimages: ['', '', '', '', '', '', '', ''],
      imageUrls: [],
      focus: false,
      windowHeight: 0,
      deleteProductDialog: false,
      imageuploaddone: 'block'
    }
  },
  computed: {
    categories() {
      // eslint-disable-next-line prefer-const
      let categoryarr = []
      if (this.$store.state.categories) {
        this.$store.state.categories.map(el =>
          categoryarr.push(el.categoryname)
        )
      }
      return categoryarr
    }
  },
  watch: {
    category: function(val, oldval) {
      if (val.length > oldval.length) {
        const difference = val.filter(x => !oldval.includes(x))
        const sub = this.$store.state.categories.filter(
          el => el.categoryname === difference[0]
        )
        if (sub[0].subcategories) {
          this.subcategories.push(...sub[0].subcategories)
        }
      } else {
        const difference = oldval.filter(x => !val.includes(x))
        const sub = this.$store.state.categories.filter(
          el => el.categoryname === difference[0]
        )
        if (sub[0].subcategories) {
          const newArray = this.subcategories.filter(el => {
            return !sub[0].subcategories.includes(el)
          })
          this.subcategories = newArray
        }
      }
    },
    price: function(val, oldval) {
      // const valy = val.replace(/,/g, '')
      // // set comma to price
      // if (
      //   valy.length === 4 ||
      //   valy.length === 5 ||
      //   valy.length === 6 ||
      //   valy.length === 7 ||
      //   valy.length === 8 ||
      //   valy.length === 9 ||
      //   valy.length === 10 ||
      //   valy.length === 11 ||
      //   valy.length === 12
      // ) {
      //   this.price = valy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      // }
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight
  },
  methods: {
    isNumber(evt) {
      evt = evt || window.event
      // eslint-disable-next-line prefer-const
      let charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
      return true
    },
    addImage(n) {
      this.$refs.opengallery.click()
      this.imageselected = n
    },
    deleteImage(n) {
      return this.productimages.splice(n, 1, '')
    },
    onResize() {
      if (this.windowHeight > window.innerHeight) {
        this.focus = true
      } else {
        this.focus = false
      }
    },
    setImage(e) {
      const image = URL.createObjectURL(e.target.files[0])
      switch (this.imageselected) {
        case 1:
          this.productimages.splice(1, 1, image)
          this.$refs.image1.src = image
          break
        case 2:
          this.productimages.splice(2, 1, image)
          this.$refs.image2.src = image
          break
        case 3:
          this.productimages.splice(3, 1, image)
          this.$refs.image3.src = image
          break
        case 4:
          this.productimages.splice(4, 1, image)
          this.$refs.image4.src = image
          break
        case 5:
          this.productimages.splice(5, 1, image)
          this.$refs.image5.src = image
          break
        case 6:
          this.productimages.splice(6, 1, image)
          this.$refs.image6.src = image
          break
        default:
          break
      }
      this.overlay = true
      this.imageuploaddone = 'block'
      this.compressImage(e)
    },
    compressImage(e) {
      const image = URL.createObjectURL(e.target.files[0])
      // const file = e.target.files[0]
      this.$refs.imgSrc.src = image
      setTimeout(() => {
        this.compress(this.$refs.imgSrc)
      }, 1000)
    },
    compress(img, position) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      const MAX_WIDTH = 400
      const MAX_HEIGHT = 400
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height
        height = MAX_HEIGHT
      }
      canvas.width = width
      canvas.height = height
      // var ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      const dataurl = canvas.toDataURL('image/jpeg')
      document.getElementById('imgResult').src = dataurl
      this.$refs.imgSrc.src = ''
      this.uploadImageAsPromise(this.dataURLtoBlob(dataurl))
    },
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    uploadImageAsPromise(imageFile) {
      return new Promise((resolve, reject) => {
        const randomnumber = Math.floor(Math.random() * 100000) + 1
        const imagename = `image-${randomnumber}`
        const uploadTask = storage.ref(`pwa/${imagename}`).put(imageFile)

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          'state_changed',
          function(snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          },
          function(error) {
            // Handle unsuccessful uploads
            // eslint-disable-next-line no-console
            console.log(error)
          },
          function() {
            storage
              .ref(`pwa/${imagename}`)
              .getDownloadURL()
              .then(downloadURL => {
                if (downloadURL) {
                  this.imageUrls.push(downloadURL)
                  this.overlay = false
                  this.imageuploaddone = 'none'
                }
              })
          }.bind(this)
        )
        resolve()
      })
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (!this.$refs.image1.src) {
          this.snackbartext = 'Please add the first image to continue'
          this.snackbar = true
        } else if (this.description.length === 0) {
          this.snackbartext = 'Kindly add a brief description'
          this.snackbar = true
        } else {
          this.saveProduct()
        }
      } else {
        window.scroll(0, 0)
      }
    },
    saveProduct() {
      // start overlay loader
      this.overlay = true
      const randomnumber = Math.floor(Math.random() * 1000000) + 1
      const shopid = this.$store.state.user.shopid
      const shopname = this.$store.state.user.shopname
      const product = {
        title: `Product-${randomnumber}`,
        shopid: shopid,
        shopname: shopname,
        item: 'product',
        name: this.name,
        price: parseInt(this.price.replace(',', '')),
        currency: 'Ksh',
        description: this.description,
        imageUrls: this.imageUrls,
        category: this.category,
        subcategory: this.subcategory,
        date_created: new Date().toString()
      }
      const newPostKey = db
        .ref()
        .child('pwa/products')
        .push().key

      product.id = newPostKey

      const updates = {}
      updates['pwa/products/' + newPostKey] = product

      return db
        .ref()
        .update(updates)
        .then(snap => {
          this.$router.push('/productuploaded')
        })
    }
  }
}
</script>

<style scoped>
.croppa-container {
  border-style: dashed;
  border-color: gray;
  border-width: thick;
}
#crop-title-2 {
  font-weight: 600;
  padding: 20px;
  color: gray;
  text-align: center;
}
.headline {
  font-family: 'Open Sans', sans-serif !important;
  margin-bottom: 30px;
  margin-left: 5px;
  font-weight: 700;
  text-align: left;
}
.display-3 {
  font-family: 'Open Sans', sans-serif !important;
  padding: 50px;
  font-weight: 700;
}
.back-btn {
  position: absolute;
  top: 18px;
}
.create-btn {
  font-size: large;
  text-transform: capitalize;
  font-weight: 500;
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
  left: 0;
}
.scrolling-wrapper {
  margin-top: 10px;
  display: -webkit-box;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.add-image {
  margin-top: 10px;
  color: black;
  font-weight: 500;
}
.image-placeholder {
  margin: 5px;
  height: 200px;
  width: 200px;
  text-align: center;
  padding: 40px;
  border-radius: 4px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.image-placeholder button {
  margin-top: 25%;
}
.product-image {
  display: block;
  border-radius: 4px;
  object-fit: cover;
  width: 200px;
  margin: 5px;
  height: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.compress-below {
  width: 100%;
  margin-top: 50px;
}
.create-product-btn {
  font-size: 18px;
  text-transform: capitalize;
  margin-bottom: 70px;
  font-weight: 700;
}
</style>
