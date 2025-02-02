import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { ColumnMeta, IProvider } from '../../../constants/interface';
import { getGlobalFilterfieldsProvider, provider } from '../../../dynamics/column-data';
import { FilterMatchMode } from 'primereact/api';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { Button } from 'primereact/button';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';


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

    const callAPI = async () => {
        POST(getDynamics.apis.providerGetList).then((res: any) => {
            setDataSource(res.data.data);
        })
    }
    const renderHeader = () => {
        return (
            <>
                <div className='d-flex'>
                    <TableHeader dataSource={dataSource}
                        filters={filters}
                        setFilters={setFilters}
                        visibleColumns={visibleColumns}
                        setVisibleColumns={setVisibleColumns}
                        fileName={ENNaming.provider}
                        option={provider}
                        onClicked={() => onRowAdd()}
                        hasClick={true}
                    ></TableHeader>
                </div>
            </>
        )
    };
    const actionTemplate = (rowData: IProvider) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button onClick={() => callAPIPostDelete(rowData)} type="button" icon="pi pi-trash" severity="danger" rounded></Button>
            </div>
        );
    };

    const onRowAdd = () => {
        console.log('hid');

        if (isNew) {
            setIsNew(false);

            let _datas = [...dataSource];
            _datas.unshift(
                {
                    title: '',
                    website: '',
                    defaultPreNumber: null,
                    batchSize: null,
                    baseUri: '',
                    fallbackBaseUri: '',
                    credentialTemplate: ''
                }
            )
            setDataSource(_datas);
        }
    }
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
    const updateRow = (e: DataTableRowEditCompleteEvent) => {

        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IProvider;

        POST(getDynamics.apis.providerUpdate, newData).then(() => {
            setDataSource(_datas);
            callAPI();
            toast.success(ENNaming.successEdit);
        }).catch(e => {
            setDataSource(dataSource);
        }
        )
        setIsNew(true);
    }
    const callAPIPostDelete = async (e: IProvider) => {
        POST(getDynamics.apis.providerDelete, { id: e.id }).then(() => {
            toast.success(ENNaming.successRemove);
            POST(getDynamics.apis.providerGetList).then((res: any) => {
                setDataSource(res.data.data);
            })
        })
    }
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        console.log(e);
        e.data.id ? updateRow(e) : addNew(e)
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
export default Providers;