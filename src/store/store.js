import Vue from 'vue'
import Vuex from 'vuex'
import person from './modules/person';
import camera from './modules/camera';
import floor from './modules/floor';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataLoaded: false
  },
  mutations: {
    setDataLoaded() {
      state.dataLoaded = true;
    }
  },
  actions: {

  },
  modules: {
    floor: floor,
    camera: camera,
    person: person
  }
})
