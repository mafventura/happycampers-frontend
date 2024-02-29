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
import { WeeksProvider } from './context/WeekContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
      <UserProvider>
        <CampsProvider>
          <KidsProvider>
            <WeeksProvider>
              <App />
            </WeeksProvider>
          </KidsProvider>
        </CampsProvider>
      </UserProvider>
    </BrowserRouter>

);
