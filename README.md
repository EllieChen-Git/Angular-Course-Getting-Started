# Angular Course: Angular-Getting-Started

---

- **Author: Deborah Kurata**

- **Course: Pluralsight - [Angular: Getting Started](https://app.pluralsight.com/library/courses/angular-2-getting-started-update/table-of-contents)**
- **GitHub Repo**: https://github.com/DeborahK/Angular-GettingStarted

![{screenshot}](./docs/app-screenshot.PNG)

- **Ellie's Review**: This course starts from very basic Angular concepts and the pace is quite slow, but that's the reasons why I like it. Deborah explains things in such a simple way and in details (it helps me to build the understanding of the Angular architecture). Highly recommended for everyone who just started Angular! I learned and used Angular for one month in my internship and this course just help me to build the mental model of Angular.

- **Set up**:
  1. npm i bootstrap font-awesome (install packages doesn't provide access to their stylesheet)
  2. Import the stylesheets in src\styles.css
  ```typescript
  @import '~bootstrap/dist/css/bootstrap.min.css';
  @import '~font-awesome/css/font-awesome.min.css';
  ```

---

#### Why Angular

- expressive HTML
- powerful data-binding
- modular by design
- built-in backend integration

---

#### Components

- Component: is a view defined with a template, logic defined with the class, and meta data defined with a decorator.

- **Import statement**
- **Export class**
  - **Properties**: a property defined a data element that associated with the class.
  - **Methods**
- **Metadata**
  - **Decorator**: A function (prefixed with @ and passes an 'object' argument) that adds metadata to a class, its members or its method arguments.
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
    <h1>Project Management</h1>
    <p>1st component</p>
  </div>`,

// Linked template
  templateUrl: './product-list.component.html', // relative path
```

---

#### Use Components as Directives

1. Create 'Component B Template file': product-list.component.html
2. Create 'Component B TS file': product-list.component.ts (selector: 'pm-products')
3. On 'Component A TS file' & add 'Component B Selector' as a directive to 'Component 1 template'

src\app\app.component.ts

```typescript
@Component({
  template: `<div>
    <h1>Project Management</h1>
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

Structural Directives (prefixed with asterisk \*)

- **\*ngIf (If logic): \*ngIf = 'expression'**

  - If 'expression' is false, then the element & its children are removed from the DOM.
  - If 'expression' is true, then a copy of the element & its children is re-inserted to the DOM

- **\*ngFor (For loops): repeat a portion of the DOM tree**

![{for-in-for-of}](./docs/for-in-vs-for-of.png)

---

#### Data Binding

1. **Interpolation**: Any time we want to display a component class property value in the view
2. **Property binding**: when we want to control the DOM by setting a DOM element property in code
3. **Event binding**: when we want to respond to user actions
4. **Two-way binding**: when we want to display a component class property and update the property when the user makes a change.

![{data-binding}](./docs/data-binding/summary.PNG)

#### Property Binding

- Property binding allows us to set a property of an element to the value of a template expression

```html
<img [src]="product.imageUrl" />

<!-- [element property/binding target]='template expression/binding source' -->
```

#### Event Binding

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

```html
<button (click)="toggleImage()">
  {{ showImage ? 'Hide' : 'Show' }} Image
</button>
<!-- <html-tag (target-event)='template-statement()'> -->

<img *ngIf="showImage" [src]="product.imageUrl" [title]="product.productName" />
```

---

#### Two-way Binding (Filter)

**ngModel**

- **[ngModel] - square brackets: property-binding** from class to input in the template
- **(ngModel) - parentheses: event-binding** sent user data from template to class property

1. To use ngModel, need to import FormsModule in its parent module.

src\app\app.module.ts

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

2. src\app\products\product-list.component.ts

```typescript
// Add a class property
listFilter: string = 'cart';
```

3. src\app\products\product-list.component.html

```html
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
    // Getter: no parameter, return something
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

```html
<tr *ngFor="let product of filteredProducts"></tr>
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

---

#### '@Input() - property binding' vs '@Output() - event binding'

- Use @Input() decorator in a component when it needs to input data from its container component.
- Use @Output() decorator in a component when it needs to raise events (& optionally pass info back) to its container component with EvenEmitter.

#### Input data from Container = Passing data to nested component (@Input())

- If a nested component wants to receive Input from its container, it must expose a property to that container.

- src\app\shared\star.component.ts [Nested Component]

```typescript
import { Component, OnChanges, Input } from '@angular/core';

export class StarComponent implements OnChanges {
  @Input() rating: number; // @Input(): In order to expose its 'rating' property to its container component
  starWidth: number;

  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5;
  }
}
```

- src\app\products\product-list.component.html [Container Component - property binding]

```html
<!-- <td>{{ product.starRating }}</td> -->
<td><pm-star [rating]="product.starRating"></pm-star></td>
```

#### Passing data from a Component - @Raising an Event (@Output())

- src\app\shared\star.component.html [Nested Component]

```html
<div
  class="crop"
  [style.width.px]="starWidth"
  [title]="rating"
  (click)="onClick()"
></div>
```

- src\app\shared\star.component.ts [Nested Component]

```typescript
// Initial
  onClick(): void {
    console.log(`The rating ${this.rating} was clicked`);
  }
// Subsequent
import {
  EventEmitter,
  Output,
} from '@angular/core';

export class StarComponent implements OnChanges {
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  onClick(): void {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
```

- src\app\products\product-list.component.html [Container Component - event binding]

```html
<pm-star
  [rating]="product.starRating"
  (ratingClicked)="onRatingClicked($event)"
></pm-star>
```

- src\app\products\product-list.component.ts [Container Component - event binding]

```typescript
  onRatingClicked(message: string) {
    this.pageTitle = 'Product List' + message;
  }
```

---

#### Transforming Data with Pipes

- Modifying data before it is displayed.
- Pipes can be chained.
- Some pipes can be passed with parameters.

```html
<td>{{ product.productCode | lowercase }}</td>
<td>{{ product.price | currency: 'USD':'symbol':'1.2-2' }}</td>
```

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
  // 2nd arg: the character we'd like to transform to spaces
  // Return type of 'transform' is 'string'
}
```

2. Use pipes in template: src\app\products\product-list.component.html

```html
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

- **OnInit**: Perform component initialisation. Good place to retrieve data from back end service
- **OnChanges**: Perform actions after change to input properties
- **OnDestroy**: Perform cleanup before Angular destroys the component

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

**Getter**: Defines a read-only property

- Getters cannot have parameters and must have a return type
- it's accessed as a property (no parentheses)
- provide a property whose value can be dynamically computed
- expose the value to an internal variable

**Setter**: Defines a write-only property

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

#### Services

A service: a class with a focused purpose. Service is injected when a component is instantiated.

- Implement functionality that is independent of any particular component
- To share data or logic across components
- Encapsulate external interactions such as data access

**Dependency injection**: is a coding pattern in which a class receives the instances of objects it needs, called its dependencies, from an external source (the Angular injector) rather than creating them itself.

1. Build a service: src\app\products\product.service.ts

```typescript
import { Injectable } from '@angular/core';
import { IProduct } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts(): IProduct[] {
    return;
  }
}
```

2. Inject a service: src\app\products\product-list.component.ts

```typescript
import { ProductService } from './product.service';

// longhand
export class ProductListComponent {
  private _productService;
  constructor(productService: ProductService) {
    this._productService = productService;
  }
}

// shorthand
export class ProductListComponent {
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }
}
```

---

#### Observables

- Observables help us manage asynchronous data, such as data coming from a back-end service.
- Observables treat events as a collection. We can think of an observable as an array whose items arrive asynchronously over time.
- A method in our code can subscribe to an observable to receive asynchronous notifications as new data arrives. The method can then react as data is pushed to it.
- The method is notified when there is no more data or when an error occurs.
- Observables are used within Angular itself, including Angular's event system and its HTTP client service.
- Observables allow us to manipulate sets of events with operators

#### Operators

- Operators are methods on observables that compose new observables. Each operator transforms the source observable in some way.
- Operators do not wait for all of the values and process them at once. Rather, operators on observables process each value as it is emitted.
- Some examples of operators include map, filter, take, and merge.

---

#### Sending HTTP requests

1. Register HttpClientModule: src\app\app.module.ts

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule], // Imports: external module
})
export class AppModule {}
```

2. Inject HttpClient service to our service: src\app\products\product.service.ts

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ProductService {
  private productUrl = 'api/products/products.json';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    // This method returns an 'observable' with an 'Iproduct[] array' (type generics)
    return this.http.get<IProduct[]>(this.productUrl);
    // Map our returned response to the foramt of an 'Iproduct[] array'
  }
}
```

- To use local JSON file as our API endpoint, need to define the location at 'angular.json'

```typescript
"assets": [
            "src/favicon.ico",
            "src/assets",
            "src/api"
          ],
```

3. Exception handling

```typescript
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
```

```typescript
export class ProductService {
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client-side/connection errors
      errorMessage = `An error occurs: ${err.error.message}`;
    } else {
      // backend returns an unsuccessful response code
      errorMessage = `Server returns code: ${err.status}, error message is ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
```

#### Subscription to observables

- Lazy loading: an observable doesn't emit values until we subscribe.

- Subscribe method takes an optional argument, which is an observer object ( the observer object observes the stream and responds to three types of notifications, next, error, and complete).

- The subscribe function returns a subscription. We use that subscription to call unsubscribe and cancel the subscription, if needed.
  - 1st handler function 'next': it processes the next emitted value. Since observables can handle multiple values over time, the next function is called for each value the observable emits.
  - 2nd handler function 'error': it executes if there is an error.
  - 3rd handler function 'complete' (rarely used in Http requests): In some cases, we want to know when the observable completes, so observables provide a third handler that is executed on completion.

src\app\products\product-list.component.ts

```typescript
// Properties
errorMessage: string;

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
        // Moved up here due to async sequences
      },
      error: (err) => (this.errorMessage = err),
    });
    // this.filteredProducts = this.products;
  }
```

---

#### Modules

- **Bootstrap Array**: the starting component of our app
  - Every app must bootstrap at least one component, the root app component
  - Only used in AppModule (root application module)
- **Declarations Arrays**: define the 'components, directives and pipes' that belong to this Angular module (private by default, i.e. only accessible to the components declared in the same module).
  - Every component, directive and pipe we create must belong to 'one and only one' Angular module.
  - The Angular module provides the template resolution environment for its component templates.
- **Export Arrays**: Allows us to share components, directives and pipes to another module.
  - Never export a service.
- **Import Arrays**: import @angular module, 3rd party module (e.g. Material UI), the modules created by us, route module.
  - Importing a module makes available any exported components, directives, and pipes from that module.
  - Importing a module does not provide access to its imported modules.
- **Providers Arrays**
  - Any service provider added to the provider's array is registered at the root of the application, so the service is available to be injected into any class in the application. Say, for example, we have a future module called
  - Don't add services to the providers array of a shared module.

```typescript
// @NgModule decorator
@NgModule({
  // Declaration: so Angular can locate it
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
  ],
  // Imports: external module
  imports: [BrowserModule, FormsModule, HttpClientModule],
  // Bootstrap Array: the starting component of our app
  bootstrap: [AppComponent],
})
```

---

#### Handling undefined

- Safe Navigation Operators

1. Can't be used in NgModel
2. Might become tedious

```html
<div class="card">
  <div class="card-header">
    {{pageTitle + ": " product?.productName}}
  </div>
</div>
```

- Use 'ngIf'

```html
<div class="card">
  <div class="card-header" *ngIf="product">
    {{pageTitle + ": " product.productName}}
  </div>
</div>
```

---

#### Basic Navigation & Routing

1. index.html

```html
<head>
  <base href="/" />
</head>
```

2. src\app\app.module.ts

```typescript
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      // Set a default route
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      // Wildcard route: Usually use to display a 404 Page '{ path: '**', component: PageNotFoundComponent}
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
})
```

3. Remove selector from src\app\products\product-list.component.ts

```typescript
// selector: 'pm-products',
```

4. Create nav at src\app\app.component.ts

```html
@Component({ template: `
<nav class="navbar navbar-expand navbar-light bg-light">
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
  <!-- Where we display our view -->
  <router-outlet></router-outlet>
</div>
` })
```

---

#### Pass params to routes

src\app\products\product-list.component.html

```html
<a [routerLink]="['/products', product.productId]">{{ product.productName }}</a>
<!-- <a [routerLink]="['/path', params]" -->
```

src\app\products\product-detail.component.ts

```typescript
import { ActivatedRoute } from '@angular/router';

export class ProductDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    // '+' is a JS shortcut to covert strings into numbers
    this.pageTitle += `: ${id}`;
    this.product = {
      productId: id,
      // temp hardcoded below
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2019',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
    };
  }
}
```

---

#### Activate routes with code (Back button)

src\app\products\product-detail.component.ts

```typescript
import { Router } from '@angular/router';

export class ProductDetailComponent implements OnInit {
  constructor(private router: Router) {}

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
```

src\app\products\product-detail.component.html

```html
<button (click)="onBack()">
  Back
</button>
```

---

#### Protecting routes with guards (to make sure id passed in is valid)

Use route guards any time you want to:

- prevent access to a route
- confirm navigation away from a route
- preload data for a route

1. CLI command

```typescript
ng g g products/product-detail
// can select guard types in terminal after this command
```

2. src\app\products\product-detail.guard.ts

```typescript
import { Router } from '@angular/router';
export class ProductDetailGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // url: products/10
    //        [0]  /[1](id)
    // Use '+' to convert to number
    const id = +next.url[1].path;
    // if result number is NaN or smaller than 1, then we put an alert
    if (isNaN(id) || id < 1) {
      alert('Invalid product Id');
      this.router.navigate(['/products']);
      return false;
    }
    return true;
  }
}
```

src\app\app.module.ts

```typescript
import { ProductDetailGuard } from './products/product-detail.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
  ],
})
```

---

#### Feature module

1. CLI command

```typescript
ng g m products/product --flat -m app
// --flat: no folder
// -m: import module in module
```

2. src\app\products\product.module.ts

```typescript
// Import required components/pipes
import { StarComponent } from '../shared/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
// Import required modules
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// Import Guard for the routes
import { ProductDetailGuard } from './product-detail.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    StarComponent,
  ],
  // We use 'RouterModule.forChild' here
   imports: [CommonModule, FormsModule, RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
  ],
})
```

3. src\app\app.module.ts

- Remember to remove the above 4 components/pipes
- Remember to remove the FormsModule
- Move products-related routes to product.module.ts (only keep general routes here)

```typescript
@NgModule({
  declarations: [AppComponent, WelcomeComponent],
  imports: [
  RouterModule.forRoot([
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
  ]),
})
```

---

#### Shared module

1. CLI command

```typescript
ng g m shared/shared --flat -m products/product.module
// --flat: no folder
// -m: import module in module
```

2. Add required componenents/modules: src\app\shared\shared.module.ts

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StarComponent],
  imports: [CommonModule],
  exports: [StarComponent, CommonModule, FormsModule],
})
export class SharedModule {}
```

3. Remove unnecessary components/modules: src\app\products\product.module.ts

```typescript
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { StarComponent } from '../shared/star.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
// import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    // StarComponent,
  ],
  imports: [
    // CommonModule,
    // FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
    SharedModule, // Auto added by CLI command
  ],
})
export class ProductModule {}
```

---

#### Angular CLI

```typescript
ng new {app_name}
// Create new Angular application

npm start
ng serve -o
// Start the server
// -o: open the default browser

ng test
// unit testing
ng e2e
// end-to-end testing

ng build
ng build --prod

//  Shorthand for "--configuration=production".
//  When true, sets the build configuration to the production target.
//  By default, the production target is set up in the workspace configuration such that all builds make use of bundling, limited tree-shaking, and also limited dead code elimination.
```

©2020 Ellie Chen - All Rights Reserved.
