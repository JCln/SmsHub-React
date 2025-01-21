import { DataTable } from 'primereact/datatable';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Column } from 'primereact/column';
import http from '../services/httpService';

import { getDynamics } from '../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import Framework from './framework';
import { classNames } from 'primereact/utils';


const ServerUser = () => {
    console.log('this is user all');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const columns = [
        { field: 'username', header: 'نام کاربری' },
        { field: 'isAdmin', header: 'ادمین', isCheckbox: true },
        { field: 'createDateTime', header: 'تاریخ ایجاد' },
        { field: 'deleteDateTime', header: 'تاریخ حذف' },
        // { field: 'apiKeyHash', header: 'موبایل' }
    ];


    useEffect(() => {
        callAPI();
    }, []);
    const callAPI = async (): Promise<any> => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.serverUser}`)
            .then(function (response) {
                setProducts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const verifiedBodyTemplate = (rowData: any) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-red-500 pi-times-circle': !rowData.verified })}></i>;
    };

    return (
        <div style={{ display: 'flex', direction: 'rtl' }}>
            <Framework></Framework>
            <DataTable value={products} tableStyle={{ minWidth: '30rem', width: '100%' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} dataType={col.isCheckbox ? 'boolean' : ''} />
                ))}
            </DataTable>
        </div>
    )
}
export default ServerUser;