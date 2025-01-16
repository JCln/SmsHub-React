import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../services/httpService';

import { getDynamics } from '../dynamics/getDynamics';
import { useEffect, useState } from 'react';


const UserAll = () => {
    console.log('this is user all');
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [columns, setColumns] = useState<any>(null);

    useEffect(() => {
        callAPI().then(data => setProducts(data));
    }, []);
    // useEffect(() => {
    //     console.log(getDynamics.columns.ColumnManager.userService);
    //     const colu = getDynamics.columns.userService;
    //     setColumns(colu);
    // }, [])

    const callAPI = async (): Promise<any> => {
        const res = await http.get(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.userAll}`)
            .then(function (response) {
                return new Promise((resolve) => {
                    console.log(response);
                    resolve(response)
                });

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
                <Column sortable field="displayName" header="displayName"></Column>
                <Column sortable field="username" header="username"></Column>
                <Column sortable field="mobile" header="mobile"></Column>
                <Column sortable field="lockTimespan" header="lockTimespan"></Column>

            </DataTable>
        </div>
    )
}
export default UserAll;