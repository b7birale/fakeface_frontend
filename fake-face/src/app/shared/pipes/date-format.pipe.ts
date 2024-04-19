import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let timezoneoffset = (new Date(value)).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(Date.now() - timezoneoffset)).toISOString().replace('Z','').replace('T', ' ');
    return localISOTime;
    //new Date().toISOString() //2022-03-01T10:00:00.000Z
    //return null;
  }

}
