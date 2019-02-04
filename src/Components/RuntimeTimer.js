import React from 'react';

const interval = 1000;

export default class RuntimeTimer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { time: 0 }
        this.timer = undefined;
    }

    componentDidMount() {
        this.timer = window.setInterval(this.incrementTime, interval);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    incrementTime = () => {
        this.setState({ time: this.state.time + interval });
    }

    formatTime = () => {
        const { time } = this.state;
        const minutes = String(Math.floor(time / 60000)).padStart(2, "0");
        const seconds = String((time % 60000) / 1000).padStart(2, "0");
        return `${minutes}:${seconds}`;
    }

    render() {
        return <span>{this.formatTime()}</span>;
    }
}
