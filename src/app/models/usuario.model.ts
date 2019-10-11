import { Grupo } from "./model.index";


export interface UsuarioPk{
    empresa: string;
    legajo:number;
}

export interface Usuario{
    usuarioPk?: UsuarioPk;
    empresa?: string;
    agencia?: Agencia;
    nombre?:	string;
    username: string;
    password?: string;
    authorities?: Authority[];    
    personal?:Personal
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
    agencia: Agencia;
    estado: boolean;
    email:string;
    group: Grupo;	
}


export interface Agencia{
    agenciaPK:AgenciaPK;
    nombre: string;
    estado: number;
    estadoVta: number
}

export interface AgenciaPK{
    empresa:string;
    codigo:number
}

export interface Personal{
    personalPK:PersonalPK;
    estado: number;
    nombre:string;
    documento: string;
    email?: string;
    soloAgPropias: string;
}

export interface PersonalPK{
    empresa: string;
    legajo: number;
}

export interface  ResetPassword{
    empresa:string;
    legajo:number;    
    emailRecuperacion:string;
}