import React from 'react';

/**
 * A easy TextView component.
 */
export default class TextView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content
        }
    }

    render() {
        return (
            <div>{this.state.content}</div>
        );
    }

}
