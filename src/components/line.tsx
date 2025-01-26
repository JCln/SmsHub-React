import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../services/httpService';

import { getDynamics } from '../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import * as ExcelJs from "exceljs";
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { line } from '../dynamics/column-data';

const Line = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');


    useEffect(() => {
        callAPI();
    }, []);
    const callAPI = async (): Promise<any> => {
        await http.post(`${getDynamics.configs.apiEndpoint}${getDynamics.interfaces.lineGetList}`)
            .then(function (response) {
                setProducts(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onGlobalFilterChange = (e: any) => {
        console.log(e);

        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
            <div className='_table_header'>
                <div className="flex align-items-center justify-content-end gap-2">
                    <Button type="button" icon="pi pi-file" rounded onClick={() => (false)} data-pr-tooltip="CSV" />
                    <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={() => makeEXCEL(products, line, 'testFileName')} data-pr-tooltip="XLS" />
                    <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={() => (false)} data-pr-tooltip="PDF" />
                    <Button type="button" icon="pi pi-plus" severity='info' rounded onClick={() => (false)} data-pr-tooltip="+" />
                </div>
                <div className="flex justify-content-end" >
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="جستجو در جدول" />
                    </IconField>
                </div>
            </div>
        );
    };
    const makeEXCEL = (datas: any, columns: any, fileName: string) => {
        console.log(datas);
        console.log(fileName);

        const workbook = new ExcelJs.Workbook();
        const _exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const viewsConfig = { rightToLeft: true }
        const worksheet = workbook.addWorksheet(
            "Sheet1"
            // ,{ views: [viewsConfig] }
        );
        worksheet.properties.defaultColWidth = 700;

        // TABLE
        worksheet.addTable({
            name: 'MyTable',
            ref: 'A1',
            headerRow: true,
            // style: {
            //   theme: 'TableStyleMedium2',
            //   showRowStripes: false,
            // },
            columns: columns,
            rows: datas.data
        });

        worksheet.getRow(1).font = { name: 'Vazirmatn', size: 14, color: { argb: 'ffffff' } };//wrapText: true    , bold: true

        for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
            worksheet.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center' };//wrapText: true
        }

        const toExportFileName = 'testName';
        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {
                type:
                    _exportType
            });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.href = url;
            a.download = toExportFileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }

    const header = renderHeader();
    return (
        <div>
            <DataTable value={products} tableStyle={{ minWidth: '30rem' }} header={header} stateStorage="session" stateKey="role-state" paginator rows={5} stripedRows rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={['name', 'title']} dataKey="id" metaKeySelection={metaKey} emptyMessage="موردی یافت نشد">
                {line.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} filter filterPlaceholder="جستجو" sortable />
                ))}
            </DataTable>
        </div>
    )
}
export default Line;