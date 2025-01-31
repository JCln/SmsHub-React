import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { configTypeGroup } from '../../../dynamics/column-data';
import { TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE } from '../../../constants/ActionTypes';


const ConfigTypeGroup = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI();
    }, []);
    const callAPI = async (): Promise<any> => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.apis.ConfigTypeGroup}`)
            .then(function (response) {
                setProducts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div style={{ display: 'flex', direction: 'rtl' }}>
            <DataTable value={products} tableStyle={{ minWidth: '30rem' }} paginator rows={TABLE_NUMBER_OF_ROWS} rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} dataKey="id" metaKeySelection={metaKey}>
                {configTypeGroup.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} />
                ))}
            </DataTable>
        </div>
    )
}
export default ConfigTypeGroup;