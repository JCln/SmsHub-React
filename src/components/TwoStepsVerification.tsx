import { Button } from './Button';
import loginLogo from '../images/logo.png';
import { Inputs } from './Inputs';
import * as ENRoutes from '../constants/ENRoutes';
import { Link } from 'react-router';

const TwoStepVerification = () => {
    return (
        <div className='َApp'>
            <div className="_content">
                <img className='logo-img' src={loginLogo} alt="" />
                <h3>ثبت کد تایید</h3>
                <div>
                    <Inputs type='text' label='شماره همراه' name='mobile' placeholder='09*********' key={23}></Inputs>
                    <Inputs type='text' label='شماره همراه' name='mobile' placeholder='09*********' key={23}></Inputs>
                    <Inputs type='text' label='شماره همراه' name='mobile' placeholder='09*********' key={23}></Inputs>
                    <Inputs type='text' label='شماره همراه' name='mobile' placeholder='09*********' key={23}></Inputs>
                </div>
                <p>جهت ورود یا ثبت نام، کد ارسال شده را وارد کنید</p>

                <Button onClick={(e) => {
                    // e.preventDefault();
                    <Link to={ENRoutes.TwoStepVerification}></Link>
                    console.log(e);
                }}
                >
                    ثبت کد
                </Button>
            </div>
        </div>
    )
}
export default TwoStepVerification;