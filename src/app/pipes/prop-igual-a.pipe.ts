import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propIgualA'
})
export class PropIgualAPipe implements PipeTransform {

  transform( values: any, args:any[] ): any {    
    const prop = args[0];
    const valuerProp = args[1];
    const newValues = values.filter( v => v[prop] === valuerProp );
    return newValues;
  }

}
