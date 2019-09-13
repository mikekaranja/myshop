<template>
  <div class="text-center" style="padding: 8px;">
    <!-- <v-btn class="back-btn" text icon color="black" @click="backBtn">
      <v-icon>mdi-window-close</v-icon>
    </v-btn> -->
    <v-toolbar flat>
      <div class="flex-grow-1"></div>

      <template>
        <v-btn icon color="black" @click="backBtn">
          <v-icon>mdi-window-close</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <input
      ref="opengallery"
      style="display: none;"
      type="file"
      accept="image/*"
      @change="setImage($event)"
    />
    <div class="header-text">
      Select a banner for your catalogue or <br />
      upload your own
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
      <v-btn
        :loading="loading"
        style="text-transform:capitalize;font-size: inherit;"
        block
        rounded
        color="primary"
        @click="saveBanner"
      >
        Save
      </v-btn>
      <v-btn
        style="font-weight:700;margin-top:10px;text-transform:capitalize;font-size: inherit;"
        block
        text
        rounded
        color="primary"
        @click="openBannerDialog"
      >
        Upload
      </v-btn>
    </div>
    <!-- Crop Banner dialog -->
    <v-dialog v-model="cropBannerDialog" fullscreen>
      <v-card class="rounded-card">
        <v-card-text
          style="padding-top:70px;padding-right:0px;padding-left:0px;"
        >
          <div id="crop-title" class="subtitle-1">
            Drag to position your banner
          </div>
          <vue-cropper
            ref="cropper"
            :zoomable="true"
            :min-crop-box-width="290"
            :min-crop-box-height="100"
            :crop-box-resizable="false"
            :src="img"
          ></vue-cropper>
          <div style="color:black;margin-left:8px;" class="subtitle-2">
            * banner size width: over 1500px
          </div>
          <div style="padding-left: 30px;padding-right:30px;margin-top: 90px;">
            <v-alert
              :value="alertsuccess9"
              style="width:95%;margin: auto;margin-top:12px;"
              dense
              type="success"
            >
              <strong>Banner uploaded successfully.</strong>
            </v-alert>
            <v-btn
              :loading="loading"
              style="margin-top:30px;font-weight:700;text-transform:none;"
              color="primary"
              rounded
              block
              depressed
              @click="uploadBanner"
              >Done</v-btn
            >
            <v-btn
              :disabled="loading"
              style="margin-top:10px;font-weight:700;text-transform:none;"
              color="primary"
              text
              rounded
              depressed
              block
              @click="cropBannerDialog = !cropBannerDialog"
              >Cancel</v-btn
            >
          </div>
        </v-card-text>
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
      img: '',
      imag: '',
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
      ]
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  mounted() {
    this.asyncData()
  },
  methods: {
    openBannerDialog() {
      this.$refs.opengallery.click()
    },
    setImage(e) {
      if (e) {
        const image = URL.createObjectURL(e.target.files[0])
        this.img = image
        this.cropBannerDialog = true
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
      this.$refs.cropper
        .getCroppedCanvas({
          width: 1500,
          height: 400
        })
        .toBlob(blob => {
          console.log(blob)
          this.uploadBannerAsPromise(blob)
        })
      // this.loader = 'loading'
      // if (!this.myBanner.hasImage()) {
      //   alert('No image to upload')
      // } else {
      //   this.myBanner.generateBlob(
      //     blob => {
      //       this.uploadBannerAsPromise(blob)
      //     },
      //     'image/jpeg',
      //     0.8
      //   )
      // }
    },
    // Handle waiting to upload each file using promise
    uploadBannerAsPromise(imageFile) {
      return new Promise((resolve, reject) => {
        const randomnumber = Math.floor(Math.random() * 100000) + 1
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
          }, 4000)
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
          document.getElementById(`img${i}`).style.borderWidth = 'inherit'
        }
      }
    }
  }
}
</script>

<style scoped>
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
  height: 105px;
  object-fit: cover;
  border: red;
  border-style: solid;
  border-radius: 16px;
  border-width: inherit;
}
.fixed-btm {
  padding: 20px;
  background: white;
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: block;
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
