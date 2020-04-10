import * as types from './mutation-types';

const mutations = {
  [types.SET_DICT](state, list) {
    state.dict = list;
  },
  [types.SET_WAREHOUES_QUERY_ALL](state, list) {
    state.warehouseList = list;
  },
};

export default mutations;
