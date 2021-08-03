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
    <v-list width="500">
      <v-list-item-group multiple
                         v-model="selectedItems">
        <template v-for="(list, idx) in lists">
          <v-list-item two-line
                       :key="idx"
                       :value="idx">
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
                <v-list-item-subtitle>
                {{ list.name }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action v-if="checkStatusCode(list.status && list.status.code)">
                <v-checkbox>
                </v-checkbox>
              </v-list-item-action>
          </v-list-item>        
        </template>
      </v-list-item-group>
    </v-list>
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
    changeHandler() {
      this.$store.dispatch('Home/postStatus', this.selectedItems)
    }
  }
}
</script>
<style lang="scss" scoped>
// .list {
//   &-status {
//     background: #f5f5f5;
//     padding: 0.5rem;
//     display: flex;
//     &-deco {
//       width: 0.5rem;
//       height: 1.5rem;
//       margin-left: 0.5rem;
//       margin-right: 1rem;
//       background-color: #46B035;
//     }
//     span {
//       align-self: center
//     }
//   }
// }
</style>
