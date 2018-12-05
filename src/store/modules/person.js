import * as Api from '@/api/api';
import * as config from '@/api/config';

export default floor = {
    namespaced: true,
    state: { 
      personList: []
    },
    mutations: {
      add(person) {
        state.personList.push(person);
      },
      save(person) {
        return Api().post(config.default.api.savePersonInfo, person);
      },
      saveImages(guid, images) {
        return Api().post(config.default.api.savePersonImage+"/"+guid, images);
      },
      load() {
        Api().get(config.default.api.getPeople).then(resp => {
            var data = JSON.parse(resp.data);
            data.forEach(person => {
                state.personList.push(person);
            });
        })
      }
    }
  }