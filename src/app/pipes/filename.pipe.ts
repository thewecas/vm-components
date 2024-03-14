import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename',
  standalone: true,
})
export class FileNamePipe implements PipeTransform {
  transform(file: string, content: 'name' | 'ext' | 'full'): string {
    if (!file) return '';
    const extIndex = file.lastIndexOf('.');

    const filename = file.substring(0, extIndex);
    const fileExt = file.substring(extIndex + 1);

    if (content === 'name') return filename;
    else if (content === 'ext')
      return fileExt.length > 4 ? fileExt.substring(0, 3) : fileExt;
    else return filename;
  }
}
