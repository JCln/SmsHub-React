import loginLogo from '../images/logo.jpg';
import back1 from '../images/back1.png';
import loginDashboard from '../images/login-dashboard.jpg';
import { useState } from 'react';
import axios from 'axios';

export const Login = () => {
    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        clientDateTime: '',
        appVersion: '',
        captchaText: '',
        captchaToken: '',
        captchaInputText: ''
    });

    const setLoginForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;

        setInputs(values => ({ ...values, [name]: value }))
    }
    const callAPI = () => {
        console.log(inputs);
    }
    // componentDidMount() {
    //     const promise = axios.get("https://localhost:5001/api/posts");
    //     console.log(promise);
    // }

    return (
        <>
            <div className="wrapper">
                <section className="main">
                    <img className="w-100 h-100" src={back1} alt="" />
                    <div className="_content">
                        <div className="inner_content">
                            <img className="w-100 h-100 _logo" src={loginLogo} alt="" />
                            <input name='username' placeholder='نام کاربری' type="text" dir='ltr' className='inputs fa fa-user' value={inputs.username} onChange={setLoginForm} />
                            <input name='password' placeholder='نام کاربری' type="text" dir='ltr' className='inputs fa fa-password' value={inputs.password} onChange={setLoginForm} />
                            <input name='captchaText' placeholder='کد امنیتی را وارد نمایید' type="text" dir='ltr' className='inputs' value={inputs.captchaText} onChange={setLoginForm} />

                            <button className="_button" onClick={e => {
                                callAPI()
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