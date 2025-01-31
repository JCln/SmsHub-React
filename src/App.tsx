import './index.css';
import './App.scss';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter, Route, Routes } from 'react-router';
import { PrimeReactProvider } from 'primereact/api';
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
import LineEdit from './pages/sms-hub/sub-routes/line-edit';
import UserLineCreate from './pages/sms-hub/sub-routes/user-line-create';
import LineByUserIds from './pages/sms-hub/sub-routes/line-by-user-ids';
import UserByLineIds from './pages/sms-hub/sub-routes/user-by-line-ids';
import TemplateCategoryCreate from './pages/sms-hub/sub-routes/template-category-create';
import TemplateCategory from './pages/sms-hub/sub-routes/template-category';

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
                    <Route path={ENRoutes.lineEdit} element={<LineEdit />}></Route>
                    <Route path={ENRoutes.lineCreate} element={<LineCreate />}></Route>
                    <Route path={ENRoutes.UserLineCreate} element={<UserLineCreate />}></Route>
                    <Route path={ENRoutes.lineByUserIds} element={<LineByUserIds />}></Route>
                    <Route path={ENRoutes.userByLineIds} element={<UserByLineIds />}></Route>
                    <Route path={ENRoutes.templateCategroy} element={<TemplateCategory />}></Route>
                    <Route path={ENRoutes.templateCategroyCreate} element={<TemplateCategoryCreate />}></Route>
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