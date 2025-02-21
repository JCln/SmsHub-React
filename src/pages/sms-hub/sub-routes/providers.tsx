import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { ColumnMeta, IProvider } from '../../../constants/interface';
import { getGlobalFilterfieldsProvider, provider } from '../../../dynamics/column-data';
import { FilterMatchMode } from 'primereact/api';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE } from '../../../constants/ActionTypes';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import PageTitle from '../../../components/page-title';


const Providers = () => {
    const [dataSource, setDataSource] = useState<IProvider[]>([]);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(provider)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        title: { value: null, matchMode: FilterMatchMode.CONTAINS },
        website: { value: null, matchMode: FilterMatchMode.CONTAINS },
        defaultPreNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
        batchSize: { value: null, matchMode: FilterMatchMode.CONTAINS },
        baseUri: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fallbackBaseUri: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        callAPI();
    }, []);
    const tableRefresh = useCallback(() => {
        callAPI()
    }, []);
    const callAPI = async () => {
        POST(getDynamics.apis.providerGetList).then((res: any) => {
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
                    fileName={ENNaming.provider}
                    option={provider}
                    hasClick={false}
                    tableRefresh={callAPI}
                ></TableHeader>
            </>
        )
    };
    const addNew = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IProvider;

        setDataSource(_datas);
        POST(getDynamics.apis.providerCreate, newData).then(() => {
            callAPI();
            toast.success(ENNaming.successCreate);
        })
        setIsNew(true);
    }
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        console.log(e);
        addNew(e)
    };
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    const allowEdit = (rowData: IProvider) => {
        return rowData.title !== 'Blue Band';
    };

    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource}
                filters={filters}
                tableStyle={TABLE_STYLE}
                editMode="row"
                header={header}
                onRowEditComplete={onRowEditComplete}
                stateStorage="session"
                stateKey={ENNaming.provider + 'state'}
                paginator
                rows={TABLE_NUMBER_OF_ROWS}
                stripedRows
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE}
                removableSort
                selectionMode="single"
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                filterDisplay="row"
                globalFilterFields={getGlobalFilterfieldsProvider()}
                dataKey="id"
                metaKeySelection={metaKey}
                emptyMessage={ENNaming.tableEmptyMessage}
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate={ENNaming.currentPageReportText}
            >
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
            </DataTable>
        </div>
    )
}
export default Providers;