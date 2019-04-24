import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VueltasService } from 'src/app/services/service.index';
import { FormControl } from '@angular/forms';
import { CONSTANTES_CHOFER, VehiculoPK, VehiCombo, CONSTANTES_VEHICULOS } from 'src/app/models/model.index';
import { VehiculosConColoresPipe } from 'src/app/pipes/vehiculos-con-colores.pipe';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculo-combo-ocupacion',
  templateUrl: './vehiculo-combo-ocupacion.component.html',
  styleUrls: ['./vehiculo-combo-ocupacion.component.css']
})
export class VehiculoComboOcupacionComponent implements OnInit {

  @Input() fechaInicio:Date;
  @Input() fechaFin:Date;
  @Input() empresa:string;
  @Input() codigo:number;
  @Input() servicioPK;   
  @Output() onSeleccionarVehiculo: EventEmitter<any> = new EventEmitter();
  @Output() onRemoveVehiculo:EventEmitter<void> = new EventEmitter();
  @Output() onDetalleVehiculo:EventEmitter<void> = new EventEmitter();


  //choferSeleccionado:ChoferOcupacion;
  vehiculoSeleccionado:any;
  SIN_UNIDAD= CONSTANTES_VEHICULOS.SIN_UNIDAD;
  filteredVehiculos: Observable<VehiCombo[]>;
  vehiculoSeleccionadoControl = new FormControl();
  choOcupCombo=[];
  verCombo=false;

  constructor( public _vs: VueltasService,
               private pipeVehiculo: VehiculosConColoresPipe ) { }

  private escucharVehiculos(){
    this.filteredVehiculos =  this.vehiculoSeleccionadoControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterVehiculos(value.toString()))
    );     
  }

  private _filterVehiculos(value: string): VehiCombo[]{   
    const filterValue = value.toLowerCase();
    return this.choOcupCombo.filter( ( option:any ) => option.interno.toString().includes(filterValue));
  }  

  ngOnInit() {      

      this.vehiculoSeleccionadoControl.setValue('');           

      this.choOcupCombo = this.pipeVehiculo.transform( this._vs.vehiOcupacion,
                                                        this.fechaInicio,
                                                        this.fechaFin );
      
      this.escucharVehiculos();       
      
      const vehiculoPk: VehiculoPK = { vehEmpCodigo: this.empresa, vehInterno: this.codigo } 
      this.vehiculoSeleccionado = this._vs.findVehiculosByVehiculoPK( vehiculoPk );
  }

  ngOnChanges(): void {        
    this.vehiculoSeleccionado = this._vs.findVehiculosByVehiculoPK( { vehEmpCodigo: this.empresa, 
                                                                      vehInterno: this.codigo });
  }

  seleccionarVehiculo( numeroInterno:any ){    

    const vehiculoPK: VehiculoPK = { vehEmpCodigo: this.empresa, 
                         vehInterno: numeroInterno };     

    this.vehiculoSeleccionado = this._vs.findVehiculosByVehiculoPK( vehiculoPK );         
    this.onSeleccionarVehiculo.emit( this.vehiculoSeleccionado );    
    this.vehiculoSeleccionadoControl.setValue('');  
    this.verCombo=false;
  }

  removeVehiculo(){
    this.onRemoveVehiculo.emit();
  }

  detOcupVehiculo(){
    this.onDetalleVehiculo.emit();
  }
  

}
