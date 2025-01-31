import { useState } from 'react';
import { ITemplateCategoryDTO } from '../../../constants/interface';
import { POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { toast } from 'react-toastify';
import { ENNaming } from '../../../constants/naming';

export default function TemplateCategoryCreate() {
    const [templateCategory, setTemplateCategory] = useState<ITemplateCategoryDTO>({
        title: '',
        description: ''
    });
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setTemplateCategory(values => ({ ...values, [name]: value }))
    }
    const callAPI = async () => {
        POST(getDynamics.apis.TemplateCategoryCreate, templateCategory).then(() => {
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
                                <div className='content-wrapper align-items-center'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <input name='title' placeholder='عنوان' type="text" className='inputs' value={templateCategory.title} onChange={setForm} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>توضیحات</h3>
                            <div className="w-20rem">
                                <div className='content-wrapper align-items-center'>
                                    <div className='captcha-refresh-wrapper'>
                                        <i className="captcha-refresh pi pi-bookmark"></i>
                                    </div>
                                    <textarea className='w-full text-area-line dir-rtl' placeholder='توضیحات را وارد نمایید' name='description' value={templateCategory.description} onChange={setForm}>
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>افزودن</h3>
                            {
                                <button onClick={() => callAPI()} className="_button w-20rem">
                                    افزودن
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
