import React from "react";
import "components/Container.scss";
import { MicroFrontend, types } from "microfrontends";

function Container() {
  
  return (
    <div className="Container">
      <MicroFrontend type={types.HEADER} />
      Project: microfrontend-container
      <MicroFrontend type={types.DASHBOARD} />
    </div>
  );
}

export default Container;
