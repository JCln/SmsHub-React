import { Button } from './Button';
// import Annoucement from '../images/announcement.svg';
// import announcement_tumbnail from '../images/sampleImg.jpg';
import { Inputs } from './Inputs';
import * as ENRoutes from '../constants/ENRoutes';
import { Link } from 'react-router';

import configs from '../configs.json';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import http from '../services/httpService';


const Announcement = () => {
    console.log('this is announcemnet');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        callAPI().then(data => setProducts(data));
    }, []);

    const callAPI = async (): Promise<any> => {
        const res = await http.post(`${configs}/ServerUser/GetAll`);
        console.log(res);
    }
    return (
        <div>
            <h2>I'm Annuncement</h2>
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
        </div>
    )
}
export default Announcement;