import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { ccSend, getGlobalFilterfieldsCcSend } from '../../../dynamics/column-data';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import { ColumnMetaS, ENCellTypes, ICcSend } from '../../../constants/interface';
import TableHeader from '../../../components/table-header';
import { FilterMatchMode } from 'primereact/api';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import TableDeleteButton from '../../../components/table-delete-button';


const CcSend = () => {
    const [dataSource, setDataSource] = useState<ICcSend[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMetaS[]>(ccSend);
    const [configGroupDropdown, setConfigGroupDropdown] = useState<any[]>([]);
    const [selectedDropdown] = useState<any>([]);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [metaKey, setMetaKey] = useState<boolean>(true);

    useEffect(() => {
        callAPI();
    }, []);
    const tableRefresh = useCallback(() => {
        callAPI()
    }, [])
    const insertToAux = () => {
        dataSource.forEach(item => {
            item.dynamicId = item.configTypeGroupId;
        })
    }
    const callAPI = async () => {
        POST(getDynamics.apis.ccSendGetList).then((res: any) => {
            setDataSource(res.data.data);
        })
        POST(getDynamics.apis.ConfigTypeGroup).then((res: any) => {
            setConfigGroupDropdown(res.data.data);
            // console.log(dataSource);
            // insertToAux();

            // console.log(dataSource);
            // Converter.convertIdToTitle(dataSource, configGroupDropdown, ENNaming.DYNAMICID);
            // console.log(dataSource);
            // setDataSource(dataSource);
        })

    }
    const callAPIPostDelete = async (e: ICcSend) => {
        POST(getDynamics.apis.ccSendDelete, { id: e.id }).then(() => {
            toast.success(ENNaming.successRemove);
            callAPI();
        })
    }
    const allowEdit = (rowData: ICcSend) => {
        return rowData.mobile !== 'Blue Band';
    };
    const onRowAdd = () => {
        if (isNew) {
            setIsNew(false);

            let _datas = [...dataSource];
            _datas.unshift(
                {
                    mobile: '',
                    configTypeGroupId: 0
                }
            )
            setDataSource(_datas);
        }
    }
    const addNew = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as ICcSend;

        setDataSource(_datas);
        POST(getDynamics.apis.ccSendCreate, newData).then(() => {
            toast.success(ENNaming.successCreate);
            callAPI();
        })
        setIsNew(true);
    }
    const updateRow = (e: DataTableRowEditCompleteEvent) => {

        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as ICcSend;
        POST(getDynamics.apis.ccSendUpdate, newData).then(() => {
            setDataSource(_datas);
            toast.success(ENNaming.successEdit);
            callAPI();
        }).catch(e => {
            setDataSource(dataSource);
        })
        setIsNew(true);
    }
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        console.log(e);
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
                    fileName={ENNaming.ccSend}
                    option={ccSend}
                    onClicked={() => onRowAdd()}
                    hasClick={true}
                    tableRefresh={tableRefresh}
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: ICcSend) => {
        return (
            <div className="flex flex-wrap gap-2">
                <TableDeleteButton onClicked={() => callAPIPostDelete(rowData)} rowData={rowData} key={rowData.id}></TableDeleteButton>
            </div>
        );
    };
    const statusEditor = (options: ColumnEditorOptions, rowData: ENCellTypes) => {
        if (rowData === ENCellTypes.dropdowns)
            return (
                <Dropdown value={selectedDropdown}
                    onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
                    options={configGroupDropdown}
                    optionLabel="title"
                    optionValue='id'
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
                key={ENNaming.ccSend}
                tableStyle={TABLE_STYLE}
                editMode="row"
                header={header}
                stateStorage="session"
                onRowEditComplete={onRowEditComplete}
                stateKey={ENNaming.ccSend + 'state'}
                paginator
                rows={TABLE_NUMBER_OF_ROWS}
                stripedRows
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE}
                removableSort
                selectionMode="single"
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                filterDisplay="row"
                globalFilterFields={getGlobalFilterfieldsCcSend()}
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
export default CcSend;

