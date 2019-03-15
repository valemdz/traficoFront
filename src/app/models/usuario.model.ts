import { Grupo } from "./model.index";


export interface UsuarioPk{
    empresa: string;
    legajo:number;
}

export interface Usuario{
    empresa?: string;
    agencia?: number;
    nombre?:	string;
    username: string;
    password?: string;
    authorities?: Authority[];    
}

export interface Authority{
    authority:string;
}

export interface LoginResponse{
    usuario: Usuario;
    token: string;
    mensaje?: string;
}

export interface UsuarioWithGrupo{
    usuarioPk: UsuarioPk;
    empresa: string;
    legajo:	number;
    username: string;    
    nombre:	string;
    agencia: number;
    estado: boolean;
    email:string;
    group: Grupo;	
}


