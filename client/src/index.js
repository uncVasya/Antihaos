import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import storeR from './Redux/store';
import TodoContextProvider from './Components/Context/Contexts';

// что бы по умолчанию вэб-сервер отправлял запросы в направслении адреса в файле .env
axios.defaults.baseURL = process.env.REACT_APP_URL;
// для того, что бы созадавались хуки при работе бэка и фронта на одной машине
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={storeR}>
      <TodoContextProvider>
        <App />
      </TodoContextProvider>
    </Provider>
  </BrowserRouter>,
);
