import React from 'react';
import { formatTime }  from '../Utils/TimeMethods';

export default class RuntimeTimer extends React.PureComponent {
    static defaultProps = {
        interval: 1000
    }

    constructor(props) {
        super(props);
        this.state = { time: 0 }
        this.timer = undefined;
    }

    componentDidMount() {
        this.timer = window.setInterval(this.incrementTime, this.props.interval);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    incrementTime = () => {
        this.setState({ time: this.state.time + this.props.interval });
    }

    render() {
        return <span>{formatTime(this.state.time)}</span>;
    }
}
