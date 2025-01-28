import './index.css';
import './App.scss';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter, Route, Routes } from 'react-router';
import { addLocale, PrimeReactProvider } from 'primereact/api';
import * as ENRoutes from './constants/ENRoutes';
import NotFound from './components/NotFound';
// import Announcement from './components/Announcement';
// import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/login';
import back1 from './images/back1.png';
import Providers from './pages/sms-hub/sub-routes/providers';
import ConfigTypeGroup from './pages/sms-hub/sub-routes/configTypeGroup';
import Home from './pages/sms-hub/sub-routes/home';
import UserAll from './pages/sms-hub/sub-routes/userAll';
import Dashboard from './pages/sms-hub/sub-routes/dashboard';
import Role from './pages/sms-hub/sub-routes/role';
import Line from './pages/sms-hub/sub-routes/line';
import LineCreate from './pages/sms-hub/sub-routes/line-create';
import { primeLocal } from './constants/prime-local';

function App() {
  return (
    <div>
      <PrimeReactProvider value={primeLocal}>
        <BrowserRouter>
          <div className='_app_main'>
            <img className="full-height-width position-fixed" src={back1} alt="" />
            <Routes>
              <Route path={ENRoutes.SMSHub} element={<Home />}>
                {
                  <>
                    <Route path={ENRoutes.SMSHub} element={<Dashboard />}></Route>
                    <Route path={ENRoutes.userAll} element={<UserAll />}></Route>
                    <Route path={ENRoutes.provider} element={<Providers />}></Route>
                    <Route path={ENRoutes.role} element={<Role />}></Route>
                    <Route path={ENRoutes.line} element={<Line />}></Route>
                    <Route path={ENRoutes.lineCreate} element={<LineCreate />}></Route>
                    <Route path={ENRoutes.ConfigTypeGroup} element={<ConfigTypeGroup />}></Route>
                  </>
                }
              </Route>
              <Route path={ENRoutes.Root} element={<Login />}></Route>
              <Route path="/not-found" element={<NotFound />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </PrimeReactProvider>
    </div >
  );
}


export default App;