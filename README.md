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

#### Components

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
  templateUrl: './product-list.component.html',
  // Linked template (view's HTML): relative path
  styleUrls: ['./product-list.component.css'],
  //styleUrl's': an array with relative path
})

// Class: Pascal Casing & append 'Component' to the name
export class AppComponent {
  // Data in Property: propertyName(camelCAase): dataType = "defaultValue"
  pageTitle: string = 'Page Title';

  // Methods: Define our logic here
}
```

---

#### Template

- Inline template (template): Strings in quotes/backticks
- Linked template (templateUrl): Relative path of the file.

```typescript
// Inline template: any valid HTML within backticks
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

4. src\app\products\product-list.component.ts

```typescript
// listFilter: string = 'cart';

  // Change our listFilter property into a 'getter/setter'
  _listFilter: string; // Backing field to store value
  get listFilter(): string {
    // Getter: no parameter, return sth
    // When data-binding needs the value, it'll call 'gettter' and get teh value
    return this._listFilter;
  }
  set listFilter(value: string) {
    // Setter: 1 parameter, doesn't return
    // Every time users change the value, the data-binding calls the 'setter', passing in the changed value.
    this._listFilter = value;
    this.filteredProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
    // if filer string is empty, null, undefined, then we return all the products
  }

  filteredProducts: IProduct[]; // We don't mutate the original products array

   // Methods

  constructor() {
    this.filteredProducts = this.products;
    this.listFilter = 'cart';
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase(); // for case-insensitive comparison
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
      // indexOf() returns '-1' if the given element is not present.
    );
  }
```

5. src\app\products\product-list.component.html

```typescript
  <tr *ngFor="let product of filteredProducts">
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

#### Custom Pipes

1. Write custom pipes: src\app\shared\convert-to-spaces.pipe.ts

```typescript
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
```

2. Use pipes in template: src\app\products\product-list.component.html

```typescript
<td>
  {{ product.productCode | lowercase | convertToSpaces: '-' }}
</td>
```

3. Don't forget to import Pipes in the parent module: src\app\app.module.ts

```typescript
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';

@NgModule({
  declarations: [AppComponent, ProductListComponent, ConvertToSpacesPipe], // Declaration: so Angular can locate it
})
export class AppModule {}
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

#### Lifecycle Hooks

- OnInit: Perform component initialisation. Good place to retrieve data from back end service
- OnChanges: Perform actions after change to input properties
- OnDestroy: Perform cleanup before Angular destroys the component

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

---

#### Getter and Setter

Getter: Defines a read-only property

- Getters cannot have parameters and must have a return type
- it's accessed as a property (no parentheses)
- provide a property whose value can be dynamically computed
- expose the value to an internal variable

Setter: Defines a write-only property

- Setters must have one and only type parameter and no return type
- it's accessed as a property (no parentheses)
- execute code every time a property is modified

```typescript
// define a backing field (prefixed with _) to retain the set value
private _listFilter: string;

get listFilter(): string {
 return this._listFilter
}

set listFilter(value: string) {
 this._listFilter = value
}

// Define the getter & setter as the same name, so we can read and write on the 'listFilter' property

```

---

#### Nested Components

1. Create the nested component

- src\app\shared\star.component.ts
- src\app\shared\star.component.css
- src\app\shared\star.component.html

2. Use the nested component as a directive in the container component's template

- src\app\products\product-list.component.html

```html
<!-- <td>{{ product.starRating }}</td> -->
<td>
  <pm-star></pm-star>
</td>
```

3. Declare nested component in the container component's parent module

- src\app\app.module.ts

```typescript
import { StarComponent } from './shared/star.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
  ]
})
```

#### Passing data to nested component (@Input())

- src\app\shared\star.component.ts

```typescript
import { Component, OnChanges, Input } from '@angular/core';

export class StarComponent implements OnChanges {
  @Input() rating: number; // @Input(): In order to expose its 'rating' property to it's container component
  starWidth: number;

  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5;
  }
}
```

- src\app\products\product-list.component.html

```html
<!-- <td>{{ product.starRating }}</td> -->
<td><pm-star [rating]="product.starRating"></pm-star></td>
```

#### Passing data from a Component - @Raising an Event (@Output())

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
