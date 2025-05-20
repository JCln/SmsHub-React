import { Link, NavLink } from 'react-router';
import { IUserClaims } from '../constants/interface';
import ImageWrapper from './image';
import { ENRoutes, getSidebar } from '../constants/ENRoutes';


const SidebarNav = ({ user }: { user: IUserClaims }) => {
    const toggleSubItem = (e: any) => {
        const allDropDowns = document.querySelectorAll('.nav__dropdown');
        allDropDowns.forEach(item => {
            if (!e.currentTarget.classList.value.includes('toggle-sidebar')) {
                item.classList.remove('toggle-sidebar');
            }
        })

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
        <div className="nav" id="navbar">
            <nav className="nav__container">
                <Link to={ENRoutes.SMSHub} className="nav__link nav__logo">
                    <ImageWrapper className='sidebar__img' alt='' fileName='smsHubLogo.png'></ImageWrapper>
                </Link>
                <div className="nav__list">
                    {
                        getSidebar(user.role).map(item =>
                            <>
                                {item.hasSubRoutes ?
                                    <div className="nav__dropdown" onClick={e => { toggleSubItem(e) }}>
                                        <div className="nav__items">
                                            <div className="nav__subtitle">
                                                <ImageWrapper className='sidebar_icon' alt='' fileName={item.icon}></ImageWrapper>
                                                {item.header}
                                                <i className="-icon pi pi-angle-down"></i>
                                            </div>

                                            {item.subRoutes!.map(subItem => (
                                                <>
                                                    <div className="nav__dropdown-collapse">
                                                        <div className="nav__dropdown-content">
                                                            <div className="nav__dropdown-item">
                                                                <NavLink to={subItem.link} className="nav__dropdown-item">{subItem.header}</NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                    :
                                    <NavLink to={item.link} className="nav__items">
                                        <div className="nav__subtitle">
                                            {
                                                item.hasIcon ?
                                                    <>
                                                        <div className="sidebar_icon">
                                                            <i className={item.icon}></i>
                                                        </div>
                                                        <div className="nav__dropdown-item">{item.header}</div>
                                                    </>
                                                    :
                                                    <>
                                                        <ImageWrapper className='sidebar_icon' alt='' fileName={item.icon}></ImageWrapper>
                                                        <div className="nav__dropdown-item">{item.header}</div>
                                                    </>
                                            }
                                        </div>
                                    </NavLink>
                                }
                            </>
                        )
                    }

                </div>
                <footer>
                    <hr></hr>
                    <div className="footer_icons">
                        <Link to={ENRoutes.Root} className="pi pi-sign-out"></Link>
                        <i className="pi pi-cog"></i>
                        <i className="pi pi-bell"></i>
                        <i className="pi pi-info-circle"></i>
                    </div>
                </footer>
            </nav >
        </div >
    );


}
export default SidebarNav;