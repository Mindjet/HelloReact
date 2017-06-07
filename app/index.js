'use strict';

import React from "react";
import ReactDOM from 'react-dom'
import TextView from './components/text-view.jsx';
import CuteProgressBar from "./components/cute-progress-bar.jsx";
import './css/demo.css';

const App = function () {
    ReactDOM.render(<TextView content="This is a TextView"/>, document.getElementById('content'));
    ReactDOM.render(<CuteProgressBar/>, document.getElementById('cute-progress-bar'));
};

new App();

