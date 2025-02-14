import DashboardLineSend from "./dashboard-line-send";
import { Knob } from "primereact/knob";
import { useEffect, useRef, useState } from "react";
import DashboardLineReceive from "./dashboard-line-receive";

const Dashboard = () => {
    let [counterValue, setCounterValue] = useState(10);
    const [knobValue, setKnobValue] = useState();
    const [reportOne, setReportOne] = useState([
        { title: 'تعداد ارسال', value: '33', icon: 'pi pi-bookmark' },
        { title: 'حجم ارسال', value: '33', icon: 'pi pi-bookmark' },
        { title: 'هزینه ارسال(ریال)', value: '59,052', icon: 'pi pi-bookmark' },
        { title: 'رسیده به گیرنده', value: '32', icon: 'pi pi-bookmark' },
        { title: 'نرسیده به گیرنده', value: '0', icon: 'pi pi-bookmark' },
        { title: 'تعداد دریافت', value: '3', icon: 'pi pi-bookmark' }
    ]);
    const [reportTwo, setReportTwo] = useState([
        { title: 'تعداد پیام‌های زمان‌بندی شده', value: '0', icon: 'pi pi-clock' },
        { title: 'در صف ارسال', value: '0', icon: 'pi pi-list-check' },
        { title: 'تعداد ارسال', value: '0', icon: 'pi pi-envelope' },
        { title: 'حجم ارسال', value: '0', icon: 'pi pi-bookmark' },
        { title: 'هزینه ارسال(ریال)', value: '0', icon: 'pi pi-wallet' },
        { title: 'ارسال به مخابرات', value: '0', icon: 'pi pi-times' },
        { title: 'رسیده به گیرنده', value: '0', icon: 'pi pi-check' },
        { title: 'نرسیده به گیرنده', value: '0', icon: 'pi pi-times-circle' },
        { title: 'تعداد دریافت', value: '0', icon: 'pi pi-times-circle' },
        { title: 'خطاهای وب سرویس', value: '0', icon: 'pi pi-times-circle' },
    ]);
    useEffect(() => {
    }, [])
    const test22 = () => {

        var interval = 100;
        const timer = function () {
            interval--;
            //do your thing here
            setCounterValue(interval)
            interval = interval < 40 ? 40 : interval;
            setTimeout(timer, interval);
        };
        timer();
    };
    const handleCounterUpdate = (increment: boolean) => {
        // const delta = (Math.floor(Math.random() * 100) + 1) * 0.99;
        // setCounterValue(increment ? counterValue + delta : counterValue - delta);
        test22()
    };
    return (
        <>
            <div className='dashboard-section'>
                <h3 className='dashboard-title'>گزارش ماهیانه
                    <Knob value={counterValue} readOnly />
                    {/* <AnimatedCounter value={counterValue} color="gray" fontSize="40px" /> */}
                    <button onClick={() => handleCounterUpdate(false)}>Decrement</button>
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
                                    <div className='dash-card-wrap'>
                                        <i className={item.icon}></i>
                                        <div className='dash-card-content'>
                                            <div className="dash-card-value">
                                                {item.value}
                                            </div>
                                            <p>{item.title}</p>
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