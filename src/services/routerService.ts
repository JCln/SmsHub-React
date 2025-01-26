import { useNavigate } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import AjaxService from './ajaxService';
import { ACCESS_TOKEN } from '../constants/ActionTypes';

export default function RouterService() {
    const navigate = useNavigate();

    function logout() {
        // eslint-disable-next-line react-hooks/rules-of-hooks        
        console.log(1);

        navigate(ENRoutes.SMSHub);
        console.log(2);
        AjaxService.removeItem(ACCESS_TOKEN);
    }
}
