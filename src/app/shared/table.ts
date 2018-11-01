import {PaginationPage, PaginationPropertySort} from './pagination';

import * as Rx from "rxjs/Rx";
import { Observable } from 'rxjs';


export interface Table<T> {

    fetchPage(pageNumber: number, pageSize: number, sort: PaginationPropertySort);

}
