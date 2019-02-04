import React from 'react';
import ViewRecord from './Containers/ViewRecord';
import createStore from './Services/Store';
import { Provider } from 'react-redux';

const store = createStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <ViewRecord />
      </Provider>
    );
  }
}

export default App;
