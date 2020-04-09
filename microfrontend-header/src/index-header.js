import React from 'react';
import ReactDOM from 'react-dom';
import Header from "components/Header";
import "base.scss";

if (!window.microfrontends) {
  window.microfrontends = {};
}

window.microfrontends.Header = {
  render: (id) => {
    const container = document.querySelector(`#${id}`);
    
    container.classList.add('header-slot');

    ReactDOM.render(<Header />, container);
  },
  unmount: (id) => {
    ReactDOM.unmountComponentAtNode(document.querySelector(`#${id}`))
  },
};