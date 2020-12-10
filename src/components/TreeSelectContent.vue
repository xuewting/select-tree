<template>
  <!-- S 若存在下级 -->
  <div
    v-if="content.children.length > 0"
    class="tree-select-content-box"
    @click="
      changeActiveIndex(0);
      changeCurrentTree({ rank: content.rank, lastId: content.lastId });
    "
  >
    <div class="content-box">
      <span>{{ content.text }}</span>
      <van-icon name="arrow" class="content-icon" />
    </div>
  </div>
  <!-- E 若存在下级 -->

  <!-- S 不存在下级 -->
  <div v-else class="tree-select-content-box" @click="changeActiveId(content.id)">
    <div class="content-box" :class="{ actived: $store.state.activedId === content.id }">
      <span>{{ content.text }}</span>
      <van-icon v-if="$store.state.activedId === content.id" class="content-icon" name="success" />
    </div>
  </div>
  <!-- E 不存在下级 -->
</template>

<script>
import { Icon } from 'vant';
import { mapMutations } from 'vuex';

export default {
  name: 'tree-select-content',
  components: {
    [Icon.name]: Icon
  },
  props: { content: null },
  methods: {
    ...mapMutations(['changeActiveId', 'changeCurrentTree', 'changeActiveIndex'])
  }
};
</script>

<style lang="less" scoped>
.tree-select-content-box {
  height: 50px;
  cursor: pointer;

  .content-box {
    display: block;
    padding: 16px;
    font-size: 14px;
    line-height: 16px;

    .content-icon {
      float: right;
    }
  }

  .actived {
    color: red;
  }
}
</style>
