import { Outlet } from "react-router";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { ACCESS_TOKEN } from "../../constants/ActionTypes";

const Home = () => {
    const [state, setState] = useState<any>();
    useEffect(() => {
        decodeJWT();
    }, []);

    const decodeJWT = () => {
        try {
            const jwt = localStorage.getItem(ACCESS_TOKEN) as any;
            const jwtToken: any = jwtDecode<JwtPayload>(jwt);
            const currentUser = jwtToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
            setState(currentUser);
        } catch (ex) {
            console.log(ex);
        }
    }
    return (
        <div className='َapp'>
            <div style={{ display: 'flex', direction: 'rtl' }}>
                <Sidebar></Sidebar>
                <div className="_pages_wrapper">
                    <Header user={state} />
                    <Outlet />
                </div>
            </div>
        </div >
    )
}
export default Home;