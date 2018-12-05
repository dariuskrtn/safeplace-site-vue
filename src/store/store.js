import Vue from 'vue'
import Vuex from 'vuex'
import person from './modules/person';
import camera from './modules/camera';
import floor from './modules/floor';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    floor: floor.app,
    camera: camera.app,
    person: person.app
  }
})
