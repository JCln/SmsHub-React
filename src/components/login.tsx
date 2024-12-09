import { Button } from './Button';
import loginLogo from '../images/logo.jpg';
import back1 from '../images/back1.png';
import loginDashboard from '../images/login-dashboard.jpg';
import { Link } from 'react-router';
import * as ENRoutes from '../constants/ENRoutes';
import { Inputs } from './Inputs';

export const Login = () => {
    const loginForm = {
        username: '',
        password: '',
        captcha: '',
    }
    return (
        <>
            <div className="wrapper">
                <section className="main">
                    <img className="w-100 h-100" src={back1} alt="" />
                    <div className="_content">
                        <div className="inner_content">
                            <img className="w-100 h-100 _logo" src={loginLogo} alt="" />
                            <Inputs direction='rtl' label='نام کاربری' name='username' placeholder='نام کاربری' type='text' />
                            <Inputs direction='rtl' label='رمز عبور' name='password' placeholder='رمز عبور' type='password' />
                            <Inputs direction='ltr' label='کپچا' name='captcha' placeholder='کپچا' type='text' />
                            <Inputs direction='rtl' label='کد امنیتی را وارد نمایید' name='enterCaptcha' placeholder='کد امنیتی را وارد نمایید' type='text' />
                            <button className="_button" onClick={e => {
                                console.log(e)
                            }}>
                                ورود
                            </button>
                        </div>
                    </div>
                </section>
                <section className="slider">
                    <div className="version">
                        <div className="version-name">1.2.1</div>
                    </div>
                    <div className="description">
                        <img className="img-full dashboard" src={loginDashboard} alt=""></img>
                    </div>
                    <div className="slider_content">
                        <h2>قابلیت اتصال به داشبورد امور مشترکین</h2>
                        <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که </p>
                    </div>
                    <div className="bubble bubble1"></div>
                    <div className="bubble bubble2"></div>
                    <div className="bubble bubble3"></div>
                    <div className="bubble bubble4"></div>
                    <div className="bubble bubble5"></div>
                    <div className="bubble bubble6"></div>
                    <div className="bubble bubble7"></div>
                </section>
            </div>
        </>
    )
}


{/* <div className='َapp'>            
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
    </Button> */}
