
export interface Person {
    id : number;
}

export interface OpcCombo{
    codigo:number;
    descripcion: String;
}

 export interface Error500 {
    timestamp: Date;
    status:number;
    error:String;
    exception:String;
    message: String;
    path: String;
 }


