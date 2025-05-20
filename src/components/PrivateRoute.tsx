import { Navigate, Outlet } from 'react-router';
import { ENRoutes } from '../constants/ENRoutes';

export const PrivateRoute = () => {
    const auth = true; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    console.log(auth);
    console.log(Outlet);
    return auth ? <Outlet /> : <Navigate to={ENRoutes.Root} />;
}