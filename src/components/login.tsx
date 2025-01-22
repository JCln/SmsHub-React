import loginLogo from '../images/logo.jpg';
import back1 from '../images/back1.png';
import refreshIcon from '../images/refresh.png';
import { useEffect, useRef, useState } from 'react';
import http, { setAxiosHeader } from '../services/httpService';
import { getDynamics } from '../dynamics/getDynamics';
import * as ENRoutes from '../constants/ENRoutes';
import SlidershowCarousel from './slideshow-carousel';
import { configs } from '../dynamics/exportConfigs';
import { useNavigate } from "react-router";
import SlidershowTextPanel from './slidershow-text-panel';

export const Login = () => {
    // let captchaLogo = '';
    let navigate = useNavigate();
    const [captchaImg, setCaptchaImg] = useState(null);
    const [inputs, setInputs] = useState(
        {
            username: '',
            password: '',
            clientDateTime: 'string',
            appVersion: 'string',
            captchaText: '',
            captchaInputText: ''
        });

    useEffect(() => {
        getCaptcha();
    }, []);

    const setLoginForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const callAPI = async () => {
        console.log(inputs);
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.login}`, inputs)
            .then(function (response) {
                const AUTH_TOKEN = `Bearer ` + response.data.data.accessToken;
                setAxiosHeader(AUTH_TOKEN);
                navigate(ENRoutes.userAll);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const getCaptcha = async (): Promise<any> => {
        await http.get(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.loginCaptcha}`)
            .then(function (response) {
                inputs.captchaInputText = response.data.data.dntCaptchaTextValue;
                setCaptchaImg(response.data.data.dntCaptchaImgUrl);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <>
            <div className="wrapper">
                <section className="main">
                    <img className="w-100 h-100" src={back1} alt="" />
                    <div className="_content">
                        <div className="inner_content">
                            <img className="w-100 h-100 _logo" src={loginLogo} alt="" />
                            <input name='username' placeholder='نام کاربری' type="text" dir='rtl' className='inputs fa fa-user' value={inputs.username} onChange={setLoginForm} />
                            <input name='password' placeholder='گذرواژه' type="password" dir='rtl' className='inputs fa fa-password' value={inputs.password} onChange={setLoginForm} />
                            <div className='_captcha'>
                                <div className='captcha-refresh-wrapper'>
                                    <img onClick={() => {
                                        getCaptcha()
                                    }}
                                        className="captcha-refresh" src={refreshIcon} alt="" />
                                </div>
                                {captchaImg ?
                                    <img className="captcha-image" src={captchaImg} alt="" />
                                    :
                                    <div className="spinner"></div>
                                }
                            </div>
                            <input name='captchaText' placeholder='کد امنیتی را وارد نمایید' type="text" dir='rtl' className='inputs' value={inputs.captchaText} onChange={setLoginForm} />

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
                        <div className="version-name">{configs.version}</div>
                    </div>
                    <div className="description">
                        <SlidershowCarousel />
                    </div>
                    <div className="slider_content">
                        <SlidershowTextPanel />
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