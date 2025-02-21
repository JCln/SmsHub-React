import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import 'jspdf-autotable';
import { getGlobalFilterfields, userAll } from '../../../dynamics/column-data';
import { ColumnMetaS, ENCellTypes, IUserAll } from '../../../constants/interface';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import TableHeader from '../../../components/table-header';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { classNames } from 'primereact/utils';
import PageTitle from '../../../components/page-title';


const UserAll = () => {
    const [dataSource, setDataSource] = useState<IUserAll[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMetaS[]>(userAll)
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
        callAPI();
    }, []);
    const tableRefresh = useCallback(() => {
        callAPI()
    }, []);
    const callAPI = async () => {
        GET(getDynamics.apis.userAll).then((res: any) => {
            setDataSource(res.data.data);
        })
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
                    tableRefresh={tableRefresh}
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
    const verifiedBodyTemplate = (rowData: IUserAll) => {
        // console.log(rowData.field === 'isActive');        
        if (typeof rowData.mobileConfirmed === 'boolean')
            return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.mobileConfirmed, 'false-icon pi-times-circle': !rowData.mobileConfirmed })}></i>;
        if (typeof rowData.hasTwoStepVerification === 'boolean')
            return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.hasTwoStepVerification, 'false-icon pi-times-circle': !rowData.hasTwoStepVerification })}></i>;
    };


    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource} filters={filters} tableStyle={TABLE_STYLE} editMode="row" header={header} onRowEditComplete={onRowEditComplete} stateStorage="session" stateKey="userall-state" paginator rows={TABLE_NUMBER_OF_ROWS} stripedRows rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfields()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage}>
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} body={col.types === ENCellTypes.booleans ? verifiedBodyTemplate : null} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
                <Column rowEditor={allowEdit} headerStyle={TABLE_ICON_COLUMN_STYLE} bodyStyle={TABLE_TEXTALIGN}></Column>
            </DataTable>
        </div>
    )
}
export default UserAll;