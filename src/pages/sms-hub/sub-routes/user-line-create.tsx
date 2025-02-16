import React, { useEffect, useState } from 'react';
import { ICreateUserLineDto } from '../../../constants/interface';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ENNaming } from '../../../constants/naming';
import { toast } from 'react-toastify';
import PageTitle from '../../../components/page-title';

export default function UserLineCreate() {
    const [userId, setUserId] = useState<any[]>([]);
    const [lineId, setLineId] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<any>()
    const [selectedLineId, setSelectedLineId] = useState<any>()
    const [createUserLineDTo, setCreateUserLineDTo] = useState<ICreateUserLineDto>({
        lineId: 0,
        userId: ''
    });
    useEffect(() => {
        GET(getDynamics.apis.userAll).then((res: any) => {
            setUserId(res.data.data);
        })
        POST(getDynamics.apis.lineGetList).then((res: any) => {
            setLineId(res.data.data);
        })

    }, []);
    const callAPI = async () => {
        setCreateUserLineDTo({ userId: selectedUserId.id, lineId: selectedLineId.id })
        POST(getDynamics.apis.userLineCreate, createUserLineDTo).then((res: any) => {
            toast.success(ENNaming.successCreate);
            setCreateUserLineDTo({ userId: '', lineId: 0 });
        })
    }

    return (
        <>
            <div className='d-grid border-10 card-box-shadow p-1-0 m-12px justify-content-center'>
                <div className='outer-container'>
                    <PageTitle title='افزودن کاربر- خط' className='simcrd.png' isIcon={false}></PageTitle>
                    <div className='_section_view'>
                        <div>
                            <p>کاربر</p>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="-input-icon pi pi-user"></i>
                                    </div>
                                    <Dropdown value={selectedUserId} onChange={(e: DropdownChangeEvent) => setSelectedUserId(e.value)} options={userId} optionLabel="displayName"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>خط</p>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="-input-icon pi pi-arrow-right-arrow-left"></i>
                                    </div>
                                    <Dropdown value={selectedLineId} onChange={(e: DropdownChangeEvent) => setSelectedLineId(e.value)} options={lineId} optionLabel="number"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                <button onClick={() => callAPI()} className="_button w-20rem mt-1-2">
                                    افزودن کاربر- خط
                                </button>
                            }
                        </div>
                    </div>
                </div>

                <div>
                    {/* image section */}
                    <div className='brand-wrapper'>
                        {/* <img className='brand-logo' src={brandLogo} alt="" /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
