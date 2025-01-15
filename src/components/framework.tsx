import { Button } from './Button';
import { Inputs } from './Inputs';
import * as ENRoutes from '../constants/ENRoutes';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router';
import { PrimeReactProvider } from 'primereact/api';
import Announcement from './Announcement';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import stipe from '../images/stipe.jpg';


const Framework = () => {
    return (
        <div>
            <div style={{ height: '100vh', direction: 'rtl' }}>
                <Sidebar
                    style={{ height: '100%' }}
                    breakPoint="md"
                    backgroundColor={'#E0E0E0'}
                >
                    <div style={{ width: '4rem', height: '4rem', margin: '16px auto 24px' }}>
                        <img className="w-100 h-100" src={stipe} alt="" />
                    </div>

                    <Menu
                        menuItemStyles={{
                            button: {
                                // the active class will be added automatically by react router
                                // so we can use it to style the active menu item
                                [`&.active`]: {
                                    backgroundColor: '#13395e',
                                    color: '#b6c8d9',
                                },
                            },
                        }}
                    >
                        <MenuItem component={<Link to="/framework" />}> خانه</MenuItem>
                        <SubMenu label="کاربران" >
                            <MenuItem component={<Link to="/framework/serveruser" />}> کابران سرور</MenuItem>
                        </SubMenu>
                        <SubMenu label="ارسال پیامک" >
                            <MenuItem component={<Link to="/framework/sendSMS" />}> ارسال سریع</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}> ارسال فوری</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}> ارسال انقلابی</MenuItem>
                        </SubMenu>
                        <SubMenu label="مدیریت مالی" >
                            <MenuItem component={<Link to="/framework/sendSMS" />}>پیش فاکتورها</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}>تراکنش ها</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}>فاکتور های صادر شده</MenuItem>
                        </SubMenu>

                    </Menu>
                </Sidebar>
            </div>
        </div >
    )
}
export default Framework;