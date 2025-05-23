import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useCallback, useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import 'jspdf-autotable';
import { getGlobalFilterfields, userAll, userLineGetByUserId } from '../../../dynamics/column-data';
import { ColumnMeta, IUserAll } from '../../../constants/interface';
import { TABLE_FILTER_PLACEHOLDER, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import TableHeader from '../../../components/table-header';
import { GET, POSTBYID } from '../../../services/callAPIWrapperService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { toast } from 'react-toastify';
import { dataStoreService } from '../../../services/dictionary-wrapper';


const LineByUserIds = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [userId, setUserId] = useState<IUserAll[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<any>()

    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(userLineGetByUserId)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
    }, []);
    const callAPI = async () => {
        const userId = await dataStoreService.fetchData(
            ENNaming.userAll,
            getDynamics.apis.userAll,
            { method: 'GET' }
        );
        const userLineGetUserId = await dataStoreService.fetchData(
            ENNaming.userLineGetUserId,
            getDynamics.apis.userLineGetUserId,
            { method: 'POST', id: selectedUserId.id }
        );
        setUserId(userId.data.data);
        setDataSource(userLineGetUserId.data.data);
    }
    const tableRefresh = useCallback(() => {
        callAPI()
    }, [])
    const renderHeader = () => {
        return (
            <>
                <TableHeader dataSource={dataSource}
                    filters={filters}
                    setFilters={setFilters}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                    fileName={ENNaming.userLineGetByUserId}
                    option={userLineGetByUserId}
                    hasClick={false}
                    hasOutput={false}
                    tableRefresh={tableRefresh}
                ></TableHeader>
            </>
        )
    };
    const header = renderHeader();
    return (
        <div className='bg-white border-15'>
            <div className='_section_view'>
                <div className='d-grid align-items-center justify-content-center'>
                    <p>کاربر</p>
                    <div className="w-20rem">
                        <div className='_captcha'>
                            <Dropdown value={selectedUserId} onChange={(e: DropdownChangeEvent) => setSelectedUserId(e.value)} options={userId} optionLabel="displayName"
                                placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                        </div>
                        <button onClick={() => callAPI()} className="_button w-20rem mt-1">
                            مشاهده
                        </button>
                    </div>
                </div>
            </div>
            <DataTable value={dataSource} filters={filters} tableStyle={TABLE_STYLE} editMode="row" header={header} stateStorage="session" stateKey="userall-state" paginator rows={TABLE_NUMBER_OF_ROWS} stripedRows rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfields()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage}>
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
            </DataTable>
        </div>
    )
}
export default LineByUserIds;