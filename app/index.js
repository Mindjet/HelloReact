'use strict';

import TextView from './components/text-view.jsx';
import React from "react";
import ReactDOM from 'react-dom'

const App = function () {
    ReactDOM.render(<TextView content="This is a TextView"/>, document.getElementById('content'));
};

new App();

