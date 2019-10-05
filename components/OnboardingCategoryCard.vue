<template>
  <v-card ripple max-width="100%" class="mx-auto">
    <v-row no-gutters>
      <v-col cols="8">
        <div class="links-text" style="display: flex;">
          <v-icon color="#A7CFFF">folder</v-icon>
          <div class="subtitle-1">{{ item }}</div>
        </div>
      </v-col>
      <v-col cols="4">
        <div style="display: flex;">
          <v-btn style="margin-left: auto;" text icon>
            <v-icon>create</v-icon>
          </v-btn>
          <v-btn class="share-btn" text icon>
            <v-icon>share</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      auto: 'auto'
    }
  }
}
</script>

<style scoped>
.links-text {
  text-decoration: none;
  color: black;
  margin-top: 5px;
  width: 100%;
}
.links-icon {
  text-decoration: none;
  margin-top: 5px;
}
.mx-auto {
  margin-top: 12px;
  width: 100%;
  padding: 12px;
  cursor: pointer;
}
.subtitle-1 {
  margin-left: 8px;
  font-weight: 400;
}
</style>
