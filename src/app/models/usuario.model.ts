export interface UsuarioPk{
    empresa: String;
    legajo:number;
}


export interface Usuario{
    username?: string;
    password?: string;
    name?: string;
    empresa?: string;
    token?: string;
}

export interface Me{
    username: string;
}

export interface UserLogueado{
    empresa: string;
    name: string;
    refreshToken: string;
    token: string;
    username:string;
}
