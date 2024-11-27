import { Button } from './Button';
import loginLogo from '../images/logo.png';
import { Input } from './Input';
import { Link } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';

export const Login = () => {
    return (
        <div className='َApp'>
            <div className="_content">
                <img className='logo-img' src={loginLogo} alt="" />
                <h3>ورود/ ثبت نام</h3>
                <Input icon=':(' label='شماره همراه' name='mobile' placeholder='09*********' key={23}></Input>
                <p>با وارد نمودن شماره همراه یک کد تایید برای شما به صورت پیامک ارسال خواهد شد</p>

                <Button onClick={(e) => {
                    // e.preventDefault();
                    <Link to={ENRoutes.TwoStepVerification}></Link>
                    console.log(e);
                }}
                >
                    ورود
                </Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    console.log(e);
                }}
                >
                    ثبت نام
                </Button>
            </div>
        </div>
    )
}
