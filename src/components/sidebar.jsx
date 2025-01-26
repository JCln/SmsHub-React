import smsHubLogo from '../images/smsHubLogo.png';
import userImage from '../images/user.jpg';
import infoImage from '../images/info.jpg';
import simcardImage from '../images/simcard.jpg';
import developerImage from '../images/developer.jpg';
import logImage from '../images/log.jpg';
import patternImage from '../images/pattern.jpg';
import reportImage from '../images/report.jpg';
import settingsImage from '../images/settings.jpg';
import bellImage from '../images/bell.jpg';
import sendImage from '../images/send.jpg';
import arrowImage from '../images/arrow.jpg';
import { Link } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import httpService from '../services/httpService';


const Sidebar = () => {
    // const showMenu = (headerToggle, navbarId) => {
    //     const toggleBtn = document.getElementById(headerToggle),
    //         nav = document.getElementById(navbarId)

    //     // Validate that variables exist
    //     if (headerToggle && navbarId) {
    //         toggleBtn.addEventListener('click', () => {
    //             // We add the show-menu class to the div tag with the nav__menu class
    //             nav.classList.toggle('show-menu')
    //             // change icon
    //             toggleBtn.classList.toggle('bx-x')
    //         })
    //     }
    // }
    // showMenu('header-toggle', 'navbar')

    // /*==================== LINK ACTIVE ====================*/
    // const linkColor = document.querySelectorAll('.nav__link')

    // function colorLink() {
    //     linkColor.forEach(l => l.classList.remove('active'))
    //     this.classList.add('active')
    // }

    // linkColor.forEach(l => l.addEventListener('click', colorLink));

    return (
        <>
            <div class="nav" id="navbar">
                <nav class="nav__container">
                    <Link to={ENRoutes.SMSHub} class="nav__link nav__logo">
                        <img src={smsHubLogo} alt="" class="sidebar__img"></img>
                    </Link>
                    <div class="nav__list">
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={infoImage} alt="" class="sidebar_icon"></img>
                                راهنما سایت
                            </div>
                        </div>

                        <div class="nav__dropdown">
                            <div class="nav__items">
                                <div class="nav__subtitle">
                                    <img src={userImage} alt="" class="sidebar_icon"></img>
                                    کاربران
                                </div>
                                {/* <img src={arrowImage} alt="" class="-icon"></img> */}

                                <div class="nav__dropdown-collapse">
                                    <div class="nav__dropdown-content">
                                        <Link to={ENRoutes.userAll} class="nav__dropdown-item">همه کاربران</Link>
                                        <Link to={ENRoutes.role} class="nav__dropdown-item">نقش ها</Link>
                                        <a href="#" class="nav__dropdown-item">افزودن کاربر</a>
                                        <a href="#" class="nav__dropdown-item">جستجو کاربران</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={simcardImage} alt="" class="sidebar_icon"></img>
                                <Link to={ENRoutes.line} class="nav__dropdown-item">خطوط</Link>
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={simcardImage} alt="" class="sidebar_icon"></img>
                                <Link to={ENRoutes.provider} class="nav__dropdown-item">provider</Link>
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={simcardImage} alt="" class="sidebar_icon"></img>
                                <Link to={ENRoutes.ConfigTypeGroup} class="nav__dropdown-item">configType</Link>
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={sendImage} alt="" class="sidebar_icon"></img>
                                ارسال
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={patternImage} alt="" class="sidebar_icon"></img>
                                قالب
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={reportImage} alt="" class="sidebar_icon"></img>
                                گزارش ها
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={developerImage} alt="" class="sidebar_icon"></img>
                                توسعه دهندگان
                            </div>
                        </div>
                        <div class="nav__items">
                            <div class="nav__subtitle">
                                <img src={logImage} alt="" class="sidebar_icon"></img>
                                ثبت نشان
                            </div>
                        </div>
                    </div>
                    <footer>
                        <hr></hr>
                        <div class="footer_icons">
                            <Link to={ENRoutes.Root} onClick={() => httpService.log} className="pi pi-sign-out"></Link>
                            <i className="pi pi-cog"></i>
                            <i className="pi pi-bell"></i>
                        </div>
                    </footer>
                </nav>
            </div>
        </>
    )

}
export default Sidebar;