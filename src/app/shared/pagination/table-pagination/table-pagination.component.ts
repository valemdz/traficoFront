import {Component, OnInit, OnChanges, Input} from '@angular/core';
import {PaginationPage, PaginationPropertySort} from '../pagination';
import {Table} from '../table';
import {showLoading, hideLoading, doNothing} from "../commons"
import * as Rx from "rxjs/Rx";
import { Observable } from 'rxjs';
import { PaginationService } from 'src/app/services/service.index';
import { ConstantesGrales } from 'src/app/models/model.index';


@Component({
    selector: 'app-table-pagination',
    templateUrl: './table-pagination.component.html',
    styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit, OnChanges {

    @Input() table: Table<any>;
    @Input() page: PaginationPage<any>;

    pagesIndexes: Array<number> = [];

    constructor( private paginationService: PaginationService ){}

    ngOnInit() {

    }

    /*ngOnChanges(changes) {
        if (changes['page']) {
            let pagesIndexes_: Array<number> = [];
            for (let i = 0; i < this.page.totalPages; i++) {
                pagesIndexes_.push(i + 1);
            }
            this.pagesIndexes = pagesIndexes_;
        }
    }*/

    ngOnChanges(changes) {
        if (changes['page']) {

            //desmarcamos alguna seleccion

            this.page.rowSelected = -1;

            ///Se ven 10 paginas en la paginacion////            
            let inicio = 1;
            let fin = 10;
            if( this.page.number + 1 > 6  ){
                inicio =  this.page.number + 1 - 5;
                fin =  this.page.number + 1 + 4
            }
            if( fin > this.page.totalPages ){
                fin = this.page.totalPages;
            }
            let pagesIndexes_: Array<number> = [];
            for (let i = inicio; i <= fin; i++) {
                pagesIndexes_.push(i);
            }
            this.pagesIndexes = pagesIndexes_;
        }
    }

    fetchPageNumber(pageNumer: number) {       

        if( this.page.first && (pageNumer - 1) == 0){
            return;
        }

        if( this.page.last && pageNumer == this.page.totalPages ){
            return;
        }

        let observable: Observable<any> = this.table.fetchPage(pageNumer-1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchPageSize(pageSize: number) {
        let observable: Observable<any> = this.table.fetchPage(this.page.number, pageSize, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    fetchNextPage() {
        if (this.page.number + 1 >= this.page.totalPages) {
            return;
        }

        let observable: Observable<any> = this.table.fetchPage(this.page.number + 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }


    fetchPreviousPage() {
        if (this.page.number == 0) {
            return;
        }

        let observable: Observable<any> = this.table.fetchPage(this.page.number - 1, this.page.size, this.getSort());
        if (observable != null) {
            showLoading();
            observable.subscribe(doNothing,hideLoading,hideLoading);
        }
    }

    private getSort(): PaginationPropertySort {
        if ( this.paginationService != null ) {            
            return this.paginationService.sort;
        } else {
            return null;
        }
    }
}
