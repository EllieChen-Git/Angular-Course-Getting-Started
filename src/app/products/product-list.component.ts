// Import
import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

// Metadata
@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

// Class
export class ProductListComponent implements OnInit {
  // Properties
  productHeader: string = 'Product List';
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

  products: IProduct[] = [
    {
      productId: 1,
      productName: 'Leaf Rake',
      productCode: 'GDN-0011',
      releaseDate: 'March 19, 2019',
      description: 'Leaf rake with 48-inch wooden handle.',
      price: 19.95,
      starRating: 3.2,
      imageUrl: 'assets/images/leaf_rake.png',
    },
    {
      productId: 2,
      productName: 'Garden Cart',
      productCode: 'GDN-0023',
      releaseDate: 'March 18, 2019',
      description: '15 gallon capacity rolling garden cart',
      price: 32.99,
      starRating: 4.2,
      imageUrl: 'assets/images/garden_cart.png',
    },
    {
      productId: 5,
      productName: 'Hammer',
      productCode: 'TBX-0048',
      releaseDate: 'May 21, 2019',
      description: 'Curved claw steel hammer',
      price: 8.9,
      starRating: 4.8,
      imageUrl: 'assets/images/hammer.png',
    },
  ];

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

  toggleImage(): void {
    // return type is void here
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log('OnInit');
  }
}
