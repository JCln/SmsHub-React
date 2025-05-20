import { Outlet, useNavigate } from 'react-router';
import { ENRoutes } from '../constants/ENRoutes';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/ActionTypes';
import { MathS } from '../services/utils';
import { jwtDecode } from "jwt-decode";
import { storageService } from '../services/storage.service';
import { ENNaming } from '../constants/naming';
import { SessionExpiredModal } from './modal';

export default function ProtectedRoute() {
    const navigate = useNavigate();

    const getOriginAccessToken = () => {
        return storageService.getItem<string>(ACCESS_TOKEN) || '';
    }
    const getOriginRefreshToken = () => {
        return storageService.getItem<string>(REFRESH_TOKEN) || '';
    }
    const getDecodedAccessToken = (): string => {
        return jwtDecode(storageService.getItem(ACCESS_TOKEN) || '');
    }
    const getAccessTokenExpirationDateUtc = (): Date => {
        const decoded = getDecodedAccessToken();
        const date = new Date(0); // The 0 sets the date to the epoch
        date.setUTCSeconds(decoded['exp']);
        return date;
    }
    const isAccessTokenTokenExpired = (): boolean => {
        const expirationDateUtc = getAccessTokenExpirationDateUtc();
        if (!expirationDateUtc) {
            return true;
        }
        return !(expirationDateUtc.valueOf() > new Date().valueOf());
    }
    const hasStoredTokens = (): boolean => {
        return (!MathS.isEmptyString(getOriginAccessToken()) && !MathS.isEmptyString(getOriginRefreshToken()));
    }
    const handleRefresh = () => {
        storageService.removeItem(ACCESS_TOKEN);
        storageService.removeItem(REFRESH_TOKEN);
        navigate(ENRoutes.Root);
    };
    const isAuthUserLoggedIn = (): boolean => {
        return (hasStoredTokens() &&
            !isAccessTokenTokenExpired());
    }
    const auth = isAuthUserLoggedIn();
    return (
        auth
            ?
            <Outlet />
            :
            <SessionExpiredModal
                title={ENNaming.expiredTokenMessageTitle}
                icon='session-expired.jpg'
                onClose={handleRefresh}
                isOpen={true}
                onRefresh={handleRefresh}
                refreshButtonText='بازگشت'
                message={ENNaming.expiredTokenMessage}
            />
    )
}
