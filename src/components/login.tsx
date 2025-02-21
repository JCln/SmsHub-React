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
import { useForm } from 'react-hook-form';
import { ILoginForm } from '../constants/interface';
import { ENNaming } from '../constants/naming';

export const Login = () => {
    let navigate = useNavigate();
    const [captchaImg, setCaptchaImg] = useState(null);
    const [nextAction, setNextAction] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<ILoginForm>();

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
        setNextAction(false);// after return to the main page, another login will have been needed, so next action should not shown                            
        const AUTH_TOKEN = BEARER + response.data.data.accessToken;
        setAxiosHeader(AUTH_TOKEN);
        navigate(ENRoutes.SMSHub);
    }
    const callFirstStepAPI = async (event: ILoginForm) => {
        event.captchaInputText = inputs.captchaInputText;
        event.appVersion = getDynamics.configs.version;
        event.clientDateTime = inputs.clientDateTime || '';
        POST(getDynamics.apis.firstStep, event).then((response: any) => {
            response.data.meta.nextAction.length > 0 ? hasSecondStep(response) : getServerToken(response)
        })
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
            <form onSubmit={handleSubmit(callFirstStepAPI)} className="wrapper">
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
                                    <input
                                        placeholder='نام کاربری'
                                        type="text"
                                        dir='rtl'
                                        className='inputs fa fa-user'
                                        {...register("username", {
                                            required: true,
                                            maxLength: 20,
                                            minLength: 3,
                                        })}
                                    />
                                    {errors?.username?.type === "required" &&
                                        <p className='form-error-input'>{ENNaming.requiredItem}</p>}
                                    {errors?.username?.type === "maxLength" && (
                                        <p className='form-error-input'>{ENNaming.maxLengthExceed}</p>
                                    )}
                                    {errors?.username?.type === "minLength" && (
                                        <p className='form-error-input'>{ENNaming.minLengthExceed}</p>
                                    )}

                                    <input
                                        placeholder='گذرواژه'
                                        type="password"
                                        dir='rtl'
                                        className='inputs fa fa-user'
                                        {...register("password", {
                                            required: true,
                                            maxLength: 20,
                                            minLength: 3,
                                        })}
                                    />
                                    {errors?.password?.type === "required" &&
                                        <p className='form-error-input'>{ENNaming.requiredItem}</p>}
                                    {errors?.password?.type === "maxLength" && (
                                        <p className='form-error-input'>{ENNaming.maxLengthExceed}</p>
                                    )}
                                    {errors?.password?.type === "minLength" && (
                                        <p className='form-error-input'>{ENNaming.minLengthExceed}</p>
                                    )}

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
                                    <input
                                        placeholder='کد امنیتی را وارد نمایید'
                                        type="text"
                                        dir='rtl'
                                        className='inputs fa fa-user'
                                        {...register("captchaText", {
                                            required: true,
                                        })}
                                    />
                                    {errors?.captchaText?.type === "required" &&
                                        <p className='form-error-input'>{ENNaming.requiredItem}</p>}

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