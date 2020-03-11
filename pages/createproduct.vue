<template>
  <div>
    <v-container
      v-show="$vuetify.breakpoint.mdAndUp"
      class="white"
      style="padding:20px;"
    >
      <div id="addproduct-header" class="display-1 font-weight-bold">
        Add a product
      </div>
      <v-row no-gutters>
        <v-col :cols="6">
          <input
            ref="opengallery"
            style="display: none;"
            type="file"
            accept="image/*"
            @change="setImage($event)"
          />
          <!-- product images aligned -->
          <v-row class="mb-6" style="padding-top: 35px;padding-left: 14px;">
            <v-col v-for="n in 6" :key="n" cols="6" style="margin-bottom:10px;">
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
              <div
                v-show="productimages[n].length > 0"
                style="text-align:center;"
              >
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
            </v-col>
          </v-row>
        </v-col>
        <v-col :cols="6">
          <div class="subtitle-2">Product details</div>
          <v-form
            ref="formdesktop"
            v-model="valid"
            style="text-align:center;"
            lazy-validation
          >
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

            <v-text-field
              v-model="discountprice"
              type="number"
              label="Price after discount"
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

            <vue-editor
              v-model="description"
              style="margin-top:10px;margin-bottom: 40px;"
              placeholder="Enter product description"
              :editor-toolbar="customToolbar"
            ></vue-editor>

            <v-btn
              class="add-product-btn"
              color="primary"
              rounded
              depressed
              @click="validateDesktop"
              >Add Product</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
      <!-- snackbar to show too many items to be uploaded at a time -->
      <v-snackbar v-model="snackbar">
        {{ snackbartext }}
      </v-snackbar>
      <!-- show upload overlay -->
      <v-overlay style="z-index: 20;" :value="overlay" light>
        <v-progress-circular
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
    </v-container>
    <div v-show="$vuetify.breakpoint.smAndDown">
      <!-- <v-btn class="back-btn" text icon color="black" to="/onboarding">
      <v-icon>arrow_back_ios</v-icon>
    </v-btn> -->
      <div class="headline">
        Add a product
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
          <!-- <img
            v-show="productimages[n].length > 0"
            :ref="`image${n}`"
            class="product-image"
            :src="productimages[n]"
            alt=""
          /> -->
          <div
            v-show="productimages[n].length > 0"
            id="text-hold"
            style="text-align:center;"
          >
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
      <v-form
        ref="form"
        v-model="valid"
        style="margin-top:15px;"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="50"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="price"
          :rules="priceRules"
          label="Price"
          type="number"
          required
        ></v-text-field>

        <v-text-field
          v-model="discountprice"
          type="number"
          label="Price after discount"
          @keypress="isNumber"
        ></v-text-field>

        <!--  <v-text-field
          v-model="discountpercent"
          label="Discount percent"
          required
        ></v-text-field> -->

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
          style="margin-top:10px;"
          :editor-toolbar="customToolbar"
        ></vue-editor>

        <v-btn
          v-show="!focus"
          :disabled="!valid"
          color="primary"
          large
          class="create-btn"
          @click="validate"
        >
          Add product
        </v-btn>
      </v-form>
      <!-- Crop Banner dialog -->
      <v-dialog v-model="uploaddialog" width="1000">
        <v-card class="rounded-card">
          <v-card-text
            style="padding-top:20px;padding-right:0px;padding-left:0px;"
          >
            <!-- <div id="crop-title" class="subtitle-1">
              Drag to position your banner
            </div> -->
            <div style="color:black;margin-left:8px;" class="subtitle-2">
              * banner size width: over 1500px
            </div>
            <v-alert
              :value="alertsuccess9"
              style="margin: auto;margin-top:12px;"
              dense
              type="success"
            >
              <strong>The banner image has been uploaded successfully.</strong>
            </v-alert>
          </v-card-text>
          <v-card-actions style="padding: 15px;">
            <div class="flex-grow-1"></div>
            <v-btn
              :disabled="loading"
              style="margin-right: 30px;"
              class="done-btn"
              color="primary"
              rounded
              depressed
              outlined
              large
              @click="uploaddialog = !uploaddialog"
              >Cancel</v-btn
            >
            <v-btn
              :loading="loading"
              class="done-btn"
              color="primary"
              large
              rounded
              @click="uploadImage"
            >
              Save Image
            </v-btn>
          </v-card-actions>
          <img
            style="width:100%;opacity:0;"
            class="result"
            :src="resultURL"
            alt=""
          />
        </v-card>
      </v-dialog>
      <!-- snackbar to show too many items to be uploaded at a time -->
      <v-snackbar v-model="snackbar">
        {{ snackbartext }}
      </v-snackbar>
      <!-- show upload overlay -->
      <v-overlay :value="overlay" light>
        <v-progress-circular
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
  </div>
</template>

<script>
import { db, storage } from '~/plugins/firebase'
export default {
  data() {
    return {
      uploaddialog: false,
      discountpercent: '',
      discountprice: '',
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
    discountprice: function(val, oldval) {
      if (this.price > 0) {
        const diff = this.price - val
        console.log(diff, this.price)
        const rate = (diff / this.price) * 100
        const percent = Math.round(rate)
        if (val > parseInt(this.price)) {
          this.discountpercent = `Nan`
        } else {
          this.discountpercent = `${percent}%`
        }
      }
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
    // this.category = this.$store.state.category
    // this.categories.push(this.$store.state.category)
  },
  methods: {
    deleteImage(n) {
      return this.productimages.splice(n, 1, '')
    },
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
        const randomnumber = Math.floor(Math.random() * 1000000)
        const imagename = `image-${randomnumber}`
        const uploadTask = storage.ref(`pwa/${imagename}`).put(imageFile)

        uploadTask.on(
          'state_changed',
          function(snapshot) {},
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
                // eslint-disable-next-line no-console
                // console.log('File available at', downloadURL)
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
    addImage(n) {
      this.$refs.opengallery.click()
      this.imageselected = n
    },
    validate() {
      if (this.$refs.form.validate()) {
        if (!this.$refs.image1.src) {
          this.snackbartext = 'Please add the first image to continue'
          this.snackbar = true
        } else if (this.discountprice >= this.price) {
          this.snackbartext = 'Discount price should be lower than the price'
          this.snackbar = true
        } else {
          this.saveProduct()
        }
      } else {
        window.scroll(0, 0)
      }
    },
    validateDesktop() {
      if (this.$refs.formdesktop.validate()) {
        if (!this.$refs.image1.src) {
          this.snackbartext = 'Please add the first image to continue'
          this.snackbar = true
        } else {
          this.saveProduct()
        }
      } else {
        window.scroll(0, 0)
      }
    },
    saveProduct() {
      // ga analytics
      this.$ga.event({
        eventCategory: 'Add Product button',
        eventAction: 'Added Product',
        eventLabel: this.$store.state.user.shopname,
        eventValue: 101
      })
      // start overlay loader
      this.overlay = true
      const randomnumber = Math.floor(Math.random() * 1000000)
      const shopid = this.$store.state.user.shopid
      const shopname = this.$store.state.user.shopname
      const product = {
        title: `Product-${randomnumber}`,
        shopid: shopid,
        shopname: shopname,
        item: 'product',
        name: this.name,
        price: this.price,
        discountprice: this.discountprice,
        currency: 'Ksh',
        description: this.description,
        imageUrls: this.imageUrls,
        category: this.category,
        subcategory: this.subcategory ? this.subcategory : [''],
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
  margin: auto;
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
  margin: auto;
  height: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.compress-below {
  width: 100%;
  margin-top: 50px;
}
.add-product-btn {
  width: 50%;
  text-transform: capitalize;
  margin-bottom: 70px;
  font-weight: 700;
}
#addproduct-header {
  margin-left: 32px;
}

@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .headline {
    margin-top: 10px;
    font-family: 'Open Sans', sans-serif !important;
    margin-bottom: 20px;
    margin-left: 5px;
    font-weight: 900;
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
    border-radius: 0px;
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
}
</style>
