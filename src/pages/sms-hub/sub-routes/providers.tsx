import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import Sidebar from '../../../components/sidebar';
import { provider } from '../../../dynamics/column-data';


const Providers = () => {
    console.log('this is user all');
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI();
    }, []);
    const callAPI = async (): Promise<any> => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.apis.providerGetList}`)
            .then(function (response) {
                setProducts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div style={{ display: 'flex', direction: 'rtl' }}>
            <DataTable value={products} tableStyle={{ minWidth: '30rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey}>
                {provider.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    )
}
export default Providers;