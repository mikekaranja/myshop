<template>
  <div id="step-div" class="text-center">
    <div id="title" class="title">
      Awesome! <span style="color:gray;">Now about your ad.</span>
    </div>
    <div class="subtitle-2 font-regular">
      Describe the product you're advertising
    </div>
    <v-text-field
      v-model="productdescription"
      solo
      label="E.g fantastic bags for ladies"
      counter="30"
    ></v-text-field>
    <div class="subtitle-2 font-regular">
      Say something about your ad
    </div>
    <v-text-field
      v-model="addescription"
      solo
      label="E.g New arrivals at 20% this weekend only"
      counter="90"
    ></v-text-field>
    <div id="upload-title" class="title">
      Upload images
    </div>
    <div>
      <div
        id="subtitle-2"
        style="margin-top:10px;"
        class="subtitle-2 font-weight-regular"
      >
        Upload 2 images to be displayed on your ad
      </div>
      <input
        ref="opengallery"
        style="display: none;"
        type="file"
        accept="image/*"
        @change="setImage($event)"
      />
      <!-- product images aligned -->
      <v-row class="mb-6">
        <v-col v-for="n in 2" :key="n" cols="6" style="margin-bottom:10px;">
          <div
            v-show="productimages[n].length === 0"
            class="image-placeholder"
            @click.native="addImage(n)"
          >
            <v-btn
              id="circle-btn"
              text
              icon
              color="black"
              @click.native="addImage(n)"
            >
              <v-icon large>mdi-plus-circle-outline</v-icon>
            </v-btn>
            <div class="caption" @click.native="addImage(n)">
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
            <!-- <v-btn text icon color="black" @click.native="deleteImage(n)">
              <v-icon>delete</v-icon>
            </v-btn> -->
          </div>
        </v-col>
      </v-row>
    </div>
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
  </div>
</template>

<script>
import { storage } from '~/plugins/firebase'
export default {
  data() {
    return {
      productdescription: '',
      addescription: '',
      productimages: ['', '', '', ''],
      imageUrls: [],
      overlay: false,
      snackbar: false,
      snackbartext: '',
      imageuploaddone: 'block'
    }
  },
  computed: {
    fields() {
      return `${this.productdescription}|$${this.addescription}|$${this.imageUrls}`
    }
  },
  watch: {
    fields(newVal, oldVal) {
      const arr = newVal.split('|$')
      if (
        arr[0].length > 0 &&
        arr[1].length > 0 &&
        this.imageUrls.length === 2
      ) {
        this.$bus.$emit('nextstep', '1')
        // send data to vuex
        const obj = {
          productdescription: this.productdescription,
          addescription: this.addescription,
          imageUrls: this.imageUrls
        }
        this.$store.commit('AdFormData', obj)
      } else {
        this.$bus.$emit('nextstep', '0.5')
      }
    }
  },
  methods: {
    addImage(n) {
      this.$refs.opengallery.click()
      this.imageselected = n
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
        const uploadTask = storage
          .ref(`ads/${this.$store.state.user.shopid}/${imagename}`)
          .put(imageFile)

        uploadTask.on(
          'state_changed',
          function(snapshot) {},
          function(error) {
            // Handle unsuccessful uploads
            console.log(error)
          },
          function() {
            storage
              .ref(`ads/${this.$store.state.user.shopid}/${imagename}`)
              .getDownloadURL()
              .then(downloadURL => {
                // eslint-disable-next-line no-console
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
    }
  }
}
</script>

<style scoped>
#circle-btn {
  margin-top: 10px;
}
#step-div {
  padding: 12px;
}
#upload-title {
  text-align: left;
  margin-top: 40px;
}
#title {
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: left;
}
.subtitle-2 {
  margin-top: 40px;
  margin-bottom: 15px;
  text-align: left;
}
#subtitle-2 {
  margin-bottom: 15px;
  text-align: left;
}
.image-placeholder {
  margin: 5px;
  height: 200px;
  width: 95%;
  text-align: center;
  padding: 30px;
  border-radius: 4px;
  margin: auto;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.product-image {
  display: block;
  border-radius: 4px;
  object-fit: cover;
  height: 200px;
  width: 95%;
  margin: 5px;
  margin: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
@media only screen and (max-width: 768px) {
  .image-placeholder {
    height: 140px;
  }
  .product-image {
    height: 140px;
  }
}
</style>
