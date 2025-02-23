import { useNavigate } from 'react-router';

export const RouteToLogin = (redirectTo: string) => {
    const navigate = useNavigate();
    navigate(redirectTo);
};
