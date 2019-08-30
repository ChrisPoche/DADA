import React from 'react';

class Objects extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const objectStyle = {
            backgroundColor: `rgb(${this.props.style[0].backgroundColor})`,
            top: this.props.style[0].top,
            left: this.props.style[0].left,
            height: this.props.style[0].height,
            width: this.props.style[0].width
        }
        return (
            <div id={this.props.id} className='object' style={objectStyle}>
            </div>
        );
    }
}

export default Objects;