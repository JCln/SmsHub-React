import React from 'react';
import { Login } from './components/login';
import TwoStepVerification from './components/TwoStepsVerification';
import './App.scss';
import backgroundImg from './images/green1.jpg';
import { BrowserRouter, Route, Routes } from 'react-router';
import * as ENRoutes from './constants/ENRoutes';
import NotFound from './components/NotFound';
import Announcement from './components/Announcement';

function App() {
  return (
    <div>
      <img className='background-img' src={backgroundImg} alt="" />
      <BrowserRouter>
        <Routes>
          <Route path={ENRoutes.Announcement} Component={Announcement}></Route>
          <Route path={ENRoutes.TwoStepVerification} Component={TwoStepVerification}></Route>
          <Route path={ENRoutes.Home} Component={Login}></Route>
          <Route path="/not-found" Component={NotFound} />
          {/* <Redirect to='/not-found' /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
