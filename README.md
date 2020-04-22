# Angular Course: Angular: Getting Started

---

- **Author: Deborah Kurata**
- **Course: [Angular: Getting Started](https://app.pluralsight.com/library/courses/angular-2-getting-started-update/table-of-contents) on Pluralsight**
- **Written Material**:
- **Topics covered**:
- **Set up**:
  1. npm i bootstrap font-awesome (install packages doesn't provide access to their stylesheet)
  2. Import the stylesheets in src\styles.css

```typescript
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~font-awesome/css/font-awesome.min.css';
```

<!-- ![{screenshot}](./docs/{screenshot}.JPG) -->

---

#### Why Angular

- expressive HTML
- powerful data-binding
- modular by design
- built in backend integration

---

#### Intro to Angular

- **Services**: provide functionalities across different components

- **Components**

  - **Import statement**
  - **Export class**
    - **Properties**: a property defined a data element that associated with the class.
    - **Methods**
  - **Metadata**
    - **Decorator**: A function that adds metadata to a class, its members or its method arguments (prefixed with @). A function that passes an object argument
    - **Directive**: A custom html tag.
    - **Template**: View.

src\app\app.component.ts

```typescript
// Import
import { Component } from '@angular/core';

// Metadata
@Component({
  // Decorator: @Component({ })
  selector: 'pm-root',
  // Use 'selector' property as the name of the component when used as a directive in HTML
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

- Inline template (template): Strings in quotes/backticks
- Linked template (templateUrl): Relative path of the file.

```typescript
// Inline template
 template: `<div>
    <h1>Project Managment</h1>
    <p>1st component</p>
  </div>`,

// Linked template
  templateUrl: './product-list.component.html', // relative path
```

---

#### Use Components as Directives

1. Create 'Component B Template file': src\app\products\product-list.component.html
2. Create 'Component B TS file': src\app\products\product-list.component.ts (selector: 'pm-producs')
3. On 'Component A TS file' & add 'Component B Selector' as a directive to 'Component 1 template'

src\app\app.component.ts

```typescript
@Component({
  template: `<div>
    <h1>Project Managment</h1>
    <pm-products></pm-products>
  </div>`
  //Added '<pm-products>' here
})
```

4. Declare 'Component B' on 'Component A Module - declarations' (remember to also import it on the top)

```typescript
import { ProductListComponent } from './products/product-list.component';

@NgModule({
  declarations: [AppComponent, ProductListComponent]
})
```

---

#### Angular Built-in Directives

Structural Directives (starts with asterisk \*)

- **\*ngIf (If logic): \*ngIf = 'expression'**

  - If 'expression' is false, then the element & its children are removed from the DOM.
  - If 'expression' is true, then a copy of the element & its children is re-inserted to the DOM

- **\*ngFor (For loops): repeat a portion of the DOM tree**

---

#### Property Binding

- Property binding allows us to set a property of an element to the value of a template expression

<img [src]='product.imageUrl'>
[element property/binding target]='template expression/binding source'

```typescript
  <img
          [src]="product.imageUrl"
          [title]="product.productName"
          [style.width.px]="imageWidth"
          [style.margin.px]="imageMargin"
        />
```

---

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
