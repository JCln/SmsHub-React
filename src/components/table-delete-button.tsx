import { Button } from 'primereact/button'

export default function TableDeleteButton(
    {
        rowData,
        onClicked
    }:
        {
            rowData: any,
            onClicked: any
        }) {
    return (
        <>
            <Button onClick={() => onClicked(rowData)} type="button" icon="pi pi-trash" severity="danger" tooltip="حذف مورد" tooltipOptions={{ position: 'mouse' }} rounded></Button>
        </>
    )
}
