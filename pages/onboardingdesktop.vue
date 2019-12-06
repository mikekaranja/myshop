<template>
  <div class="desktop-ui">
    <div class="step-list-holder">
      <v-list id="step-list">
        <v-list-item
          v-for="(item, n) in items"
          id="step-item"
          :key="n"
          @click="click"
        >
          <v-list-item-content>
            <v-list-item-title
              :id="`step-title-${n}`"
              class="step-title"
              style="font-family: 'Open Sans', sans-serif !important;"
              v-text="item.title"
            ></v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar id="step-avatar">
            <v-btn
              :id="`step-avatar-${n}`"
              style="font-family: 'Open Sans', sans-serif !important;font-size:large;font-weight:bold;"
              fab
            >
              {{ item.avatar }}
              <v-icon :id="`step-avatar-icon-${n}`" style="display: none;"
                >mdi-check</v-icon
              >
            </v-btn>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </div>
    <div class="card-holder">
      <v-card width="800" height="590" class="mx-auto">
        <v-card-title
          id="card-title"
          style="font-family: 'Open Sans', sans-serif !important;"
          >{{ headertitle }}</v-card-title
        >
        <v-card-text id="card-text">
          <div v-show="e1 === 1">
            <v-form
              ref="form"
              v-model="valid"
              class="first-form"
              lazy-validation
            >
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
                label="Preffered website name"
                :hint="websitehint"
                required
                prepend-icon="mdi-web"
                persistent-hint
              ></v-text-field>

              <!-- <v-select
                v-model="currency"
                :items="currencies"
                menu-props="auto"
                label="Currency"
                hide-details
                prepend-icon="mdi-cash-usd"
                single-line
              ></v-select> -->

              <v-btn
                ref="validatestep1"
                style="margin-top:30px;visibility:hidden;"
                @click="validate"
                >submit</v-btn
              >
            </v-form>
          </div>
          <div v-show="e1 === 2" class="banner-wrapper">
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
          <div v-show="e1 === 3" class="category-field">
            <v-text-field
              v-model="uploadcategory"
              label="Category"
              hint="e.g shoes, bags, colognes, perfumes, phones"
              required
              prepend-icon="mdi-pencil"
              persistent-hint
            ></v-text-field>
          </div>
          <div v-show="e1 === 4" class="add-product-wrapper">
            <add-product></add-product>
          </div>
          <div v-show="e1 === 5">
            <img
              id="onboarding-id"
              class="high-five"
              src="high-five.svg"
              alt="high"
            />
            <div id="onboarding-id" class="headline font-weight-bold">
              Congratulations!
            </div>
            <div class="headline font-weight-bold">
              Your shop website has been successfully created.
            </div>
          </div>
        </v-card-text>
        <v-card-actions id="card-actions">
          <div class="flex-grow-1"></div>
          <v-btn
            v-if="e1 !== 5"
            v-show="e1 !== 1"
            id="prev-btn"
            color="#B23B00"
            dark
            outlined
            rounded
            @click="previousBtn(e1)"
          >
            <v-icon left dark>mdi-arrow-left</v-icon>
            Previous</v-btn
          >
          <v-btn
            v-if="e1 !== 5"
            id="next-btn"
            color="#B23B00"
            dark
            rounded
            :loading="loading"
            @click="nextBtn(e1)"
          >
            Next
            <v-icon right dark>mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
            v-show="e1 === 5"
            id="upload-more-btn"
            color="#B23B00"
            dark
            outlined
            rounded
            large
            @click="createProduct"
          >
            Upload more products</v-btn
          >
          <v-btn
            v-show="e1 === 5"
            id="view-shop-btn"
            color="#B23B00"
            dark
            rounded
            large
            @click="viewShop"
          >
            Preview shop
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import AddProduct from '~/components/AddProduct'
export default {
  components: {
    AddProduct
  },
  data() {
    return {
      e1: 1,
      headertitle: 'Enter your shop details',
      items: [
        {
          title: 'Shop Details',
          avatar: '1'
        },
        {
          title: 'Shop Banner',
          avatar: '2'
        },
        {
          title: 'Add Category',
          avatar: '3'
        },
        {
          title: 'Add Product',
          avatar: '4'
        },
        {
          title: 'Shop is Live!',
          avatar: '5'
        }
      ],
      banners: [
        'buy 2 get 1 free banner-min.jpg',
        'Banner1-min.jpg',
        'Electronics cable blue best prices-min.jpg',
        'Banner2-min.jpg',
        'Electronics purple simple banner-min.jpg',
        'Banner3-min.jpg',
        'Fashion House floral blue!-min.jpg',
        'Banner4-min.jpg',
        'genuine imported electronics plain blue-min.jpg',
        'Banner5-min.jpg',
        'Ladies Collection slick purple banner-min.jpg',
        'Banner6-min.jpg',
        'Plug In with icons of electronics-min.jpg',
        'sketch dresses any occasion banner-min.jpg',
        'Banner8-min.jpg',
        'trends pink-min.jpg',
        'Banner9-min.jpg',
        'Banner10-min.jpg'
      ],
      downloadurls: [],
      imagescompressed: [],
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
  watch: {
    name: function name(val, oldval) {
      const web = val.replace(/ /g, '')
      this.websitehint = `e.g www.${web}.co.ke/www.${web}.com`
    },
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1600)

      this.loader = null
    },
    e1(val, oldVal) {
      switch (val) {
        case 1:
          this.headertitle = 'Enter your shop details'
          for (let i = 0; i < 5; i++) {
            if (i === val) {
              window.document.getElementById('step-title-0').style.color =
                '#ffffff'
              window.document.getElementById('step-avatar-0').style.background =
                '#945c66'
              window.document.getElementById('step-avatar-0').style.color =
                '#ffffff'
            } else {
              window.document.getElementById(`step-title-${i}`).style.color =
                '#9d8689'
            }
          }
          break
        case 2:
          this.headertitle = 'Select a header image for your shop'
          window.document.getElementById('step-avatar-icon-0').style.display =
            'block'
          this.items[0].avatar = ''
          for (let i = 0; i < 5; i++) {
            if (i === val) {
              window.document.getElementById('step-title-1').style.color =
                '#ffffff'
              window.document.getElementById('step-avatar-1').style.background =
                '#945c66'
              window.document.getElementById('step-avatar-1').style.color =
                '#ffffff'
            } else {
              window.document.getElementById(`step-title-${i}`).style.color =
                '#9d8689'
            }
          }
          break
        case 3:
          this.headertitle = 'Add product category'
          window.document.getElementById('step-avatar-icon-1').style.display =
            'block'
          this.items[1].avatar = ''
          for (let i = 0; i < 5; i++) {
            if (i === val) {
              window.document.getElementById('step-title-2').style.color =
                '#ffffff'
              window.document.getElementById('step-avatar-2').style.background =
                '#945c66'
              window.document.getElementById('step-avatar-2').style.color =
                '#ffffff'
            } else {
              window.document.getElementById(`step-title-${i}`).style.color =
                '#9d8689'
            }
          }
          break
        case 4:
          this.headertitle = 'Add a product'
          window.document.getElementById('step-avatar-icon-2').style.display =
            'block'
          this.items[2].avatar = ''
          for (let i = 0; i < 5; i++) {
            if (i === val) {
              window.document.getElementById('step-title-3').style.color =
                '#ffffff'
              window.document.getElementById('step-avatar-3').style.background =
                '#945c66'
              window.document.getElementById('step-avatar-3').style.color =
                '#ffffff'
            } else {
              window.document.getElementById(`step-title-${i}`).style.color =
                '#9d8689'
            }
          }
          break
        case 5:
          this.headertitle = ''
          window.document.getElementById('step-avatar-icon-3').style.display =
            'block'
          this.items[3].avatar = ''
          for (let i = 0; i <= 5; i++) {
            if (i === val) {
              window.document.getElementById('step-title-4').style.color =
                '#ffffff'
              window.document.getElementById('step-avatar-4').style.background =
                '#945c66'
              window.document.getElementById('step-avatar-4').style.color =
                '#ffffff'
            } else {
              window.document.getElementById(`step-title-${i}`).style.color =
                '#9d8689'
            }
          }
          break

        default:
          break
      }
    }
  },
  mounted() {
    // set first step UI
    window.document.getElementById('step-title-0').style.color = '#ffffff'
    window.document.getElementById('step-avatar-0').style.background = '#945c66'
    window.document.getElementById('step-avatar-0').style.color = '#ffffff'
  },
  created() {
    this.$bus.$on('moveStep5', value => {
      this.e1 = 5
    })
  },
  methods: {
    createProduct() {
      this.$store.commit('authUser', true)
      this.$store.commit('addToHomeScreen', 'newshop')
      this.$store.commit('saveUser', this.$store.state.onboardinguser)
      this.$router.push('/inventory')
    },
    viewShop() {
      this.$store.commit('authUser', true)
      this.$store.commit('addToHomeScreen', 'newshop')
      this.$router.push('/inventory')
      window.open(
        `https://shop.e-merse.com/?${this.$store.state.onboardinguser.shopid}`,
        '_blank'
      )
      this.$store.commit('saveUser', this.$store.state.onboardinguser)
    },
    nextBtn(e1) {
      switch (e1) {
        case 1:
          if (this.$refs.form.validate()) {
            this.loader = 'loading'
            this.checkShopname()
          } else {
            this.$refs.validatestep1.click()
          }
          break
        case 2:
          // this.e1 = 3
          this.nextBtn2()
          break
        case 3:
          this.addCategory()
          break
        case 4:
          this.$bus.$emit('validateAddProduct', true)
          // this.e1 = 5
          break
        case 5:
          break

        default:
          break
      }
    },
    previousBtn(e1) {
      switch (e1) {
        case 2:
          this.e1 = 1
          break
        case 3:
          this.e1 = 2
          break
        case 4:
          this.e1 = 3
          break
        case 5:
          break

        default:
          break
      }
    },
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
        // add to store
        this.categories.push(this.uploadcategory)
        this.addCategoryDialog = false
        this.e1 = 4
        this.$bus.$emit('setCategory', this.uploadcategory)
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
        this.snackbarText = 'Please provide a valid category name'
        this.snackbar = !this.snackbar
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
        .then(snap => {
          // add new shop
          this.saveNewShop()
        })
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
        // set userId
        this.$ga.set('userId', shopName)
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
      return this.$store.commit('saveUserBeforeAddProduct', user)
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
            // set cookie user data
            const shopdata = {
              shopid: shopId,
              shopname: shopName
            }
            this.$store.commit('setOnboardingShopID', shopdata)
            this.$ga.event({
              eventCategory: 'Next button',
              eventAction: 'Step 2 complete',
              eventLabel: shopName,
              eventValue: 4
            })
            // ad channel
            const ad = window.localStorage.getItem('ad')
            const landingpage = window.localStorage.getItem('landingpage')
            return db
              .ref(`pwa/onboardingstats/onboarding-step1${shopId}`)
              .set({
                ad: ad,
                landingpage: landingpage,
                step: 'step1',
                shopid: shopId,
                phonenumber: this.number
              })
              .then(snap => {})
          }
        })
    },
    nextBtn1() {
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
.add-product-wrapper {
  margin-top: 10px;
  margin-left: 55px;
  height: 400px;
  overflow-y: auto;
}
.headline {
  color: black !important;
}
.high-five {
  width: 50%;
  margin-bottom: 40px;
}
.category-field {
  width: 50%;
  margin: auto;
  margin-top: 60px;
  min-height: 50vh;
}
.banner-wrapper {
  margin-top: 25px;
  margin-left: 55px;
  height: 400px;
  overflow-y: auto;
}
.banners-img {
  width: 100%;
  height: 235px;
  object-fit: cover;
  border: red;
  border-style: solid;
  border-radius: 16px;
  border-width: 0px;
}
.first-form {
  width: 60%;
  margin: auto;
  margin-top: 40px;
}
#prev-btn {
  text-transform: capitalize;
  width: 25%;
}
#next-btn {
  text-transform: capitalize;
  width: 25%;
  margin-left: 50px;
}
#upload-more-btn {
  text-transform: capitalize;
}
#view-shop-btn {
  text-transform: capitalize;
  width: 25%;
  margin-left: 50px;
}
.desktop-ui {
  display: flex;
}
.mx-auto {
  position: relative;
  text-align: center;
  padding: 10px;
  margin-left: -47px !important;
  margin-top: 50px;
}
#card-title {
  font-weight: bold;
  margin: auto;
  width: fit-content;
}
#card-actions {
  padding: 40px;
  position: absolute;
  bottom: 0;
  width: 99%;
}
.step-list-holder {
  background: #5f3d42;
  height: 100vh;
  width: 35%;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
}
#step-list {
  background: #5f3d42;
  padding-top: 70px;
  border-top-right-radius: 20px;
}
#step-item {
  margin-bottom: 40px;
}
.step-title {
  /* color: #945c66; */
  color: #9d8689;
  font-size: x-large;
  margin-left: 90px;
  font-weight: 700;
}
#step-avatar {
  height: 60px !important;
  min-width: 60px !important;
  width: 60px !important;
  z-index: 12;
}
</style>
