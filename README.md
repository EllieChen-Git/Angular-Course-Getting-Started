# Angular Course: Angular: Getting Started

---

- **Author: Deborah Kurata**
- **Course: [Angular: Getting Started](https://app.pluralsight.com/library/courses/angular-2-getting-started-update/table-of-contents) on Pluralsight**
- **GitHub Repo**: https://github.com/DeborahK/Angular-GettingStarted
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
- built-in backend integration

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
2. Create 'Component B TS file': src\app\products\product-list.component.ts (selector: 'pm-products')
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

#### Event Binding

<button (click)='toggleImage()'>

<html-tag (target-event)='template-statement()'>

src\app\products\product-list.component.ts

```typescript
export class ProductListComponent {
  // Properties
  showImage: boolean = true;
  // Methods
  toggleImage(): void {
    // return type is void here
    this.showImage = !this.showImage;
  }
}
```

src\app\products\product-list.component.html

```typescript
  <button class="btn btn-primary" (click)="toggleImage()">
    {{ showImage ? 'Hide' : 'Show' }}
    Image
  </button>

  <img
    *ngIf="showImage"
    [src]="product.imageUrl"
    [title]="product.productName"
  />
```

---

#### Two-way Binding (Filter)

**ngModel**

- [ngModel] - square brackets: property-binding from class to input in the template
- (ngModel) - parentheses: event-binding sent user data from template to class property

1. To use ngModel, need to import FormsModule in its parent module.

src\app\app.module.ts

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule], // Imports: external module
})
export class AppModule {}
```

2. src\app\products\product-list.component.ts

```typescript
// Add a class property
listFilter: string = 'cart';
```

3. src\app\products\product-list.component.html

```typescript
<div class="row">
  <div class="col-md-2">Filter by:</div>
  <div class="col-md-4">
    <input type="text" [(ngModel)]="listFilter" />
  </div>
</div>
<div class="row">
  <div class="col-md-6">
    <h4>Filtered by: {{ listFilter }}</h4>
  </div>
</div>
```

---

#### Transforming Data with Pipes

- Modifying data before it is displayed.
- Pipes can be chained.
- Some pipes can be passed with parameters.

```typescript
<td>{{ product.productCode | lowercase }}</td>
<td>{{ product.price | currency: 'USD':'symbol':'1.2-2' }}</td>
```

---

#### Data Types & Interfaces

- Every property has a 'type'.
- Every method has a 'return type'.
- Every method parameter has a 'type'.
- Interfaces: custom types.

```typescript
// interface (lowercase) interfaceName (prefixed with 'I')
export interface IProduct {
  productId: number;
  // propertyName: dataType
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}
```

---

#### Encapsulating Component Style

```typescript
@Component({
  styleUrls: ['./product-list.component.css'],
  //styleUrl's': an array
})
```

---

#### Lifecycle Hooks

```typescript
// 2) Imports 'OnInit' interface at the top
import { Component, OnInit } from '@angular/core';

// 1) Implements 'OnInit' interface
export class ProductListComponent implements OnInit {

// 3) Add 'ngOnInit' method
  ngOnInit(): void {
    console.log('OnInit');
  }
```

```typescript
```

```typescript
```

```typescript
```

©2020 Ellie Chen - All Rights Reserved.

<!-- ```typescript
```

```typescript
```

```typescript
```

```typescript
```

```typescript
``` -->
