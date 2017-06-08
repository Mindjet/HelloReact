'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
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

let containerWidth;
let containerLeft;
let progressWholeLength;
let progressedLength;
let thumbWidth;
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
        thumb.style.cursor = 'pointer';
        progressed.style.backgroundColor = progressBackgroundColor;

        this.doMeasurement();
        this.initDragEvent();
    }

    doMeasurement() {
        containerWidth = container.offsetWidth;
        containerLeft = container.offsetLeft;
        progressWholeLength = progressWhole.offsetWidth;
        thumbWidth = thumb.offsetWidth;
        console.log('container width: ' + containerWidth);
        console.log('progressWholeLength: ' + progressWholeLength);
        console.log('thumb width: ' + thumbWidth);
    }

    initDragEvent() {
        document.addEventListener('mousedown', (e) => this.startDrag(e), false);
        document.addEventListener('mousemove', (e) => this.onDragging(e), false);
        document.addEventListener('mouseup', (e) => this.endDrag(e), false);
    }

    startDrag(e) {
        moving = true;
        offset = e.offsetX;
    }

    onDragging(e) {
        if (!moving) return;
        //edge detection.
        let thumbLeft = e.screenX - offset;
        thumbLeft = thumbLeft <= containerLeft ? containerLeft : thumbLeft;
        thumbLeft = thumbLeft >= containerWidth - thumbWidth ? containerWidth - thumbWidth : thumbLeft;
        thumb.style.left = thumbLeft + 'px';
    }

    endDrag(e) {
        moving = false;
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
