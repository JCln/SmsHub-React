import { Button } from 'primereact/button';
import * as ExcelJs from "exceljs";

export default function TableOutputs({ dataSource, columns, fileName }: { dataSource: any, columns: any, fileName: string }) {
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

        worksheet.getRow(1).font = { name: 'Vazirmatn', size: 14, color: { argb: 'ffffff' } };//wrapText: true    , bold: true

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
        <div className="flex align-items-center justify-content-end gap-2">
            <Button type="button" icon="pi pi-file" rounded onClick={() => (false)} data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={() => makeEXCEL()} data-pr-tooltip="XLS" />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={() => (false)} data-pr-tooltip="PDF" />
            <Button type="button" icon="pi pi-plus" severity='info' rounded onClick={() => (false)} data-pr-tooltip="+" />
        </div>

    )
}
