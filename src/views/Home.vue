<template>
  <v-container>
    <div class="home-nav">
      <v-expansion-panels class="home-panel">
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
      <v-avatar color="secondaryDark"
                size="56">
        user
      </v-avatar>
    </div>
    <keep-alive include="QueryOrder">
      <component :is="renderDynamicComponent()"
                 class="home-content"></component>         
    </keep-alive>
  </v-container>
</template>
<script>
import QueryOrder from '@/views/components/QueryOrder'
import AddOrder from '@/views/components/AddOrder'
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
      switch (this.list) {
        case 0:
          return QueryOrder
        case 1:
          return AddOrder
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  &-nav {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
  &-panel {
    min-width: 10rem;
    width: 15%;
    margin-right: auto;
  }
}
</style>