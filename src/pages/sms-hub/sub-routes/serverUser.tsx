import { DataTable } from 'primereact/datatable';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Column } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/sidebar';
import { classNames } from 'primereact/utils';
import { serverUser } from '../../../dynamics/column-data';
import { TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE } from '../../../constants/ActionTypes';


const ServerUser = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI();
    }, []);
    const callAPI = async (): Promise<any> => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.apis.serverUser}`)
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
            <DataTable value={products} tableStyle={{ minWidth: '30rem', width: '100%' }} paginator rows={TABLE_NUMBER_OF_ROWS} rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey}>
                {serverUser.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} dataType={col.isCheckbox ? 'boolean' : ''} />
                ))}
            </DataTable>
        </div>
    )
}
export default ServerUser;