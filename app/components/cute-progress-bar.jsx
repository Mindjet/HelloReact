'use strict';

import React from 'react';
import '../css/cute-progress-bar.css';

let thumbColor = '#146365';
let progressBackgroundColor = '#188183';
let onProgress = null;
let onStart = null;
let onFinish = null;

let container = null;
let thumb = null;
let progressed = null;
let progressWhole = null;
let progressBackground = null;

let progressWholeLength;
let progressedLength;
let thumbRadius;
let offset;

let moving = false;

class CuteProgressBar extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        container = this.refs.cpbContainer;
        thumb = this.refs.cpbThumb;
        progressed = this.refs.cpbProgressed;
        progressWhole = this.refs.cpbProgressWhole;
        progressBackground = this.refs.cpbProgressBackground;

        thumb.style.backgroundColor = thumbColor;
        progressed.style.backgroundColor = progressBackgroundColor;

        this.doMeasurement();
        this.initThumbDrag();
    }

    doMeasurement() {
        progressWholeLength = progressWhole.style.offsetWidth;
        thumbRadius = thumb.style.offsetWidth;
    }

    initThumbDrag() {
        thumb.onmousedown = (e) => {
            //todo record offset
            moving = true;
            console.log("on mouse down");
        };

        thumb.onmousemove = (e) => {
            console.log(e);
            thumb.style.left = e.offsetX + 'px';
        };


        thumb.onmouseup = (e) => {
            moving = false;
            console.log('on mouse up');
        };
    }

    render() {
        return (
            <div ref="cpbContainer" className="cpb-container">
                <div ref="cpbProgressBackground" className="cpb-progressBackground">
                    <div ref="cpbProgressed" className="cpb-progressed"/>
                    <div ref="cpbProgressWhole" className="cpb-progressWhole"/>
                </div>
                <div ref="cpbThumb" className="cpb-thumb"/>
            </div>
        )
    }

}

export default CuteProgressBar;
