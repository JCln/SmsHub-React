import { useNavigate } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import AjaxService from './ajaxService';
import { ACCESS_TOKEN } from '../constants/ActionTypes';
import { useEffect } from 'react';

export const RouteToLogin = () => {
    console.log(0);
    const navigate = useNavigate();
    console.log(1);
    useEffect(() => {
        navigateToRoot();
    }, [])
    const navigateToRoot = () => {
        navigate(ENRoutes.Root)

    }
    // navigate(ENRoutes.SMSHub);
    console.log(2);
    // AjaxService.removeItem(ACCESS_TOKEN);

    // return (

    // )
}
