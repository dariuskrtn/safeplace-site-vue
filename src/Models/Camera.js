export default function Camera () {
    this.guid = "";
    this.ipAddress = "";
    this.name = "";
    this.positionX = "";
    this.positionY = "";
    //Something like enum would be better
    this.status = 'Offline'; //Offline, Empty, Error, Good
    this.identifiedPeople = [];
}