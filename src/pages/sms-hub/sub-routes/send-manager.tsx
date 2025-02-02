import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { ENNaming } from '../../../constants/naming';
import { toast } from 'react-toastify';
import { ISendManagerDTO } from '../../../constants/interface';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

export default function SendManager() {
    const [templateId, setTemplateDictionary] = useState<any>();
    const [lineId, setLineDictionary] = useState<any>();
    const [selectedTemplateId, setSelectedTemplateId] = useState<any>()
    const [selectedLineId, setSelectedLineId] = useState<any>()
    const [sendMessageDTO, setSendMessageDTO] = useState<ISendManagerDTO>({
        text: ''
    });
    useEffect(() => {
        GET(getDynamics.apis.templateGetDictionary).then((res: any) => {
            setTemplateDictionary(res.data.data);
        })
        GET(getDynamics.apis.lineGetDictionary).then((res: any) => {
            setLineDictionary(res.data.data);
        })
    }, []);
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setSendMessageDTO(values => ({ ...values, [name]: value }))
    }
    const callAPI = async () => {
        try {
            sendMessageDTO.text = JSON.parse(sendMessageDTO.text);
        } catch (error) {
            console.error(error);
        }
        console.log(sendMessageDTO.text);

        POST(getDynamics.apis.sendManagerCreate + '/' + selectedTemplateId.id + '/' + selectedLineId.id, sendMessageDTO.text).then(() => {
            toast.success(ENNaming.successCreate);
        })
    }

    return (
        <>
            <div className='d-grid two_columns'>
                <div>
                    <div className='_section_view'>
                        <div>
                            <h3>شماره خط</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <Dropdown value={selectedLineId} onChange={(e: DropdownChangeEvent) => setSelectedLineId(e.value)} options={lineId} optionLabel="lineNumber"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>قالب پیام</h3>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <Dropdown value={selectedTemplateId} onChange={(e: DropdownChangeEvent) => setSelectedTemplateId(e.value)} options={templateId} optionLabel="title"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>اطلاعات کاربران</h3>
                            <p>اطلاعات کاربران را بصورت JSON وارد نمایید</p>
                            <div className="w-full">
                                <div className='_captcha'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <textarea
                                        className='w-full text-area-line special-font-family dir-ltr'
                                        placeholder='
                                        {
                                         "text" : "متن مورد نظر",
                                         "localId" : "" ,
                                         "mobile" : " 091~~~~~~~" 
                                        }'
                                        name='text'
                                        value={sendMessageDTO.text}
                                        onChange={setForm}
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>ارسال</h3>
                            {
                                <div>
                                    <button onClick={() => callAPI()} className="_button w-20rem">
                                        ارسال
                                    </button>
                                </div>}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}