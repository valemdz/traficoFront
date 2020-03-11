import { Component, OnInit, Inject } from '@angular/core';
import { PermisoService } from 'src/app/services/service.index';
import { Permiso } from 'src/app/models/model.index';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  } 

  revokeGrant( permiso: Permiso ){    
    this._ps.revokeGrant$( this.data.idGrupo, permiso.authority )
      .subscribe( ( resp:boolean) => permiso.granted = resp );
  }

}
