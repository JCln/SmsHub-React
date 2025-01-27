import loginLogo from '../images/abfa_logo.png';
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
import { BEARER } from '../constants/ActionTypes';
import { AxiosResponse } from 'axios';

export const Login = () => {
    let navigate = useNavigate();
    const [captchaImg, setCaptchaImg] = useState(null);
    const [nextAction, setNextAction] = useState<boolean>(false);
    const [inputs, setInputs] = useState(
        {
            username: '',
            password: '',
            clientDateTime: '',
            appVersion: '',
            captchaText: '',
            captchaInputText: ''
        });
    const [secondStep, setSecondStep] = useState({
        id: '',
        confirmCode: ''
    })

    useEffect(() => {
        getCaptcha();
    }, []);

    const setLoginForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const setSecondStepForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setSecondStep(values => ({ ...values, [name]: value }))
    }
    const hasSecondStep = (response: AxiosResponse) => {
        setNextAction(true);
        setSecondStep({ id: response.data.data.id, confirmCode: '' });
    }
    const getServerToken = (response: AxiosResponse) => {
        setNextAction(false);// after return to this main page another login will have being needs, so next action should not shown                            
        const AUTH_TOKEN = BEARER + response.data.data.accessToken;
        setAxiosHeader(AUTH_TOKEN);
        navigate(ENRoutes.SMSHub);
    }
    const callFirstStepAPI = async () => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.apis.firstStep}`, inputs)
            .then(function (response) {
                response.data.meta.nextAction.length > 0 ? hasSecondStep(response) : getServerToken(response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const callSecondStepAPI = async () => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.apis.secondStep}`, secondStep)
            .then(function (response) {
                getServerToken(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const getCaptcha = async () => {
        await http.get(`${getDynamics.configs.apiEndpoint}${getDynamics.apis.loginCaptcha}`)
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
                            {nextAction ?
                                <>
                                    <div className='mb-8 _logo-wrapper'>
                                        <img className="w-100 h-100 _logo" src={loginLogo} alt="" />
                                    </div>
                                    <h3>مرحله دوم احراز هویت</h3>
                                    <p>کد تایید ارسال شده به شماره همراه را وارد نمایید</p>
                                    <input value={secondStep.confirmCode} onChange={setSecondStepForm} name='confirmCode' placeholder='کد تایید را وارد نمایید' type="text" dir='ltr' className='inputs text-center' />

                                    <button className="_button" onClick={e => {
                                        callSecondStepAPI()
                                    }}>
                                        تایید
                                    </button>
                                </> :
                                <>
                                    <div className='mb-8 _logo-wrapper'>
                                        <img className="w-100 h-100 _logo" src={loginLogo} alt="" />
                                    </div>
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
                                        callFirstStepAPI()
                                    }}>
                                        ورود
                                    </button>
                                </>
                            }
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