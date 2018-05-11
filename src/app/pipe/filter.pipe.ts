import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: any[], filterField: string): any {

    if (!filterField) {
      // console.log("here");
      // console.log(filterField);
      // console.log(!filterField);
      return list;
    }

    return list.filter(device => {
      // console.log("there");
      // console.log(filterField);
      // console.log(!filterField);

      return device.Device_OS == filterField || device.Device_Status == filterField;
    });
  }

}
