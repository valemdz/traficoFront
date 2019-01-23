
export class CONSTANTES_CHOFER {

  public static readonly CON_SERVICIOS = 1;
  public static readonly CON_INCIDENCIAS = 2;
  public static readonly CON_VIAJES = 3;
  public static readonly LIBRE = 4;

  public static readonly CON_SERVICIOS_STR = 'alert alert-danger';
  public static readonly CON_INCIDENCIAS_STR = 'alert alert-warning';
  public static readonly CON_VIAJES_STR = 'alert alert-danger';
  public static readonly LIBRE_STR = 'alert alert-success';

  public static readonly CHOFER = 0;
  public static readonly AUXILIAR = 1;

  public static getTipoChoferStr( tipoChofer ): string {
    if ( tipoChofer === CONSTANTES_CHOFER.CHOFER ) {
       return 'CHO';
    }
    return 'AUX';
  }

  public static readonly HABILITADO = 0;
  public static readonly HABILITADO_STR = 'HABILITADO';
  public static readonly DESHABILITADO = 1;
  public static readonly DESHABILITADO_STR = 'DESHABILITADO';

  public static readonly ESTADOS = [
      { codigo: CONSTANTES_CHOFER.HABILITADO, descripcion: CONSTANTES_CHOFER.HABILITADO_STR  },
      { codigo: CONSTANTES_CHOFER.DESHABILITADO, descripcion: CONSTANTES_CHOFER.DESHABILITADO_STR },
  ];    
  
  public static readonly  DOCUMENTOS: any = [
    { codigo: 1, descripcion: 'Dni'},
    { codigo: 2, descripcion: 'Cedula Federal'},
    { codigo: 3, descripcion: 'Cedula Provincial'},
    { codigo: 4, descripcion: 'Pasaporte'},
    { codigo: 5, descripcion: 'Cedula de Extranjeria'},
    { codigo: 6, descripcion: 'Libreta Enrolamiento'},
    { codigo: 7, descripcion: 'Documento Unico'},
    { codigo: 8, descripcion: 'Cedula de Chile'},
    { codigo: 9, descripcion: 'Salvoconducto'},
    { codigo: 10, descripcion: 'Cedula de Identidad'},
    { codigo: 11, descripcion: 'Sin Doc'},
    { codigo: 12, descripcion: 'Libreta Civica'},
    { codigo: 13, descripcion: 'Cedula de Identidad Uruguaya'},
    { codigo: 14, descripcion: 'Carnet de Conducir'}
  ];

  public static readonly FUNCION: any = [
    {codigo: 0, descripcion: 'CONDUCTOR'},
    {codigo: 1, descripcion: 'AUXILIAR'}
  ];
  
  public static readonly GRUPOS_SANGUINEOS = [
    {codigo: 1, descripcion: 'A+'},
    {codigo: 2, descripcion: 'A-'},
    {codigo: 3, descripcion: 'B+'},
    {codigo: 4, descripcion: 'B-'},
    {codigo: 5, descripcion: 'AB+'},
    {codigo: 6, descripcion: 'AB-'},
    {codigo: 7, descripcion: '0+'},
    {codigo: 8, descripcion: '0-'}
  ];

}








