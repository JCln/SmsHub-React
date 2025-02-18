import { Button } from 'primereact/button';
import * as ExcelJs from "exceljs";
import TableRefresh from './table-refresh';
import { ITableOutput } from '../constants/interface';

export default function TableOutputs(
    { dataSource, columns, fileName, onClicked, hasClick, tableRefresh }: ITableOutput) {
    const makeEXCEL = () => {
        console.log(dataSource);
        console.log(fileName);

        const workbook = new ExcelJs.Workbook();
        const _exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const viewsConfig = { rightToLeft: true }
        const worksheet = workbook.addWorksheet(
            "Sheet1"
            // ,{ views: [viewsConfig] }
        );
        worksheet.properties.defaultColWidth = 700;

        // TABLE
        worksheet.addTable({
            name: 'MyTable',
            ref: 'A1',
            headerRow: true,
            // style: {
            //   theme: 'TableStyleMedium2',
            //   showRowStripes: false,
            // },
            columns: columns,
            rows: dataSource.data
        });

        worksheet.getRow(1).font = { name: 'Ravi', size: 14, color: { argb: 'ffffff' } };//wrapText: true    , bold: true

        for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
            worksheet.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center' };//wrapText: true
        }

        const toExportFileName = 'testName';
        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {
                type:
                    _exportType
            });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.href = url;
            a.download = toExportFileName;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }

    return (
        <div className="flex align-items-center justify-content-end gap-5">
            <Button type="button" icon="pi pi-file" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود CSV" onClick={() => (false)} />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود XLSX" onClick={() => makeEXCEL()} />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود PDF" onClick={() => (false)} />
            <TableRefresh handleClick={tableRefresh}></TableRefresh>
            {hasClick ?
                <Button type="button" icon="pi pi-plus" severity='info' rounded tooltipOptions={{ position: 'mouse' }} tooltip="افزودن مورد" onClick={() => onClicked()}></Button>
                :
                <></>
            }
        </div >

    )
}
