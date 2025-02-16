import DashboardLineSend from "./dashboard-line-send";
import { useEffect, useRef, useState } from "react";
import DashboardLineReceive from "./dashboard-line-receive";
import DashboardKnob from "./dashboard-knob";
import CountUp, { useCountUp } from "react-countup";
import PageTitle from "../../../components/page-title";

const Dashboard = () => {
    const [knobValue, setKnobValue] = useState();
    const [reportOne, setReportOne] = useState([
        { id: 1, title: 'تعداد ارسال', isCountUp: true, value: '2000000', icon: 'pi pi-bookmark' },
        { id: 2, title: 'حجم ارسال', isCountUp: true, value: '33', icon: 'pi pi-bookmark', description: 'نیازمند توضیحات اضافه' },
        { id: 3, title: 'هزینه ارسال(ریال)', isCountUp: true, value: '59052', icon: 'pi pi-dollar', description: 'نیازمند توضیحات اضافه' },
        { id: 4, title: 'رسیده به گیرنده', isCountUp: false, value: '32', icon: 'pi pi-bookmark' },
        { id: 5, title: 'نرسیده به گیرنده', isCountUp: false, value: '2', icon: 'pi pi-bookmark' },
        { id: 6, title: 'تعداد دریافت', isCountUp: true, value: '1938811', icon: 'pi pi-bookmark' }
    ]);
    const [reportTwo, setReportTwo] = useState([
        { id: 1, title: 'تعداد پیام‌های زمان‌بندی شده', value: '0', icon: 'pi pi-clock' },
        { id: 2, title: 'در صف ارسال', value: '0', icon: 'pi pi-list-check' },
        { id: 3, title: 'تعداد ارسال', value: '0', icon: 'pi pi-envelope' },
        { id: 4, title: 'حجم ارسال', value: '0', icon: 'pi pi-bookmark' },
        { id: 5, title: 'هزینه ارسال(ریال)', value: '0', icon: 'pi pi-wallet' },
        { id: 6, title: 'ارسال به مخابرات', value: '0', icon: 'pi pi-wifi' },
        { id: 7, title: 'رسیده به گیرنده', value: '0', icon: 'pi pi-check-circle clr-green-500' },
        { id: 8, title: 'نرسیده به گیرنده', value: '0', icon: 'pi pi-times-circle clr-red-500' },
        { id: 9, title: 'تعداد دریافت', value: '0', icon: 'pi pi-times-cinumrcle' },
        { id: 10, title: 'خطاهای وب سرویس', value: '0', icon: 'pi pi-server' },
    ]);


    return (
        <>
            <div className='outer-container'>
                <PageTitle title='گزارش ماهیانه' className='pi pi-chart-line' isIcon={true}></PageTitle>
                <div className="dash-line-section">
                    <div className="">
                        <div className='dash-card-two dash-card-two-line'>
                            <div className="d-flex align-items-center gap-2 justify-space-between flex-direction-reverse">
                                <i className="pi pi-bookmark"></i>
                                <p className="title">پیام‌های ارسالی</p>
                            </div>
                            <div className='dash-card-two-content'>
                                <div className="dash-card-two-value">
                                    <DashboardLineSend />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className='dash-card-two dash-card-two-line'>
                            <div className="d-flex align-items-center gap-2 justify-space-between flex-direction-reverse">
                                <i className="pi pi-bookmark"></i>
                                <p className="title">پیام‌های دریافتی</p>
                            </div>
                            <div className='dash-card-two-content'>
                                <div className="dash-card-two-value">
                                    <DashboardLineReceive />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard-first'>
                    <div className="dashboard-wrapper dash-first-card">
                        {
                            reportOne.map((item, i) => (

                                <>
                                    {
                                        item.isCountUp ?
                                            <div className='dash-card-two'>
                                                <div className="d-flex align-items-center gap-2 justify-space-between flex-direction-reverse">
                                                    <i className={item.icon}></i>
                                                    <p className="title">{item.title}</p>
                                                </div>
                                                <h2><CountUp enableScrollSpy scrollSpyDelay={2000} duration={5} end={Number(item.value)} /></h2>
                                                <div className="desc">{item.description}</div>

                                            </div> :
                                            <div className='dash-card-two'>
                                                <div className="d-flex align-items-center gap-2 justify-space-between flex-direction-reverse">
                                                    <i className={item.icon}></i>
                                                    <p className="title">{item.title}</p>
                                                </div>
                                                <h2>{item.value}</h2>
                                                <div className='dash-card-two-content'>
                                                    <div className="dash-card-two-value">
                                                        <DashboardKnob key={item.id} maxNumber={item.value}></DashboardKnob>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </>
                            ))
                        }
                    </div>
                </div>
            </div >
            <div className='outer-container'>
                <PageTitle title='گزارشات روزانه' className='pi pi-chart-pie' isIcon={true}></PageTitle>
                <div className="dashboard-wrapper mt-1">
                    {
                        reportTwo.map(item => (
                            <>
                                <div className='dash-card-wrap'>
                                    <i className={item.icon}></i>
                                    <div className='dash-card-content'>
                                        <div className="dash-card-value">{item.value}</div>
                                        <p>{item.title}</p>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default Dashboard;