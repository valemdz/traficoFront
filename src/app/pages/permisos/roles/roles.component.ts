import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PermisoService } from 'src/app/services/service.index';
import { Permiso } from 'src/app/models/model.index';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styles: []
})
export class RolesComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<RolesComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public _ps: PermisoService ) { }

  ngOnInit() {   
    console.log( this.data );
  } 

  revokeGrant( permiso: Permiso ){    
    this._ps.revokeGrant$( this.data.idGrupo, permiso.authority )
      .subscribe( ( resp:boolean) => permiso.granted = resp );
  }

}
