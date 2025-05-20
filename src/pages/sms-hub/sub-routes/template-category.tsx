import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { ColumnMeta, ITemplateCategoryDTO } from '../../../constants/interface';
import { getGlobalFilterfieldsTemplateCategory, templateCategory } from '../../../dynamics/column-data';
import { FilterMatchMode } from 'primereact/api';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { NavLink, Outlet } from 'react-router';
import TableDeleteButton from '../../../components/table-delete-button';
import { dataStoreService } from '../../../services/dictionary-wrapper';
import { ENRoutes } from '../../../constants/ENRoutes';



const TemplateCategory = () => {
    const [dataSource, setDataSource] = useState<ITemplateCategoryDTO[]>([]);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(templateCategory)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        callAPI();
    }, []);
    const tableRefresh = useCallback(() => {
        callAPI(true)
    }, []);
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

        _datas[index] = newData as ITemplateCategoryDTO;

        setDataSource(_datas);
        POST(getDynamics.apis.TemplateCategoryCreate, newData).then(() => {
            callAPI();
            toast.success(ENNaming.successCreate);
        })
        setIsNew(true);
    }
    const updateRow = (e: DataTableRowEditCompleteEvent) => {

        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as ITemplateCategoryDTO;

        POST(getDynamics.apis.TemplateCategoryGetUpdate, newData).then(() => {
            setDataSource(_datas);
            callAPI();
            toast.success(ENNaming.successEdit);
        }).catch(e => {
            setDataSource(dataSource);
        }
        )
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
                    fileName={ENNaming.templateCategory}
                    option={templateCategory}
                    onClicked={() => onRowAdd()}
                    hasClick={true}
                    tableRefresh={tableRefresh}
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: ITemplateCategoryDTO) => {
        return (
            <div className='flex flex-wrap align-items-center gap-5'>
                <div className="flex flex-wrap align-items-center">
                    <NavLink className="pi pi-objects-column table-icon" to={`${ENRoutes.templateCategroy}/${rowData.id}`}></NavLink>
                </div>
                <div>
                    <TableDeleteButton onClicked={() => callAPIPostDelete(rowData)} rowData={rowData} key={rowData.id}></TableDeleteButton>
                </div>
            </div>
        );
    };

    const callAPI = async (canRefresh?: boolean) => {
        const TemplateCategoryGetList = await dataStoreService.fetchData(
            ENNaming.TemplateCategoryGetList,
            getDynamics.apis.TemplateCategoryGetList,
            { method: 'POST', refresh: canRefresh }
        );
        setDataSource(TemplateCategoryGetList.data.data);
    }
    const callAPIPostDelete = async (e: ITemplateCategoryDTO) => {
        POST(getDynamics.apis.TemplateCategoryDelete, { id: e.id }).then(() => {
            toast.success(ENNaming.successRemove);
            callAPI();
        })
    }
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    const allowEdit = (rowData: ITemplateCategoryDTO) => {
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
                stateKey={ENNaming.templateCategory + 'state'}
                paginator
                rows={TABLE_NUMBER_OF_ROWS}
                stripedRows
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE}
                removableSort
                selectionMode="single"
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                filterDisplay="row"
                globalFilterFields={getGlobalFilterfieldsTemplateCategory()}
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
            <Outlet />
        </div>
    )
}
export default TemplateCategory;