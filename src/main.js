import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created: () => {
    store.commit("floor/load").then(
      () => store.commit("camera/load").then(
        () => store.commit("person/load").then(
          () => store.commit("setDataLoaded")
        )
      )
    )
  },
}).$mount('#app')
