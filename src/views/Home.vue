<template>
  <v-container fluid
               class="home-container">
    <div>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            訂單管理
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item-group v-model="list"
                                 mandatory>
                <v-list-item v-for="(item, i) in lists"
                             :key="i">
                  {{ item }}
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <keep-alive>
      <component :is="renderDynamicComponent()"
                class="home-content"></component>
    </keep-alive>
    <v-avatar color="secondaryDark"
              size="56">
      user
    </v-avatar>
  </v-container>
</template>
<script>
import QueryOrder from '@/components/QueryOrder'
import AddOrder from '@/components/AddOrder'
export default {
  name: 'Home',
  data() {
    return {
      lists: [ '訂單查詢', '新增訂單' ],
      list: null
    }
  },
  computed: {
  },
  methods: {
    renderDynamicComponent() {
      if (this.list === 0) {
        return QueryOrder
      } else if (this.list === 1) {
        return AddOrder
      }
    },
    // postOrder(value) {
    //   console.log(value)
    //   this.$store.dispatch('Home/createOrders', value)
    // }
  }
}
</script>
<style lang="scss" scoped>
.home {
  &-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &-content {
    flex-basis: 60%;
  }
}
</style>