import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { getDynamics } from '../../../dynamics/getDynamics';
import { useEffect, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import 'jspdf-autotable';
import { getGlobalFilterfields, userAll, lineGetByUserId } from '../../../dynamics/column-data';
import { ColumnMeta, IUserAll } from '../../../constants/interface';
import { TABLE_FILTER_PLACEHOLDER, TABLE_NUMBER_OF_ROWS, TABLE_ROWS_PER_PAGE, TABLE_STYLE } from '../../../constants/ActionTypes';
import { ENNaming } from '../../../constants/naming';
import TableHeader from '../../../components/table-header';
import { GET, POST, POSTBYID } from '../../../services/callAPIWrapperService';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { toast } from 'react-toastify';


const UserByLineIds = () => {
    const [dataSource, setDataSource] = useState<any[]>([]);
    const [userId, setUserId] = useState<IUserAll[]>([]);
    const [selectedLineId, setSelectedUserId] = useState<any>()

    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
    const [metaKey, setMetaKey] = useState<boolean>(true);
    const [visibleColumns, setVisibleColumns] = useState<ColumnMeta[]>(lineGetByUserId)
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    useEffect(() => {
        POST(getDynamics.apis.lineGetList).then((res: any) => {
            setUserId(res.data.data);
        })
    }, []);
    const callAPI = async () => {
        POSTBYID(getDynamics.apis.userLineGetByLineId, selectedLineId.id).then((res: any) => {
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
                    fileName={ENNaming.userLineGetByLineId}
                    option={lineGetByUserId}
                ></TableHeader>
            </>
        )
    };
    const header = renderHeader();
    return (
        <div>
            <div className='_section_view'>
                <div className='d-flex align-items-center gap-12'>
                    <h3>خط</h3>
                    <div className="w-20rem">
                        <div className='_captcha'>
                            <div className='captcha-refresh-wrapper'>
                                <i className="captcha-refresh pi pi-pi-arrow-down-left-and-arrow-up-right-to-center"></i>
                            </div>
                            <Dropdown value={selectedLineId} onChange={(e: DropdownChangeEvent) => setSelectedUserId(e.value)} options={userId} optionLabel="number"
                                placeholder={ENNaming.choose} className="w-full mw-w-16rem" checkmark={true} highlightOnSelect={true} />
                        </div>
                    </div>
                    <button onClick={() => callAPI()} className="_button w-20rem">
                        مشاهده
                    </button>
                </div>
            </div>
            <DataTable value={dataSource} tableStyle={TABLE_STYLE} editMode="row" header={header} stateStorage="session" stateKey="userall-state" paginator rows={TABLE_NUMBER_OF_ROWS} stripedRows rowsPerPageOptions={TABLE_ROWS_PER_PAGE} removableSort selectionMode="single" selection={selectedProduct}
                onSelectionChange={(e) => setSelectedProduct(e.value)} filterDisplay="row" globalFilterFields={getGlobalFilterfields()} dataKey="id" metaKeySelection={metaKey} emptyMessage={ENNaming.tableEmptyMessage}>
                {visibleColumns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} filter filterPlaceholder={TABLE_FILTER_PLACEHOLDER} sortable />
                ))}
            </DataTable>
        </div>
    )
}
export default UserByLineIds;