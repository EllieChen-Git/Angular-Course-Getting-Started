// 3) Import Pipe decorator
import { Pipe, PipeTransform } from '@angular/core';

// 2) Decorate pipe with a pipe decorator
@Pipe({
  name: 'convertToSpaces', // 4) Define the name of the pipe used in template
})

// 1) Export class
export class ConvertToSpacesPipe implements PipeTransform {
  // 5) Implements 'PipeTransform' interface
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
  // 6) 'transform' method is the only required method on 'PipeTransform'
  // 1st arg: the string to be transformed
  // 2st arg: the character we'd like to transform to spaces
  // Return type of 'transform' is 'string'
}
