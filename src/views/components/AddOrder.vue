<template>
  <div>
    <v-form ref="form">
      <v-row justify="center">
        <v-col md="4">
          <v-text-field v-model.trim="name"
                        label="商品名稱"
                        :rules="rules"
                        outlined />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="4">
          <v-text-field v-model.trim="link"
                        label="圖示連結"
                        :rules="rules"
                        outlined />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col md="4">
          <v-select :items="statusDropdown"
                    item-text="text"
                    item-value="value"
                    v-model="status"
                    label="訂單狀態"
                    color="primary"
                    :rules="rules"
                    outlined />
        </v-col>
      </v-row>
      <v-btn color="primary"
             dark
             small
             fab
             absolute
             class="floating-button"
             @click="createAnOrder">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-form>
    <v-row v-if="lists.length > 0"
           justify="center">
      <v-col cols="12"
             sm="7"
             md="4">
        <v-card v-for="(item, index) in lists"
                :key="index"
                class="mt-4">
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ item.logo }}
          </v-card-subtitle>
          <v-card-text>
            {{ statusMatch[item.status.code] }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else-if="lists.length === 0 && isShowNotification"
           justify="center">
      可於訂單查詢查到新增的訂單
    </v-row>
    <v-btn color="primary"
           large
           depressed
           class="add-button"
           :disabled="lists.length === 0"
           @click.prevent="createOrders">
      新增
    </v-btn>
  </div>
</template>
<script>
import { required } from '@/utils/Rules'
export default {
  name: 'AddOrder',
  data() {
    return {
      name: '',
      link: '',
      status: '',
      lists: [],
      isShowNotification: false,
      rules: [ required ],
      statusDropdown: [
        {
          text: '處理中',
          value: 1
        },
        {
          text: '已成立',
          value: 2
        },
        {
          text: '已取消',
          value: 3
        },        
        {
          text: '已完成',
          value: 4
        }
      ],
      statusMatch: {
        1: '處理中',
        2: '已成立',
        3: '已取消',
        4: '已送達'
      }
    }
  },
  methods: {
    create() {
      if (this.$refs.form.validate()) {
        this.lists = [...this.lists, {
          name: this.name,
          logo: this.link,
          status: {
            code: this.status,
            type: this.statusMatch[this.status]
          }
        }]
        this.reset() 
      }
    },
    reset() {
      this.$refs.form.reset()
      this.name = ''
      this.link = ''
      this.status = ''
    },
    createAnOrder() {
      this.create()
    },
    async createOrders() {
      this.create()
      await this.$store.dispatch('Home/postOrder', this.lists)
      this.reset()
      this.lists = []
      this.isShowNotification = true
    }
  }
}
</script>
<style lang="scss" scoped>
.add-button {
  position: fixed;
  right: 10%;
  bottom: 10%;
}
.floating-button {
  top: 20%;
  left: 80%;
}
</style>