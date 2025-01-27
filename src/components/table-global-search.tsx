import React, { useState } from 'react'
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export default function TableGlobalSearch({ filters, setFilters }: { setFilters: any, filters: any }) {
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e: any) => {
        console.log(e);

        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    return (
        <div className='global-search'>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="جستجو در جدول"
                />
            </IconField>
        </div>
    )
}
