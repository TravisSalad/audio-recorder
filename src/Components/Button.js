import React from 'react';
import './Button.css';

export default class Button extends React.Component {
    render() {
        return <button className="button" {...this.props}>{this.props.children}</button>;
    }
}