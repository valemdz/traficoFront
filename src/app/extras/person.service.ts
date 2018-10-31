import {Injectable} from '@angular/core';
import {Person} from './../domain';
import {PaginationPage, PaginationPropertySort} from './../shared/pagination';
import { Response} from '@angular/http';
import * as Rx from "rxjs/Rx";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import { HttpClient } from '@angular/common/http';
import { FuncionesGrales } from '../utiles/funciones.grales';
import { Observable } from 'rxjs';


@Injectable()
export class PersonService {

    constructor( private http: HttpClient  ) {

    }

    findPersons(page: number, pageSize: number, sort: PaginationPropertySort): Observable<any> {
      const params = FuncionesGrales.toParams( page, pageSize, sort );

        return this.http.get(`/person`, params );
    }

    getPerson(id: number): Observable<any> {
        return this.http.get(`/person/${id}`);
    }

    deletePerson(id: number): Observable<any> {
        return this.http.delete(`/person/${id}`);
    }

}
