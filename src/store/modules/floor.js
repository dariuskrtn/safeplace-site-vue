export default floor = {
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
          
      },
      load() {
          
      }
    }
  }