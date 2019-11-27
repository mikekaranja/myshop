<template>
  <div class="text-center" style="padding: 8px;">
    <input
      id="uploadCaptureInputFile"
      ref="opengallery"
      style="display: none;"
      type="file"
      accept="image/*"
      @change="setImage($event)"
    />
    <div class="headline font-weight-bold">
      Select a banner for your catalogue or upload your own
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
    <div class="fixed-btm">
      <div class="flex-grow-1"></div>
      <v-btn
        style="margin-right: 30px;"
        class="banner-btn"
        outlined
        rounded
        color="primary"
        @click="openBannerDialog"
      >
        Upload your own banner
      </v-btn>
      <v-btn
        :loading="loading"
        class="banner-btn"
        rounded
        color="primary"
        @click="saveBanner"
      >
        Save banner
      </v-btn>
    </div>
    <!-- Crop Banner dialog -->
    <v-dialog v-model="cropBannerDialog" width="1000">
      <v-card class="rounded-card">
        <v-card-text
          style="padding-top:20px;padding-right:0px;padding-left:0px;"
        >
          <div id="crop-title" class="subtitle-1">
            Drag to position your banner
          </div>
          <clipper-fixed
            id="clipper-fix"
            ref="clipper"
            :ratio="0.98"
            :src="imgSrc"
            preview="fixed-preview"
          />
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
            @click="cropBannerDialog = !cropBannerDialog"
            >Cancel</v-btn
          >
          <v-btn
            :loading="loading"
            class="done-btn"
            color="primary"
            large
            rounded
            @click="uploadBanner"
          >
            Save banner
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
    <!-- snackbar -->
    <v-snackbar v-model="snackbar">
      {{ snackbartext }}
    </v-snackbar>
  </div>
</template>

<script>
import { db, storage } from '~/plugins/firebase'
export default {
  data() {
    return {
      resultURL: '',
      img: '',
      imgSrc: '',
      cropped: null,
      alertsuccess9: false,
      myBanner: {},
      cropBannerDialog: false,
      snackbartext: '',
      snackbar: false,
      loader: null,
      loading: false,
      imagebanner: '',
      banner: '',
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
      ]
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 5000)

      this.loader = null
    }
  },
  mounted() {
    this.asyncData()
  },
  methods: {
    cancel() {
      this.cropBannerDialog = !this.cropBannerDialog
      // this.$refs.cropper.reset()
    },
    openBannerDialog() {
      this.$refs.opengallery.click()
    },
    setImage(e) {
      this.cropBannerDialog = true
      if (e) {
        this.cropBannerDialog = true
        const image = URL.createObjectURL(e.target.files[0])
        this.imgSrc = image
        window.document.getElementById('uploadCaptureInputFile').value = null
      }
    },
    myBannerFile() {
      if (this.myBanner.naturalWidth < 1500) {
        setTimeout(() => {
          this.myBanner.remove()
          alert('You can only upload a banner with a width of over 1500px')
        }, 1500)
      }
    },
    uploadBanner() {
      this.loader = 'loading'
      const canvas = this.$refs.clipper.clip({ wPixel: 1500 })
      this.resultURL = canvas.toDataURL('image/jpeg', 1)
      this.uploadBannerAsPromise(this.dataURLtoBlob(this.resultURL))
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
    // Handle waiting to upload each file using promise
    uploadBannerAsPromise(imageFile) {
      return new Promise((resolve, reject) => {
        const randomnumber = Math.floor(Math.random() * 1000000)
        const name = `image-${randomnumber}`
        const uploadTask = storage.ref(`/pwa/${name}`).put(imageFile)
        uploadTask.on(
          'state_changed',
          function(snapshot) {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          function(error) {
            console.log(error)
          },
          function() {
            storage
              .ref(`/pwa/${name}`)
              .getDownloadURL()
              .then(downloadURL => {
                if (downloadURL) {
                  console.log(downloadURL)
                  this.addUploadBannerToDB(downloadURL)
                }
              })
          }.bind(this)
        )
        resolve()
      })
    },
    addUploadBannerToDB(url) {
      // ga analytics
      this.$ga.event({
        eventCategory: 'upload banner button',
        eventAction: 'Uploaded banner to DB',
        eventLabel: this.$store.state.user.shopname,
        eventValue: 21
      })
      return db
        .ref(`pwa/products/banner-${this.$store.state.user.shopid}`)
        .set({
          banner: url,
          shopid: this.$store.state.user.shopid
        })
        .then(snap => {
          this.alertsuccess9 = true
          setTimeout(() => {
            this.$router.push('/inventory')
          }, 3000)
        })
    },
    asyncData() {
      const shopId = this.$store.state.user.shopid
      return db
        .ref(`pwa/products/banner-${shopId}`)
        .once('value')
        .then(snapshot => {
          this.selectBanner(snapshot.val().banner)
        })
    },
    selectBanner(banner) {
      for (let i = 0; i < this.banners.length; i++) {
        const element = this.banners[i]
        if (element === banner) {
          this.banner = element
          document.getElementById(`img${i}`).style.borderWidth = 'thick'
        }
      }
    },
    saveBanner() {
      // check which slide the user is on
      if (this.banner === '') {
        this.snackbartext = 'Please select an image to proceed'
        this.snackbar = true
      } else {
        this.addBannerToDB()
      }
    },
    addBannerToDB() {
      // ga analytics
      this.$ga.event({
        eventCategory: 'select banner button',
        eventAction: 'Selected new banner to DB',
        eventLabel: this.$store.state.user.shopname,
        eventValue: 20
      })
      this.loader = 'loading'
      const shopId = this.$store.state.user.shopid
      return db
        .ref(`pwa/products/banner-${shopId}`)
        .set({
          banner: this.banner,
          shopid: shopId
        })
        .then(snap => {
          this.snackbartext = 'Banner uploaded successfully'
          this.snackbar = true
          setTimeout(() => {
            this.$router.push('/inventory')
          }, 3000)
        })
    },
    backBtn() {
      this.$router.push('/inventory')
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
    }
  }
}
</script>

<style scoped>
.done-btn {
  width: 35%;
  text-transform: capitalize;
  font-weight: 700;
}
#clipper-fix {
  height: 400px;
}
.headline {
  margin: 30px;
}
.banner-btn {
  font-weight: 700;
  text-transform: capitalize;
  font-size: inherit;
  width: 20%;
}
.header-text {
  margin-top: 0px;
  margin-bottom: 25px;
  font-size: 15px !important;
  font-weight: 600;
}
.banners-wrapper {
  margin-bottom: 100px;
}
.banners-img {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border: red;
  border-style: solid;
  border-radius: 16px;
  border-width: 0px;
}
.fixed-btm {
  padding: 20px;
  background: white;
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
  left: 0;
}
.back-btn {
  position: absolute;
  top: 5px;
  right: 10px;
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
