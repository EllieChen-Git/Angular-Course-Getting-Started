# Angular Course: Angular: Getting Started

---

FM (Lukas R - Angular 7)

- Course: https://frontendmasters.com/courses/angular-core/
- Repo: https://github.com/onehungrymind/angular-core-workshop

- (+) the sample app is a CRUD resources
- (-) jump right to angular CLI

PS (Deborah - Angular 8)

- Course: https://app.pluralsight.com/library/courses/angular-2-getting-started-update/
- Repo: https://github.com/DeborahK/Angular-GettingStarted

- (+) start from basic concepts 　& understanding of angular
- (+) beginner friendly: teaches you every single step of writing a code
- (-) the sample app is not a CRUD resources

---

- **Author: Deborah Kurata**
- **Course: [Angular: Getting Started](https://app.pluralsight.com/library/courses/angular-2-getting-started-update/table-of-contents) on Pluralsight**
- **Written Material**:
- **Topics covered**:
- **Set up**:
  - 1. npm i bootstrap font-awesome (install packages doesn't provide access to their stylesheet)
  - 2. Import the stylesheets in src\styles.css

```typescript
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
```

<!-- ![{screenshot}](./docs/{screenshot}.JPG) -->

---

#### Why Angular

- expressive HTML
- powerful databinding
- modular by design
- built in backend integration

#### Intro to Angular

- Services: provide functionalities across different components

- Components

  - **Import statement**
  - **Export class**
    - **Properties**: a property defined a data element that associated with the class,
    - **Methods**
  - **Metadata**
    - **Decorator**: a function that adds metadata to a class, its members or its method arguments (prefixed with @). a function that passes an object argument
    - **Directive**: a custom html tag
    - **Template**: view

src\app\app.component.ts

```typescript
// Import
import { Component } from '@angular/core';

// Metadata
@Component({
  // Decorator: @Component({ })
  selector: 'pm-root',
  // Use 'selector' property the name of the component when used as a directive in HTML
  // Directive: custom html tags ('pm-root')
  template: `<div>
    <h1>Project Management</h1>
  </div>`,
}) // Template (view's HTML): any valid HTML within backticks

// Class: Pascal Casing & append 'Component' to the name
export class AppComponent {
  pageTitle: string = 'Page Title';
  // Data in Property: propertyName(camelCAase): dataType = "defaultValue"

  // Methods: Define our logic here
}
```

---

#### Template

- Inline template: strings (quotes/backticks)
- Linked template: templateUrl

```typescript
// Inline template
 template: `<div>
    <h1>Project Managment</h1>
    <p>1st component</p>
  </div>`,

// Linked template
  templateUrl: './product-list.component.html', // relative path
```

#### Use Components as Directives

1. Create 'Component 2 Template': src\app\products\product-list.component.html
2. Create 'Component 2 TS': src\app\products\product-list.component.ts (selector: 'pm-producs')
3. On 'Component 1 TS' & add 'Component 2 Selector' as a directive to 'Component 1 template'

src\app\app.component.ts

```typescript
@Component({
  template: `<div>
    <h1>Project Managment</h1>
    <pm-products></pm-products>  //Added here
  </div>`
})
```

4. Declare 'Component 2' on 'Component 1 Module' (remember to also import it on the top)

```typescript
import { ProductListComponent } from './products/product-list.component';

@NgModule({
  declarations: [AppComponent, ProductListComponent]
})
```

```typescript
```

```typescript
```

```typescript
```

```typescript
```

```typescript
```

```typescript
```

```typescript
```

```typescript
```

©2020 Ellie Chen - All Rights Reserved.
