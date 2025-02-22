import { Button } from 'primereact/button';
import * as ENRoutes from '../constants/ENRoutes';
import { NavLink, useLocation, useNavigate } from 'react-router';

export default function CustomBreadcrumb() {
    const location = useLocation();
    const navigate = useNavigate();

    return (

        <div className="bg-white d-flex nav-bread">
            <div className="d-flex align-items-center p-2 gap-5 nav-bread-crumb">
                {
                    ENRoutes.getRoutesAndOptions().map(item => (
                        <>
                            {location.pathname.includes(item.link) && (
                                <>
                                    <NavLink
                                        key={item.field}
                                        to={item.link}
                                        className="nav-bread-crumb-link">
                                        <p>
                                            {item.header}
                                        </p>
                                    </NavLink>
                                    <i className=" pi pi-angle-left"></i>
                                </>
                            )}
                        </>
                    ))
                }
            </div>
            <div className="mr-auto d-flex align-items-center cursor-pointer">
                {
                    location.pathname !== ENRoutes.SMSHub && (
                        <Button type="button" icon="pi pi-reply" className='back-button' tooltipOptions={{ position: 'mouse' }} tooltip="بازشگت به صفحه قبل" onClick={() => navigate(-1)} />
                    )
                }
            </div>
        </div >
    )
}
