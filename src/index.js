import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";
import './scss/custom.scss';
import './interceptors/axios'
import App from './App';
import { CampsProvider } from './context/CampContext';
import { UserProvider } from './context/UserContext';
import { KidsProvider } from './context/KidContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CampsProvider>
          <KidsProvider>
            <App />
          </KidsProvider>
        </CampsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
