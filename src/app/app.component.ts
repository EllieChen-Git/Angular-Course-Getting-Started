// Import
import { Component } from '@angular/core';

// Metadata
@Component({
  // Decorator: @Component({ })
  selector: 'pm-root', // Directive: custom html tags ('pm-root')
  template: `<div>
    <h1>Project Managment</h1>
    <p>1st component</p>
  </div>`,
})

// Class
export class AppComponent {
  pageTitle: string = 'Page Title';
  // Proprety: propertyName(camelCAase): dataType = "defaultValue"
}
