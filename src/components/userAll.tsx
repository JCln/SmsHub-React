import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../services/httpService';

import { getDynamics } from '../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import Framework from './framework';


const UserAll = () => {
    console.log('this is user all');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const columns = [
        { field: 'displayName', header: 'displayName' },
        { field: 'mobile', header: 'mobile' },
        { field: 'fullName', header: 'fullName' },
        { field: 'username', header: 'username' }
    ];


    useEffect(() => {
        callAPI();
    }, []);
    const callAPI = async (): Promise<any> => {
        await http.get(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.userAll}`)
            .then(function (response) {
                setProducts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Framework></Framework>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    )
}
export default UserAll;