import { Outlet } from "react-router";
import SidebarNav from "../../../components/sidebar";
import Header from "../../../components/header";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ACCESS_TOKEN, IDENTITY_CLAIM_GIVENNAME, IDENTITY_CLAIM_ROLE } from "../../../constants/ActionTypes";
import { IUserClaims } from "../../../constants/interface";
import CustomBreadcrumb from "../../../components/custom-breadcrumb";

const Home = () => {
    const [userClaim, setUserClaim] = useState<IUserClaims>({ givenName: '', role: '' });
    useEffect(() => {
        decodeJWT();
    }, []);

    const decodeJWT = () => {
        try {
            const jwt = localStorage.getItem(ACCESS_TOKEN) as any;
            const jwtToken: any = jwtDecode<JwtPayload>(jwt);
            setUserClaim({ givenName: jwtToken[IDENTITY_CLAIM_GIVENNAME], role: jwtToken[IDENTITY_CLAIM_ROLE] });
        } catch (ex) {
            console.log(ex);
        }
    }
    return (
        <div className='َapp'>
            <div style={{ display: 'flex', direction: 'rtl' }}>
                <SidebarNav user={userClaim}></SidebarNav>
                <div className="_pages_wrapper">
                    <Header user={userClaim} />
                    {/* <CustomBreadcrumb></CustomBreadcrumb> */}
                    <Outlet />
                </div>
            </div>
        </div >
    )
}
export default Home;