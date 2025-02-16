import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { getGlobalFilterfieldsLine, line } from '../../../dynamics/column-data';
import { ColumnMeta, ILine } from '../../../constants/interface';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { TABLE_FILTER_PLACEHOLDER, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE } from '../../../constants/ActionTypes';
import { POST } from '../../../services/callAPIWrapperService';
import { NavLink, Outlet } from 'react-router';
import * as ENRoutes from '../../../constants/ENRoutes';
import { Converter } from '../../../components/converter';
import PageTitle from '../../../components/page-title';

const Line = () => {
    const [dataSource, setDataSource] = useState<ILine[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(line);
    const [providers, setProviders] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        number: { value: null, matchMode: FilterMatchMode.CONTAINS },
        providerId: { value: null, matchMode: FilterMatchMode.CONTAINS },
        credential: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        callAPI(getDynamics.apis.lineGetList);
    }, []);

    const insertToAux = () => {
        const newData = dataSource.map(d => ({ ...d, dynamicId: d.providerId }));
        setDataSource(newData);
        // dataSource.forEach(item => {
        //     item.dynamicId = item.providerId;
        // })
    }
    const callAPI = async (api: any) => {
        POST(api).then((res: any) => {
            setDataSource(res.data.data);
        })
        POST(getDynamics.apis.providerGetList).then((res: any) => {
            setProviders(res.data.data);
        })
        insertToAux();
        console.log(dataSource);
        Converter.convertIdToTitle(dataSource, providers, ENNaming.DYNAMICID);
        console.log(dataSource);
        setDataSource(dataSource);
    }
    const renderHeader = () => {
        return (
            <>
                <TableHeader dataSource={dataSource}
                    filters={filters}
                    setFilters={setFilters}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    fileName={ENNaming.line}
                    option={line}
                    hasClick={false}
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: ILine) => {
        return (
            <div className='flex flex-wrap gap-5'>
                <div className='flex align-items-center'>
                    <NavLink className="pi pi-objects-column table-icon" to={`${ENRoutes.line}/${rowData.id}`}></NavLink>
                </div>
            </div>
        );
    };

    const header = renderHeader();
    return (
        <>
            <div>
                <div className='outer-container'>
                    <PageTitle title='همه خطوط' className='simcrd.png' isIcon={false}></PageTitle>
                    <DataTable value={dataSource} tableStyle={TABLE_STYLE} editMode="row" header={header} stateStorage="session" stateKey={ENNaming.line + 'state'} paginator rows={TABLE_NUMBER_OF_ROWS} rowsPerPageOptions={TABLE_ROWS_PER_PAGE} stripedRows removableSort selectionMode="single" selection={selectedProduct}
                        onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfieldsLine()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage} paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown' currentPageReportTemplate={ENNaming.currentPageReportText}>
                        {visibleColumns.map((col, i) => (
                            <Column key={col.field} field={col.field} header={col.header} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                        ))}
                        <Column body={actionTemplate} headerClassName="w-10rem" />
                    </DataTable>
                </div >
            </div >
            <Outlet />
        </>
    )
}
export default Line;