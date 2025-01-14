import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import configs from '../configs.json';
import http from '../services/httpService';

import { useEffect, useState } from 'react';


const ServerUser = () => {
    console.log('this is server user');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        callAPI().then(data => setProducts(data));
    }, []);

    const callAPI = async (): Promise<any> => {
        const res = await http.post(`${configs.apiEndpoint}/ServerUser/GetAll`)
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
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="username"></Column>
                <Column field="name" header="isAdmin"></Column>
                <Column field="category" header="createDateTime"></Column>
                <Column field="quantity" header="deleteDateTime"></Column>
            </DataTable>
        </div>
    )
}
export default ServerUser;