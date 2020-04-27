import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';

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
export class AppModule {}
