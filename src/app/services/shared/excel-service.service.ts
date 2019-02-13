import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as Xlsx from 'xlsx';
import { saveAs } from 'file-saver';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }

  public exportAsExcelFile(heading: any[], data: any[], excelFileName: string): void {

const ws = Xlsx.utils.aoa_to_sheet( heading );

Xlsx.utils.sheet_add_aoa(ws, data, {  origin: -1 });
 
 const wb = Xlsx.utils.book_new();
 const cell = {v: ws ,
               s: {
                  alignment: {
                    textRotation: 90, 
                  },
                  font: {
                    sz: 14, 
                    bold: true,
                    color: '#FF00FF' }} };

 Xlsx.utils.book_append_sheet(wb, ws, excelFileName);
 const wbout = Xlsx.write(wb, {bookType: 'xlsx', type: 'array'});
 this.saveAsExcelFile(wbout, excelFileName);


   // const worksheet: Xlsx.WorkSheet = Xlsx.utils.aoa_to_sheet(data);    
  //  const workbook: Xlsx.WorkBook = {Sheets: {'data': worksheet},
  // SheetNames:  ['data'] };
  // const excelBuffer: any = Xlsx.write(workbook, {bookType: 'xlsx',
  // type: 'array'});
  // const properties: Xlsx.Properties = {};
  // this.saveAsExcelFile(excelBuffer, excelFileName);





  }

private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});

  FileSaver.saveAs(data, fileName  + new Date().getTime() + EXCEL_EXTENSION);


}
}
