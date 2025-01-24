import './index.css';
import './App.scss';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import * as ENRoutes from './constants/ENRoutes';
import NotFound from './components/NotFound';
// import Announcement from './components/Announcement';
// import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/login';
import Sidebar from './components/sidebar';
import ServerUser from './components/serverUser';
import userAll from './pages/sms-hub/sub-routes/userAll';
import back1 from './images/back1.png';
import Providers from './components/providers';
import Consumer from './components/consumerLine';
import ConfigTypeGroup from './components/configTypeGroup';
import Home from './pages/sms-hub/home';
import UserAll from './pages/sms-hub/sub-routes/userAll';
import Dashboard from './components/dashboard';
function App() {
  return (
    <div>
      <PrimeReactProvider>
        <BrowserRouter>
          <div className='_app_main'>
            <img className="full-height-width position-fixed" src={back1} alt="" />
            <Routes>
              <Route path={ENRoutes.SMSHub} element={<Home />}>
                {
                  <Route path={ENRoutes.SMSHub} element={<Dashboard />}></Route>
                /* <Route path={ENRoutes.serveruser} element={<ServerUser />}></Route>
                <Route path={ENRoutes.provider} element={<Providers />}></Route>
                <Route path={ENRoutes.consumerLine} element={<Consumer />}></Route>
                <Route path={ENRoutes.ConfigTypeGroup} element={<ConfigTypeGroup />}></Route> */}
                <Route path={ENRoutes.userAll} element={<UserAll />}></Route>
              </Route>
              <Route path={ENRoutes.Root} element={<Login />}></Route>
              {/* <Route path="/not-found" element={<NotFound />}></Route> */}
            </Routes>
          </div>
        </BrowserRouter>
      </PrimeReactProvider>
    </div >
  );
}


export default App;