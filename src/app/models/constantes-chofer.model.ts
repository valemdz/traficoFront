
export class CONSTANTES_CHOFER {

 

  public static readonly CHOFER = 0;
  public static readonly AUXILIAR = 1;


  public static readonly PRIMER_CHOFER = 1;
  public static readonly SEGUNDO_CHOFER = 2;
  public static readonly PRIMER_AUX = 3;
  public static readonly SEGUNDO_AUX = 4;

  public static readonly CHOFER_SIN_PERSONAL_STR = 'Sin Personal';
    static ESTADOS_BOOLEANOS: any;

  public static getTipoChoferStr( tipoChofer ): string {
    if ( tipoChofer === CONSTANTES_CHOFER.CHOFER ) {
       return 'CHO';
    }
    return 'AUX';
  }

  public static readonly CARNET_NATIONAL=1; 
  public static readonly CARNET_NATIONAL_STR='NAC CNRT'; 
  public static readonly CARNET_PROVINCIAL=2; 
  public static readonly CARNET_PROVINCIAL_STR='PROV'; 

  public static readonly ESTADOS_CARNETS = [
    { codigo: CONSTANTES_CHOFER.CARNET_NATIONAL, descripcion: CONSTANTES_CHOFER.CARNET_NATIONAL_STR  },
    { codigo: CONSTANTES_CHOFER.CARNET_PROVINCIAL, descripcion: CONSTANTES_CHOFER.CARNET_PROVINCIAL_STR },
  ];   

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








