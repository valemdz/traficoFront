export class Grupo{   
    
    constructor( public id: number,
        public groupName: string,
        public empresa?: string,
        public created?: Date,
        public modified?: Date,        
        public roles?: Rol[] ){}

}

export interface Rol{
    id:	number;
    authority: string;
}

export interface Modulo{
    modulo: string;
    permisos: Permiso[];
}

export interface Permiso{
    authority: string;
    descripcionPermiso: string;
    granted?: boolean;
}