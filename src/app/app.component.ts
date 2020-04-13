// Import
import { Component } from '@angular/core';

// Metadata
@Component({
  // Decorator: @Component({ })
  selector: 'pm-root', // Directive: custom html tags ('pm-root')
  template: `<div>
    <h1>{{ pageTitle }}</h1>
    <pm-products></pm-products>
  </div>`,
})

// Class
export class AppComponent {
  pageTitle: string = 'Project Managment';
  // Proprety: propertyName(camelCAase): dataType = "defaultValue"
}
