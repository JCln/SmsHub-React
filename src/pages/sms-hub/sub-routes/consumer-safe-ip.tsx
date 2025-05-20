import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { consumerSafeIp, getGlobalFilterfieldsSafeIp } from '../../../dynamics/column-data';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import { ColumnMetaS, ENCellTypes, IConsumerSafeIp, IUserAll } from '../../../constants/interface';
import TableHeader from '../../../components/table-header';
import { FilterMatchMode } from 'primereact/api';
import { GET, POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import TableDeleteButton from '../../../components/table-delete-button';
import { dataStoreService } from '../../../services/dictionary-wrapper';


const ConsumerSafeIp = () => {
    const [dataSource, setDataSource] = useState<IConsumerSafeIp[]>([]);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMetaS[]>(consumerSafeIp);
    const [selectedUserId, setSelectedUserId] = useState<any[]>([]);
    const [userId, setUserId] = useState<IUserAll[]>([]);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI();
    }, []);

    const insertToAux = () => {
        dataSource.forEach(item => {
            item.dynamicId = item.consumerId;
        })
    }
    const tableRefresh = useCallback(() => {
        callAPI(true)
    }, [])
    const callAPI = async (canRefresh?: boolean) => {
        const res = await dataStoreService.fetchData(
            ENNaming.consumerSafeIpGetList,
            getDynamics.apis.consumerSafeIpGetList,
            { method: 'POST', refresh: canRefresh }
        );
        const userId = await dataStoreService.fetchData(
            ENNaming.userAll,
            getDynamics.apis.userAll,
            { method: 'GET', refresh: canRefresh }
        );
        setDataSource(res.data.data);
        setUserId(userId.data.data);
    }
    const callAPIPostDelete = async (e: IConsumerSafeIp) => {
        POST(getDynamics.apis.consumerSafeIpDelete, { id: e.consumerId }).then(() => {
            toast.success(ENNaming.successRemove);
            callAPI();
        })
    }
    const allowEdit = (rowData: IConsumerSafeIp) => {
        return rowData.fromIp !== 'Blue Band';
    };
    const onRowAdd = () => {
        if (isNew) {
            setIsNew(false);

            let _datas = [...dataSource];
            _datas.unshift(
                {
                    fromIp: '',
                    toIp: '',
                    consumerId: 1,
                    isV6: false
                }
            )
            setDataSource(_datas);
        }
    }
    const addNew = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IConsumerSafeIp;

        setDataSource(_datas);
        POST(getDynamics.apis.consumerSafeIpCreate, newData).then(() => {
            toast.success(ENNaming.successCreate);
            callAPI();
        })
        setIsNew(true);
    }
    const updateRow = (e: DataTableRowEditCompleteEvent) => {

        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IConsumerSafeIp;
        POST(getDynamics.apis.consumerSafeIpUpdate, newData).then(() => {
            setDataSource(_datas);
            toast.success(ENNaming.successEdit);
            callAPI();
        }).catch(e => {
            setDataSource(dataSource);
        })
        setIsNew(true);
    }
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        e.data.id ? updateRow(e) : addNew(e)
    };
    const renderHeader = () => {
        return (
            <>
                <TableHeader dataSource={dataSource}
                    filters={filters}
                    setFilters={setFilters}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    fileName={ENNaming.safeIp}
                    option={consumerSafeIp}
                    onClicked={() => onRowAdd()}
                    hasClick={true}
                    tableRefresh={tableRefresh}
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: IConsumerSafeIp) => {
        return (
            <div className="flex flex-wrap gap-2">
                <TableDeleteButton onClicked={() => callAPIPostDelete(rowData)} rowData={rowData} key={rowData.consumerId}></TableDeleteButton>
            </div>
        );
    };
    const statusEditor = (options: ColumnEditorOptions, rowData: ENCellTypes) => {
        if (rowData === ENCellTypes.dropdowns)
            return (
                <Dropdown
                    value={selectedUserId}
                    onChange={(e: DropdownChangeEvent) => setSelectedUserId(e.value)}
                    options={userId}
                    optionLabel="displayName"
                    placeholder={ENNaming.choose}
                    className="w-full mw-w-16rem"
                    checkmark={true}
                    highlightOnSelect={true}
                />
            );
        if (rowData === ENCellTypes.inputs)
            return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };

    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource}
                filters={filters}
                key={ENNaming.safeIp}
                tableStyle={TABLE_STYLE}
                editMode="row"
                header={header}
                stateStorage="session"
                onRowEditComplete={onRowEditComplete}
                stateKey={ENNaming.safeIp + 'state'}
                paginator
                rows={TABLE_NUMBER_OF_ROWS}
                stripedRows
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE}
                removableSort
                selectionMode="single"
                selection={selectedUserId}
                onSelectionChange={(e) => setSelectedUserId(e.value)}
                filterDisplay="row"
                globalFilterFields={getGlobalFilterfieldsSafeIp()}
                dataKey="id"
                metaKeySelection={metaKey}
                emptyMessage={ENNaming.tableEmptyMessage}
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate={ENNaming.currentPageReportText}
            >
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(item) => statusEditor(item, col.types)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
                <Column rowEditor={allowEdit} headerStyle={TABLE_ICON_COLUMN_STYLE} bodyStyle={TABLE_TEXTALIGN}></Column>
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
        </div>
    )
}
export default ConsumerSafeIp;

