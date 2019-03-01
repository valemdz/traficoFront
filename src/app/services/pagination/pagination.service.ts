import { Injectable } from '@angular/core';
import { PaginationPropertySort } from 'src/app/shared/pagination/pagination';

@Injectable()
export class PaginationService {

  sort: PaginationPropertySort = null ;
  constructor() { }

  limpiarSort(){    
    this.sort = null;
  }

  setSort( sort: PaginationPropertySort ){    
    this.sort = sort;
  }

}
