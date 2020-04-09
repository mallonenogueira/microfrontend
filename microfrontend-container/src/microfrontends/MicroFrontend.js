import React from "react";
import { configs } from "./constants";

export default class MicroFrontend extends React.Component {
  componentDidMount() {
    if (this.hasMicro()) {
      this.renderMicro();
      return;
    }

    const config = configs[this.props.type];
    const script = document.createElement("script");

    script.id = "script_frontend_id_" + this.props.type;
    script.src = config.src;
    script.onload = this.renderMicro.bind(this);
    document.head.appendChild(script);
  }

  renderMicro() {
    if (!window.microfrontends[this.props.type].render) {
      throw Error(`Método render de ${this.props.type} não implementado!`);
    }

    window.microfrontends[this.props.type].render(this.getId());
  }

  unmountMicro() {
    if (!window.microfrontends[this.props.type].unmount) {
      throw Error(`Método unmount de ${this.props.type} não implementado!`);
    }

    window.microfrontends[this.props.type].unmount(this.getId());
  }

  hasMicro() {
    return window.microfrontends && window.microfrontends[this.props.type];
  }

  getId() {
    return "slot_frontend_id_" + this.props.type;
  }

  render() {
    return <div id={this.getId()}></div>;
  }
}
