import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {PaginationPage, PaginationPropertySort} from '../pagination'
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from "../commons"
import * as Rx from "rxjs/Rx";
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/services/service.index';


@Component({
    selector: 'app-table-sort',
    templateUrl: './table-sort.component.html',
    styleUrls: ['./table-sort.component.css']
})
export class TableSortComponent implements OnInit, OnChanges {

    @Input() label: string;
    @Input() property: string;
    @Input() table: Table<any>;
    @Input() page: PaginationPage<any>;

    sortDirection: string;
    sortClass: boolean = true;
    sortAscClass: boolean = false;
    sortDescClass: boolean = false;

    constructor( private paginationService: PaginationService ){      
        paginationService.limpiarSort();
    }

    ngOnInit() {

    }

    ngOnChanges( changes ) {
      
        if (changes['page']) {

            let defineValues = (s, sa, sd, dir) => {
                this.sortClass = s;
                this.sortAscClass = sa;
                this.sortDescClass = sd;
                this.sortDirection = dir;
            };           

            if ( this.page.sort == null  || !this.page.sort.sorted  ) {
                defineValues(true, false, false, 'ASC');
                return;
            } else {
            
                if( this.paginationService.sort != null
                        && this.paginationService.sort.property === this.property  ) {

                    if ( this.sortDirection === 'ASC') {
                        defineValues(false, true, false, 'DESC');
                    } else {
                        defineValues(false, false, true, 'ASC');
                    }        

                }else{
                    defineValues(true, false, false, 'ASC');
                    return;
                }                
            }     
        }        
    }

    sortByProperty() {

        let sort: PaginationPropertySort;
        sort = {property: this.property, direction: this.sortDirection};
        this.paginationService.setSort( sort );

        let pageNumber = this.page.number - 1;
        if (pageNumber < 0) {
            pageNumber = 0;
        }

        let observable: Observable<any> = this.table.fetchPage(pageNumber, this.page.size, sort);

        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing, hideLoading, hideLoading);
        }
    }

}
