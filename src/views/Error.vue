<template>
  <v-container>
    <v-row justify="center">
      <div class="error-msg">
        Page Not Found
      </div>
    </v-row>
    <v-row justify="center">
      <v-btn color="primary"
             medium
             depressed
             @click.prevent="goBack">
        Go Back
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.error {
  &-msg {
    margin: 2rem 0 0.5rem 0;
  }
}
</style>