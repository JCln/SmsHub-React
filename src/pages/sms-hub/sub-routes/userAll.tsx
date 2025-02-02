import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import 'jspdf-autotable';
import { getGlobalFilterfields, userAll } from '../../../dynamics/column-data';
import { ColumnMeta, IUserAll } from '../../../constants/interface';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import TableHeader from '../../../components/table-header';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';


const UserAll = () => {
    const [dataSource, setDataSource] = useState<IUserAll[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(userAll)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        displayName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { value: null, matchMode: FilterMatchMode.CONTAINS },
        mobile: { value: null, matchMode: FilterMatchMode.CONTAINS },
        mobileConfirmed: { value: null, matchMode: FilterMatchMode.CONTAINS },
        hasTwoStepVerification: { value: null, matchMode: FilterMatchMode.CONTAINS },
        invalidLoginAttemptCount: { value: null, matchMode: FilterMatchMode.CONTAINS },
        latestLoginDateTime: { value: null, matchMode: FilterMatchMode.CONTAINS },
        lockTimespan: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    useEffect(() => {
        callAPI(getDynamics.apis.userAll);
    }, []);

    const callAPI = async (api: any) => {
        await http.get(`${getDynamics.configs.apiEndpoint}${api}`)
            .then(function (response) {
                setDataSource(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const callAPIPost = async (api: any, body: object) => {
        await http.post(`${getDynamics.configs.apiEndpoint}${api}`, body)
            .then(function (response) {
                setDataSource(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const renderHeader = () => {
        return (
            <>
                <TableHeader dataSource={dataSource}
                    filters={filters}
                    setFilters={setFilters}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    fileName={ENNaming.userAll}
                    option={userAll}
                    hasClick={false}
                ></TableHeader>
            </>
        )
    };
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IUserAll;
        setDataSource(_datas);
        POST(getDynamics.apis.userEdit, _datas).then(() => {
            toast.success(ENNaming.successEdit);
        })
    };
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    const allowEdit = (rowData: IUserAll) => {
        return rowData.username !== 'Blue Band';
    };

    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource} tableStyle={TABLE_STYLE} editMode="row" header={header} onRowEditComplete={onRowEditComplete} stateStorage="session" stateKey="userall-state" paginator rows={TABLE_NUMBER_OF_ROWS} stripedRows rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfields()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage}>
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
                <Column rowEditor={allowEdit} headerStyle={TABLE_ICON_COLUMN_STYLE} bodyStyle={TABLE_TEXTALIGN}></Column>
                {/* <Column headerStyle={TABLE_ICON_COLUMN_STYLE} bodyStyle={TABLE_TEXTALIGN}></Column> */}
            </DataTable>
        </div>
    )
}
export default UserAll;