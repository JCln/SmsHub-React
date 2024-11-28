import { Button } from './Button';
import lockTwoStep from '../images/lock.svg';
import { Inputs } from './Inputs';
import * as ENRoutes from '../constants/ENRoutes';
import { Link } from 'react-router';

const TwoStepVerification = () => {
    return (
        <div className='َApp'>
            <div className="_content">
                <img className='logo-img' src={lockTwoStep} alt="" />
                <h3>ثبت کد تایید</h3>
                <div>
                    <Inputs type='text' label='' name='in1' placeholder='' key={1}></Inputs>
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