import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';

@Component({
  // selector: 'pm-product-detail',
  // We are not going to dispay the view as a nested component.
  // We are using 'router' instead, so we don't need this line.
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product: IProduct;

  constructor() {}

  ngOnInit() {}
}
