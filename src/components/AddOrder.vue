<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model.trim="name"
                      label="商品名稱"
                      hide-details
                      outlined />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field v-model.trim="link"
                      label="圖示連結"
                      hide-details
                      outlined />
      </v-col>
      <v-col>
        <v-btn color="primary"
               dark
               small
               fab
               @click="createOrder">
          <v-icon>mdi-plus</v-icon>
      </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-select :items="statusDropdown"
                  item-text="text"
                  item-value="value"
                  v-model="status"
                  label="訂單狀態"
                  color="primary"
                  hide-details
                  outlined />
      </v-col>
    </v-row>
    <v-card v-for="(item, index) in lists"
            :key="index"
            class="mt-4"
            width="500">
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
    <v-btn color="primary"
           large
           depressed
           class="add-button"
           :disabled="!this.name || !this.link || !this.status"
           @click.prevent="addHandler">
      新增
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'AddOrder',
  data() {
    return {
      name: '',
      link: '',
      status: '',
      lists: [],
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
    createOrder() {
      if (this.name && this.link && this.status) {
        this.lists = [...this.lists, {
          name: this.name,
          logo: this.link,
          status: {
            code: this.status,
            type: this.statusMatch[this.status]
          }
        }]
        this.name = ''
        this.link = ''
        this.status = ''
      }
    },
    async addHandler() {
      this.createOrder()
      await this.$store.dispatch('Home/postOrder', this.lists)
      this.lists = []
    }
  }
}
</script>
<style lang="scss" scoped>
.add-button {
  position: absolute;
  right: 10%;
  bottom: 10%;
}
</style>