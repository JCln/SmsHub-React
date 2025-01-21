import * as ENRoutes from '../constants/ENRoutes';
import { Link } from 'react-router';
import * as reactProSidebar from 'react-pro-sidebar';
import logo from '../images/hiwalogo.png';


const Framework = () => {
    return (
        <div>
            <div style={{ height: '100vh', direction: 'rtl' }}>
                <reactProSidebar.Sidebar
                    style={{ height: '100%' }}
                    breakPoint="md"
                    backgroundColor={'var(--clr-white)'}
                >
                    <div style={{ width: '4rem', height: '4rem', margin: '16px auto 24px' }}>
                        <img className="w-100 h-100" src={logo} alt="" />
                    </div>

                    <reactProSidebar.Menu
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
                        <reactProSidebar.MenuItem component={<Link to={ENRoutes.SMSHub} />}> خانه</reactProSidebar.MenuItem>
                        <div className='_hr1'></div>

                        <reactProSidebar.SubMenu label="کاربران">
                            <reactProSidebar.MenuItem component={<Link to={ENRoutes.userAll} />} >همه کاربران</reactProSidebar.MenuItem>
                            <reactProSidebar.MenuItem component={<Link to={ENRoutes.serveruser} />}> کابران سرور</reactProSidebar.MenuItem>
                        </reactProSidebar.SubMenu>
                        <div className='_hr1'></div>

                        <reactProSidebar.SubMenu label="مشتریان ما" >
                            <reactProSidebar.MenuItem component={<Link to={ENRoutes.provider} />}>سرویس دهندگان</reactProSidebar.MenuItem>
                        </reactProSidebar.SubMenu>
                        <div className='_hr1'></div>

                        <reactProSidebar.SubMenu label="خطوط" >
                            <reactProSidebar.MenuItem component={<Link to={ENRoutes.consumerLine} />}>مشتریان</reactProSidebar.MenuItem>
                        </reactProSidebar.SubMenu>
                        <div className='_hr1'></div>

                        <reactProSidebar.SubMenu label="قالب ها" >
                            <reactProSidebar.MenuItem component={<Link to={ENRoutes.ConfigTypeGroup} />}>گروه بندی</reactProSidebar.MenuItem>
                        </reactProSidebar.SubMenu>
                        <div className='_hr1'></div>

                        <reactProSidebar.SubMenu label="ارسال پیامک" >
                            {/* <MenuItem component={<Link to="/framework/sendSMS" />}> ارسال سریع</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}> ارسال فوری</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}> ارسال انقلابی</MenuItem> */}
                        </reactProSidebar.SubMenu>
                        <div className='_hr1'></div>

                        <reactProSidebar.SubMenu label="مدیریت مالی" >
                            {/* <MenuItem component={<Link to="/framework/sendSMS" />}>پیش فاکتورها</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}>تراکنش ها</MenuItem>
                            <MenuItem component={<Link to="/framework/sendSMS" />}>فاکتور های صادر شده</MenuItem> */}
                        </reactProSidebar.SubMenu>
                        <div className='_hr1'></div>

                        <reactProSidebar.MenuItem component={<Link to={ENRoutes.Root} />}> خروج</reactProSidebar.MenuItem>
                    </reactProSidebar.Menu>
                </reactProSidebar.Sidebar>
            </div>
        </div >
    )
}
export default Framework;