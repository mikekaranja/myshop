<template>
  <v-layout class="text-center" wrap>
    <!-- desktop home page -->
    <div v-show="$vuetify.breakpoint.mdAndUp" class="desktop-div">
      <div v-if="noproducts === 1">
        <div class="header-top">
          <div
            id="categories-header-desktop"
            class="display-2 font-weight-bold header-left"
          >
            Home
          </div>
          <div class="header-right">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
            >
              <template v-slot:activator="{ on }">
                <v-btn class="date-btn" color="white" large v-on="on">
                  <v-icon
                    v-if="$vuetify.breakpoint.mdAndUp"
                    style="margin-right: 12px;"
                    right
                    color="#953332"
                    >$vuetify.icons.calendar</v-icon
                  >
                  Select date
                  <v-icon right color="#953332">mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-card>
                <functional-calendar
                  v-model="calendarData"
                  :configs="calendarConfigs"
                ></functional-calendar>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn class="btn" text @click="menu = false">Cancel</v-btn>
                  <v-btn class="btn" color="primary" text @click="menu = false"
                    >Apply</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div class="sub-header">
          <img class="img-sub" src="/stats.svg" alt="stats" />
          <div style="margin-bottom:7px;" class="display-1">Stats</div>
        </div>

        <v-row class="mb-6" style="margin-left: 1.5%;">
          <v-col cols="6" md="4">
            <v-card class="mx-auto" style="margin-right:60px !important;">
              <v-card-text style="padding:30px;">
                <p style="color:#953332;" class="display-4">
                  200
                </p>
                <div class="text--primary font-weight-bold">
                  VISITORS
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6" md="4">
            <v-card class="mx-auto" style="margin-right:60px !important;">
              <v-card-text style="padding: 30px;">
                <p style="color:#953332;" class="display-4">
                  12
                </p>
                <div class="text--primary font-weight-bold">
                  INQUIRIES
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="6" md="4">
            <v-card class="mx-auto" style="margin-right:60px !important;">
              <v-card-text style="padding: 30px;">
                <p style="color:#953332;" class="display-4">
                  3%
                </p>
                <div class="text--primary font-weight-bold">
                  CONVERSION
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div class="sub-header">
          <img class="img-sub" src="/comment.svg" alt="stats" />
          <div style="margin-bottom:10px;" class="display-1">Inquiries</div>
        </div>

        <v-data-table
          :headers="headers"
          :items="leads"
          :items-per-page="5"
          class="elevation-1 data-table"
          @click:row="handleClick"
        ></v-data-table>
      </div>
      <div v-if="noproducts === 0" class="gif-text-center">
        <v-progress-circular
          class="spinner"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </div>

    <!-- mobile home page -->
    <div
      v-show="$vuetify.breakpoint.smAndDown"
      style="width: 100%;min-height: 50vh;"
    >
      <div v-if="noproducts === 0" class="gif-text-center">
        <v-progress-circular
          class="spinner"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="noproducts === 1">
        <div class="header-top">
          <div class="headline font-weight-bold header-left-mobile">
            Home
          </div>
          <div class="header-right-mobile">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="200"
            >
              <template v-slot:activator="{ on }">
                <v-btn class="date-btn" color="white" medium v-on="on">
                  <v-icon style="margin-right: 12px;" right color="#953332"
                    >$vuetify.icons.calendar</v-icon
                  >
                  Select date
                  <v-icon right color="#953332">mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-card>
                <functional-calendar
                  v-model="calendarData"
                  :configs="calendarConfigs"
                ></functional-calendar>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn class="btn" text @click="menu = false">Cancel</v-btn>
                  <v-btn class="btn" color="primary" text @click="menu = false"
                    >Apply</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </div>

        <!-- mobile stats -->
        <div class="sub-header">
          <img class="img-sub" src="/stats.svg" alt="stats" />
          <div style="margin-bottom:-10px;" class="title font-weight-bold">
            Stats
          </div>
        </div>

        <div style="margin-top:20px;">
          <v-list>
            <v-list-item>
              <v-list-item-avatar
                style="min-width:24px;width:24px;height:24px;"
              >
                <v-img width="24" src="/eyetag.svg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <div
                  style="text-align: left;"
                  class="subtitle-1 font-weight-bold"
                >
                  VISITORS
                </div>
              </v-list-item-content>

              <v-list-item-icon>
                <div style="color:#953332;" class="headline font-weight-bold">
                  200
                </div>
              </v-list-item-icon>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-avatar
                style="min-width:24px;width:24px;height:24px;"
              >
                <v-img width="24" src="/comment.svg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <div
                  style="text-align: left;"
                  class="subtitle-1 font-weight-bold"
                >
                  INQUIRIES
                </div>
              </v-list-item-content>

              <v-list-item-icon>
                <div style="color:#953332;" class="headline font-weight-bold">
                  12
                </div>
              </v-list-item-icon>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item>
              <v-list-item-avatar
                tile
                style="min-width:20px;width:20px;height:20px;"
              >
                <v-img width="24" src="/percenttag.svg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <div
                  style="text-align: left;"
                  class="subtitle-1 font-weight-bold"
                >
                  CONVERSION
                </div>
              </v-list-item-content>

              <v-list-item-icon>
                <div style="color:#953332;" class="headline font-weight-bold">
                  3%
                </div>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </div>

        <!-- mobile inquiries -->
        <div class="sub-header">
          <img class="img-sub" src="/comment.svg" alt="stats" />
          <div style="margin-bottom:-10px;" class="title font-weight-bold">
            Inquiries
          </div>
        </div>

        <v-data-table
          :headers="headers"
          :items="leads"
          :items-per-page="5"
          disable-sort
          hide-headers="true"
          hide-default-header
          class="elevation-1 data-table"
          @click:row="handleClick"
        ></v-data-table>
      </div>
    </div>
    <v-dialog v-model="dialog" width="400">
      <v-card>
        <v-card-title primary-title>
          <v-icon
            style="margin-left: auto;"
            color="#953332"
            @click="dialog = false"
            >mdi-close</v-icon
          >
        </v-card-title>

        <v-card-text>
          <v-card elevation="0" class="mx-auto">
            <v-list two-line>
              <v-list-item>
                <v-list-item-icon>
                  <img src="/nametag.svg" alt="name" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Name</v-list-item-title>
                  <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <img src="/phonetag.svg" alt="phone" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Number</v-list-item-title>
                  <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <img src="/emailtag.svg" alt="message" />
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>Message</v-list-item-title>
                  <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      noproducts: 0,
      calendarData: {},
      calendarConfigs: {
        isDateRange: true
      },
      headers: [
        {
          text: 'Date & time',
          align: 'left',
          sortable: false,
          value: 'date'
        },
        { text: 'Name', align: 'center', sortable: false, value: 'name' },
        { text: 'Number', align: 'center', sortable: false, value: 'number' },
        {
          text: 'Message',
          align: 'center',
          sortable: false,
          value: 'message'
        }
      ],
      leads: [
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        },
        {
          date: '11.01.20 12:30 am',
          name: 'Lisa frida',
          number: '0723457890',
          message: 'Hi, do you have this thing I am looking for'
        }
      ]
    }
  },
  computed: {
    ...mapState(['adbanner', 'tour'])
  },
  mounted() {
    setTimeout(() => {
      if (this.$store.state.products.length > 0) {
        this.noproducts = 1
      } else if (this.$store.state.products.length < 1) {
        this.noproducts = 2
      }
    }, 2500)
    setTimeout(() => {
      if (this.$store.state.authenticated) {
        this.$bus.$emit('showbottomandtop', true)
      }
    }, 1000)
  },
  created() {
    setTimeout(() => {
      if (!this.$store.state.authenticated) {
        this.$router.push('/login')
      } else if (this.$store.state.authenticated) {
        this.getData()
        this.getUserData()
      }
    }, 50)
  },
  methods: {
    handleClick(value) {
      console.log(value)
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.data-table {
  margin-top: 10px;
  margin-left: 2.5%;
  margin-right: 60px !important;
  margin-bottom: 40px;
}
.sub-header {
  text-align: left;
  margin-left: 2.5%;
  margin-top: 25px;
  display: flex;
}
.img-sub {
  width: 40px;
  margin-right: 10px;
}
.btn {
  text-transform: none;
}
.date-btn {
  text-transform: none;
  color: dimgray;
  background-color: white;
}
.header-top {
  display: flex;
}
.header-right {
  margin-left: auto;
  margin-bottom: 20px;
  margin-top: 10px;
  margin-right: 60px;
}
.gif-text-center {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 75vh;
}
#add-here-text {
  color: white;
  margin-top: -37%;
  margin-left: 15px;
}
#add-here {
  position: fixed;
  bottom: 305px;
  right: 0;
  z-index: 999;
}
#add-text {
  color: white;
  margin-top: -36%;
}
#tap-here {
  display: none;
}
#empty-img {
  width: 35%;
  margin: auto;
  margin-top: 5%;
}
#nada-text {
  text-align: center;
  color: grey;
  margin-top: 30px;
}
#card-notice {
  background: rgb(92, 185, 91);
  color: white;
  margin-left: -12px;
  margin-right: -12px;
  text-align: end;
}
#fab-btn {
  position: absolute;
  right: 0;
  bottom: 61px;
}
.caption {
  text-align: initial;
  margin-left: 44px;
}
.desktop-div {
  width: 100%;
  margin-left: 26px;
}
#categories-header-desktop {
  text-align: left;
  margin-left: 25px;
  margin-bottom: 20px;
  margin-top: 10px;
}
.display-1 {
  font-family: 'Open Sans', sans-serif !important;
  font-weight: 700;
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-top: 18px;
}
.header-right-mobile {
  display: none;
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .header-right-mobile {
    display: block;
    position: absolute;
    top: -45px;
    z-index: 12;
    right: 16px;
  }
  .header-left-mobile {
    margin-left: 6px;
  }
  .img-sub {
    width: 25px;
    margin-right: 10px;
  }
  .data-table {
    margin-top: 20px;
    margin-left: 2.5%;
    margin-right: 0px !important;
    margin-bottom: 60px;
  }
}
</style>
