import React, { useEffect, useState } from 'react';
import brandLogo from '../../../images/Magfa.jpg';
import { ILine } from '../../../constants/interface';
import { POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { ENNaming } from '../../../constants/naming';
import { toast } from 'react-toastify';

export default function LineCreate() {
    const [providers, setProviders] = useState<any>();
    const [selectedProvider, setSelectedProvider] = useState<any>();
    const [createLine, setCreateLine] = useState<ILine>({
        providerId: 1,
        number: '',
        credential: ''
    });
    useEffect(() => {
        POST(getDynamics.apis.providerGetList).then((res: any) => {
            setProviders(res.data.data);
        })
    }, []);
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setCreateLine(values => ({ ...values, [name]: value }))
    }
    const changeSelectedProvider = (e: any) => {
        setSelectedProvider(e);
        setCreateLine(values => ({ ...values, credential: e.credentialTemplate, providerId: e.id }))
    }
    const callAPI = async () => {
        POST(getDynamics.apis.lineCreate, createLine).then(() => {
            POST(getDynamics.apis.providerGetList).then((res: any) => {
                toast.success(ENNaming.successCreate);
                setCreateLine(values => ({ ...values, credential: '', providerId: 1, number: '' }));
            })
        })
    }

    return (
        <>
            <div className='d-grid border-10 card-box-shadow p-1-0 m-12px'>
                <div className='d-grid two_columns'>
                    <div className='_section_view'>
                        <div>
                            <h3>سرویس دهنده</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <Dropdown value={selectedProvider} onChange={(e: DropdownChangeEvent) => changeSelectedProvider(e.value)} options={providers} optionLabel="title"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>خط</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <input name='number' placeholder='شماره' type="number" dir='ltr' className='inputs' value={createLine.number} onChange={setForm} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => callAPI()} className="_button w-20rem mt-1-2">
                                افزودن خط
                            </button>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <h3>مجوزها</h3>
                        <div>
                            <textarea className='w-full text-area-line dir-ltr' name='credential' value={createLine.credential} onChange={setForm}>
                            </textarea>
                        </div>
                    </div>
                </div>
                {/* <div> */}
                {/* image section */}
                {/* <div className='brand-wrapper'> */}
                {/* <img className='brand-logo' src={brandLogo} alt="" /> */}
                {/* </div> */}
                {/* </div> */}
            </div >
        </>
    )
}
