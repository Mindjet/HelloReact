'use strict';

import React from 'react';
import '../css/cute-progress-bar.css';

const DEFAULT_THUMB_COLOR = '#146365';
const DEFAULT_BACKGROUND_COLOR = '#188183';
const DEFAULT_PROGRESSED_COLOR = '#146365';

let thumbColor;
let backgroundColor;
let progressedColor;

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
let thumbWidth;
let offset;

let progressedPercentage;
let moving = false;

class CuteProgressBar extends React.Component {

    constructor(props) {
        super(props);
        this.initProperty();
    }

    initProperty() {
        progressedPercentage = this.props.progressed ? this.props.progressed : 0;
        thumbColor = this.props.thumbColor ? this.props.thumbColor : DEFAULT_THUMB_COLOR;
        backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : DEFAULT_BACKGROUND_COLOR;
        progressedColor = this.props.progressedColor ? this.props.progressedColor : DEFAULT_PROGRESSED_COLOR;
        onStart = this.props.onStart;
        onProgress = this.props.onProgress;
        onFinish = this.props.onFinish;
    }

    componentDidMount() {
        container = this.refs.cpbContainer;
        thumb = this.refs.cpbThumb;
        progressed = this.refs.cpbProgressed;
        progressWhole = this.refs.cpbProgressWhole;
        progressBackground = this.refs.cpbProgressBackground;

        this.initStyle();
        this.doMeasurement();
        this.initThumbPosition();
        this.initDragEvent();
    }

    initStyle() {
        thumb.style.backgroundColor = thumbColor;
        thumb.style.cursor = 'pointer';
        progressWhole.style.backgroundColor = backgroundColor;
        progressed.style.backgroundColor = progressedColor;
    }

    initThumbPosition() {
        thumb.style.left = containerLeft + progressedPercentage * (containerWidth - thumbWidth) + 'px';
        console.log(progressedPercentage);
        progressed.style.width = progressedPercentage * progressWholeLength + 'px';
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
        onStart && onStart();
    }

    onDragging(e) {
        if (!moving) return;
        let thumbLeft = e.screenX - offset;
        //constraint the moving range.

        thumbLeft = thumbLeft <= containerLeft ? containerLeft : thumbLeft;
        thumbLeft = thumbLeft >= containerWidth - thumbWidth + containerLeft ? containerWidth - thumbWidth + containerLeft : thumbLeft;

        //calculate the progress percentage
        progressedPercentage = (thumbLeft - containerLeft) / (containerWidth - thumbWidth);
        progressedPercentage = Math.round(progressedPercentage * 100) / 100;
        progressed.style.width = progressedPercentage * progressWholeLength + 'px';
        thumb.style.left = (containerWidth - thumbWidth) * progressedPercentage + containerLeft + 'px';
        onProgress && onProgress(progressedPercentage);
    }

    endDrag(e) {
        moving = false;
        onFinish && onFinish(progressedPercentage);
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
