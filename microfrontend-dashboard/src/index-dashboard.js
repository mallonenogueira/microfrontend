import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from "components/Dashboard";

if (!window.microfrontends) {
  window.microfrontends = {};
}

window.microfrontends.Dashboard = {
  render: (id) => {
    const container = document.querySelector(`#${id}`);
    
    ReactDOM.render(<Dashboard />, container);
  },
  unmount: (id) => {
    ReactDOM.unmountComponentAtNode(document.querySelector(`#${id}`))
  },
};