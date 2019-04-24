import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { VueltasService } from 'src/app/services/service.index';
import { ChoferesConEstadoPipe } from 'src/app/pipes/choferes-con-estado.pipe';
import { Observable } from 'rxjs';
import { ComboCho, ChoferOcupacion, ChoferPK, CONSTANTES_CHOFER } from 'src/app/models/model.index';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-chofer-combo-ocupacion',
  templateUrl: './chofer-combo-ocupacion.component.html',
  styleUrls: ['./chofer-combo-ocupacion.component.css']
})
export class ChoferComboOcupacionComponent implements OnInit, OnChanges {
 
  @Input() fechaInicio:Date;
  @Input() fechaFin:Date;
  @Input() empresa:string;
  @Input() codigo:number;
  @Input() servicioPK;   
  @Output() onSeleccionarChofer: EventEmitter<ChoferOcupacion> = new EventEmitter();
  @Output() onRemoveChofer:EventEmitter<void> = new EventEmitter();
  @Output() onDetalleChofer:EventEmitter<void> = new EventEmitter();


  choferSeleccionado:ChoferOcupacion;
  SIN_PERSONAL= CONSTANTES_CHOFER.CHOFER_SIN_PERSONAL_STR;
  filteredChoferes: Observable<ComboCho[]>;
  choferSeleccionadoControl = new FormControl();
  choOcupCombo=[];
  verCombo=false;

  constructor( public _vs: VueltasService,
               private pipeChofer: ChoferesConEstadoPipe ) { }

  private escucharChoferes(){
    this.filteredChoferes =  this.choferSeleccionadoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterChoferes(value))
    );     
  }

  private _filterChoferes(value: string): ComboCho[]{   
    const filterValue = value.toLowerCase();
    return this.choOcupCombo.filter( ( option:any ) => option.nombreConTipo.toLowerCase().includes(filterValue));
  }  

  ngOnInit() {

      this.choferSeleccionadoControl.setValue('');           

      this.choOcupCombo = this.pipeChofer.transform( this._vs.choferesOcupacion,
                                                        this.fechaInicio,
                                                        this.fechaFin );
      this.escucharChoferes();       
      
      const choferPK:ChoferPK = { cho_emp_codigo: this.empresa,cho_codigo: this.codigo };  
      this.choferSeleccionado = this._vs.getChoferByChoferPK( choferPK );

  }

  ngOnChanges(): void {        
    this.choferSeleccionado = this._vs.getChoferByChoferPK( { cho_emp_codigo: this.empresa,
                                                              cho_codigo: this.codigo, });
  }

  seleccionarChofer( choferSelNombre:any ){    
    this.choferSeleccionado = this._vs.getChoferByNombreConTipo( choferSelNombre );           
    this.onSeleccionarChofer.emit( this.choferSeleccionado );    
    this.choferSeleccionadoControl.setValue('');  
    this.verCombo=false;
  }

  removeChofer(){
    this.onRemoveChofer.emit();
  }

  detOcupChofer(){
    this.onDetalleChofer.emit();
  }
 

}
