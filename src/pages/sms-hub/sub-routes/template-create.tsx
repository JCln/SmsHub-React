import { useEffect, useState } from 'react';
import { ITemplateDTO } from '../../../constants/interface';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { toast } from 'react-toastify';
import { ENNaming } from '../../../constants/naming';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';

export default function TemplateCreate() {
    const [categoryDictionary, setCategoryDictionary] = useState<any>([]);
    const [configTypeGroup, setConfigTypeGroup] = useState<any>([]);
    const [isActive, setIsActive] = useState<any>(false);
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [selectedConfigType, setSelectedConfigType] = useState<any>();
    const [templateDTO, setTemplateDTO] = useState<ITemplateDTO>({
        expression: '',
        title: '',
        templateCategoryId: 0,
        isActive: false,
        minCredit: 0,
        configTypeGroupId: 0,
    });
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setTemplateDTO(values => ({ ...values, [name]: value }))
    }
    const callDictionaries = async () => {
        POST(getDynamics.apis.TemplateCategoryGetList).then((res: any) => {
            setCategoryDictionary(res.data.data);
        })
        POST(getDynamics.apis.ConfigTypeGroup).then((res: any) => {
            setConfigTypeGroup(res.data.data);
        })
    }
    const callAPI = async () => {
        templateDTO.isActive = isActive;
        templateDTO.templateCategoryId = selectedCategory.id;
        templateDTO.minCredit = Number(templateDTO.minCredit);
        console.log(templateDTO);
        POST(getDynamics.apis.TemplateCreate, templateDTO).then(() => {
            toast.success(ENNaming.successCreate);
        })
    }
    useEffect(() => {
        callDictionaries();
    }, [])
    return (
        <>
            <div className='d-grid two_columns'>
                <div className='_section_view'>
                    <h3>عنوان</h3>
                    <div className="w-16rem">
                        <div className='content-wrapper align-items-center'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-bookmark"></i>
                            </div>
                            <input name='title' placeholder='عنوان' type="text" className='inputs' value={templateDTO.title} onChange={setForm} />
                        </div>
                    </div>
                </div>
                <div className='_section_view'>
                    <h3>عبارت</h3>
                    <div className="w-16rem">
                        <div className='content-wrapper align-items-center'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-bookmark"></i>
                            </div>
                            <input name='expression' placeholder='عبارت' type="text" className='inputs' value={templateDTO.expression} onChange={setForm} />
                        </div>
                    </div>
                </div>
                <div className='_section_view'>
                    <h3>templateCategoryId</h3>
                    <div className="w-16rem">
                        <div className='content-wrapper align-items-center'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-bookmark"></i>
                            </div>
                            <Dropdown value={selectedCategory} onChange={(e: DropdownChangeEvent) => setSelectedCategory(e.value)} options={categoryDictionary} optionLabel="title"
                                placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                        </div>
                    </div>
                </div>
                <div className='_section_view'>
                    <h3>تنظیمات</h3>
                    <div className="w-16rem">
                        <div className='content-wrapper align-items-center'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-bookmark"></i>
                            </div>
                            <Dropdown value={selectedConfigType} onChange={(e: DropdownChangeEvent) => setConfigTypeGroup(e.value)} options={configTypeGroup} optionLabel="title"
                                placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                        </div>
                    </div>
                </div>
                <div className='_section_view'>
                    <h3>فعال</h3>
                    <div className="w-16rem">
                        <div className='content-wrapper align-items-center'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-bookmark"></i>
                            </div>
                            <Checkbox onChange={e => setIsActive(e.checked)} checked={isActive}></Checkbox>
                        </div>
                    </div>
                </div>
                <div className='_section_view'>
                    <h3>حداقل اعتبار</h3>
                    <div className="w-16rem">
                        <div className='content-wrapper align-items-center'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-bookmark"></i>
                            </div>
                            <input name='minCredit' placeholder='عبارت' type="number" className='inputs' value={templateDTO.minCredit} onChange={setForm} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='_section_view'>
                <h3>افزودن</h3>
                {
                    <button onClick={() => callAPI()} className="_button w-16rem">
                        افزودن
                    </button>
                }
            </div>

            <div>
                {/* image section */}
                <div className='brand-wrapper'>
                    {/* <img className='brand-logo' src={brandLogo} alt="" /> */}
                </div>
            </div>
        </>
    )
}
