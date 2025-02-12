import { DataTable } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { ColumnMetaS, ENCellTypes, ITemplateDTO } from '../../../constants/interface';
import { getGlobalFilterfieldsTemplate, template } from '../../../dynamics/column-data';
import { FilterMatchMode } from 'primereact/api';
import TableHeader from '../../../components/table-header';
import { ENNaming } from '../../../constants/naming';
import { InputText } from 'primereact/inputtext';
import { TABLE_FILTER_PLACEHOLDER, TABLE_ICON_COLUMN_STYLE, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { POST } from '../../../services/callAPIWrapperService';
import { toast } from 'react-toastify';
import { classNames } from 'primereact/utils';
import TableDeleteButton from '../../../components/table-delete-button';


const Template = () => {
    const [dataSource, setDataSource] = useState<ITemplateDTO[]>([]);
    const [isNew, setIsNew] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMetaS[]>(template)
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
                    fileName={ENNaming.template}
                    option={template}
                    hasClick={false}
                ></TableHeader>
            </>
        )
    };
    const actionTemplate = (rowData: ITemplateDTO) => {
        return (
            <div className="flex flex-wrap gap-2">
                <TableDeleteButton onClicked={() => callAPIPostDelete(rowData)} rowData={rowData} key={rowData.id}></TableDeleteButton>
            </div>
        );
    };

    const callAPI = async () => {
        POST(getDynamics.apis.TemplateGetList).then((res: any) => {
            setDataSource(res.data.data);
        })
    }
    const callAPIPostDelete = async (e: ITemplateDTO) => {
        POST(getDynamics.apis.TemplateDelete, { id: e.id }).then(() => {
            toast.success(ENNaming.successRemove);
            callAPI();
        })
    }
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    const allowEdit = (rowData: ITemplateDTO) => {
        return rowData.title !== 'Blue Band';
    };
    const verifiedBodyTemplate = (rowData: ITemplateDTO) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.isActive, 'false-icon pi-times-circle': !rowData.isActive })}></i>;
    };


    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource}
                tableStyle={TABLE_STYLE}
                editMode="row"
                header={header}
                stateStorage="session"
                stateKey={ENNaming.template + 'state'}
                paginator
                rows={TABLE_NUMBER_OF_ROWS}
                stripedRows
                rowsPerPageOptions={TABLE_ROWS_PER_PAGE}
                removableSort
                selectionMode="single"
                selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)}
                filterDisplay="row"
                globalFilterFields={getGlobalFilterfieldsTemplate()}
                dataKey="id"
                metaKeySelection={metaKey}
                emptyMessage={ENNaming.tableEmptyMessage}
                paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
                currentPageReportTemplate={ENNaming.currentPageReportText}
            >
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} body={col.types === ENCellTypes.booleans ? verifiedBodyTemplate : null} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
                <Column rowEditor={allowEdit} headerStyle={TABLE_ICON_COLUMN_STYLE} bodyStyle={TABLE_TEXTALIGN}></Column>
                <Column body={actionTemplate} headerClassName="w-10rem" />
            </DataTable>
        </div>
    )
}
export default Template;