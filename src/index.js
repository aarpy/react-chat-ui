import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppContainer from './App';
import appStore from './stores/appStore';

ReactDOM.render(
  <Provider store={appStore}>
    <AppContainer/>
  </Provider>,
  document.getElementById('root')
);
