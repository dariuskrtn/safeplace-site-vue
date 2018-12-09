import * as Api from '@/api/api.js';
import * as config from '@/api/config';

export default {
    namespaced: true,
    state: { 
        currentFloor: null,
        floorList: []
    },
    mutations: {
      add(state, floor) {
        state.floorList.push(floor);
      },
      setCurrentFloor(state, floor) {
        state.currentFloor = floor;
      }
    },
    actions: {
      save(floor) {
        return Api.default.Axios.post(config.default.api.saveFloor, floor);
      },
      load({commit, state}) {
        Api.default.Axios.get(config.default.api.getFloors).then(resp => {
            var data = resp.data;
            
            data.forEach(floor => {
              commit("add", floor);
            });
            
            if (state.floorList.length > 0) commit("add", state.floorList[0]);
        })
      }
    }
  }