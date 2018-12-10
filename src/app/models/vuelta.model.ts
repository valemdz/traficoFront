import { ServicioPK } from "./servicioPK.model";

export interface Vuelta{
    empresa:string;
    id:number;
    peliIda:string;    
    peliVta:string;
    servicio: {
        serEsrCodigo: number;
        servicioPK: ServicioPK;    
    };
    servicioRet: {
        serEsrCodigo: number;
        servicioPK: ServicioPK;    
    };
    videoIda: string;
    videoVta: string;
}
