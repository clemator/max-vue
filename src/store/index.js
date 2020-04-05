import Vue from 'vue';
import Vuex from 'vuex';
import board from '@/store/modules/board/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    board,
  },
  strict: process.env.NODE_ENV !== 'production'
});
