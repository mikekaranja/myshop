<template>
  <div class="bgimg">
    <!-- <v-card class="title-card">
      <div id="title-shop" class="subtitle-1 font-weight-bold">
        {{ $store.state.user.shopname }}
      </div>
    </v-card> -->
    <div id="title" class="title font-weight-bold">
      Shop Statistics
    </div>
    <v-row id="overall-ad">
      <v-col style="padding: 5px;" cols="4" sm="4">
        <v-card class="mx-card">
          <div class="subtitle-1 font-weight-bold">
            {{ user.totalclicks ? user.totalclicks : '0' }}
          </div>
          <div class="caption font-weight-regular">
            Total Clicks
          </div>
        </v-card>
      </v-col>
      <v-col style="padding: 5px;" cols="4" sm="4">
        <v-card class="mx-card">
          <div class="subtitle-1 font-weight-bold">
            {{ user.totalviews ? user.totalviews : '0' }}
          </div>
          <div class="caption font-weight-regular">
            Total Views
          </div>
        </v-card>
      </v-col>
      <v-col style="padding: 5px;" cols="4" sm="4">
        <v-card class="mx-card">
          <div class="subtitle-1 font-weight-bold">
            {{ user.amountspent ? user.amountspent : '0' }}
          </div>
          <div class="caption font-weight-regular">
            Spent
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div id="your-ads" class="subtitle-1 font-weight-bold">
      Your Ads
    </div>
    <v-row id="row-ads" style="margin-bottom: 100px;">
      <v-col v-for="(item, i) in ads" :key="i" cols="12">
        <v-card>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div style="display: flex;">
              <v-col id="col-1" cols="auto">
                <v-img
                  height="138"
                  width="111"
                  :src="item.imageUrls ? item.imageUrls[0] : '/upload.png'"
                ></v-img>
              </v-col>

              <v-col cols="auto">
                <v-btn
                  id="card-status"
                  x-small
                  depressed
                  rounded
                  color="green"
                  dark
                  >{{ item.status }}</v-btn
                >
                <div id="ad-desc" class="caption font-weight-bold">
                  {{ item.addescription }}
                </div>
                <div id="fromto" class="caption">
                  {{ item.fromdate }} to {{ item.todate }}
                </div>
                <div style="display: flex;">
                  <div class="caption font-weight-bold">
                    {{ item.views }}<span style="color: gray;"> Views</span>
                  </div>
                  <div
                    style="margin-left: 20px;"
                    class="caption font-weight-bold"
                  >
                    {{ item.clicks }}<span style="color: gray;"> Clicks</span>
                  </div>
                </div>
                <div style="margin-top: 10px;" class="caption">
                  {{ item.amount }} Ksh Budget
                </div>
              </v-col>
            </div>
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
      amountspent: '',
      totalviews: '',
      totalclicks: '',
      user: {},
      ads: []
    }
  },
  created() {
    setTimeout(() => {
      if (!this.$store.state.authenticated) {
        this.$router.push('/login')
      } else if (this.$store.state.authenticated) {
        this.getData()
        this.getTotals()
      }
    }, 50)
  },
  methods: {
    async getData() {
      const shopid = this.$store.state.user.shopid
      const data = await this.$axios.$get(
        `https://e-merse.firebaseio.com/pwa/ads/${shopid}.json`
      )
      const orderbydatearray = Object.values(data).sort((a, b) => {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date_created) - new Date(a.date_created)
      })
      this.ads = orderbydatearray
      return Object.values(data)
      // this.ads = orderbydatearray
      // return orderbydatearray
    },
    async getTotals() {
      const shopid = this.$store.state.user.shopid
      const data = await this.$axios.$get(
        `https://e-merse.firebaseio.com/pwa/users.json?orderBy="shopid"&equalTo="${shopid}"`
      )
      // const orderbydatearray = Object.values(data).sort((a, b) => {
      //   // Turn your strings into dates, and then subtract them
      //   // to get a value that is either negative, positive, or zero.
      //   return new Date(b.date_created) - new Date(a.date_created)
      // })
      this.user = Object.values(data)[0]
      return Object.values(data)
      // this.ads = orderbydatearray
      // return orderbydatearray
    }
  }
}
</script>

<style scoped>
#ad-desc {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
#fromto {
  font-size: 0.65rem !important;
}
#card-status {
  text-transform: capitalize;
}
#col-1 {
  padding: 0px;
}
.bgimg {
  width: 100%;
  height: 120px;
  padding: 20px;
}
#row-ads {
  width: 34%;
  margin: auto;
}
#overall-ad {
  width: 33%;
  margin-top: 18px;
  margin-right: -2px;
  margin-left: -2px;
  margin: auto;
}
.title-card {
  width: 33%;
  padding: 20px;
  margin: auto;
  margin-top: 6%;
  text-align: center;
}
#title {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 12px;
}
#title-shop {
  text-transform: uppercase;
}
.mx-card {
  padding: 12px;
  height: 90px;
  text-align: center;
}
#your-ads {
  margin-top: 15px;
  text-align: center;
}
#empty-state {
  width: 60%;
}
#img-wrap {
  text-align: center;
  margin-top: 30px;
}
@media only screen and (max-width: 768px) {
  #title {
    margin-top: 0px;
    text-align: left;
  }
  .title-card {
    width: 50%;
    padding: 20px;
    margin: auto;
    margin-top: 20%;
  }
  #row-ads {
    width: 100%;
    margin: auto;
  }
  #ad-row {
    width: 100%;
    margin: auto;
  }
  #your-ads {
    margin-top: 15px;
    text-align: left;
  }
  #overall-ad {
    width: 100%;
    margin-top: 18px;
    margin-right: -2px;
    margin-left: -2px;
    margin: auto;
  }
}
</style>
