<template>
  <div id="step-div" class="text-center">
    <div class="title">
      Last step! <span style="color:gray;">Yup! It was that fast.</span>
    </div>
    <div v-if="!done">
      <div class="subtitle-2 font-regular">
        How much do you want to spend?
      </div>
      <div id="amount-here">
        <v-text-field
          v-model="amount"
          type="number"
          label="Enter amount here"
          :rules="[
            () => !!amount || 'Enter amount to continue',
            () =>
              (!!amount && amount >= 500) ||
              'The minimum amount to spend is Ksh 500'
          ]"
          solo
        ></v-text-field>
        <!-- <v-btn
          v-show="amount > 0"
          id="btn-done"
          color="primary"
          text
          small
          @click="showMpesa"
          >DONE</v-btn
        > -->
      </div>
      <div class="subtitle-2 font-regular">
        With {{ amount }} Ksh, you will get
      </div>
      <div style="display: flex;">
        <v-card id="first-card" class="mx-auto">
          <v-card-text>
            <v-icon color="primary">mdi-eye</v-icon>
            <div id="card-text">{{ views }} Views</div>
          </v-card-text>
        </v-card>
        <v-card class="mx-auto">
          <v-card-text>
            <v-icon color="primary">mdi-cursor-default-click</v-icon>
            <div id="card-text">{{ clicks }} Clicks</div>
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div v-if="done" id="last step">
      <img id="mpesa" src="/lipanampesa.png" alt="mpesa" />
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
        <v-btn
          style="text-transform:none;"
          text
          color="grey"
          x-small
          @click="copyNo"
        >
          <v-icon style="margin-right: 2px;" small left dark
            >mdi-content-copy</v-icon
          >
          Copy
        </v-btn>
      </div>
      <div id="instructions">
        Enter <strong>Amount</strong
        ><strong style="color:#92302f"> {{ amount }} Ksh</strong>
      </div>
      <div id="amount-here">
        <v-text-field
          v-model="mpesacode"
          label="Enter Mpesa code here"
          solo
        ></v-text-field>
      </div>
    </div>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <v-btn color="primary" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mpesacode: '',
      amount: '',
      snackbar: false,
      text: '',
      done: false
    }
  },
  computed: {
    clicks() {
      const clicks = (this.amount / 100) * 3
      return Math.round(clicks)
    },
    views() {
      const views = (this.amount / 100) * 200
      const rounded = Math.round(views)
      return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  watch: {
    amount(newVal, oldVal) {
      if (newVal > 0) {
        if (newVal >= 500) {
          this.$bus.$emit('nextstep', '1')
        } else {
          this.$bus.$emit('nextstep', '0.5')
        }
        this.$bus.$emit('BtnText', 'Pay now')
        // send data to vuex
        const obj = {
          amount: this.amount
        }
        this.$store.commit('AdFormData', obj)
      }
    },
    mpesacode(newVal, oldVal) {
      if (newVal.length > 0) {
        this.$bus.$emit('BtnText', 'Finish')
        this.$bus.$emit('nextstep', '1')
        // send data to vuex
        const obj = {
          mpesacode: this.mpesacode,
          shop: this.$store.state.user.shopid,
          date_created: new Date().toString()
        }
        this.$store.commit('AdFormData', obj)
      }
    }
  },
  created() {
    this.$bus.$on('Show Mpesa Till', value => {
      this.done = value
    })
  },
  methods: {
    showMpesa() {
      if (this.amount >= 500) {
        this.done = true
      }
    },
    async copyNo() {
      if (!navigator.clipboard) {
        // Clipboard API not available
        this.snackbar = true
        this.text = 'Please note the account number down instead'
        return
      }
      try {
        await navigator.clipboard.writeText('00301916431250')
        this.snackbar = true
        this.text = 'Copied to clipboard'
      } catch (err) {
        console.error('Failed to copy!', err)
      }
    }
  }
}
</script>

<style scoped>
#instructions {
  text-align: left;
  font-size: small;
  margin-bottom: 4px;
}
#step-div {
  padding: 12px;
}
#amount-here {
  margin-top: 20px;
  position: relative;
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
