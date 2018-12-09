import * as Api from '@/api/api';
import * as config from '@/api/config';

export default {
    namespaced: true,
    state: { 
      personList: []
    },
    mutations: {
      add(state, person) {
        state.personList.push(person);
      },
    },
    actions: {
      save(person) {
        return Api.default.Axios.post(config.default.api.savePersonInfo, person);
      },
      saveImages(guid, images) {
        return Api.default.Axios.post(config.default.api.savePersonImage+"/"+guid, images);
      },
      load({commit}) {
        Api.default.Axios.get(config.default.api.getPeople).then(resp => {
            var data = resp.data;
            data.forEach(person => {
                commit("add", person);
            });
        })
      }
    }
  }