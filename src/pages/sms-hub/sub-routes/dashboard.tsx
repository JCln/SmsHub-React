import DashboardLineSend from "./dashboard-line-send";
import { useEffect, useRef, useState } from "react";
import DashboardLineReceive from "./dashboard-line-receive";
import DashboardKnob from "./dashboard-knob";

const Dashboard = () => {
    const [knobValue, setKnobValue] = useState();
    const [reportOne, setReportOne] = useState([
        { id: 1, title: 'تعداد ارسال', value: '330', icon: 'pi pi-bookmark' },
        { id: 2, title: 'حجم ارسال', value: '33', icon: 'pi pi-bookmark' },
        { id: 3, title: 'هزینه ارسال(ریال)', value: '59,052', icon: 'pi pi-bookmark' },
        { id: 4, title: 'رسیده به گیرنده', value: '32', icon: 'pi pi-bookmark' },
        { id: 5, title: 'نرسیده به گیرنده', value: '0', icon: 'pi pi-bookmark' },
        { id: 6, title: 'تعداد دریافت', value: '3', icon: 'pi pi-bookmark' }
    ]);
    const [reportTwo, setReportTwo] = useState([
        { id: 1, title: 'تعداد پیام‌های زمان‌بندی شده', value: '0', icon: 'pi pi-clock' },
        { id: 2, title: 'در صف ارسال', value: '0', icon: 'pi pi-list-check' },
        { id: 3, title: 'تعداد ارسال', value: '0', icon: 'pi pi-envelope' },
        { id: 4, title: 'حجم ارسال', value: '0', icon: 'pi pi-bookmark' },
        { id: 5, title: 'هزینه ارسال(ریال)', value: '0', icon: 'pi pi-wallet' },
        { id: 6, title: 'ارسال به مخابرات', value: '0', icon: 'pi pi-times' },
        { id: 7, title: 'رسیده به گیرنده', value: '0', icon: 'pi pi-check' },
        { id: 8, title: 'نرسیده به گیرنده', value: '0', icon: 'pi pi-times-circle' },
        { id: 9, title: 'تعداد دریافت', value: '0', icon: 'pi pi-times-circle' },
        { id: 10, title: 'خطاهای وب سرویس', value: '0', icon: 'pi pi-times-circle' },
    ]);



    return (
        <>
            <div className='dashboard-section'>
                <h3 className='dashboard-title'>
                    گزارش ماهیانه
                </h3>
                <div className="test">
                    <div className="half">
                        <DashboardLineSend />
                    </div>
                    <div className="half">
                        <DashboardLineReceive />
                    </div>
                </div>
                <div className='dahboard-first'>
                    <div className="dashboard-wrapper">
                        {
                            reportOne.map((item, i) => (
                                <>
                                    <div className='dash-card-two'>
                                        <div className="d-flex align-items-center gap-2">
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
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className='dashboard-section'>
                <h3 className='dashboard-title'>گزارشات روزانه </h3>
                <div className="dashboard-wrapper">
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