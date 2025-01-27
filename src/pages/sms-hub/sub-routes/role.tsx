import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import http from '../../../services/httpService';

import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { getGlobalFilterfieldsRole, role } from '../../../dynamics/column-data';
import { ColumnMeta, IRole } from '../../../constants/interface';
import ColumnToggle from '../../../components/column-toggle';
import TableGlobalSearch from '../../../components/table-global-search';
import TableOutputs from '../../../components/table-outputs';
import { TABLE_ICON_COLUMN_STYLE, TABLE_STYLE, TABLE_TEXTALIGN } from '../../../constants/ActionTypes';
import { InputText } from 'primereact/inputtext';
import { ENNaming } from '../../../constants/naming';
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
            <div className='_table_header'>

                <TableOutputs columns={role} dataSource={dataSource} fileName={ENNaming.role}></TableOutputs>
                <div className="flex justify-content-end" >
                    <ColumnToggle option={role} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns}></ColumnToggle>
                    <TableGlobalSearch filters={filters} setFilters={setFilters}></TableGlobalSearch>
                </div>
            </div>
        );
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
            <DataTable value={dataSource} tableStyle={TABLE_STYLE} editMode="row" header={header} onRowEditComplete={onRowEditComplete} stateStorage="session" stateKey={ENNaming.role + 'state'} paginator rows={5} stripedRows rowsPerPageOptions={[5, 10, 25, 50]} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfieldsRole()} dataKey="id" metaKeySelection={metaKey} emptyMessage="موردی یافت نشد">
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} editor={(options) => textEditor(options)} filter filterPlaceholder="جستجو" sortable />
                ))}                
            </DataTable>
        </div>
    )
}
export default Role;