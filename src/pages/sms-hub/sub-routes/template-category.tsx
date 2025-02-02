import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { ColumnMeta, ITemplateCategoryDTO } from '../../../constants/interface';
import { getGlobalFilterfieldsTemplateCategory, provider, templateCategory } from '../../../dynamics/column-data';
import { FilterMatchMode } from 'primereact/api';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { Button } from 'primereact/button';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';


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
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: ITemplateCategoryDTO) => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button onClick={() => callAPIPostDelete(rowData)} type="button" icon="pi pi-trash" severity="danger" rounded></Button>
            </div>
        );
    };

    const callAPI = async () => {
        POST(getDynamics.apis.TemplateCategoryGetList).then((res: any) => {
            setDataSource(res.data.data);
        })
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
                tableStyle={TABLE_STYLE}
                editMode="row"
                header={header}
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
export default TemplateCategory;