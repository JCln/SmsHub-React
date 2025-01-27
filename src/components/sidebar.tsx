import smsHubLogo from '../images/smsHubLogo.png';
import userImage from '../images/user.jpg';
import infoImage from '../images/info.jpg';
import simcardImage from '../images/simcard.jpg';
import developerImage from '../images/developer.jpg';
import logImage from '../images/log.jpg';
import patternImage from '../images/pattern.jpg';
import reportImage from '../images/report.jpg';
import sendImage from '../images/send.jpg';
import arrowImage from '../images/arrow.jpg';
import { Link } from 'react-router';
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
                                        <img src={arrowImage} alt="" className="-icon"></img>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <Link to={ENRoutes.userAll} className="nav__dropdown-item">همه کاربران</Link>
                                            <Link to={ENRoutes.role} className="nav__dropdown-item">نقش ها</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={simcardImage} alt="" className="sidebar_icon"></img>
                                    <Link to={ENRoutes.line} className="nav__dropdown-item">خطوط</Link>
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={simcardImage} alt="" className="sidebar_icon"></img>
                                    <Link to={ENRoutes.provider} className="nav__dropdown-item">سرویس دهندگان</Link>
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <img src={simcardImage} alt="" className="sidebar_icon"></img>
                                    <Link to={ENRoutes.ConfigTypeGroup} className="nav__dropdown-item">تنظیمات</Link>
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
                                    <img src={patternImage} alt="" className="sidebar_icon"></img>
                                    قالب
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
                                    <img src={infoImage} alt="" className="sidebar_icon"></img>
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