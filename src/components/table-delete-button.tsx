import { Button } from 'primereact/button'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { ENNaming } from '../constants/naming';

export default function TableDeleteButton(
    {
        rowData,
        onClicked
    }:
        {
            rowData: any,
            onClicked: any
        }) {
    const accept = () => {
        onClicked(rowData);
    }
    const reject = () => {
        console.log('do nothing');
    }
    const callConfirmPopup = (e: any) => {
        confirmPopup({
            target: e.currentTarget,
            message: ENNaming.deleteConfirmMessage,
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    }
    return (
        <>
            <ConfirmPopup />
            <Button onClick={callConfirmPopup} type="button" icon="pi pi-trash" severity="danger" tooltip="حذف مورد" tooltipOptions={{ position: 'mouse' }} rounded></Button>
        </>
    )
}
