import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { getGlobalFilterfieldsLine, line } from '../../../dynamics/column-data';
import { ColumnMeta, ILine } from '../../../constants/interface';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { Link, NavLink, useNavigate } from 'react-router';
import * as ENRoutes from '../../../constants/ENRoutes';

const Line = () => {
    let navigate = useNavigate();
    const [dataSource, setDataSource] = useState<ILine[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(line)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        number: { value: null, matchMode: FilterMatchMode.CONTAINS },
        providerId: { value: null, matchMode: FilterMatchMode.CONTAINS },
        credential: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        callAPI(getDynamics.apis.lineGetList);
    }, []);

    const callAPI = async (api: any) => {
        POST(api).then((res: any) => {
            setDataSource(res.data.data);
        })
    }
    const callAPIPost = async (api: any, body: object) => {
        callAPI(api);
    }
    const callAPIPostDelete = async (e: ILine) => {
        POST(getDynamics.apis.lineDelete, { id: e.providerId }).then(() => {
            toast.success(ENNaming.successRemove);
            POST(getDynamics.apis.lineGetList).then((res: any) => {
                setDataSource(res.data.data);
            })
        })
    }
    // const routeToEdit = (rowData: any) => {
    //     console.log(rowData);

    //     navigate(ENRoutes.lineEdit, { id: rowData.id })

    // }
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
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: ILine) => {
        return (
            <div className='flex flex-wrap gap-2'>
                <div>
                    {/* <Button onClick={() => routeToEdit(rowData)} type="button" icon="pi pi-pencil" severity="info" rounded></Button> */}
                    <NavLink className="pi pi-pencil info" to={`${ENRoutes.lineEdit}/${rowData.id}`}></NavLink>
                </div>
                <div>
                    <Button onClick={() => callAPIPostDelete(rowData)} type="button" icon="pi pi-trash" severity="danger" rounded></Button>
                </div>
            </div>
        );
    };


    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as ILine;

        setDataSource(_datas);
        callAPIPost(getDynamics.apis.lineUpdate, _datas);
    };
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource} tableStyle={TABLE_STYLE} editMode="row" header={header} onRowEditComplete={onRowEditComplete} stateStorage="session" stateKey={ENNaming.line + 'state'} paginator rows={TABLE_NUMBER_OF_ROWS} rowsPerPageOptions={TABLE_ROWS_PER_PAGE} stripedRows removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfieldsLine()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage} currentPageReportTemplate={ENNaming.currentPageReportText}>
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
        </div>
    )
}
export default Line;