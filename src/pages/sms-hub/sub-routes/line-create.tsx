import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect'
import React, { useState } from 'react';
import brandLogo from '../../../images/Magfa.jpg';

export default function LineCreate() {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    return (
        <>
            <div className='create-line-wrapper'>
                <div>
                    <div className='_section_view'>
                        <div>
                            <h3>سرویس دهنده</h3>
                            <div className='input-wrapper'>
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search" />
                                    <InputText
                                        value="مگفا"
                                        placeholder="مگفا"
                                    />
                                </IconField>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>خط</h3>
                            <div className='input-wrapper'>
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search" />
                                    <InputText
                                        value={globalFilterValue}
                                        placeholder="30001522"
                                    />
                                </IconField>
                            </div>
                        </div>
                    </div>
                    <div className='_section_view'>
                        <div>
                            <h3>مجوزها</h3>
                            <div className='input-wrapper'>
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search" />
                                    <InputText
                                        value={globalFilterValue}
                                        placeholder="30001522"
                                    />
                                </IconField>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    {/* image section */}
                    <div className='brand-wrapper'>
                        <img className='brand-logo' src={brandLogo} alt="" />
                    </div>
                </div>
                {
                /* <div>
                <button className="_button">
                    خرید خط جدید
                </button>
            </div> */}
            </div>
        </>
    )
}
