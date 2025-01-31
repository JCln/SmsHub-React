import smsHubLogo from '../images/smsHubLogo.png';
import userImage from '../images/user.jpg';
import infoImage from '../images/info.jpg';
import simcardImage from '../images/simcard.jpg';
import developerImage from '../images/developer.jpg';
import logImage from '../images/log.jpg';
import patternImage from '../images/pattern.jpg';
import reportImage from '../images/report.jpg';
import sendImage from '../images/send.jpg';
import { Link, NavLink } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import RouterService from '../services/routerService';


const Sidebar = ({ user }: { user: string }) => {
    return (
        <>
            {user === 'admin' ? (
                <div className="nav" id="navbar">
                    <nav className="nav__container">
                        <Link to={ENRoutes.SMSHub} className="nav__link nav__logo">
                            <img src={smsHubLogo} alt="" className="sidebar__img"></img>
                        </Link>
                        <div className="nav__list">
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={infoImage} alt="" className="sidebar_icon"></img>
                                    راهنما سایت
                                </div>
                            </div>

                            <div className="nav__dropdown">
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <img src={userImage} alt="" className="sidebar_icon"></img>
                                        کاربران
                                        <i className="-icon pi pi-angle-down"></i>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <div className="nav__dropdown-item">
                                                <Link to={ENRoutes.userAll}>همه کاربران</Link>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <Link to={ENRoutes.role} className="nav__dropdown-item">نقش ها</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav__dropdown">
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <img src={simcardImage} alt="" className="sidebar_icon"></img>
                                        خطوط
                                        <i className="-icon pi pi-angle-down"></i>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <div className="nav__dropdown-item">
                                                <Link to={ENRoutes.line} >همه خطوط</Link>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.lineCreate} className="nav__dropdown-item">افزودن خط</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.UserLineCreate} className="nav__dropdown-item">افزودن کاربر- خط</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.lineByUserIds} className="nav__dropdown-item">مشاهده خط کاربر</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.userByLineIds} className="nav__dropdown-item">مشاهده کاربر خط</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={ENRoutes.provider} className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={simcardImage} alt="" className="sidebar_icon"></img>
                                    <div className="nav__dropdown-item">سرویس دهندگان</div>
                                </div>
                            </Link>
                            <Link to={ENRoutes.ConfigTypeGroup} className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={simcardImage} alt="" className="sidebar_icon"></img>
                                    <div className="nav__dropdown-item">تنظیمات</div>
                                </div>
                            </Link>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={sendImage} alt="" className="sidebar_icon"></img>
                                    ارسال
                                </div>
                            </div>
                            <div className="nav__dropdown">
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <img src={patternImage} alt="" className="sidebar_icon"></img>
                                        قالب
                                        <i className="-icon pi pi-angle-down"></i>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.templateCategroy} className="nav__dropdown-item">نمایش</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.templateCategroyCreate} className="nav__dropdown-item">افزودن</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={reportImage} alt="" className="sidebar_icon"></img>
                                    گزارش ها
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={developerImage} alt="" className="sidebar_icon"></img>
                                    توسعه دهندگان
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={logImage} alt="" className="sidebar_icon"></img>
                                    ثبت نشان
                                </div>
                            </div>
                        </div>
                        <footer>
                            <hr></hr>
                            <div className="footer_icons">
                                <Link to={ENRoutes.Root} className="pi pi-sign-out"></Link>
                                <i className="pi pi-cog"></i>
                                <i className="pi pi-bell"></i>
                            </div>
                        </footer>
                    </nav>
                </div>
            ) : (
                <div className="nav" id="navbar">
                    <nav className="nav__container">
                        <Link to={ENRoutes.SMSHub} className="nav__link nav__logo">
                            <img src={smsHubLogo} alt="" className="sidebar__img"></img>
                        </Link>
                        <div className="nav__list">
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <i className="pi pi-circle-info sidebar_icon"></i>
                                    راهنما سایت
                                </div>
                            </div>

                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={sendImage} alt="" className="sidebar_icon"></img>
                                    ارسال
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={developerImage} alt="" className="sidebar_icon"></img>
                                    توسعه دهندگان
                                </div>
                            </div>
                        </div>
                        <footer>
                            <hr></hr>
                            <div className="footer_icons">
                                <i className="pi pi-sign-out"></i>
                                <i className="pi pi-cog"></i>
                                <i className="pi pi-bell"></i>
                            </div>
                        </footer>
                    </nav>
                </div>
            )}
        </>
    );


}
export default Sidebar;