import './App.scss';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import * as ENRoutes from './constants/ENRoutes';
import NotFound from './components/NotFound';
import Announcement from './components/Announcement';
import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/login';
import Framework from './components/framework';
import ServerUser from './components/serverUser';
import axios from 'axios';
import back1 from './images/back1.png';

function App() {
  return (
    <div>
      <PrimeReactProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <img className="full-height-width position-fixed" src={back1} alt="" />
            <Framework />
            <Routes>

              <Route path={ENRoutes.Sidebar} Component={Framework}></Route>
              <Route path={ENRoutes.serveruser} Component={ServerUser}></Route>
              <Route path={ENRoutes.Login} Component={Login}></Route>
              <Route path="/not-found" Component={NotFound}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </PrimeReactProvider>
    </div >
  );
}

axios.interceptors.response.use(null, error => {
  console.log("interceptor called.");
  return Promise.reject(error);
});

export default App;

{/* <Route path={ENRoutes.TwoStepVerification} Component={TwoStepVerification}></Route> */ }
{/* <Redirect to='/not-found' /> */ }