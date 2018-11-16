export class Constantes {
    public static ROWS_BY_PAGE = 10;
    static readonly DATE_FMT = 'dd/MMM/yyyy';
    static readonly DATE_TIME_FMT = `${Constantes.DATE_FMT} hh:mm:ss`;
}

export const FECHA_PATTERN = 'yyyy-MM-dd';
export const FECHA_PATTERN_MOMENT = 'YYYY-MM-DD';
export const FECHA_HORA_MOSTRAR_PATTERN = 'dd/MM/yyyy HH:mm';
export const CANTIDAD_DIAS_DIAGR_DEFAULT = 3;


/*

type MyType = {
    id: number;
    name: string;
}

type MyGroupType = {
    [key:string]: MyType;
}

var obj: MyGroupType = {
    "0": { "id": 0, "name": "Available" },
    "1": { "id": 1, "name": "Ready" },
    "2": { "id": 2, "name": "Started" }
};
// or if you make it an array
var arr: MyType[] = [
    { "id": 0, "name": "Available" },
    { "id": 1, "name": "Ready" },
    { "id": 2, "name": "Started" }
];


*/


