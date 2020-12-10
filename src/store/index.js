import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectTree: [
      {
        id: 0,
        text: '浙江',
        children: [
          {
            id: 1,
            text: '温州',

            children: [
              {
                id: 4,
                text: '龙港',
                children: [
                  { id: 6, text: '涂厂', children: [] },
                  { id: 7, text: '六小', children: [] }
                ]
              },
              { id: 5, text: '马站', children: [] }
            ]
          },
          { id: 2, text: '温岭', children: [] }
        ]
      },
      { id: 3, text: '江苏', children: [] },
      { id: 8, text: '江苏', children: [] },
      {
        id: 9,
        text: '陕西',
        children: [
          {
            id: 10,
            text: '西安',
            children: [
              { id: 12, text: '碑林', children: [] },
              { id: 13, text: '雁塔', children: [] }
            ]
          },
          { id: 11, text: '蓝田', children: [] }
        ]
      }
    ],
    currentRank: 0,
    currentLastId: 0,
    activedId: 0,
    activeIndex: 0
  },
  getters: {
    // 给每级的每个元素添加所在等级和上级内容
    selectTreeWithRank: (state, getters) => (
      rank = 0,
      currentTree = state.selectTree,
      lastId = 0
    ) => {
      return currentTree.map((item) => {
        if (item.children && item.children.length > 0) {
          let nextrank = rank + 1;
          return {
            rank: rank,
            lastId: lastId,
            ...item,
            children: getters.selectTreeWithRank(nextrank, item.children, item.id)
          };
        } else {
          return { rank: rank, lastId: lastId, ...item };
        }
      });
    },
    // 得到一维数组
    reduceToOneDimension: (state, getters) => (arr) => {
      return [].concat(
        ...arr.map((item) => [].concat(item, ...getters.reduceToOneDimension(item.children)))
      );
    },
    getOneDimensionTree: (state, getters) => {
      return getters.reduceToOneDimension(getters.selectTreeWithRank());
    },
    // 根据条件筛选元素
    filterCurrentTree: (state, getters) => {
      return getters.getOneDimensionTree.filter((item) => {
        return item.rank === state.currentRank && item.lastId === state.currentLastId;
      });
    },
    findCurrentLastId: (state, getters) => (lastId) => {
      return getters.getOneDimensionTree.filter((item) => {
        return item.id === lastId;
      })[0].lastId;
    }
  },
  mutations: {
    changeCurrentTree: (state, newRank) => {
      state.currentRank = newRank.rank;
      state.currentLastId = newRank.lastId;
    },
    changeActiveId: (state, newId) => {
      state.activedId = newId;
    },
    changeActiveIndex: (state, newIndex) => {
      state.activeIndex = newIndex;
    }
  }
});

export default store;
