import React, { Component } from "react";
import { observer } from "mobx-react";

// Store
import thingStore from "./store/thingStore";

class Garbage extends Component {
  componentDidMount() {
    thingStore.fetchGarbage();
  }

  render() {
    const rows = thingStore.garbage.map(thing => (
      <tr key={thing.name}>
        <td className="text-center">{thing.name}</td>
      </tr>
    ));

    return (
      <div className="mt-5 mx-auto col-6 text-center">
        <h1>Garbage</h1>
        <table style={{ width: "100%" }}>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default observer(Garbage);
