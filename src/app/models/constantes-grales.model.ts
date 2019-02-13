export class ConstantesGrales {

    public static ROWS_BY_PAGE = 5;
    public static readonly DATE_FMT = 'dd/MMM/yyyy';
    public static readonly DATE_TIME_FMT = `${ConstantesGrales.DATE_FMT} hh:mm:ss`;

    public static readonly FECHA_PATTERN = 'yyyy-MM-dd';
    public static readonly FECHA_PATTERN_MOMENT = 'YYYY-MM-DD';
    public static readonly FECHA_HORA_MOSTRAR_PATTERN = 'dd/MM/yyyy HH:mm';  
    public static readonly TIPOS_INCIDENCIA = [ { codigo:0, descripcion:'Unidades'},
                                                { codigo:1, descripcion: 'Personal'} ];  


    public static readonly HABILITADO = 1;
    public static readonly HABILITADO_STR = 'HABILITADO';
    public static readonly DESHABILITADO = 0;
    public static readonly DESHABILITADO_STR = 'DESHABILITADO';
    
    public static readonly ESTADOS = [
        { codigo: ConstantesGrales.HABILITADO, descripcion: ConstantesGrales.HABILITADO_STR  },
        { codigo: ConstantesGrales.DESHABILITADO, descripcion: ConstantesGrales.DESHABILITADO_STR },
    ]; 
    
    
    public static readonly HABILITADO_BOOLEAN = true;
    public static readonly DESHABILITADO_BOOLEAN = false;
    
}





