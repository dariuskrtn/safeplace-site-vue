<template>
    <div id="home">
        <div class="window">
            <div class="floor">
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
                <!-- <div>
                   <ul class="demo">
                        <li v-for="value in currentFloor" v-bind:key="value.guid"  >
                            {{ value }}
                        </li>
                    </ul>
                </div> -->
                <div>
                    <!-- <div class="backgroundImage" :style="{'background-image': 'url(' + require('../Sketch.png') + ')', 'position': 'relative'}">
                        <img class="cam-pointer"  v-for="camera in currentCameras" :key="camera.guid" :src="getCameraImage(camera)" :alt="camera.name" v-on:mouseover="showIdentifiedPeople(camera)"
                            v-on:mouseleave="removeIdentifiedPeople()" :style="{'left': camera.positionX+'px',  'top': camera.positionY+'px', 'width':'15px', 'height': '15px' }"/>
                    </div> -->
                    <div class="backgroundImage" :style="{'background-image': 'url('+floorImage+')' , 'position': 'relative'}">
                        <img class="cam-pointer"  v-for="camera in currentCameras" :key="camera.guid" :src="getCameraImage(camera)" :alt="camera.name" v-on:mouseover="showIdentifiedPeople(camera)"
                            v-on:mouseleave="removeIdentifiedPeople()" :style="{'left': camera.positionX+'px',  'top': camera.positionY+'px', 'width':'15px', 'height': '15px' }"/>
                    </div>
                    

                   </div>


            </div>
            <div class="navigation">
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
                    <li v-for="floor in floorList" :key="floor.guid" v-on:click="setCurrentFloor(floor)">
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
                <br/>
                 <!-- <div class="col-md-12">
                    <button class="btn btn-default" v-on:click="loadImage()"> load image </button>
                    </div> -->
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
            //floorImage: require('../Sketch.png'),
            base64txt: '123',
        }
    },

    mounted: function (){

    },

    computed: {
        currentFloor: {
            get: function () {
                 if (null != this.$store.state.floor.currentFloor){
                    this._currentFloor = this.$store.state.floor.currentFloor;
                    return this._currentFloor;
                }
                else if (0 < this.$store.state.floor.floorList.length){
                    this._currentFloor = this.$store.state.floor.floorList[0];
                    return this._currentFloor;
                }
            },
            set: function (newValue) {               
                this.$store.commit("floor/setCurrentFloor", newValue);
            } 
        },

        floorImage () {
            

              if (this.currentFloor == null || this.currentFloor == undefined)
                 return;
            if (this.currentFloor.imagePath == null || this.currentFloor.imagePath == undefined || this.currentFloor.imagePath.endsWith(".png") || this.currentFloor.imagePath.endsWith(".jpg"))
                return require('@/assets/Floor2.png');
            else return 'http://localhost:54507/api/images/'+this.currentFloor.imagePath;
            // else
            //     return this.currentFloor.base64Image;

            //  if (this.currentFloor == null || this.currentFloor == undefined)
            //     return;
            // if (this.currentFloor.base64Image == "" || this.currentFloor.base64Image == null || this.currentFloor.base64Image == undefined)
            //     return require('@/assets/Floor2.png');
            // else
            //     return this.currentFloor.base64Image;
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

        showPreviousFloor: function(){
            var index = this.floorList.indexOf(this.currentFloor);
                if (index > 0)
            this.currentFloor = this.floorList[index-1]; 
        },

        showNextFloor: function (){
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
        },
        getCameraImage: function(camera){
            if (camera != null || camera != undefined)
            return require('@/assets/'+camera.status+'.png');
        },
        setCurrentFloor: function(newFloor){
            this.currentFloor = newFloor;
        }
        // Unused, things was done harder way
        // loadImage: function(){
        //     if (this.currentFloor == null)
        //         return;
                
        //     if (this.currentFloor.isImageLoaded){
        //         alert("Image is already loaded or can not be loaded");
        //         return;
        //     }

        //     if (this.currentFloor.imagePath.endsWith(".png") || this.currentFloor.imagePath.endsWith(".jpg")){
        //         alert("imagePath is saved, not a guid!")
        //         return;
        //     }

        //     this.currentFloor.isImageLoaded = true;
        //     var floorImage = this.$store.dispatch("floor/loadImage", this.currentFloor.imagePath).then(floorImage => {
        //     this.currentFloor.base64Image = 'data:image/jpeg;base64,' + this.$store.state.floor.image;
        //     //this.currentFloor.base64Image = floorImage;
        //     console.log(this.this.currentFloor.base64Image);
        //     });
       
        // }

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
