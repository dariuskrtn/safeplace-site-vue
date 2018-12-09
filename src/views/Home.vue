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
                        <!-- Doesn't wotk vitha fake cameras array -->
                        <!-- <li v-for="value in getCamera('1c5167cd-95c3-4ad9-9d6d-5f3067b85566')">
                            {{ value }}
                        </li> -->
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
                    <div class="backgroundImage" :style="{'background-image': 'url(' + require('../Sketch.png') + ')'}">
                   <!-- <div style = {background-image: url("@../image2.png"); width:400px; height:600px; position: relative;}> -->
                        <!-- <img src="../dot.png" style = "position: relative; top:0px; left: -100px; width: 15px; height: 20px;"> -->
                        <!-- <img v-for="camera in cameraList" :src="camera.name" :alt="Camera can not be shown" :style = "position: relative; top: " + camera.positionY +"px; left: " + camera.positionX + "px; width: 15px; height: 20px;"> -->
                        <img v-for="camera in cameraList" src="../dot.png" :alt="camera.name"/>
                        <!-- <img src="../dot.png" alt="camera.name"> -->
                        </div>

                   </div>


            </div>
            <div class="navigation">
                navigation
                <div class="navigation-buttons">
                    <div class="col-md-12">
                    <button class="btn btn-default" v-on:click="ShowUpperFloor()"> Previous floor </button>
                    </div>
                    <br/>
                    <div class="col-md-12">
                    <button class="btn btn-default" v-on:click="ShowLowerFloor()"> Next floor </button>
                    </div>
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
            cameraList: [
                    {name: '../dot.png',
                    positionX: 100,
                    positionY: 100},
                    {name: '../dot.png',
                    positionX: 200,
                    positionY: 200},
                    {name: '../dot.png',
                    positionX: 100,
                    positionY: 100}
            ],
            currentFloor: null,
            //when putting currentFloor.name it destroys page when currentFloor is null
            //currentFloorName:  "",
            JustCameras : []
        }
    },
    mounted (){
        this.$store.dispatch('floor/load')
    },

    computed: {
        currentFloorName: function(){
            if (this.currentFloor == null)
                return;
            return this.currentFloor.name
        }
    },

    methods: {
        getCurrentFloor: function(){
            if (null == this.$store.state.floor.currentFloor)
                return;
            this.currentFloor = this.$store.state.floor.currentFloor;
            this.currentFloorName = currentFloor.name;
            return this.currentFloor;
        },
       ShowUpperFloor: function(){
        var index = this.$store.state.floor.floorList.indexOf(this.currentFloor);
        if (index > 0)
        this.currentFloor = this.$store.state.floor.currentFloor = this.$store.state.floor.floorList[index-1]; 
      },
   
      ShowLowerFloor: function (){
        var index = this.$store.state.floor.floorList.indexOf(this.currentFloor);
        if (index < this.$store.state.floor.floorList.length-1)
        this.currentFloor = this.$store.state.floor.currentFloor = this.$store.state.floor.floorList[index+1]; 
      },

          // does not work as expected
      getCurrentCameras: function (){
        if (this.currentFloor == null) return;
            this.currentFloor.cameras.forEach(camera => {
              var tempCam = this.cameraList.find(cam => cam.guid == camera);
              //[Tomas] a bit of workaround, can not find better solution - find can return undefine, and camera can not be ondefined (can;t null as well)
              //camera = tempCam? tempCam : camera;
              if (tempCam != undefined)
                this.cameraList.push(tempCam);
            })
        },

      getCamera: function(guid){
        if (this.cameraList.length == 0)
          return
        var camera = this.cameraList.find(cam => cam.guid == guid);
        if (camera != undefined)
        return camera;
      } 
    }

    
}
</script>




<style>
    .backgroundImage{
        width: 1024px;
        height: 720px;
        background-size: 100% 100%;
        border-radius: 10px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        position: relative;
    }
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
