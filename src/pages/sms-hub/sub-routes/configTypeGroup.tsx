import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { configTypeGroup, getGlobalFilterfieldsConfigTypeGroup } from '../../../dynamics/column-data';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import { ColumnMeta, IConfigeTypeGroupDTO } from '../../../constants/interface';
import TableHeader from '../../../components/table-header';
import { FilterMatchMode } from 'primereact/api';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import TableDeleteButton from '../../../components/table-delete-button';
import { dataStoreService } from '../../../services/dictionary-wrapper';



const ConfigTypeGroup = () => {
    const [dataSource, setDataSource] = useState<IConfigeTypeGroupDTO[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(configTypeGroup);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI();
    }, []);
    const tableRefresh = useCallback(() => {
        callAPI(true)
    }, [])
    const callAPI = async (canRefresh?: boolean) => {
        const res = await dataStoreService.fetchData(
            ENNaming.configTypeGroup,
            getDynamics.apis.ConfigTypeGroup,
            { method: 'GET', refresh: canRefresh }
        );
        setDataSource(res.data.data);
    }
    const callAPIPostDelete = async (e: IConfigeTypeGroupDTO) => {
        POST(getDynamics.apis.ConfigTypeGroupDelete, { id: e.id }).then(() => {
            toast.success(ENNaming.successRemove);
            callAPI();
        })
    }
    const allowEdit = (rowData: IConfigeTypeGroupDTO) => {
        return rowData.title !== 'Blue Band';
    };
    const renderHeader = () => {
        return (
            <>
                <TableHeader dataSource={dataSource}
                    filters={filters}
                    setFilters={setFilters}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    fileName={ENNaming.configTypeGroup}
                    option={configTypeGroup}
                    onClicked={() => onRowAdd()}
                    hasClick={true}
                    tableRefresh={tableRefresh}
                ></TableHeader>
            </>
        )
    };
    const onRowAdd = () => {
        if (isNew) {
            setIsNew(false);

            let _datas = [...dataSource];
            _datas.unshift(
                {
                    title: '',
                    description: ''
                }
            )
            setDataSource(_datas);
        }
    }
    const addNew = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IConfigeTypeGroupDTO;

        setDataSource(_datas);
        POST(getDynamics.apis.ConfigTypeGroupCreate, newData).then(() => {
            toast.success(ENNaming.successCreate);
            callAPI();
        })
        setIsNew(true);
    }
    const updateRow = (e: DataTableRowEditCompleteEvent) => {

        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IConfigeTypeGroupDTO;
        POST(getDynamics.apis.ConfigTypeGroupUpdate, newData).then(() => {
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
    const actionTemplate = (rowData: any) => {
        return (
            <div className="flex flex-wrap gap-2">
                <TableDeleteButton onClicked={() => callAPIPostDelete(rowData)} rowData={rowData} key={rowData.id}></TableDeleteButton>
            </div>
        );
    };
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };


    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource}
                filters={filters}
                tableStyle={TABLE_STYLE}
                editMode="row"
                header={header}
                stateStorage="session"
                onRowEditComplete={onRowEditComplete}
                stateKey={ENNaming.configTypeGroup + 'state'}
                paginator
                rows={TABLE_NUMBER_OF_ROWS}
                stripedRows
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE}
                removableSort
                selectionMode="single"
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                filterDisplay="row"
                globalFilterFields={getGlobalFilterfieldsConfigTypeGroup()}
                dataKey="id"
                metaKeySelection={metaKey}
                emptyMessage={ENNaming.tableEmptyMessage}
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate={ENNaming.currentPageReportText}
            >
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
                <Column rowEditor={allowEdit} headerStyle={TABLE_ICON_COLUMN_STYLE} bodyStyle={TABLE_TEXTALIGN}></Column>
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
        </div>
    )
}
export default ConfigTypeGroup;

