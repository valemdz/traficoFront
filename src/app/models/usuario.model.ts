export interface UsuarioPk{
    empresa: String;
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


/*export interface Me{
    username: string;
}*/

/*export interface Usuario{
    username?: string;
    password?: string;
    name?: string;
    empresa?: string;
    token?: string;
}*/

/*export interface UserLogueado{
    empresa: string;
    name: string;
    refreshToken: string;
    token: string;
    username:string;
}*/
