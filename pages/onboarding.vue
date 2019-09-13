<template>
  <div v-resize="onResize">
    <v-stepper v-show="!hidestepper" v-model="e1">
      <v-btn
        v-show="e1 > 1"
        class="back-btn"
        text
        icon
        color="black"
        @click="backBtn"
      >
        <v-icon>arrow_back_ios</v-icon>
      </v-btn>
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1"></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 3" step="3"></v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 4" step="4"></v-stepper-step>
        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 5" step="5"></v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="text-center">
            <div
              style="margin-bottom:25px;font-size:15px!important;font-weight: 500;"
              class="subtitle-1"
            >
              Enter your shop details
            </div>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="number"
                :rules="numberRules"
                label="Enter WhatsApp number"
                placeholder="07"
                type="number"
                required
                prepend-icon="mdi-whatsapp"
              ></v-text-field>

              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Enter Shop name"
                required
                prepend-icon="create"
              ></v-text-field>

              <v-text-field
                v-model="website"
                :rules="websiteRules"
                label="Choose a website name"
                :hint="websitehint"
                required
                prepend-icon="mdi-web"
                persistent-hint
              ></v-text-field>

              <v-select
                v-model="currency"
                :items="currencies"
                menu-props="auto"
                label="Currency"
                hide-details
                prepend-icon="mdi-cash-usd"
                single-line
              ></v-select>

              <v-btn
                ref="validatestep1"
                style="margin-top:30px;visibility:hidden;"
                @click="validate"
                >submit</v-btn
              >
            </v-form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="text-center" style="padding: 8px;">
            <div
              style="margin-bottom:25px;font-size:15px!important;font-weight: 500;"
              class="subtitle-1"
            >
              Select a banner for your catalogue
            </div>
            <div class="banners-wrapper">
              <img
                v-for="(item, index) in banners"
                :id="`img${index}`"
                :key="item"
                :src="item"
                alt="banners"
                class="banners-img"
                @click="bannerClick(index)"
              />
            </div>
          </div>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="text-center" style="padding: 8px;">
            <div
              style="margin-bottom:25px;font-size:15px!important;font-weight: 500;"
              class="subtitle-1"
            >
              Tap add to create a category for your catalogue
            </div>
            <div style="display: grid;">
              <img
                style="margin: auto;"
                src="https://myshop.e-merse.com/upload.png"
                alt="upload"
              />
              <img
                style="margin: auto;height:110px;"
                src="https://myshop.e-merse.com/arrow.png"
                alt="upload"
              />
            </div>
          </div>
        </v-stepper-content>

        <v-stepper-content step="4">
          <div class="text-center" style="padding: 8px;">
            <div
              style="margin-bottom:25px;font-size: 15px !important;font-weight: 500;"
              class="subtitle-1"
            >
              Tap the category to upload products
            </div>
            <div class="subtitle-2">All Categories</div>
            <onboarding-category-card
              v-for="(category, index) in categories"
              :key="index"
              :item="category"
              @click.native="goTo5(category)"
            ></onboarding-category-card>
          </div>
        </v-stepper-content>

        <v-stepper-content step="5">
          <div
            style="margin-bottom:6px;text-align: center;font-size: 15px !important;font-weight: 500;"
            class="subtitle-1"
          >
            Tap add to create a product for this category
          </div>
          <div class="subtitle-2">
            <span style="color: gray;">All Categories ></span>
            {{ uploadcategory }}
          </div>
          <div style="display: grid;">
            <img
              style="margin: auto;"
              src="https://myshop.e-merse.com/upload.png"
              alt="upload"
            />
            <img
              style="margin: auto;height:110px;"
              src="https://myshop.e-merse.com/arrow.png"
              alt="upload"
            />
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <div
      v-show="!focus"
      :style="{ padding: `${e1 < 3 ? '40px' : ''}` }"
      class="fixed-btm"
    >
      <v-btn
        v-show="e1 === 1"
        :loading="loading"
        style="text-transform:capitalize;font-size: inherit;"
        block
        rounded
        color="primary"
        @click="nextBtn"
      >
        Next
      </v-btn>
      <v-btn
        v-show="e1 === 2"
        style="text-transform:capitalize;font-size: inherit;"
        block
        rounded
        color="primary"
        @click="nextBtn2"
      >
        Next
      </v-btn>
      <v-bottom-navigation v-show="e1 > 2" grow>
        <v-btn value="home" disabled>
          <span>Home</span>
          <v-icon>mdi-package-variant-closed</v-icon>
        </v-btn>

        <v-btn value="add" :disabled="addDisabled" @click="openSheet">
          <span>Add</span>
          <v-icon>add</v-icon>
        </v-btn>

        <v-btn value="catalogue" disabled>
          <span>Catalogue</span>
          <v-icon>mdi-eye-outline</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
    <!-- bottom sheets -->
    <!-- add stuff bottom sheet -->
    <v-bottom-sheet v-model="sheet">
      <v-list>
        <v-list-item
          v-for="tile in tiles"
          :key="tile.title"
          @click="addOptionClicked(tile.title)"
        >
          <v-list-item-avatar>
            <v-avatar size="32px" tile>
              <v-icon>{{ tile.icon }}</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-title>{{ tile.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-bottom-sheet>
    <!-- add category dialog -->
    <v-dialog v-model="addCategoryDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Add a category</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="uploadcategory"
            label="Category"
            prepend-icon="create"
          ></v-text-field>

          <v-alert
            style="font-size: smaller;text-align: center;"
            :value="alert"
            dark
            transition="scale-transition"
            dense
            outlined
            color="red"
          >
            Please add a valid category name
          </v-alert>

          <v-btn block rounded color="#92302F" dark @click="addCategory"
            >add</v-btn
          >
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- snackbar to show too many items to be uploaded at a time -->
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import OnboardingCategoryCard from '~/components/OnboardingCategoryCard'
export default {
  components: {
    OnboardingCategoryCard
  },
  data() {
    return {
      banners: [
        'Banner1-min.jpg',
        'Banner2-min.jpg',
        'Banner3-min.jpg',
        'Banner4-min.jpg',
        'Banner5-min.jpg',
        'Banner6-min.jpg',
        'Banner7-min.jpg',
        'Banner8-min.jpg',
        'Banner9-min.jpg',
        'Banner10-min.jpg'
      ],
      downloadurls: [],
      imagescompressed: [],
      e1: 1,
      catalogueready: false,
      hidestepper: false,
      showproductlayout: false,
      text: 'Uploading images, please wait 😃',
      value: 0,
      singleupload: 0,
      valueDeterminate: 0,
      imagesuploading: [],
      productsUploading: [],
      uploadingimages: false,
      snackbar: false,
      snackbarText: '',
      alert: false,
      uploadcategory: '',
      valid: true,
      nameRules: [
        v => !!v || 'Shop name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      numberRules: [
        v => !!v || 'WhatsApp number is required',
        v => (v && v.length === 10) || 'Phone number must be valid'
      ],
      website: '',
      websiteRules: [
        v => !!v || 'Website name is required',
        v => (v && v.length < 60) || 'Website must be less than 60 characters'
      ],
      websitehint: 'www.example.com',
      sheet: false,
      tiles: [],
      tiles2: [{ icon: 'mdi-tag-outline', title: 'Create a product' }],
      tiles3: [
        { icon: 'mdi-image-filter', title: 'Pictures from Gallery' },
        { icon: 'mdi-camera-enhance-outline', title: 'Pictures from Camera' }
      ],
      tiles1: [{ icon: 'mdi-folder-outline', title: 'Category' }],
      name: '',
      number: '',
      currency: 'Kenya Shillings (Ksh)',
      currencies: ['Kenya Shillings (Ksh)'],
      categories: [],
      focus: false,
      windowHeight: 0,
      addCategoryDialog: false,
      loader: null,
      loading: false,
      banner: '',
      ipuserdata: {}
    }
  },
  computed: {
    addDisabled() {
      let truth = true
      if (this.e1 === 3) {
        truth = false
      } else if (this.e1 === 5) {
        truth = false
      }
      return truth
    }
  },
  watch: {
    name: function name(val, oldval) {
      const web = val.replace(/ /g, '')
      this.websitehint = `e.g www.${web}.co.ke/www.${web}.com`
    },
    e1: function(val, oldval) {
      window.scroll(0, 0)
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 2000)

      this.loader = null
    }
  },
  mounted() {
    this.ipdata()
    this.windowHeight = window.innerHeight
  },
  methods: {
    bannerClick(index) {
      for (let i = 0; i < this.banners.length; i++) {
        const element = this.banners[i]
        if (i === index) {
          this.banner = element
          document.getElementById(`img${i}`).style.borderWidth = 'thick'
        } else {
          document.getElementById(`img${i}`).style.borderWidth = '0px'
        }
      }
    },
    async ipdata() {
      const data = await this.$axios.$get(
        'https://api.ipdata.co?api-key=371d9162f88bdd60ac87cbb7381fc0cefbe25c087b12040aac8d1d01'
      )
      console.log(data)
      this.ipuserdata = data
      return data
    },
    backBtn() {
      switch (this.e1) {
        case 1:
          this.e1 = this.e1 - 1
          break
        case 2:
          this.e1 = this.e1 - 1
          break
        case 3:
          this.e1 = this.e1 - 1
          break
        case 4:
          this.e1 = this.e1 - 1
          this.uploadcategory = ''
          this.categories = []
          break
        case 5:
          this.e1 = this.e1 - 1
          break
        default:
          break
      }
    },
    addCategory() {
      if (this.uploadcategory.length > 2) {
        this.categories.push(this.uploadcategory)
        this.addCategoryDialog = false
        this.e1 = 4
        this.addCategoryToDb(this.uploadcategory)
        // step 3 complete
        const shopName = this.name.trim().replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        // ga analytics
        this.$ga.event({
          eventCategory: 'Next button',
          eventAction: 'Step 3 complete',
          eventLabel: shopName,
          eventValue: 6
        })
        const shopId = shopName.replace(/ /g, '-').toLowerCase()
        return db
          .ref(`pwa/onboardingstats/onboarding-step3${shopId}`)
          .set({
            step: 'step3',
            shopid: shopId,
            phonenumber: this.number
          })
          .then(snap => {})
      } else {
        this.alert = true
      }
    },
    addCategoryToDb(newcategory) {
      const shopName = this.name
        .trim()
        .replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        .toLowerCase()
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      const category = {
        date_created: new Date().toString(),
        categoryname: newcategory,
        subcategory: [],
        shopid: shopId
      }
      const newPostKey = db
        .ref()
        .child('pwa/products')
        .push().key

      category.id = newPostKey
      const updates = {}
      updates['pwa/products/' + newPostKey] = category

      return db
        .ref()
        .update(updates)
        .then(snap => {})
    },
    addOptionClicked(title) {
      if (title === 'Category') {
        this.sheet = false
        this.addCategoryDialog = true
      } else {
        this.saveNewShop()
        this.$store.commit('setOnboardingCategory', this.uploadcategory)
        this.$router.push('/createproductonboarding')
        // step 5 complete
        const shopName = this.name.trim().replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        // ga analytics
        this.$ga.event({
          eventCategory: 'Next button',
          eventAction: 'Step 5 complete',
          eventLabel: shopName,
          eventValue: 8
        })
        const shopId = shopName.replace(/ /g, '-').toLowerCase()
        return db
          .ref(`pwa/onboardingstats/onboarding-step5${shopId}`)
          .set({
            step: 'step5',
            shopid: shopId,
            phonenumber: this.number
          })
          .then(snap => {})
      }
    },
    saveNewShop() {
      const shopName = this.name
        .trim()
        .replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        .toLowerCase()
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      let uid = this.$store.state.uid
      if (uid.startsWith('@')) {
        uid = uid.substr(1)
        uid = uid.slice(0, -1)
      }
      const user = {
        website: this.website,
        uid: uid,
        currency: 'Ksh',
        name: this.name,
        email: this.$store.state.email,
        shopname: shopName,
        shopid: shopId,
        phonenumber: this.number,
        payment_plan: '1 - 50 products $8/month',
        sign_up_date: new Date().toString(),
        expiry_date: this.addDays(1).toString(),
        ipdata: this.ipuserdata
      }
      this.snackbarText = ''
      this.snackbar = !this.snackbar
      return this.$store.commit('saveUser', user)
    },
    addDays(days) {
      const date = new Date()
      date.setDate(date.getDate() + days)
      return date
    },
    openSheet() {
      this.sheet = true
      if (this.e1 === 3) {
        this.tiles = this.tiles1
      } else if (this.e1 === 5) {
        this.tiles = this.tiles2
      }
    },
    goTo5(category) {
      this.uploadcategory = category
      this.e1 = 5
      // step 4 complete
      const shopName = this.name.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      // ga analytics
      this.$ga.event({
        eventCategory: 'Next button',
        eventAction: 'Step 4 complete',
        eventLabel: shopName,
        eventValue: 7
      })
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      return db
        .ref(`pwa/onboardingstats/onboarding-step4${shopId}`)
        .set({
          step: 'step4',
          shopid: shopId,
          phonenumber: this.number
        })
        .then(snap => {})
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.loader = 'loading'
        this.checkShopname()
      }
    },
    checkShopname() {
      const shopName = this.name.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      db.ref('pwa/users')
        .orderByChild('shopid')
        .equalTo(shopId)
        .on('value', snapshot => {
          // check if there is a shop with the same name
          if (snapshot.exists()) {
            this.snackbarText = 'A shop with that name already exists'
            this.snackbar = !this.snackbar
          } else {
            this.e1 = 2
            // step 1 complete
            this.$ga.event({
              eventCategory: 'Next button',
              eventAction: 'Step 2 complete',
              eventLabel: shopName,
              eventValue: 4
            })
            return db
              .ref(`pwa/onboardingstats/onboarding-step1${shopId}`)
              .set({
                step: 'step1',
                shopid: shopId,
                phonenumber: this.number
              })
              .then(snap => {})
          }
        })
    },
    nextBtn() {
      // check which slide the user is on
      if (this.e1 === 1) {
        this.$refs.validatestep1.click()
      }
    },
    nextBtn2() {
      // check which slide the user is on
      if (this.banner === '') {
        this.snackbarText = 'Please select an image to proceed'
        this.snackbar = true
      } else {
        this.e1 = 3
        this.addBannerToDB()
        // step 2 complete
        const shopName = this.name.trim().replace(
          // eslint-disable-next-line no-useless-escape
          /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
          ''
        )
        const shopId = shopName.replace(/ /g, '-').toLowerCase()
        // ga analytics
        this.$ga.event({
          eventCategory: 'Next button',
          eventAction: 'Step 2 complete',
          eventLabel: shopName,
          eventValue: 5
        })
        return db
          .ref(`pwa/onboardingstats/onboarding-step2${shopId}`)
          .set({
            step: 'step2',
            shopid: shopId,
            phonenumber: this.number
          })
          .then(snap => {})
      }
    },
    addBannerToDB() {
      const shopName = this.name.trim().replace(
        // eslint-disable-next-line no-useless-escape
        /[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi,
        ''
      )
      const shopId = shopName.replace(/ /g, '-').toLowerCase()
      return db
        .ref(`pwa/products/banner-${shopId}`)
        .set({
          banner: this.banner,
          shopid: shopId
        })
        .then(snap => {})
    },
    onResize() {
      if (this.windowHeight > window.innerHeight) {
        this.focus = true
      } else {
        this.focus = false
      }
    }
  }
}
</script>

<style scoped>
.banners-wrapper {
  margin-bottom: 100px;
}
.banners-img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border: red;
  border-style: solid;
  border-radius: 16px;
  border-width: 0px;
}
.fixed-btm {
  background: white;
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
  left: 0;
}
.subtitle-2 {
  font-weight: 600;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}
.mx-auto {
  padding: 10px;
  width: 100%;
  margin-top: 12px;
  text-align: center;
}
.uploading-images-text {
  font-size: small;
  margin-top: 10px;
}
.body-2 {
  font-weight: 500;
  margin-top: 16px;
}
#congrats-div {
  margin-top: 60px;
}
.congrats-image {
  width: 100%;
}
.congrats-btn {
  text-transform: capitalize;
  margin-top: 20px;
}
.back-btn {
  position: absolute;
  top: 18px;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
