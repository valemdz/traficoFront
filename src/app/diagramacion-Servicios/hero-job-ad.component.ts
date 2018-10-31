import { Component, Input } from '@angular/core';

import { ComponenteBaseComponent }      from '../shared/componente.base.component';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4> 
      
      {{data.body}}
    </div>
  `
})
export class HeroJobAdComponent implements ComponenteBaseComponent {
  @Input() data: any;
  @Input()ref:any;
}



/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/