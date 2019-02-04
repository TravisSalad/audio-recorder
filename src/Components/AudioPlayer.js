import React from 'react';
import Button from './Button';
import './AudioPlayer.css';

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    deleteRecording = async () => {
        this.setState({ loading: true });
        try {
            await this.props.deleteRecording(this.props.recording.id);
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div className="audio-player__wrapper">
                <audio className="audio-player" src={this.props.recording.downloadURL} controls />
                <Button disabled={this.state.loading} onClick={this.deleteRecording}>{this.state.loading ? "Removing..." : "Remove"}</Button>
            </div>
        );
    }
}