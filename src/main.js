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
    store.dispatch("floor/load").then(
      () => store.dispatch("camera/load").then(
        () => store.dispatch("person/load").then(
          () => store.dispatch("setDataLoaded")
        )
      )
    )
  },
}).$mount('#app')
