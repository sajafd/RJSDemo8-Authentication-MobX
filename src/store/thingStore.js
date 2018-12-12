import { decorate, observable, computed } from "mobx";
import axios from "axios";

class ThingStore {
  constructor() {
    this.garbage = [];
    this.treasure = [];
  }

  fetchGarbage() {
    axios
      .get("https://precious-things.herokuapp.com/api/things/")
      .then(res => res.data)
      .then(things => (this.garbage = things))
      .catch(err => console.error(err));
  }

  fetchTreasure() {
    axios
      .get("https://precious-things.herokuapp.com/api/private-things/")
      .then(res => res.data)
      .then(things => (this.treasure = things))
      .catch(err => console.error(err));
  }
}

decorate(ThingStore, {
  garbage: observable,
  treasure: observable
});

const thingStore = new ThingStore();

export default thingStore;
