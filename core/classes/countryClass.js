class ICountry {

  constructor(name) {
    this.name = name
  }

  set countryCode(code){
    this._countryCode = code
  }
  set introduction(introduction) {
    this._introduction = introduction;
  }

  set geography(geography) {
    this._geography = geography;
  }

  set mapReferences(mapReference) {
    this._mapReference = mapReference;
  }

  get countryCode() {
    return this._countryCode
  }

  get introduction()  {
    return this._introduction;
  }

  get geography()  {
    return this._geography;
  }

  get mapReferences() {
    return this._mapReference;
  }
}

module.exports = ICountry;

