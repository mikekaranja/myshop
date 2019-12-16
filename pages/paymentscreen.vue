<template>
  <div>
    <div v-if="!done" class="top-nav">
      <v-btn class="mx-2" fab small text to="/inventory">
        <v-icon color="black">mdi-arrow-left</v-icon>
      </v-btn>
      <div class="title font-weight-bold">Payment</div>
    </div>
    <div id="step-div" class="text-center">
      <div v-if="!done" id="way-to" class="title font-weight-regular">
        Way to go, <strong>{{ $store.state.user.shopname }}!</strong>
      </div>
      <div v-if="!done" id="last-step">
        <img id="mpesa" src="lipanampesa.png" alt="mpesa" />
        <div id="instructions">Go to <strong>MPESA</strong></div>
        <div id="instructions">Select <strong>Lipa Na Mpesa</strong></div>
        <div id="instructions">Select <strong>Paybill</strong> Option</div>
        <div id="instructions">
          Enter <strong>Paybill</strong> No.
          <strong style="color:#92302f"> 542 542</strong>
        </div>
        <div id="instructions">
          Enter <strong>Account</strong> No.
          <strong style="color:#92302f"> 00301916431250</strong>
        </div>
        <div id="instructions">
          Enter <strong>Amount </strong>Ksh
          <strong style="color:#92302f"> {{ amount }}</strong>
        </div>
        <div id="amount-here">
          <v-text-field
            v-model="mpesacode"
            label="Enter Mpesa code"
            :rules="[
              () => !!mpesacode || 'Enter valid mpesa code',
              () => mpesacode.length === 10 || 'Enter valid mpesa code'
            ]"
            solo
          ></v-text-field>
        </div>
        <v-btn
          v-if="!done"
          id="btn-press"
          :style="{ opacity: ops }"
          class="bottom-btn"
          depressed
          color="#B13D00"
          x-large
          @click="validate"
          >Finish</v-btn
        >
      </div>
      <div v-if="done" id="congrats-div" class="text-center">
        <img id="checked-img" src="/checked.png" alt="" />
        <div id="pay-sub" class="headline font-weight-bold">
          Payment Submitted
        </div>
        <div id="thank-you" class="caption">
          Thank you for your payment. <br />
          Our support agent will get in touch with you soon to confirm it
        </div>
        <v-btn
          id="contact-us"
          color="#B13D00"
          rounded
          large
          text
          block
          class="sub-btn"
          @click="openContacts"
          >Contact us</v-btn
        >
        <v-btn
          style="color: white;"
          color="#B13D00"
          rounded
          large
          block
          class="sub-btn"
          to="/inventory"
          >View my shop</v-btn
        >
      </div>
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn color="#B13D00" text @click="snackbar = false">
          close
        </v-btn>
      </v-snackbar>
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline" primary-title>
          Contact us
        </v-card-title>

        <v-card-text>
          <v-list two-line>
            <v-list-item @click="openWhatsApp">
              <v-list-item-icon>
                <v-icon color="#B13D00">mdi-whatsapp</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>0717 546 510</v-list-item-title>
                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item @click="openEmail">
              <v-list-item-icon>
                <v-icon color="#B13D00">mdi-email</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>arnold@e-merse.com</v-list-item-title>
                <v-list-item-subtitle>Work</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="#B13D00">mdi-map-marker</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Delta annex, 4th floor</v-list-item-title>
                <v-list-item-subtitle
                  >Westlands, Nairobi Kenya</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
export default {
  data() {
    return {
      dialog: false,
      mpesacode: '',
      amount: '',
      snackbar: false,
      text: '',
      done: false
    }
  },
  mounted() {
    const totalProducts = this.$store.state.products.length + 1
    console.log(this.$store.state.products)
    if (totalProducts <= 50) {
      this.amount = '800'
    } else if (totalProducts >= 300) {
      this.amount = '2400'
    } else if (totalProducts >= 2000) {
      this.amount = '4800'
    }
  },
  methods: {
    validate() {
      if (this.mpesacode.length === 10) {
        this.sendFormtoDB()
        this.done = true
      }
    },
    sendFormtoDB() {
      // Append the Data to Key
      db.ref(`pwa/mpesapayments`).push({
        mpesacode: this.mpesacode,
        shop: this.$store.state.user.shopname,
        amount: this.amount
      })
    },
    openWhatsApp() {
      window.open(`https://wa.me/254717546510?text=`, '_blank')
    },
    openEmail() {
      window.location.href = 'mailto:arnold@e-merse.com?subject=Payment'
    },
    openContacts() {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.dialog = true
        // window.open(
        //   `https://wa.me/254717546510?text=Hi, team e-merse!`,
        //   '_blank'
        // )
      } else {
        this.dialog = true
      }
    }
  }
}
</script>

<style scoped>
#contact-us {
  margin-bottom: 30px;
}
#thank-you {
  margin-bottom: 60px;
}
#pay-sub {
  margin-bottom: 30px;
}
.sub-btn {
  text-transform: capitalize;
  width: 100%;
}
#congrats-div {
  padding: 25px;
  text-align: center;
  margin-top: 30%;
}
.congrats-btn {
  text-transform: capitalize;
  margin-top: 40px;
}
#checked-img {
  width: 20%;
  margin-bottom: 30px;
}
#btn-press {
  color: white;
}
#last-step {
  padding-left: 3px;
  padding-right: 3px;
}
#way-to {
  margin-left: 0px;
  margin-top: 0px;
}
#instructions {
  text-align: left;
  font-size: small;
  margin-bottom: 4px;
}
#step-div {
  padding: 12px;
  margin-top: 0px;
  padding-top: 0px;
}
#amount-here {
  margin-top: 40px;
  position: relative;
  margin-bottom: 30px;
}
#btn-done {
  position: absolute;
  right: 0;
  top: 11px;
}
#card-text {
  color: black;
  margin: 4px;
  margin-top: 8px;
  font-weight: 500;
}
.mx-auto {
  width: 100%;
  margin-top: 25px;
}
#first-card {
  margin-left: 0px !important;
  margin-right: 2px !important;
}
.title {
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: left;
}
.subtitle-2 {
  margin-top: 40px;
  text-align: left;
}
#mpesa {
  width: 55%;
  margin-bottom: 10px;
}
.top-nav {
  background: white;
  padding: 12px;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 19;
  width: 100%;
  padding-bottom: 0px;
  padding-top: 0px;
}
.mx-2 {
  margin-left: 0px !important;
  margin-top: 7px;
}
.bottom-nav {
  bottom: 13%;
  width: 100%;
  height: 65px;
  position: fixed;
  background-color: #ffffff;
  opacity: 1;
  padding: 12px;
  text-align: center;
}
.bottom-btn {
  text-transform: none;
  width: 100%;
  margin-right: 2%;
}
@media only screen and (max-width: 768px) {
  .mx-auto {
    width: 130px;
  }
  #first-card {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
}
</style>
