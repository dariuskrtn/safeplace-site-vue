import * as Api from '@/api/api.js';
import * as config from '@/api/config';
import axios from 'axios';

export default {
    namespaced: true,
    state: { 
        currentFloor: null,
        floorList: [],
        image: '',
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
            
            // This makes floor list "endless"
            //if (state.floorList.length > 0) commit("add", state.floorList[0]);
        })
      },
      loadImage({commit, state}, guid) {
        return axios
        .get('http://localhost:54507/api/images/'+guid, {
          responseType: 'arraybuffer'
        })
        .then(response => {
          state.image = new Buffer(response.data, 'binary').toString('base64');
        })

      }
      //http://localhost:54507/api/images/663e8a67-cbb8-4399-87ab-c7fb9d26f33d
    }
  }