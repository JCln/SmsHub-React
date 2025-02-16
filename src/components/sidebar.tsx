import { Link, NavLink } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import { IUserClaims } from '../constants/interface';
import ImageWrapper from './image';


const Sidebar = ({ user }: { user: IUserClaims }) => {
    const toggleSubItem = (e: any) => {
        console.log(e.target.className);
        console.log(e.currentTarget.classList);
        if (
            e.target.className === 'nav__subtitle' ||
            e.target.className === 'nav__dropdown' ||
            e.target.className.includes('Image') ||
            e.target.className.includes('-icon')
        ) {
            const angleIcon = e.currentTarget.firstChild.firstChild.childNodes[2].classList;
            e.currentTarget.classList.toggle('toggle-sidebar');
            angleIcon.toggle('rotate-current-angle');
        }
    }

    return (
        <>
            {user.role === 'admin' || user.role === 'Programmer' ? (
                <div className="nav" id="navbar">
                    <nav className="nav__container">
                        <Link to={ENRoutes.SMSHub} className="nav__link nav__logo">
                            <ImageWrapper className='sidebar__img' alt='' fileName='smsHubLogo.png'></ImageWrapper>
                        </Link>
                        <div className="nav__list">
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='info.png'></ImageWrapper>
                                    راهنما سایت
                                </div>
                            </div>

                            <div className="nav__dropdown" onClick={e => { toggleSubItem(e) }}>
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <ImageWrapper className='sidebar_icon' alt='' fileName='user1.png'></ImageWrapper>
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
                            <div className="nav__dropdown" onClick={e => { toggleSubItem(e) }}>
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <ImageWrapper className='sidebar_icon' alt='' fileName='simcrd.png'></ImageWrapper>
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
                                    {/* <ImageWrapper className='sidebar_icon' alt='' fileName='simcrd.png'></ImageWrapper> */}
                                    <i className="sidebar_icon pi pi-building"></i>
                                    <div className="nav__dropdown-item">سرویس دهندگان</div>
                                </div>
                            </Link>
                            <div className="nav__dropdown" onClick={e => { toggleSubItem(e) }}>
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <ImageWrapper className='sidebar_icon' alt='' fileName='message2.png'></ImageWrapper>
                                        تنظیمات
                                        <i className="-icon pi pi-angle-down"></i>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.ConfigTypeGroup} className="nav__dropdown-item">تنظیم گروه</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.CCSend} className="nav__dropdown-item">ارسال مجدد</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.Permittedtime} className="nav__dropdown-item">بازه مجاز</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.disallowedPhrase} className="nav__dropdown-item">کلمات غیر مجاز</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={ENRoutes.SendManager} className="nav__items">
                                <div className="nav__subtitle">
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='message.png'></ImageWrapper>
                                    <div className="nav__dropdown-item">ارسال</div>
                                </div>
                            </Link>
                            <div className="nav__dropdown" onClick={e => { toggleSubItem(e) }}>
                                <div className="nav__items">
                                    <div className="nav__subtitle">
                                        <ImageWrapper className='sidebar_icon' alt='' fileName='message2.png'></ImageWrapper>
                                        قالب
                                        <i className="-icon pi pi-angle-down"></i>
                                    </div>

                                    <div className="nav__dropdown-collapse">
                                        <div className="nav__dropdown-content">
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.templateCategroy} className="nav__dropdown-item">نمایش دسته‌بندی‌ها</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.template} className="nav__dropdown-item">نمایش قالب</NavLink>
                                            </div>
                                            <div className="nav__dropdown-item">
                                                <NavLink to={ENRoutes.templateCreate} className="nav__dropdown-item">افزودن قالب</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='report.png'></ImageWrapper>
                                    گزارش ها
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='developer.png'></ImageWrapper>
                                    توسعه دهندگان
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='refresh.png'></ImageWrapper>
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
                            <ImageWrapper className='sidebar_icon' alt='' fileName='smsHubLogo.png'></ImageWrapper>
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
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='message.png'></ImageWrapper>
                                    ارسال
                                </div>
                            </div>
                            <div className="nav__items">
                                <div className="nav__subtitle">
                                    <ImageWrapper className='sidebar_icon' alt='' fileName='developer.png'></ImageWrapper>
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