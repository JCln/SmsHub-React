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


const Header = () => {
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
            <header className="header">
                <div className="header__container">
                    <img src={settingsImage} alt="" className="header__img"></img>

                    <div className="header__search">
                        <input type="search" placeholder="Search" className="header__input" />
                        <i className='bx bx-search header__icon'></i>
                    </div>

                    <div className="header__toggle">
                        <i className='bx bx-menu' id="header-toggle"></i>
                    </div>
                </div>
            </header>
        </>
    )

}
export default Header;