import * as Api from '@/api/api';
import * as config from '@/api/config';

export default floor = {
    namespaced: true,
    state: { 
      cameraList: []
    },
    mutations: {
      add(camera) {
        state.cameraList.push(camera);
      },
      save(camera) {
        return Api().post(config.default.api.saveCamera, camera);
      },
      load() {
        Api().get(config.default.api.getCameras).then(resp => {
          var data = JSON.parse(resp.data);
          data.forEach(camera => {
              state.cameraList.push(camera);
          });
      })
      }
    }
  }