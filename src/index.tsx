import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { ERROR_MESSAGE_TIMEOUT } from './const';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { fetchOffersAction } from './store/main/api-action';
import { checkAuthorizationAction } from './store/user/api-action';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(checkAuthorizationAction());
store.dispatch(fetchOffersAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer position='top-center' autoClose={ERROR_MESSAGE_TIMEOUT} hideProgressBar />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
