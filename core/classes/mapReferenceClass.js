class IMapReferences {
  constructor(region) {
    this._region = region;
  }
  get region (){
    return this._region
  }
}

module.exports = IMapReferences;