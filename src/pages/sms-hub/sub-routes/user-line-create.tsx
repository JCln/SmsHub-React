import React, { useEffect, useState } from 'react';
import { ICreateUserLineDto } from '../../../constants/interface';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ENNaming } from '../../../constants/naming';
import { toast } from 'react-toastify';

export default function UserLineCreate() {
    const [userId, setUserId] = useState<any>();
    const [lineId, setLineId] = useState<any>();
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
        })
    }

    return (
        <>
            <div className='d-grid'>
                <div>
                    <div className='_section_view'>
                        <div>
                            <h3>کاربر</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-user"></i>
                                    </div>
                                    <Dropdown value={selectedUserId} onChange={(e: DropdownChangeEvent) => setSelectedUserId(e.value)} options={userId} optionLabel="displayName"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>خط</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-arrow-right-arrow-left"></i>
                                    </div>
                                    <Dropdown value={selectedLineId} onChange={(e: DropdownChangeEvent) => setSelectedLineId(e.value)} options={lineId} optionLabel="number"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>افزودن</h3>
                            <p>برای افزودن کاربر-خط  برروی «افزودن کاربر- خط» کلیک نمایید</p>
                            {
                                <div>
                                    <button onClick={() => callAPI()} className="_button w-20rem">
                                        افزودن کاربر- خط
                                    </button>
                                </div>}
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
