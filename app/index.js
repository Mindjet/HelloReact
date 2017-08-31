'use strict';

import React from "react";
import ReactDOM from 'react-dom'
import TextView from './components/text-view.jsx';
import CuteProgressBar from "./components/cute-progress-bar.jsx";
// import './css/demo.css';
import DoubleChoose from "./components/double-choose.jsx";

ReactDOM.render(<DoubleChoose/>, document.getElementById('content'));
// const App = function () {
//     ReactDOM.render(<TextView content="This is a TextView"/>, document.getElementById('content'));
//     ReactDOM.render(<CuteProgressBar progressed={0.5}
//                                      thumbColor='black' backgroundColor='#666' progressedColor='#333'
//                                      onProgress={(progress) => onProgress(progress)}
//                                      onFinish={(process) => onProgressFinished(process)}/>, document.getElementById('cute-progress-bar'));
// };
//
// const onProgressFinished = (progressed) => {
//     console.log('onfinish: ' + progressed);
// };
//
// const onProgress = (progressed) => {
//     console.log('onprogress: ' + progressed);
// };
//
// new App();

