import * as ExcelJs from "exceljs";
import { IOutputConfig, ITableOutput } from '../constants/interface';
import jsPDF from 'jspdf';

import autoTable, { HAlignType, ShowHeadType } from 'jspdf-autotable';
import { font } from '../fonts/pdfjs/BLotus-normal';
import { MathS } from "../services/utils";
import { toast } from "react-toastify";
import { storageService } from "../services/storage.service";
import { DateJalaliService } from "../services/date-jalali.service";
import { ENNaming } from "../constants/naming";
import { Button } from "primereact/button";
import TableRefresh from "./table-refresh";

export default function TableOutputs(
    { dataSource, columns, onClicked, hasClick, fileName, ...rest }: ITableOutput) {
    const dateJalaliService = new DateJalaliService();

    const getOutputConfigs = (): IOutputConfig => {
        const temp: any = storageService.getItem(ENNaming.USERCONFIGSETTING);

        return {
            orientation: temp.orientation || 'landscape',
            defaultColWidth: temp.defaultColWidth,
            showHead: temp.showHead || 'everyPage',
            canShowCurrentTable: false,
            defaultFontFamily: font,
            shouldFilteredValue: false,
            shouldFreezeHeader: false,
            direction: temp.direction as HAlignType,
            tableWidthType: temp.tableWidthType
        }
    }
    const getValidatedTableData = (dataSource: any[], _selectCols: any[]): any => {
        const colnames = _selectCols.map(c => ({ name: c.field, header: c.header, sel: true }));
        const validColNames: any[] = [];
        const validHeaders: any[] = [];
        const firstItem = dataSource[0];

        const keys = Object.keys(firstItem);
        for (let j = 0; j < colnames.length; j++) {
            const colName = colnames[j].name;

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                if (getOutputConfigs()?.canShowCurrentTable ? key === colName : key === colName && colnames[j].sel) {
                    validColNames.push(colName);
                    validHeaders.push(
                        {
                            name: colnames[j].header,
                            style: {
                                font: { name: getOutputConfigs()?.defaultFontFamily }
                            }
                        })
                }
            }
        }
        const newData = dataSource.map(function (currentelement) {
            const newElement: any = {};
            for (let i = 0; i < validColNames.length; i++) {
                const key = validColNames[i];
                let value = currentelement[validColNames[i]];

                newElement[key] = value !== undefined && value !== null ? value : '';
            }
            return Object.values(newElement);
        });

        return { data: newData, headers: validHeaders };
    }
    const makeEXCEL = (dataSource: any, columns: any) => {
        const _exportType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

        const datas = getValidatedTableData(dataSource, columns);

        const workbook = new ExcelJs.Workbook();
        const viewsConfig = { rightToLeft: true }
        const worksheet = workbook.addWorksheet(
            "Sheet1",
            { views: [viewsConfig] }
        );
        worksheet.properties.defaultColWidth = getOutputConfigs().defaultColWidth;

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
            a.download = fileName + dateJalaliService.getGregorianDate() + '.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
        });
    }
    const exportPDF = (_dataSource: any, cols: any) => {
        const doc = new jsPDF(getOutputConfigs()?.orientation);
        (doc as any).addFileToVFS('Blotus.ttf', font);//font should be ttf
        doc.addFont('Blotus.ttf', 'Blotus', 'normal');
        doc.setFont('Blotus'); // set font                    
        const datas = getValidatedTableData(_dataSource, columns);
        const _columns = cols.map(item => item.header);

        autoTable(doc, {
            body: datas.data,
            head: [_columns],
            styles: {
                font: 'Blotus',
                fontStyle: 'normal',
                fillColor: [233, 236, 239],
                halign: getOutputConfigs().direction as HAlignType,
                fontSize: 12
            },
            headStyles: {
                font: 'Blotus',
                fontStyle: 'normal',
                fillColor: [0, 69, 203],
                textColor: [255, 255, 255],
                halign: getOutputConfigs().direction as HAlignType,
                fontSize: 14

            },
            bodyStyles: {
                halign: getOutputConfigs().direction as HAlignType       // Right alignment for body cells
            },
            showHead: getOutputConfigs()?.showHead as ShowHeadType,
            tableWidth: getOutputConfigs()?.tableWidthType,

            didDrawPage: function (data) {
                if (data['section'] === 'head') {
                    doc.setFont('Blotus', 'normal');
                }
            }
        }
        )
        console.log(autoTable);
        doc.save(fileName + dateJalaliService.getGregorianDate() + '.pdf');
    };
    const validateDataSource = (body: any[], columns: any, isPdf: boolean) => {
        if (MathS.isNull(body)) {
            toast.warn(ENNaming.emptyMessageForOutput);
            return;
        }
        isPdf ? exportPDF(body, columns) : makeEXCEL(body, columns)
    }
    return (
        <div className="flex align-items-center justify-content-end gap-2.5">
            <div className="flex align-items-center justify-content-end gap-5">
                <Button type="button" icon="pi pi-file-excel" severity="success" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود XLSX" onClick={() => validateDataSource(dataSource, columns, false)} />
                <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded tooltipOptions={{ position: 'mouse' }} tooltip="دانلود PDF" onClick={() => validateDataSource(dataSource, columns, true)} />
                <TableRefresh handleClick={rest.tableRefresh}></TableRefresh>
                {hasClick ?
                    <Button type="button" icon="pi pi-plus" severity='info' rounded tooltipOptions={{ position: 'mouse' }} tooltip="افزودن مورد" onClick={() => onClicked()}></Button>
                    :
                    <></>
                }
            </div>
        </div >

    )
}
