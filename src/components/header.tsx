import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { IUserClaims } from '../constants/interface';
import profileImage from '../images/profile.png';

const Header = ({ user }: { user: IUserClaims }) => {
    return (
        <>
            <header className="header">
                <div className="header__container">

                    <div className="header__search flex justify-content-end" >
                        <IconField iconPosition="left">
                            <InputIcon className="bx bx-search header__icon pi pi-search" />
                            <input type="search" placeholder="جستجو" className="header__input" />
                        </IconField>
                    </div>
                    <div>
                        <div className="header__toggle">
                            <i className='bx bx-menu' id="header-toggle"></i>
                        </div>
                        <div className='header_display_name'>
                            {(
                                <>
                                    <div className='w-3rem h-3rem'>
                                        <img src={profileImage} alt="" className=""></img>
                                    </div>
                                    <div>
                                        {user.givenName}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )

}
export default Header;