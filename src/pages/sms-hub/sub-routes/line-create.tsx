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
        console.log(e.target.value);        
        console.log(e.target.value.credentialTemplate);        
        createLine.credential = e.target.value.credentialTemplate;
    }
    const callAPI = async () => {
        createLine.providerId = selectedProvider;
        console.log(createLine);

        // POST(getDynamics.apis.lineCreate, createLine).then(() => {
        //     POST(getDynamics.apis.providerGetList).then((res: any) => {
        //         console.log(res);
        //         toast.success(ENNaming.successCreate);
        //     })
        // })
    }

    return (
        <>
            <div className='create-line-wrapper'>
                <div>
                    <div className='_section_view'>
                        <div>
                            <h3>سرویس دهنده</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-arrow-right-arrow-left"></i>
                                    </div>
                                    <Dropdown name='providerId' value={selectedProvider} onChange={(e: DropdownChangeEvent) => changeSelectedProvider(e)} options={providers} optionLabel="title"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" />
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
                                    <input name='number' placeholder='شماره' type="number" dir='ltr' className='inputs' value={createLine.number} onChange={setForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>مجوزها</h3>
                            <div>
                                <textarea className='w-full text-area-line' name='credential' value={createLine.credential} onChange={setForm}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>افزودن</h3>
                            <p>برای افزودن برروی «افزودن خط» کلیک نمایید</p>
                            {
                                <div>
                                    <button onClick={() => callAPI()} className="_button w-20rem">
                                        افزودن خط
                                    </button>
                                </div>}
                        </div>
                    </div>

                </div>
                <div>
                    {/* image section */}
                    <div className='brand-wrapper'>
                        <img className='brand-logo' src={brandLogo} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}
