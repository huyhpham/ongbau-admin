import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { appStore } from './store';
import { saveState } from './localStorage';

appStore.subscribe(() => {
  saveState(appStore.getState());
});

ReactDOM.render((
  <Provider store={appStore}>
    <App />
  </Provider>
  
), document.getElementById('root'));

serviceWorker.unregister();
