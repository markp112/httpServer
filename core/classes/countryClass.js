class ICountry {

  constructor(name) {
    this.name = name
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

