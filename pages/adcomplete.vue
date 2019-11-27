<template>
  <div id="step-div" class="text-center">
    <div class="title">Congratatulations {{ $store.state.user.name }}!</div>
    <img id="img" src="/winners.svg" alt="image" />
    <div style="color:black;" class="subtitle-2 font-regular">
      Your ad has been submitted for review. We will alert you once it is
      approved.
    </div>
    <div class="bottom-nav">
      <v-btn class="bottom-btn" depressed color="primary" to="/addashboard">
        View my stats
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#step-div {
  padding: 12px;
}
#img {
  width: 45%;
}
.title {
  margin-top: 5%;
  margin-bottom: 30px;
}
.subtitle-2 {
  margin-top: 20px;
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
  #img {
    width: 95%;
  }
  .title {
    margin-top: 35%;
    margin-bottom: 30px;
  }
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
