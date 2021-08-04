<template>
  <div>
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
    <v-card class="my-4">
      <v-list shaped>
        <v-list-item-group multiple
                           v-model="selectedItems">
          <template v-for="(list, idx) in lists">
            <v-list-item two-line
                         :ripple="false"
                         :key="`${idx} - ${list.name}`"
                         :value="list && list.name">
              <template v-slot:default="{ active }">
                <v-list-item-avatar size="56">
                  <v-img height="5rem"
                        :src="list.logo" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="mr-2">
                    {{ list.status && list.status.type }}
                    </span>
                    <span v-if="checkStatusCode(list.status && list.status.code)">
                    預計出貨: {{ list.date }}
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle v-text="list.name">
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="checkStatusCode(list.status && list.status.code)">
                  <v-checkbox :input-value="active">
                  </v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>        
          </template>
        </v-list-item-group>
      </v-list>
    </v-card>
    <v-btn color="primary"
          large
          depressed
          :disabled="selectedItems.length === 0"
          @click.prevent="changeHandler">
      更改狀態
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'QueryOrder',
  data() {
    return {
      status: '',
      selectedItems: [],
      statusDropdown: [
        {
          text: '進行中',
          value: 0
        },
        {
          text: '已完成',
          value: 1
        }
      ]
    }
  },
  computed: {
    orders() { return this.$store.state.Home.orders },
    lists() {
      switch (this.status) {
        case 0:
          return this.orders.filter(el => el.status.code <= 2)
        case 1: 
          return this.orders.filter(el => el.status.code > 2)
        default:
          return this.orders
      }
    },
  },
  mounted() {
    this.$store.dispatch('Home/getOrder')
  },
  methods: {
    checkStatusCode(code) {
      return code <= 2
    },
    async changeHandler() {
      await this.selectedItems.forEach(el => {
        this.$store.dispatch('Home/postStatus', el)
      })
      this.selectedItems = []
    }
  }
}
</script>
