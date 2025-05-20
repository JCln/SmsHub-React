import { Button } from './Button';
import { Inputs } from './Inputs';
import { Link } from 'react-router';
import ImageWrapper from './image';
import { ENRoutes } from '../constants/ENRoutes';

const TwoStepVerification = () => {
    return (
        <div className='َapp'>
            <div className="_content">
                <ImageWrapper className='logo-img' alt='' fileName='lock.svg'></ImageWrapper>
                <h3>ثبت کد تایید</h3>
                <div>
                    <Inputs type='text' label='' name='in1' placeholder='' key={1} direction='ltr'></Inputs>
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