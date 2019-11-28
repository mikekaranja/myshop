<template>
  <div id="step-div" class="text-center">
    <div class="title">
      Great! <span style="color:gray;">Now a bit on the timelines.</span>
    </div>
    <div class="subtitle-2 font-regular">
      When do you want the ad to start and end?
    </div>
    <v-row id="row-dates">
      <v-col id="col-dates-1" cols="6" sm="6">
        <div id="hint1">{{ hint1 }}</div>
        <v-text-field
          v-model="from"
          solo
          label="FROM"
          append-icon="mdi-calendar-month-outline"
          readonly
          @focus="openFrom"
        ></v-text-field>
      </v-col>

      <v-col id="col-dates-2" cols="6" sm="6">
        <div id="hint1">{{ hint2 }}</div>
        <v-text-field
          ref="to"
          v-model="to"
          solo
          label="TO"
          append-icon="mdi-calendar-month-outline"
          readonly
          @focus="openTo"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-fade-transition>
      <v-date-picker
        v-if="selectfrom"
        v-model="picker1"
        color="primary"
        :min="picker1"
        @change="dateFrom"
      ></v-date-picker>
    </v-fade-transition>
    <v-fade-transition>
      <v-date-picker
        v-show="selectto"
        v-model="picker2"
        :show-current="picker1"
        color="primary"
        :min="picker1"
        @change="dateTo"
      ></v-date-picker>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hint1: '',
      hint2: '',
      from: '',
      to: '',
      selectfrom: false,
      selectto: false,
      picker1: new Date().toISOString().substr(0, 10),
      picker2: new Date().toISOString().substr(0, 10)
    }
  },
  computed: {
    fields() {
      return `${this.from}|${this.to}`
    }
  },
  watch: {
    fields(newVal, oldVal) {
      const arr = newVal.split('|')
      if (arr[0].length > 0 && arr[1].length > 0) {
        this.$bus.$emit('nextstep', '1')
        // send data to vuex
        const obj = {
          fromdate: this.from,
          todate: this.to
        }
        this.$store.commit('AdFormData', obj)
      } else {
        this.$bus.$emit('nextstep', '0.5')
      }
    }
  },
  methods: {
    openFrom() {
      this.selectto = false
      setTimeout(() => {
        this.selectfrom = true
      }, 700)
    },
    openTo() {
      this.selectfrom = false
      setTimeout(() => {
        this.selectto = true
      }, 700)
    },
    dateFrom(e) {
      this.$refs.to.focus()
      this.from = this.reverseString(this.picker1)
      this.hint1 = 'From'
      this.openTo()
      window.scrollTo(0, 0)
    },
    dateTo(e) {
      this.to = this.picker2
      this.selectto = false
      this.hint2 = 'To'
      window.scrollTo(0, 0)
    },
    reverseString(str) {
      const splitString = str.split('-')
      const reverseArray = splitString.reverse()
      const joinArray = reverseArray.join('/')
      return joinArray
    }
  }
}
</script>

<style scoped>
#step-div {
  padding: 12px;
}
.title {
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: left;
}
.subtitle-2 {
  margin-top: 50px;
  text-align: left;
}
#row-dates {
  margin-right: 0px;
  margin-left: 0px;
  margin-top: 15px;
}
#col-dates-1 {
  padding-right: 10px !important;
}
#col-dates-2 {
  padding-left: 10px !important;
}
#hint1 {
  font-size: x-small;
  margin-bottom: 4px;
  text-align: left;
  height: 16px;
}
</style>
