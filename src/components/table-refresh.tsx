import { Button } from "primereact/button"

interface ITableRefresh {
    handleClick: any
}
export default function TableRefresh({ handleClick }: ITableRefresh) {
    return (
        <Button icon="pi pi-refresh" type="button" severity="secondary" rounded tooltipOptions={{ position: 'mouse' }} tooltip="بارگیری مجدد جدول" onClick={handleClick}></Button>
    )
}
