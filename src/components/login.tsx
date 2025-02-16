import { useEffect, useState } from 'react';
import { setAxiosHeader } from '../services/httpService';
import { getDynamics } from '../dynamics/getDynamics';
import * as ENRoutes from '../constants/ENRoutes';
import SlidershowCarousel from './slideshow-carousel';
import { configs } from '../dynamics/exportConfigs';
import { useNavigate } from "react-router";
import SlidershowTextPanel from './slidershow-text-panel';
import { BEARER } from '../constants/ActionTypes';
import { AxiosResponse } from 'axios';
import { GET, POST } from '../services/callAPIWrapperService';
import ImageWrapper from './image';

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
        console.log('1');
        setNextAction(false);// after return to the main page, another login will have been needed, so next action should not shown                            
        const AUTH_TOKEN = BEARER + response.data.data.accessToken;
        setAxiosHeader(AUTH_TOKEN);
        navigate(ENRoutes.SMSHub);
    }
    const callFirstStepAPI = async (event: any) => {
        event.preventDefault()
        POST(getDynamics.apis.firstStep, inputs).then((response: any) => {
            response.data.meta.nextAction.length > 0 ? hasSecondStep(response) : getServerToken(response)
        })
    }
    const onSubmit = (event: any) => {
        console.log(event);

    }

    const callSecondStepAPI = async () => {
        POST(getDynamics.apis.secondStep, secondStep).then((response: any) => {
            getServerToken(response);
        })
    }
    const getCaptcha = async () => {
        GET(getDynamics.apis.loginCaptcha).then((response: any) => {
            inputs.captchaInputText = response.data.data.dntCaptchaTextValue;
            setCaptchaImg(response.data.data.dntCaptchaImgUrl);
        })
    }
    return (
        <>
            <form onSubmit={callFirstStepAPI} className="wrapper">
                <section className="main">
                    <div className="_content">
                        <div className="inner_content">
                            {nextAction ?
                                <>
                                    <div className='mb-8 _logo-wrapper'>
                                        <ImageWrapper className='w-100 h-100 _logo' alt='' fileName='abfa_logo.png'></ImageWrapper>
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
                                        <ImageWrapper className='w-100 h-100 _logo' alt='' fileName='abfa_logo.png'></ImageWrapper>
                                    </div>
                                    <input name='username' placeholder='نام کاربری' type="text" dir='rtl' className='inputs fa fa-user' value={inputs.username} onChange={setLoginForm} />
                                    <input name='password' placeholder='گذرواژه' type="password" dir='rtl' className='inputs fa fa-password' value={inputs.password} onChange={setLoginForm} />
                                    <div className='_captcha'>
                                        <div className='captcha-refresh-wrapper' onClick={() => getCaptcha()}>
                                            <ImageWrapper className='captcha-refresh' alt='' fileName='refresh.png'></ImageWrapper>
                                        </div>
                                        {captchaImg ?
                                            <img className="captcha-image" src={captchaImg} alt="" />
                                            :
                                            <div className="spinner_"></div>
                                        }
                                    </div>
                                    <input name='captchaText' placeholder='کد امنیتی را وارد نمایید' type="text" dir='rtl' className='inputs' value={inputs.captchaText} onChange={setLoginForm} />

                                    <button id="enter-button" type='submit' className="_button">
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
            </form>
        </>
    )
}