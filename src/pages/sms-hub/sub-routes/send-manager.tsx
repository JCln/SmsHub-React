import React, { useCallback, useEffect, useState } from 'react';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { ENNaming } from '../../../constants/naming';
import { toast } from 'react-toastify';
import { ISendManagerDTO } from '../../../constants/interface';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';


export default function SendManager() {
    const [templateId, setTemplateDictionary] = useState<any[]>([]);
    const [lineId, setLineDictionary] = useState<any[]>([]);
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
    ;
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
        POST(getDynamics.apis.sendManagerCreate + '/' + selectedTemplateId.id + '/' + selectedLineId.id, sendMessageDTO.text).then(() => {
            setSendMessageDTO({ text: '' });
            toast.success(ENNaming.successCreate);
        })
    }

    return (
        <>

            <div className="bg-white border-15">
                <div className='d-grid two_columns'>
                    <div className='m-0-auto'>
                        <div className='_section_view'>
                            <p>شماره خط</p>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <Dropdown value={selectedLineId} onChange={(e: DropdownChangeEvent) => setSelectedLineId(e.value)} options={lineId} optionLabel="lineNumber"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                        </div>
                        <div className='_section_view'>
                            <p>قالب پیام</p>
                            <div className="w-20rem">
                                <div className='_captcha'>
                                    <Dropdown value={selectedTemplateId} onChange={(e: DropdownChangeEvent) => setSelectedTemplateId(e.value)} options={templateId} optionLabel="title"
                                        placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                </div>
                            </div>
                            <div>
                                {
                                    <div>
                                        <button onClick={() => callAPI()} className="_button w-20rem mt-2">
                                            ارسال
                                        </button>
                                    </div>}
                            </div>
                        </div>
                    </div>

                    <div className='_section_view'>
                        <p>اطلاعات کاربران</p>
                        <div>
                            <textarea
                                className='w-full text-area-line special-font-family dir-ltr h-15rem'
                                placeholder='وارد نمایید برای مثال JSON اطلاعات کاربران را بصورت
                                    [{
                                         text" : "متن مورد نظر",                                         
                                         "mobile" : " 091~~~~~~~"
    }]'
                                name='text'
                                value={sendMessageDTO.text}
                                onChange={setForm}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}