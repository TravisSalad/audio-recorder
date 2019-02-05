import React from 'react';
import { v4 } from 'uuid';
import RecordButton from './RecordButton';
import AudioPlayer from './AudioPlayer';
import RuntimeTimer from './RuntimeTimer';
import './ViewRecord.css';

const statusTypes = {
    recording: 'recording',
    loading: 'loading'
}

export default class ViewRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: undefined };
        this.mediaRecorder = undefined;
    }

    componentWillMount() {
        // fetch existing recordings from db on mount.
        this.props.fetchRecordings();
        // add mouseup listener to window in case mouse travelled off the button
        window.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener("mouseup", this.handleMouseUp);
    }

    saveRecording = async (event) => {
        try {
            // create mp3 file blob and unique id to be uploaded to firebase storage.
            const audioBlob = new Blob([event.data], { type: 'audio/mp3' });
            const id = v4();
            await this.props.saveRecording(id, audioBlob);
        } catch (err) {
            console.error(err);
        }
        this.mediaRecorder = undefined;
        this.setState({ status: undefined });
    }

    handleMouseUp = () => {
        // if we're recording, let's stop and save data.
        if (this.state.status === statusTypes.recording && this.mediaRecorder !== undefined) {
            this.setState({ status: statusTypes.loading }, () => {
                this.mediaRecorder.stop();
            });
        }
    }

    handleMouseDown = () => {
        // if we're not recording, let's start
        if (this.state.status !== statusTypes.recording) {
            this.setState({ status: statusTypes.recording }, () => {
                navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    // create new media recorder and start recording.
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.start();
                    // when data is available save the recording.
                    this.mediaRecorder.addEventListener("dataavailable", this.saveRecording)
                });
            });
        }
    }

    // renders the audio component for each of the recordings passed in from props
    renderRecordings = () => {
        const { recordings } = this.props;
        if (recordings && Array.isArray(recordings) && recordings.length) {
            return (
                <div className="recordings__wrapper">
                    {recordings.map(recording => (
                        <AudioPlayer
                            deleteRecording={this.props.deleteRecording}
                            key={recording.downloadURL}
                            recording={recording}
                        />
                    ))}
                </div>
            );
        }
    }

    // render status text for recording state.
    renderStatus = () => {
        const { status } = this.state;
        switch(status) {
            case statusTypes.loading:
                return "Uploading File...";
            case statusTypes.recording:
                return <RuntimeTimer />;
            default:
                return 'Hold button to record!';
        }
    }

    render() {
        const { status } = this.state;
        return (
            <div>
                <div className="recorder__wrapper">
                    <RecordButton
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        isRecording={status === statusTypes.recording}
                    />
                    <div>{this.renderStatus()}</div>
                </div>
                {this.renderRecordings()}
            </div>
        );
    }
}
