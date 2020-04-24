import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';

// @NgModule decorator
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
  ], // Declaration: so Angular can locate it
  imports: [BrowserModule, FormsModule], // Imports: external module
  bootstrap: [AppComponent], // Bootstrap: the starting component of our app
})
export class AppModule {}
