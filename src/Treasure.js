import React, { Component } from "react";
import { observer } from "mobx-react";

// Store
import thingStore from "./store/thingStore";

class Treasure extends Component {
  componentDidMount() {
    thingStore.fetchTreasure();
  }

  render() {
    const rows = thingStore.treasure.map(thing => (
      <tr key={thing.name} className="table-warning">
        <td>{thing.name}</td>
      </tr>
    ));

    return (
      <div className="mt-5 mx-auto col-6 text-center">
        <h1>Treasure</h1>
        <table style={{ width: "100%" }}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default observer(Treasure);
