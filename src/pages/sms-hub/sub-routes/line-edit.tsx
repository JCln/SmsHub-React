import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { ILine } from '../../../constants/interface';
import { ENNaming } from '../../../constants/naming';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
// import brandLogo from '../../../images/Magfa.jpg';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useParams, useSearchParams } from 'react-router';
import { PARAMSTAR } from '../../../constants/ActionTypes';
import PageTitle from '../../../components/page-title';

const LineEdit = () => {
    const [dataSource, setDataSource] = useState<ILine>({
        id: 0,
        providerId: 1,
        number: '',
        credential: ''
    });
    const [lineId, setLineDictionary] = useState<any[]>([]);
    const [selectedLineId, setSelectedLineId] = useState<any>();
    const [providers, setProviders] = useState<any[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<any>();
    let params = useParams()

    useEffect(() => {
        callAPI();
    }, []);

    const callAPI = async () => {
        GET(getDynamics.apis.lineGetDictionary).then((res: any) => {
            setLineDictionary(res.data.data);
        })
        POST(getDynamics.apis.providerGetList).then((res: any) => {
            setProviders(res.data.data);
        })
        POST(getDynamics.apis.lineSingle, { id: params[PARAMSTAR] }).then((response: any) => {
            setDataSource(response.data.data);
            setSelectedLineId(response.data.data.number);
            setSelectedProvider(response.data.data.providerId);
        })
    }
    const callAPIPost = async () => {
        console.log(dataSource);
        POST(getDynamics.apis.lineUpdate, { dataSource }).then((res: any) => {
            console.log(res);

            toast.success(ENNaming.successEdit);
        })
    }
    const changeSelectedProvider = (e: any) => {
        setSelectedProvider(e);
        setDataSource(values => ({ ...values, credential: e.credentialTemplate, providerId: e.id }))
    }
    const changeSelectedLine = (e: any) => {
        setSelectedLineId(e);
        setDataSource(values => ({ ...values, number: e.lineNumber }))
    }
    const setForm = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setDataSource(values => ({ ...values, [name]: value }))
    }
    const callAPIPostDelete = async () => {
        POST(getDynamics.apis.lineDelete, { id: dataSource.id }).then(() => {
            toast.success(ENNaming.successRemove);
            POST(getDynamics.apis.lineGetList).then((res: any) => {
                setDataSource(res.data.data);
            })
        })
    }

    return (
        <>
            <div className='outer-container'>
                <PageTitle title='اطلاعات خط' className='simcrd.png' isIcon={false}></PageTitle>
                <div className="bg-white border-15">
                    <div className='d-grid two_columns'>
                        <div className='_section_view'>
                            <div>
                                <p>سرویس دهنده</p>
                                <div className="w-20rem">
                                    <div className='_captcha'>
                                        <div className='captcha-refresh-wrapper'>
                                            <i className="-input-icon pi pi-bookmark"></i>
                                        </div>
                                        <Dropdown value={dataSource.providerId} onChange={(e: DropdownChangeEvent) => changeSelectedProvider(e.value)} options={providers} optionLabel="title"
                                            placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>خط</p>
                                <div className="w-20rem">
                                    <div className='_captcha'>
                                        <div className='captcha-refresh-wrapper'>
                                            <i className="-input-icon pi pi-bookmark"></i>
                                        </div>
                                        <Dropdown value={dataSource.number} onChange={(e: DropdownChangeEvent) => changeSelectedLine(e.value)} options={lineId} optionLabel="lineNumber"
                                            placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='_section_view'>
                            <p>مجوزها</p>
                            <div>
                                <textarea className='w-full text-area-line dir-ltr' name='credential' value={dataSource.credential} onChange={setForm}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex gap-5 p-1rem'>
                        <button onClick={() => callAPIPost()} className="_button w-20rem mt-1-2">
                            ویرایش خط
                        </button>
                        <button onClick={() => callAPIPostDelete()} className="mt-1-2 -danger">
                            حذف خط
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LineEdit;