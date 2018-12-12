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
                        <li v-for="value in currentFloor" v-bind:key="value.guid"  >
                            {{ value }}
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="backgroundImage" :style="{'background-image': 'url(' + require('../Sketch.png') + ')', 'position': 'relative'}">
                        <img class="cam-pointer"  v-for="camera in currentCameras" :key="camera.guid" src="../dot.png" :alt="camera.name" v-on:mouseover="showIdentifiedPeople(camera)"
                            v-on:mouseleave="removeIdentifiedPeople()" :style="{'left': camera.positionX+'px',  'top': camera.positionY+'px', 'width':'15px', 'height': '30px' }"/>
                        <!-- <img src="../dot.png" alt="camera.name"> -->
                        </div>

                   </div>


            </div>
            <div class="navigation">
                navigation
                <div class="navigation-buttons">
                    <div class="col-md-12">
                    <button class="btn btn-default" v-on:click="showPreviousFloor()"> Previous floor </button>
                    </div>
                    <br/>
                    <div class="col-md-12">
                    <button class="btn btn-default" v-on:click="showNextFloor()"> Next floor </button>
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
                    Hovered camera identfied people:
                  <ul style="list-style: none;">
                      <li v-if="spottedPeople.length == 0"> Hover on a camera <li>
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
            _currentFloor: null,
            spottedPeople: [],
        }
    },

    mounted: function (){

    },

    computed: {
        currentFloor: {
            get: function () {
                
                if (null != this._currentFloor ){
                    return this._currentFloor;
                }
                if (null != this.$store.state.floor.currentFloor){
                    this._currentFloor = this.$store.state.floor.currentFloor; 
                    return this._currentFloor;
                }
                if (0 < this.floorList.length){
                    this._currentFloor = this.floorList[0];   
                    return this._currentFloor;
                }
            },
            set: function (newValue) {
                this._currentFloor = newValue;

            }
        },

        floorList () {
            return this.$store.state.floor.floorList;
        },
        cameraList () { 
            return this.$store.state.camera.cameraList;
        },

        personList() {
            return this.$store.state.person.personList;
        },

        currentCameras () {
            var arr = [];
            if (this.currentFloor == null) 
                return;
            this.currentFloor.cameras.forEach(camera => {
                var tempCam = this.cameraList.find(cam => cam.guid === camera);
              if (tempCam != undefined)
              arr.push(tempCam)  
            });
            return arr;
        },

        currentFloorName: function(){
            if (this.currentFloor == null)
                return;
            return this.currentFloor.name;
        }
    },

    methods: {

        // setCurrentFloor: function (){
        //     if (null != this.$store.state.floor.currentFloor)
        //         this.currentFloor = this.$store.state.floor.currentFloor;
        //     if (this.floorList.length > 0)
        //         this.currentFloor = this.floorList[0];
        // },

        showPreviousFloor: function(){
            // var index = this.$store.state.floor.floorList.indexOf(this.currentFloor);
            // if (index > 0)
            // this.currentFloor = this.$store.state.floor.currentFloor = this.$store.state.floor.floorList[index-1]; 
            var index = this.floorList.indexOf(this.currentFloor);
                if (index > 0)
            this.currentFloor = this.floorList[index-1]; 
        },

        showNextFloor: function (){
            // var index = this.$store.state.floor.floorList.indexOf(this.currentFloor);
            // if (index < this.$store.state.floor.floorList.length-1)
            // this.currentFloor = this.$store.state.floor.currentFloor = this.$store.state.floor.floorList[index+1]; 
            var index = this.floorList.indexOf(this.currentFloor);
                if (index < this.floorList.length-1)
            this.currentFloor = this.floorList[index+1]; 
        },

        showIdentifiedPeople: function (camera){
            
            if (camera == null) 
                return;
                
            if (camera.identifiedPeople > 0)
            camera.identifiedPeople.forEach(person => {
                var tempPerson = this.personList.find(pers => pers.guid == person);
                if (tempPerson != undefined)
                    this.spottedPeople.push(tempPerson);
            });
            
            if (this.spottedPeople.length <= 0)
                this.spottedPeople.push({name: "No one identified"});
        },
        removeIdentifiedPeople(){
            while(this.spottedPeople.length > 0)
                this.spottedPeople.pop();
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
        position: absolute;
    }
    .navigation-buttons button {
        display: block;
        width: 60%;
        margin-left: auto;
        margin-right: auto;

    }
    .cam-pointer {
        position: absolute;
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
