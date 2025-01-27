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
function App() {
  addLocale('fa', {
    firstDayOfWeek: 1,
    dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
    dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    dayNamesMin: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    monthNamesShort: ['فر', 'ار', 'خ', 'ت', 'م', 'ش', 'مهر', 'آبان', 'آذر', 'دی', 'ب', 'اس'],
    today: 'امروز',
    close: 'بستن',
    noFilter: 'حذف فیلتر',
    accept: 'تایید',
    reject: 'بازگشت',
    startsWith: ' شروع با',
    contains: 'شامل باشد',
    notContains: ' شامل نباشد',
    endsWith: ' پایان با',
    equals: 'برابر',
    notEquals: 'نا برابر',
    lt: ' کمتر از',
    lte: 'کمتر یا برابر',
    gt: 'بزرگتر',
    gte: 'بزرگتر یا برابر',
    dateBefore: 'قبل',
    dateAfter: 'بعد',
    clear: 'پاک کردن',
    apply: 'تایید',
    matchAll: 'مطابقت با همه',
    matchAny: ' مطابقت',
    addRule: 'جستجو براساس',
    removeRule: 'حذف جستجو',
    choose: ' انتخاب',
    upload: 'ارسال',
    cancel: 'بازگشت',
    emptyMessage: 'موردی یافت نشد',
    emptyFilterMessage: 'موردی یافت نشد'
  });
  const value = {
    locale: 'fa',
  };
  return (
    <div>
      <PrimeReactProvider value={value}>
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