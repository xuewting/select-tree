<template>
  <div class="tree-select-box">
    <div class="title-box">
      <h3
        v-if="currentRank > 0"
        @click="
          changeCurrentTree({
            rank: currentRank - 1,
            lastId: findCurrentLastId(currentLastId)
          })
        "
      >
        <van-icon name="arrow-left" />
        返回上一级
      </h3>
    </div>

    <van-tree-select
      :items="filterCurrentTree"
      :main-active-index.sync="activeIndex"
      @click-nav="changeActiveIndex"
    >
      <template #content>
        <div v-for="item in filterCurrentTree[activeIndex].children" :key="item.id">
          <tree-select-content :content="item"></tree-select-content>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { Icon, TreeSelect } from 'vant';
import { mapGetters, mapMutations, mapState } from 'vuex';
import TreeSelectContent from './TreeSelectContent';

export default {
  name: 'my-tree-select',
  components: {
    [Icon.name]: Icon,
    [TreeSelect.name]: TreeSelect,
    TreeSelectContent
  },
  computed: {
    ...mapGetters(['filterCurrentTree', 'findCurrentLastId']),
    ...mapState(['currentLastId', 'currentRank']),
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set() {}
    }
  },
  methods: {
    ...mapMutations(['changeCurrentTree', 'changeActiveIndex'])
  }
};
</script>

<style lang="less" scoped>
.tree-select-box {
  margin: 10px;
  background-color: #f7f8fa;
  border-radius: 12px;
  box-shadow: 0 8px 12px #ebedf0;

  .title-box {
    height: 50px;

    h3 {
      margin: 0;
      padding: 16px 0 16px;
      color: rgba(69, 90, 100, 0.6);
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      cursor: pointer;
    }
  }
}
</style>
