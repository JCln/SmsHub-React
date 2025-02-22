import './index.css';
import './styles/App.scss';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrimeReactProvider } from 'primereact/api';
import * as ENRoutes from './constants/ENRoutes';
import NotFound from './components/NotFound';
// import Announcement from './components/Announcement';
// import { PrivateRoute } from './components/PrivateRoute';
import { Login } from './components/login';
import Providers from './pages/sms-hub/sub-routes/providers';
import ConfigTypeGroup from './pages/sms-hub/sub-routes/configTypeGroup';
import Home from './pages/sms-hub/sub-routes/home';
import UserAll from './pages/sms-hub/sub-routes/userAll';
import Dashboard from './pages/sms-hub/sub-routes/dashboard';
import Role from './pages/sms-hub/sub-routes/role';
import Line from './pages/sms-hub/sub-routes/line';
import LineCreate from './pages/sms-hub/sub-routes/line-create';
import { primeLocal } from './constants/prime-local';
import LineEdit from './pages/sms-hub/sub-routes/line-edit';
import UserLineCreate from './pages/sms-hub/sub-routes/user-line-create';
import TemplateCategory from './pages/sms-hub/sub-routes/template-category';
import TemplateCreate from './pages/sms-hub/sub-routes/template-create';
import SendManager from './pages/sms-hub/sub-routes/send-manager';
import Template from './pages/sms-hub/sub-routes/template';
import CcSend from './pages/sms-hub/sub-routes/cc-send';
import PermittedTime from './pages/sms-hub/sub-routes/permitted-time';
import DisallowedPhrase from './pages/sms-hub/sub-routes/disallowed-phrase';
import ImageWrapper from './components/image';
import UserLineGet from './pages/sms-hub/sub-routes/user-line-get';
import ConsumerSafeIp from './pages/sms-hub/sub-routes/consumer-safe-ip';

function App() {
  return (
    <div>
      <PrimeReactProvider value={primeLocal}>
        <BrowserRouter>
          <div className='_app_main'>
            <ImageWrapper className='full-height-width position-fixed' alt='' fileName='back1.png'></ImageWrapper>
            <Routes>
              <Route path={ENRoutes.SMSHub} element={<Home />}>
                {
                  <>
                    <Route path={ENRoutes.SMSHub} element={<Dashboard />}></Route>
                    <Route path={ENRoutes.userAll} element={<UserAll />}></Route>
                    <Route path={ENRoutes.provider} element={<Providers />}></Route>
                    <Route path={ENRoutes.role} element={<Role />}></Route>
                    <Route index path={ENRoutes.line} element={<Line />}></Route>
                    <Route path={ENRoutes.lineDynamic} element={<LineEdit />}></Route>
                    <Route path={ENRoutes.lineCreate} element={<LineCreate />}></Route>
                    <Route path={ENRoutes.UserLineCreate} element={<UserLineCreate />}></Route>
                    <Route path={ENRoutes.userLineGetSearch} element={<UserLineGet />}></Route>
                    <Route index path={ENRoutes.templateCategroy} element={<TemplateCategory />}></Route>
                    <Route path={ENRoutes.templateCategroyDynamic} element={<Template />}></Route>
                    <Route path={ENRoutes.templateCreate} element={<TemplateCreate />}></Route>
                    <Route path={ENRoutes.ConfigTypeGroup} element={<ConfigTypeGroup />}></Route>
                    <Route path={ENRoutes.SendManager} element={<SendManager />}></Route>
                    <Route path={ENRoutes.CCSend} element={<CcSend />}></Route>
                    <Route path={ENRoutes.Permittedtime} element={<PermittedTime />}></Route>
                    <Route path={ENRoutes.safeIP} element={<ConsumerSafeIp />}></Route>
                    <Route path={ENRoutes.disallowedPhrase} element={<DisallowedPhrase />}></Route>
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