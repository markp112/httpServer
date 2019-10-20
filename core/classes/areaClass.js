
class IArea {

  constructor (globalRank) {
    this._globalRank = globalRank;
    this._areas = [];
  }

   addArea(type, value, units, ){
    let area = {type: type, value: value, units: units}
   this._areas.push(area);
  }

  get areas() {
    return this._areas;
  }

  getArea(type) {
    return this._areas.filter(area => area.type === type);
  }

  get globalRank() {
    return this.globalRank;
  }
}
module.exports = IArea;