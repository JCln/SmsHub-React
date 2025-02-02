import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import http from '../../../services/httpService';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { getGlobalFilterfieldsRole, role } from '../../../dynamics/column-data';
import { ColumnMeta, IRole } from '../../../constants/interface';
import { TABLE_FILTER_PLACEHOLDER, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE } from '../../../constants/ActionTypes';
import { InputText } from 'primereact/inputtext';
import { ENNaming } from '../../../constants/naming';
import TableHeader from '../../../components/table-header';
const Role = () => {
    const [dataSource, setDataSource] = useState<IRole[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(role)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        callAPI(getDynamics.apis.role);
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
    const renderHeader = () => {
        return (
            <>
                <TableHeader dataSource={dataSource}
                    filters={filters}
                    setFilters={setFilters}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    fileName={ENNaming.role}
                    option={role}
                ></TableHeader>
            </>
        )
    };
    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _datas = [...dataSource];
        let { newData, index } = e;

        _datas[index] = newData as IRole;

        setDataSource(_datas);
    };
    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };
    const allowEdit = (rowData: IRole) => {
        return rowData.name !== 'Blue Band';
    };

    const header = renderHeader();
    return (
        <div>
            <DataTable value={dataSource} tableStyle={TABLE_STYLE} editMode="row" header={header} onRowEditComplete={onRowEditComplete} stateStorage="session" stateKey={ENNaming.role + 'state'} paginator rows={TABLE_NUMBER_OF_ROWS} stripedRows rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfieldsRole()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage} currentPageReportTemplate={ENNaming.currentPageReportText}>
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
            </DataTable>
        </div>
    )
}
export default Role;