import { ITableHeader } from '../constants/interface'
import ColumnToggle from './column-toggle'
import TableGlobalSearch from './table-global-search'
import TableOutputs from './table-outputs'

export default function TableHeader(
    { dataSource,
        visibleColumns,
        setVisibleColumns,
        filters,
        setFilters,
        option,
        fileName,
        onClicked,
        hasClick,
        hasOutput = true,
        tableRefresh
    }: ITableHeader
) {
    return (
        <div className='_table_header'>

            <div className="flex justify-content-end" >
                <ColumnToggle option={option} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns}></ColumnToggle>
                <TableGlobalSearch filters={filters} setFilters={setFilters}></TableGlobalSearch>
            </div>
            {hasOutput ?
                <TableOutputs tableRefresh={tableRefresh} columns={option} dataSource={dataSource} fileName={fileName} hasClick={hasClick} onClicked={() => onClicked()}></TableOutputs>
                :
                <></>
            }
        </div>
    )
}