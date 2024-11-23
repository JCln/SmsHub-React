import React from 'react';
import { Login } from './components/login';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router';
import * as ENRoutes from './constants/ENRoutes';
import { TwoStepVerification } from './components/TwoStepsVerification';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={ENRoutes.Home} Component={Login}></Route>
          <Route path={ENRoutes.TwoStepVerification} Component={TwoStepVerification}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
