import { Button } from './Button';
import loginLogo from '../images/logo.png';
import phoneCall from '../images/phone-call.svg';
import { Link } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import { Inputs } from './Inputs';

export const Login = () => {
    return (
        <div className='َapp'>            
            <div className="_content">
                <img className='logo-img' src={loginLogo} alt="" />
                <h3>ورود/ ثبت نام</h3>
                <div className='d-flex mb-3'>
                    <span
                        className="input-group-text">
                        <img className='input_icon' src={phoneCall} alt="" />
                    </span>
                    <Inputs direction='ltr' type='text' icon=':(' label='شماره همراه' name='mobile' placeholder='09*********' key={23}></Inputs>
                </div>
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
