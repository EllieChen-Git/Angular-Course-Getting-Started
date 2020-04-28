// Import
import { Component } from '@angular/core';

// Metadata
@Component({
  // Decorator: @Component({ })
  selector: 'pm-root', // Directive: custom html tags ('pm-root')
  template: ` <nav class="navbar navbar-expand navbar-light bg-light">
      <a class="navbar-brand">{{ pageTitle }}</a>
      <ul class="nav nav-pills">
        <li>
          <a class="nav-link" [routerLink]="['/welcome']">Home</a>
        </li>
        <li>
          <a class="nav-link" [routerLink]="['/products']">Product List</a>
        </li>
      </ul>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>`,
})

// Class
export class AppComponent {
  pageTitle: string = 'Project Managment';
  // Proprety: propertyName(camelCAase): dataType = "defaultValue"
}
