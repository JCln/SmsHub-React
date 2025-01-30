import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { ILine } from '../../../constants/interface';
import { ENNaming } from '../../../constants/naming';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import brandLogo from '../../../images/Magfa.jpg';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

const LineEdit = () => {
    const [dataSource, setDataSource] = useState<ILine>();
    const [providers, setProviders] = useState<any>();
    const [selectedProvider, setSelectedProvider] = useState<any>();
    const [createLine, setCreateLine] = useState<ILine>({
        id: 0,
        providerId: 1,
        number: '',
        credential: ''
    });


    useEffect(() => {
        callAPI();
    }, []);

    const callAPI = async () => {
        // POST(getDynamics.apis.lineSingle, { id: id }).then((response: any) => {
        //     console.log(response)
        //     setDataSource(response)
        // })
    }
    const callAPIPost = async (api: any, body: object) => {
        console.log(api);
        console.log(body);

    }
    const changeSelectedProvider = (e: any) => {
        setSelectedProvider(e);
        setCreateLine(values => ({ ...values, credential: e.credentialTemplate, providerId: e.id }))
    }
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setCreateLine(values => ({ ...values, [name]: value }))
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
                                    <Dropdown value={selectedProvider} onChange={(e: DropdownChangeEvent) => changeSelectedProvider(e.value)} options={providers} optionLabel="title"
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
export default LineEdit;