<template>
  <v-container class="login-container">
    <v-card min-width="400"
            outlined
            class="py-16">
      <v-form ref="form">
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field v-model.trim="account"
                          label="Account"
                          :rules="accountRules"
                          outlined />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-text-field v-model.trim="password"
                          label="Password"
                          :rules="passwordRules"
                          outlined />  
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="primary"
                 large
                 depressed
                 :disabled="isLoading"
                 @click.prevent="login">
          Login
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import { email, number } from '@/utils/Rules'
export default {
  name: 'Login',
  data() {
    return {
      account: '',
      password: '',
      accountRules: [ email ],
      passwordRules: [ number ],
      isLoading: false
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        this.isLoading = true
        await this.$store.dispatch('Environment/login', this.account)
        this.$router.push('/')
        this.isLoading = false
        this.account = ''
        this.password = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
