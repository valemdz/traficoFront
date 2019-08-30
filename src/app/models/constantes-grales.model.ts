export class ConstantesGrales {

    public static PAGES_IN_PAGINATION = 10;

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

    public static readonly CON_SERVICIOS_BOTON = 'btn-danger';
    public static readonly CON_INCIDENCIAS_BOTON = 'btn-warning';
    public static readonly CON_VIAJES_BOTON = 'btn-danger';
    public static readonly LIBRE_BOTON = 'btn-success';
    public static readonly SIN_CHOFER_UNIDADES_BOTON = 'btn-default';

    public static readonly CON_SERVICIOS = 1;
    public static readonly CON_INCIDENCIAS = 2;
    public static readonly CON_VIAJES = 3;
    public static readonly LIBRE = 4;
  
    public static readonly CON_SERVICIOS_STR = 'alert alert-danger';
    public static readonly CON_INCIDENCIAS_STR = 'alert alert-warning';
    public static readonly CON_VIAJES_STR = 'alert alert-danger';
    public static readonly LIBRE_STR = 'alert alert-success';  


    /////

    public static readonly LABEL_DANGER  = 'label-danger';
    public static readonly LABEL_WARNING = 'label-warning';
    public static readonly LABEL_OK = 'label-primary';

    /*public static  COLORES_VENCIMIENTOS = [];
    COLORES_VENCIMIENTOS['DANGER'] = ConstantesGrales.LABEL_DANGER;
    COLORES_VENCIMIENTOS['WARNING'] = ConstantesGrales.LABEL_WARNING; 
    COLORES_VENCIMIENTOS['OK'] = ConstantesGrales.LABEL_OK;*/

    public static readonly COLORES_VENCIMIENTOS = { 'DANGER': ConstantesGrales.LABEL_DANGER,
                                            'WARNING': ConstantesGrales.LABEL_WARNING,
                                            'OK': ConstantesGrales.LABEL_OK };
    

}





