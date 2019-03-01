import { Component, OnInit, OnDestroy, Inject, LOCALE_ID } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Servicio } from 'src/app/models/servicio.model';
import { VueltasService } from 'src/app/services/service.index';
// para generar pdfs
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { ignoreElements } from 'rxjs/operators';
// para generar xls
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import * as xlsx from 'xlsx';
import { ExcelServiceService } from '../../../services/shared/excel-service.service';

@Component({
  selector: 'app-vueltas',
  templateUrl: './vueltas.component.html',
  styleUrls: ['./vueltas.component.css']
})
export class VueltasComponent implements OnInit, OnDestroy {



  constructor( public _vs: VueltasService,
               private activated: ActivatedRoute,
               private router: Router ,
               private excelService: ExcelServiceService,
               @Inject(LOCALE_ID) public locale: string ) {
  }

  ngOnInit(): void {
    this.activated.params
      .subscribe( lineas => this._vs.setLineas( lineas ));
    this._vs.loaded = false;

  }

  ngOnDestroy(): void {
  }

  buscar( formFechas ) {
    // Traigo las fechas del buscador
    this._vs.OnInit( formFechas );
    // this.filter( new Date() );
  }

  volver() {
    this.router.navigate(['/diagr/idaVtaList']);
  }

  tieneVuelta( serv: Servicio ) {
    if (  this._vs.getVuelta( serv.servicioPK ) ) {
        return true;
    }
    return false;
  }

  private getCanvas() {
    const data = document.getElementById('contentToConvert');
    return data;
  }

  public captureScreen() {
    const data = this.getCanvas();

    html2canvas(data).then(canvas => {
const contentDataURL = canvas.toDataURL('image/png');

      /*
      Here are the numbers (paper width and height) that I found to work.
      It still creates a little overlap part between the pages, but good enough for me.
      if you can find an official number from jsPDF, use them.
      */
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jspdf('p', 'mm', 'a4');
      let position = 10;
      doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Diagramacion.pdf');


    });
  }

  public generateExcel() {
    /* esto convierte todo el html en un excel
    const data = this.getCanvas().innerHTML;
    const blob = new Blob([data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
    });
    saveAs(blob, 'Diagramacion.xls');
*/

const Heading = [
  [ '' ],
  ['LINEA IDA', 'SERVICIO IDA', 'REFUERZO IDA', 'PELICULA IDA', 'VIDEO IDA', 'CHOFERES IDA', 'AUXILIARES IDA',
  'LINEA VUELTA', 'SERVICIO VUELTA',
  'REFUERZO VUELTA', 'PELICULA VUELTA', 'VIDEO VUELTA', 'CHOFERES VUELTA', 'AUXILIARES VUELTA']
];


  const observable: Observable<any> =  this._vs.getFullVueltas$();
  observable.subscribe( data => {
      this.excelService.exportAsExcelFile(Heading, data, 'Diagramacion-Servicios');
  });
}


}
