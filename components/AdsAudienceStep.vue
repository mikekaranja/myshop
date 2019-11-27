<template>
  <div id="step-div" class="text-center">
    <div id="title" class="title">
      Tell us about your target audience
    </div>
    <div class="subtitle-2 font-weight-regular">Gender</div>
    <v-btn-toggle
      v-model="gender"
      style="width:100%;"
      mandatory
      tile
      color="primary"
      background-color="primary"
      group
    >
      <v-btn id="left-btn" value="All">
        All
      </v-btn>

      <v-btn id="middle-btn" value="Male">
        Male
      </v-btn>

      <v-btn id="right-btn" value="Female">
        Female
      </v-btn>
    </v-btn-toggle>
    <div class="subtitle-2 font-weight-regular">Age</div>
    <v-row>
      <v-col style="padding: 0px;" cols="4" sm="4">
        <v-card
          style="height: 40px;margin-left: 10px !important;"
          class="mx-auto"
        >
          <v-checkbox
            v-model="checkbox1"
            class="mx-2"
            label="18 - 24"
            color="primary"
            dense
          ></v-checkbox>
        </v-card>
      </v-col>
      <v-col style="padding: 0px;" cols="4" sm="4">
        <v-card
          style="height: 40px;margin-left: 5px !important;margin-right: 5px !important;"
          class="mx-auto"
        >
          <v-checkbox
            v-model="checkbox2"
            class="mx-2"
            label="25 - 34"
            color="primary"
            dense
          ></v-checkbox>
        </v-card>
      </v-col>
      <v-col style="padding: 0px;" cols="4" sm="4">
        <v-card
          style="height: 40px;margin-right: 10px !important;"
          class="mx-auto"
        >
          <v-checkbox
            v-model="checkbox3"
            class="mx-2"
            label="35 - 44"
            color="primary"
            dense
          ></v-checkbox>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="padding: 0px;" cols="4" sm="4">
        <v-card
          style="height: 40px;margin-left: 10px !important;"
          class="mx-auto"
        >
          <v-checkbox
            v-model="checkbox4"
            class="mx-2"
            label="45 - 54"
            color="primary"
            dense
          ></v-checkbox>
        </v-card>
      </v-col>
      <v-col style="padding: 0px;" cols="4" sm="4">
        <v-card
          style="height: 40px;margin-left: 5px !important;margin-right: 5px !important;"
          class="mx-auto"
        >
          <v-checkbox
            v-model="checkbox5"
            class="mx-2"
            label="55 - 64"
            color="primary"
            dense
          ></v-checkbox>
        </v-card>
      </v-col>
      <v-col style="padding: 0px;" cols="4" sm="4">
        <v-card
          style="height: 40px;margin-right: 10px !important;"
          class="mx-auto"
        >
          <v-checkbox
            v-model="checkbox6"
            class="mx-2"
            label="65+"
            color="primary"
            dense
          ></v-checkbox>
        </v-card>
      </v-col>
    </v-row>
    <div class="subtitle-2 font-weight-regular">Location</div>
    <!-- <v-select :items="locations" label="E.g Nairobi" solo></v-select> -->
    <v-text-field
      v-model="location"
      label="E.g Nairobi, Mombasa, Nakuru e.t.c"
      solo
    ></v-text-field>
    <div style="margin-top: 0px;" class="subtitle-2 font-weight-regular">
      Group
    </div>
    <v-row style="margin-right: -2px;margin-left: -2px;">
      <v-col
        v-for="(group, n) in groups"
        :key="n"
        style="padding: 5px;"
        cols="4"
        sm="4"
      >
        <v-card
          :id="`card-icon-${n}`"
          class="mx-card"
          @click="selectGroup(n, group.title)"
        >
          <img :id="`images-icon-${n}`" width="40" :src="group.icon" alt="" />
          <div :id="`caption-icon-${n}`" class="caption font-weight-bold">
            {{ group.title }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
      checkbox6: false,
      groups: [
        { icon: 'jumping-rope.svg', title: 'Kids' },
        { icon: 'study.svg', title: 'Students' },
        { icon: 'female-graduate-student.svg', title: 'University Students' },
        { icon: 'man.svg', title: 'Young Adults' },
        {
          icon: 'teenager-listening-music-with-headphones.svg',
          title: 'Millenials'
        },
        { icon: 'portfolio.svg', title: 'Working' },
        { icon: 'meeting.svg', title: 'Business People' },
        { icon: 'family-silhouette.svg', title: 'Family' },
        { icon: 'mother-with-baby-in-arms.svg', title: 'Mums' },
        { icon: 'baby.svg', title: 'Dads' },
        { icon: 'old-folks-couple.svg', title: 'Old People' }
      ],
      gender: '',
      age: [],
      location: '',
      group: []
    }
  },
  computed: {
    fields() {
      return `${this.gender}|${this.age}|${this.location}|${this.group}`
    }
  },
  watch: {
    gender(newVal, oldVal) {
      if (newVal === 'All') {
        // eslint-disable-next-line prefer-const
        let leftbtn = window.document.getElementById('left-btn')
        leftbtn.style.background = '#B13D00'
        leftbtn.style.color = '#fff'
        // eslint-disable-next-line prefer-const
        let middlebtn = window.document.getElementById('middle-btn')
        middlebtn.style.background = '#fff'
        middlebtn.style.color = 'black'
        // eslint-disable-next-line prefer-const
        let rightbtn = window.document.getElementById('right-btn')
        rightbtn.style.background = '#fff'
        rightbtn.style.color = 'black'
      } else if (newVal === 'Male') {
        // eslint-disable-next-line prefer-const
        let leftbtn = window.document.getElementById('left-btn')
        leftbtn.style.background = '#fff'
        leftbtn.style.color = 'black'
        // eslint-disable-next-line prefer-const
        let middlebtn = window.document.getElementById('middle-btn')
        middlebtn.style.background = '#B13D00'
        middlebtn.style.color = 'white'
        // eslint-disable-next-line prefer-const
        let rightbtn = window.document.getElementById('right-btn')
        rightbtn.style.background = '#fff'
        rightbtn.style.color = 'black'
      } else if (newVal === 'Female') {
        // eslint-disable-next-line prefer-const
        let leftbtn = window.document.getElementById('left-btn')
        leftbtn.style.background = '#fff'
        leftbtn.style.color = 'black'
        // eslint-disable-next-line prefer-const
        let middlebtn = window.document.getElementById('middle-btn')
        middlebtn.style.background = '#fff'
        middlebtn.style.color = 'black'
        // eslint-disable-next-line prefer-const
        let rightbtn = window.document.getElementById('right-btn')
        rightbtn.style.background = '#B13D00'
        rightbtn.style.color = 'white'
      }
    },
    fields(newVal, oldVal) {
      const arr = newVal.split('|')
      if (
        arr[0].length > 0 &&
        arr[1].length > 0 &&
        arr[2].length > 0 &&
        arr[3].length > 0
      ) {
        this.$bus.$emit('nextstep', '1')
        // send data to vuex
        const obj = {
          gender: this.gender,
          age: this.age,
          location: this.location,
          group: this.group
        }
        this.$store.commit('AdFormData', obj)
      } else {
        this.$bus.$emit('nextstep', '0.5')
      }
    },
    checkbox1(newVal, oldVal) {
      if (newVal === true) {
        this.age.push('18 - 24')
      } else {
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf('18 - 24')
        if (index !== -1) this.group.splice(index, 1)
      }
    },
    checkbox2(newVal, oldVal) {
      if (newVal === true) {
        this.age.push('25 - 34')
      } else {
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf('25 - 34')
        if (index !== -1) this.group.splice(index, 1)
      }
    },
    checkbox3(newVal, oldVal) {
      if (newVal === true) {
        this.age.push('35 - 44')
      } else {
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf('35 - 44')
        if (index !== -1) this.group.splice(index, 1)
      }
    },
    checkbox4(newVal, oldVal) {
      if (newVal === true) {
        this.age.push('45 - 54')
      } else {
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf('45 - 54')
        if (index !== -1) this.group.splice(index, 1)
      }
    },
    checkbox5(newVal, oldVal) {
      if (newVal === true) {
        this.age.push('55 - 64')
      } else {
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf('55 - 64')
        if (index !== -1) this.group.splice(index, 1)
      }
    },
    checkbox6(newVal, oldVal) {
      if (newVal === true) {
        this.age.push('65+')
      } else {
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf('65+')
        if (index !== -1) this.group.splice(index, 1)
      }
    }
  },
  methods: {
    selectGroup(n, title) {
      // eslint-disable-next-line prefer-const
      let card = window.document.getElementById(`card-icon-${n}`)
      // eslint-disable-next-line prefer-const
      let icon = window.document.getElementById(`images-icon-${n}`)
      if (card.style.background === 'rgb(177, 61, 0)') {
        card.style.background = '#fff'
        card.style.color = '#000'
        // eslint-disable-next-line prefer-const
        let src = icon.src.replace('_white.svg', '')
        icon.src = `${src}.svg`
        // eslint-disable-next-line prefer-const
        let index = this.group.indexOf(title)
        if (index !== -1) this.group.splice(index, 1)
      } else {
        card.style.background = '#B13D00'
        card.style.color = '#fff'
        // eslint-disable-next-line prefer-const
        let src = icon.src.replace('.svg', '')
        icon.src = `${src}_white.svg`
        this.group.push(title)
      }
    }
  }
}
</script>

<style scoped>
.theme--light.v-messages {
  display: none;
}
#images-icon-0 {
  width: 60px;
}
#images-icon-3 {
  width: 30px;
  opacity: 0.8;
}
#images-icon-7 {
  width: 56px;
}
#images-icon-8 {
  width: 30px;
}
.mx-card {
  padding: 11px;
  height: 111px;
}
.v-input--selection-controls.v-input .v-label {
  font-size: small;
}
#step-div {
  padding: 12px;
}
#title {
  margin-top: 10px;
  margin-bottom: 30px;
  text-align: left;
}
.subtitle-2 {
  text-align: left;
  margin-bottom: 10px;
  margin-top: 24px;
}
#right-btn {
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  width: 40%;
  text-transform: none;
}
#middle-btn {
  width: 35%;
  text-transform: none;
}
#left-btn {
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  width: 25%;
  text-transform: none;
}
.btn-press {
  background-color: #92302f !important;
  color: white;
}
.btn-not-pressed {
  background-color: #f5f5f5 !important;
  color: inherit;
}
</style>
