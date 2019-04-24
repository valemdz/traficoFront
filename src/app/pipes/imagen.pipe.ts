import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  urlBase =  environment.originSinApi + '/img';

  transform(img: string, tipo: string= 'choferes' ): any {

    let url =  this.urlBase;

    if ( !img || img.length === 0) {
      return url + 'choferes/XXX';
    }

    if ( img.indexOf('https') >= 0 ) {
        return img;
    }

    switch ( tipo ) {
      case 'choferes':
         url += '/choferes/' + img;
      break;     
      default:
      console.log('Los tipos correctos son choferes');
    }

    return url;

  }

}
