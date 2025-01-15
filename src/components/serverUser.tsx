import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../services/httpService';

import { useEffect, useState } from 'react';
import { getDynamics } from '../dynamics/getDynamics';


const ServerUser = () => {
    console.log('this is server user');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI().then(data => setProducts(data));
    }, []);

    const callAPI = async (): Promise<any> => {
        const res = await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.serverUser}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(res);
    }
    return (
        <div>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey}>
                <Column sortable field="code" header="username"></Column>
                <Column sortable field="name" header="isAdmin"></Column>
                <Column sortable field="category" header="createDateTime"></Column>
                <Column sortable field="quantity" header="deleteDateTime"></Column>
            </DataTable>
        </div>
    )
}
export default ServerUser;