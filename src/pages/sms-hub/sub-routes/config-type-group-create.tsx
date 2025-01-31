import React, { useEffect, useState } from 'react';
import { POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { ENNaming } from '../../../constants/naming';
import { toast } from 'react-toastify';
import { IConfigeTypeGroupDTO } from '../../../constants/interface';

export default function ConfigTypeGroupCreate() {
    const [configTypeGroupDTO, setConfigTypeGroupDTO] = useState<IConfigeTypeGroupDTO>({
        title: '',
        description: ''
    });
    useEffect(() => {
    }, []);
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setConfigTypeGroupDTO(values => ({ ...values, [name]: value }))
    }
    const callAPI = async () => {
        POST(getDynamics.apis.ConfigTypeGroupCreate, configTypeGroupDTO).then(() => {
            toast.success(ENNaming.successCreate);
        })
    }

    return (
        <>
            <div className='d-grid'>
                <div>
                    <div className='_section_view'>
                        <div>
                            <h3>عنوان</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <input name='title' placeholder='عنوان' className='inputs' value={configTypeGroupDTO.title} onChange={setForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>توضیحات</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <input name='description' placeholder='توضیحات' className='inputs' value={configTypeGroupDTO.description} onChange={setForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>افزودن</h3>
                            {
                                <div>
                                    <button onClick={() => callAPI()} className="_button w-20rem">
                                        افزودن
                                    </button>
                                </div>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
