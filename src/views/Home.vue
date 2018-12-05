<template>
    <div id="home">
        <div class="window">
            <div class="floor">
              
                floor

                <div>
                    <h4> {{currentFloorName}} </h4>
                </div>
                <div>
                   <ul id="v-for-object" class="demo">
                        <li v-for="value in getCamera('1c5167cd-95c3-4ad9-9d6d-5f3067b85566')">
                            {{ value }}
                        </li>
                    </ul>
                </div>
                <div>
                   <ul class="demo">
                        <li v-for="value in getCurrentCameras()">
                            {{ value }}
                        </li>
                    </ul>
                </div>
                <div>
                    <img <!--src="http://localhost:54507/api/images/2d0c3a05-5b96-49d5-b20e-4b3a9de89357" --> alt = "Failed to upload floor image">
                </div>


            </div>
            <div class="navigation">
                navigation
                <div class="navigation-buttons">
                    <button v-on:click="ShowUpperFloor()"> Previous floor </button>
                    <button v-on:click="ShowLowerFloor()"> Next floor </button>
                </div>
                <hr/>
                <div>
                    <li v-for="floor in floorList" :key="floor.guid">
                       {{ floor.name }}
                    </li>
                </div>
                <hr/>
                <div>
                    Hovered camera spotted people:
                  <ul style="list-style: none;">
                    <li><pre>Name, Surname:</pre></li>
                    <li v-for="person in spottedPeople" :key="person.guid">
                      
                       {{ person.name }} {{person.lastName}}
                       
                    </li>
                  </ul>
                </div>
            </div>
              

        </div>
    </div>
</template>

<script>
// import { Component, Vue } from 'vue-property-decorator';
// import store from '@/store/store';
// import Camera from '@/models/Camera';
// import Floor from '@/models/Floor';

export default {
    
    data () {
        return {
            floorList: this.$store.state.floor.floorList,
            cameraList: this.$store.state.camera.cameraList,
            currentFloor: this.$store.state.floor.currentFloor,
            //when putting currentFloor.name it destroys page when currentFloor is null
            currentFloorName:  this.currentFloor.name,
            JustCameras : this.currentFloor.cameras
        }
    },

    watch: {

    },

    methods: {
       ShowUpperFloor: function(){
        var index = this.$store.state.floor.floorList.indexOf(this.currentFloor);
        if (index > 0)
        this.currentFloor = this.$store.state.floor.currentFloor = this.$store.state.floor.floorList[index-1]; 
      },
   
      ShowLowerFloor(){
        var index = this.$store.state.floor.floorList.indexOf(this.currentFloor);
        if (index < this.$store.state.floor.floorList.length-1)
        this.currentFloor = this.$store.state.floor.currentFloor = this.$store.state.floor.floorList[index+1]; 
      },

          // does not work as expected
      getCurrentCameras(){
        var someCameras = [];
            this.currentFloor.cameras.forEach(camera => {
              var temp = this.cameraList.find(cam => cam.guid == "95777b1b-9f98-4bad-8fff-837a7b41dc63");
              //[Tomas] a bit of workaround, can not find better solution - find can return undefine, and camera can not be ondefined (can;t null as well)
              camera = temp? temp : camera;
              someCameras.push(camera);
            })
            return someCameras;
        },

      getCamera(guid){
        return this.cameraList.find(cam => cam.guid == guid);
      } 
    }

    
}
</script>




<style>
    .navigation-buttons button {
    display: block;
    width: 60%;
    margin-left: auto;
    margin-right: auto;

    }
    .window {
        display: flex;
        flex: 1 1 0%;
        flex-direction: row-reverse;
    }
    .floor {
        flex: 1 1 0%;
    }
    .navigation{
        flex: 0 2 30%;
        max-width: 420px;
        min-width: 200px;
    }

</style>
