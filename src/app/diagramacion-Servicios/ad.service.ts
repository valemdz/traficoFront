import { Injectable }           from '@angular/core';

import { HeroJobAdComponent }   from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { ModalConDetalleComponent } from './modal-con-detalle/modal-con-detalle.component';

import { ComponenteItem } from '../shared/componente-item';

@Injectable()
export class AdService {
  getAds() {
    return [
      new ComponenteItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),

      new ComponenteItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),

      new ComponenteItem(HeroJobAdComponent,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new ComponenteItem(HeroJobAdComponent,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }

  getComponenteUno() {
    return [
      new ComponenteItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'})     
    ];
  }

  getComponenteDos() {
    return [
      new ComponenteItem(ModalConDetalleComponent, {descripcion: 'nada', bio: 'por ahora'})     
    ];
  }

}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/