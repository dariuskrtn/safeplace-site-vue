import * as Api from '@/api/api';
import * as config from '@/api/config';

export default {
    namespaced: true,
    state: { 
      cameraList: []
    },
    mutations: {
      add(state, camera) {
        state.cameraList.push(camera);
      }
    },
    actions: {
      save(camera) {
        return Api.default.Axios.post(config.default.api.saveCamera, camera);
      },
      load({commit}) {
        Api.default.Axios.get(config.default.api.getCameras).then(resp => {
          var data = resp.data;
          data.forEach(camera => {
              commit("add", camera);
          });
      })
      }
    }
  }