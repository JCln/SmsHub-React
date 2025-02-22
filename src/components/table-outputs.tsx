import { Button } from 'primereact/button';
import * as ExcelJs from "exceljs";
import TableRefresh from './table-refresh';
import { ITableOutput } from '../constants/interface';
import jsPDF from 'jspdf';

import 'jspdf-autotable';
import { font } from '../fonts/pdfjs/BLotus-normal';
import { base64Img } from '../dynamics/pdf-logo';
export interface IOutputConfig {
    shouldFilteredValue: boolean,
    shouldFreezeHeader: boolean,
    defaultColWidth: number,
    defaultFontFamily: string,
    canShowCurrentTable: boolean
}
export default function TableOutputs(
    { dataSource, columns, fileName, onClicked, hasClick, tableRefresh }: ITableOutput) {
    const getValidatedTableData = (dataSource: any[], _selectCols: any[], outputConfig: IOutputConfig): any => {
        const colnames = _selectCols.map(c => ({ name: c.field, header: c.header, sel: true }));
        const validColNames: any[] = [];
        const validHeaders = [];
        const firstItem = dataSource[0];

        const keys = Object.keys(firstItem);
        for (let j = 0; j < colnames.length; j++) {
            const colName = colnames[j].name;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (outputConfig.canShowCurrentTable ? key === colName : key === colName && colnames[j].sel) {
                    validColNames.push(colName);
                    validHeaders.push({
                        name: colnames[j].header, style: { font: { name: outputConfig.defaultFontFamily } }
                    })
                }
            }
        }
        const newData = dataSource.map(function (currentelement) {
            const newElement: any = {};
            for (let i = 0; i < validColNames.length; i++) {
                const key = validColNames[i];
                let value = currentelement[validColNames[i]];

                newElement[key] = value != undefined && value != null ? value : '';
            }
            return Object.values(newElement);
        });

        return { data: newData, headers: validHeaders };
    }
    const makeEXCEL = (dataSource: any, columns: any) => {
        const _exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const excelType = 'xlsx';
        const config = {
            shouldFilteredValue: false,
            shouldFreezeHeader: false,
            defaultColWidth: 13,
            defaultFontFamily: 'BLotus',
            canShowCurrentTable: false
        }
        const datas = getValidatedTableData(dataSource, columns, config);

        const workbook = new ExcelJs.Workbook();
        const viewsConfig = { rightToLeft: true }
        const worksheet = workbook.addWorksheet(
            "Sheet1",
            { views: [viewsConfig] }
        );
        // worksheet.properties.defaultColWidth = outputConfig.defaultColWidth;

        // TABLE
        console.log(datas);
        worksheet.addTable({
            name: 'MyTable',
            ref: 'A1',
            headerRow: true,
            // style: {
            //   theme: 'TableStyleMedium2',
            //   showRowStripes: false,
            // },
            columns: datas.headers,
            rows: datas.data
        });

        worksheet.getRow(1).font = { name: 'BLotus', size: 14, color: { argb: 'ffffff' } };//wrapText: true    , bold: true

        for (let rowIndex = 2; rowIndex <= worksheet.rowCount; rowIndex++) {
            worksheet.getRow(rowIndex).alignment = { vertical: 'middle', horizontal: 'center' };//wrapText: true
        }

        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {
                type: _exportType
            });
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.href = url;
            a.download = fileName + new Date().getTime() + '.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }
    const exportPDF = (_dataSource: any, cols: any) => {
        const doc = new jsPDF('landscape');
        (doc as any).addFileToVFS('Blotus.ttf', font);//font should be ttf
        doc.addFont('Blotus.ttf', 'font', 'normal');
        doc.setFont('font'); // set font            

        const exportColumns = cols.map((col: any, index: number) => ({ title: col.header, dataKey: col.field }));
        (doc as any).autoTable(
            exportColumns,
            _dataSource,
            {

                styles: {
                    font: 'font',
                    fillColor: [233, 236, 239],
                    fontSize: 12
                },
                headStyles: {
                    font: 'font',
                    fillColor: [0, 69, 203],
                    textColor: [255, 255, 255],
                    fontSize: 14

                },
                didDrawPage: function () {
                    if (base64Img) {
                        doc.addImage(base64Img, 'png', 200, 0, 40, 15);
                    }
                }
            }
        )
        doc.save(fileName + '.pdf');
    };
    return (
        <div className="flex align-items-center justify-content-end gap-5">
            {/* <Button type="button" icon="pi pi-file" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود xlsx" onClick={() => (false)} /> */}
            <Button type="button" icon="pi pi-file-excel" severity="success" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود XLSX" onClick={() => makeEXCEL(dataSource, columns)} />
            <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود PDF" onClick={() => (exportPDF(dataSource, columns))} />
            <TableRefresh handleClick={tableRefresh}></TableRefresh>
            {hasClick ?
                <Button type="button" icon="pi pi-plus" severity='info' rounded tooltipOptions={{ position: 'mouse' }} tooltip="افزودن مورد" onClick={() => onClicked()}></Button>
                :
                <></>
            }
        </div >

    )
}
