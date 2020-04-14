<template>
  <div class="ad-buying-screen">
    <div class="top-nav">
      <v-btn class="mx-2" fab small text @click="previous">
        <v-icon color="black">mdi-arrow-left</v-icon>
      </v-btn>
      <div class="steps-indicator">
        <div :class="[e1 >= 1 ? 'oval-active' : 'oval-inactive']"></div>
        <div :class="[e1 >= 2 ? 'oval-active' : 'oval-inactive']"></div>
        <div :class="[e1 >= 3 ? 'oval-active' : 'oval-inactive']"></div>
        <div :class="[e1 >= 4 ? 'oval-active' : 'oval-inactive']"></div>
      </div>
    </div>
    <div class="step-holder">
      <ads-audience-step v-show="e1 === 1"></ads-audience-step>
      <ads-details-step v-show="e1 === 2"></ads-details-step>
      <ads-timeline-step v-show="e1 === 3"></ads-timeline-step>
      <ads-budget-step v-show="e1 === 4"></ads-budget-step>
    </div>
    <div class="bottom-nav">
      <v-btn
        :style="{ opacity: ops }"
        class="bottom-btn"
        depressed
        color="primary"
        @click="next"
        >{{ btnText }}</v-btn
      >
    </div>
  </div>
</template>

<script>
import { db } from '~/plugins/firebase'
import AdsAudienceStep from '~/components/AdsAudienceStep'
import AdsDetailsStep from '~/components/AdsDetailsStep'
import AdsTimelineStep from '~/components/AdsTimelineStep'
import AdsBudgetStep from '~/components/AdsBudgetStep'
export default {
  components: {
    AdsAudienceStep,
    AdsDetailsStep,
    AdsTimelineStep,
    AdsBudgetStep
  },
  data() {
    return {
      e1: 1,
      ops: '0.5',
      btnText: 'Continue'
    }
  },
  created() {
    this.$bus.$on('nextstep', value => {
      this.ops = value
    })
    this.$bus.$on('BtnText', value => {
      this.btnText = value
    })
  },
  methods: {
    next() {
      if (this.ops === '1') {
        if (this.btnText === 'Pay now') {
          this.$bus.$emit('Show Mpesa Till', true)
          this.btnText = 'Finish'
          this.ops = '0.5'
        } else if (this.btnText === 'Finish') {
          this.sendFormtoDB()
          this.$router.push('/adcomplete')
        } else {
          this.e1 = this.e1 + 1
          // return opacity
          this.ops = '0.5'
          if (this.e1 > 4) {
            this.$router.push('/adcomplete')
          }
          window.scrollTo(0, 0)
        }
      }
    },
    sendFormtoDB() {
      // Append the Data to Key
      db.ref(`pwa/ads/${this.$store.state.user.shopid}`).push(
        this.$store.state.addata
      )
    },
    previous() {
      if (this.e1 > 1) {
        if (this.btnText === 'Pay now') {
          this.$bus.$emit('Show Mpesa Till', false)
        } else {
          this.e1 = this.e1 - 1
          this.ops = '1'
        }
      } else if (this.e1 === 1) {
        this.$router.push('/inventory')
      }
    }
  }
}
</script>

<style scoped>
.step-holder {
  width: 40%;
  margin: auto;
  margin-bottom: 60px;
  margin-top: 30px;
}
.ad-buying-screen {
  min-height: 100vh;
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
}
.steps-indicator {
  width: 65%;
  display: flex;
  margin-top: 12px;
  margin: auto;
}
.mx-2 {
  margin-left: 0px !important;
}
.oval-inactive {
  width: 100%;
  height: 6px;
  border-radius: 40px;
  border: 1px solid grey;
  margin-left: 4px !important;
  margin-right: 4px !important;
}
.oval-active {
  width: 100%;
  height: 6px;
  border-radius: 40px;
  background: #953332;
  border: 1px solid #953332;
  margin-left: 4px !important;
  margin-right: 4px !important;
}
.bottom-nav {
  width: 94%;
  height: 65px;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  opacity: 1;
  padding: 12px;
  text-align: center;
}
.bottom-btn {
  text-transform: none;
  width: 41%;
  margin-left: 5%;
}
@media only screen and (max-width: 768px) {
  .step-holder {
    width: 100%;
  }
  .bottom-btn {
    text-transform: none;
    width: 100%;
    margin-left: 0%;
  }
}
</style>
