import './App.scss';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import * as ENRoutes from './constants/ENRoutes';
import NotFound from './components/NotFound';
// import Announcement from './components/Announcement';
// import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/login';
import Sidebar from './components/framework';
import ServerUser from './components/serverUser';
import userAll from './components/userAll';
import back1 from './images/back1.png';
import Providers from './components/providers';
import Consumer from './components/consumerLine';
import ConfigTypeGroup from './components/configTypeGroup';
function App() {
  return (
    <div>
      <PrimeReactProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <img className="full-height-width position-fixed" src={back1} alt="" />
            <Routes>
              <Route path={ENRoutes.SMSHub}>
                <Route path={ENRoutes.userAll} Component={userAll}></Route>
                <Route path={ENRoutes.serveruser} Component={ServerUser}></Route>
                <Route path={ENRoutes.provider} Component={Providers}></Route>
                <Route path={ENRoutes.consumerLine} Component={Consumer}></Route>
                <Route path={ENRoutes.ConfigTypeGroup} Component={ConfigTypeGroup}></Route>
              </Route>
              <Route path={ENRoutes.Root} Component={Login}></Route>
              <Route path="/not-found" Component={NotFound}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </PrimeReactProvider>
    </div >
  );
}


export default App;