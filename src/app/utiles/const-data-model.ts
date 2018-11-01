export class Constantes {
    public static ROWS_BY_PAGE = 2;
    static readonly DATE_FMT = 'dd/MMM/yyyy';
    static readonly DATE_TIME_FMT = `${Constantes.DATE_FMT} hh:mm:ss`;
}

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


