import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

export default function ColumnToggle({ option, visibleColumns, setVisibleColumns }: { option: any, visibleColumns: any, setVisibleColumns: any }) {
    // const [, setVisibleColumns] = useState<ColumnMeta[]>(option);
    const onColumnToggle = (event: MultiSelectChangeEvent) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = option.filter((col: any) => selectedColumns.some((sCol: any) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };

    return (
        <MultiSelect
            value={visibleColumns}
            options={option}
            filter
            optionLabel="header"
            onChange={onColumnToggle}
            className="w-full sm:w-20rem _column_toggle_width"
        />
    )
}
