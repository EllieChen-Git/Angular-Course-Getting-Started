// Import
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

// Metadata
@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

// Class
export class ProductListComponent implements OnInit {
  // Properties
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
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

  products: IProduct[] = [];

  // Methods

  constructor(private productService: ProductService) {}

  onRatingClicked(message: string) {
    this.pageTitle = 'Product List' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase(); // for case-insensitive comparison
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
      // indexOf() returns '-1' if the given element is not present.
    );
  }

  toggleImage(): void {
    // return type is void here
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }
}
