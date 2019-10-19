
class IGeography  {
  
  constructor (location) {
    this.location = location
  }
  
  set coordinates(coordinates) {
    this._coordinates = coordinates;
  }
  get coordinates () {
    return this._coordinates;
  }
  
}
module.exports = IGeography;