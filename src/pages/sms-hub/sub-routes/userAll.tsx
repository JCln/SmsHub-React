import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import exports from './exports';
import { FilterMatchMode } from 'primereact/api';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import 'jspdf-autotable';
import * as ExcelJs from "exceljs";
import { userAll } from '../../../dynamics/column-data';


const UserAll = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <div>
                    <i className="pi pi-search" />
                    <input value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </div>
            </div>
        );
    };

    // const [visibleColumns, setVisibleColumns] = useState(columns);
    // const onColumnToggle = (event: any) => {
    //     let selectedColumns = event.value;
    //     let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

    //     setVisibleColumns(orderedSelectedColumns);
    // };

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
    const makeEXCEL = (datas: any, fileName: string) => {
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
            columns: datas.headers,
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
    // const exportExcel = (products:any) => {
    //     import('xlsx').then((xlsx) => {
    //         const worksheet = xlsx.utils.json_to_sheet(products);
    //         const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //         const excelBuffer = xlsx.write(workbook, {
    //             bookType: 'xlsx',
    //             type: 'array'
    //         });

    //         saveAsExcelFile(excelBuffer, 'products');
    //     });
    // };
    // const exportPdf = (products: any, cols: any) => {
    //     const exportColumns = cols.map((col: { header: any; field: any; }) => ({ title: col.header, dataKey: col.field }));
    //     import('jspdf').then((jsPDF) => {
    //         import('jspdf-autotable').then(() => {
    //             const doc = new jsPDF.default('p', 'px');

    //             doc.autoTable(exportColumns, products);                
    //             doc.save('products.pdf');
    //         });
    //     });
    // };
    const headerIcons = (
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => (false)} data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={() => makeEXCEL(products, 'testFileName')} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={() => (false)} data-pr-tooltip="PDF" />
            <Button type="button" icon="pi pi-user-plus" severity='info' rounded onClick={() => (false)} data-pr-tooltip="+" />
        </div>
    );
    const header = renderHeader();
    return (
        <div>
            <DataTable value={products} tableStyle={{ minWidth: '30rem' }} header={headerIcons} paginator rows={5} stripedRows rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} globalFilterFields={['displayName', 'fullName', 'username', 'mobile']} dataKey="id" metaKeySelection={metaKey}>
                {userAll.map((col, i) => (
                    <Column key={col.field} field={col.field} filter sortable header={col.header} />
                ))}
            </DataTable>
        </div>
    )
}
export default UserAll;