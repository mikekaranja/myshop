<template>
  <div class="bgimg">
    <div id="title" class="title font-weight-bold">
      Hi, {{ $store.state.user.name }}, market your products on google to
      increase sales!
    </div>
    <div class="subtitle-2 font-weight-regular">
      Once you have created your first marketing post, results will appear here.
    </div>
    <v-row style="margin-top: 10px;margin-right: -2px;margin-left: -2px;">
      <v-col style="padding: 5px;" cols="4" sm="4">
        <v-card class="mx-card">
          <div class="subtitle-1 font-weight-bold">- -</div>
          <div class="caption font-weight-regular">
            Total Clicks
          </div>
        </v-card>
      </v-col>
      <v-col style="padding: 5px;" cols="4" sm="4">
        <v-card class="mx-card">
          <div class="subtitle-1 font-weight-bold">- -</div>
          <div class="caption font-weight-regular">
            Total Views
          </div>
        </v-card>
      </v-col>
      <v-col style="padding: 5px;" cols="4" sm="4">
        <v-card class="mx-card">
          <div class="subtitle-1 font-weight-bold">- -</div>
          <div class="caption font-weight-regular">
            Amount Spent
          </div>
        </v-card>
      </v-col>
    </v-row>
    <div id="your-ads" class="subtitle-1 font-weight-bold">
      Your ads
    </div>
    <div id="img-wrap">
      <img id="empty-state" src="/nodata.svg" alt="" />
    </div>
  </div>
</template>

<style scoped>
.bgimg {
  background-image: url('../static/Rectangle.svg');
  width: 100%;
  height: 500px;
  padding: 20px;
}
.mx-card {
  padding: 12px;
  height: 111px;
  text-align: center;
}
#your-ads {
  margin-top: 15px;
}
#empty-state {
  width: 60%;
}
#img-wrap {
  text-align: center;
  margin-top: 30px;
}
</style>
