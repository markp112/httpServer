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

  get introduction () {
    return this._introduction;
  }

  get geography () {
    return this._geography;
  }
}

module.exports = ICountry;

