import React from 'react';
import './RecordButton.css';

export default class RecordButton extends React.Component {
    render() {
        const { isRecording, ...rest } = this.props;
        let className = "button__record";
        if (isRecording) {
            className += " recording";
        }
        return (
            <button className={className} { ...rest } />
        );
    }
}