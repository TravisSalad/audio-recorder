import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ViewRecord from '../Components/ViewRecord';
import { deleteRecording, fetchRecordings, saveRecording } from '../Actions/Recordings';

function mapStateToProps(state) {
  return { recordings: state.Recordings.recordings };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRecordings,
    saveRecording,
    deleteRecording
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewRecord);