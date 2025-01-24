import { Outlet } from "react-router";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

const Home = () => {
    return (
        <div className='َapp'>
            <div style={{ display: 'flex', direction: 'rtl' }}>
                <Sidebar></Sidebar>
                <div className="_pages_wrapper">
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div >
    )
}
export default Home;