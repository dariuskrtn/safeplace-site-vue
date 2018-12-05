import * as Api from '@/api/api.js';
import * as config from '@/api/config';

export default {
    namespaced: true,
    state: { 
        currentFloor: null,
        floorList: []
    },
    mutations: {
      add(floor) {
        state.floorList.push(floor);
      },
      save(floor) {
        return Api().post(config.default.api.saveFloor, floor);
      },
      load() {
        Api().get(config.default.api.getFloors).then(resp => {
            var data = JSON.parse(resp.data);
            data.forEach(floor => {
                state.floorList.push(floor);
            });
            
            if (state.floorList.length > 0) state.currentFloor = state.floorList[0];
        })
      }
    }
  }