import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';

// @NgModule decorator
@NgModule({
  // Declaration: so Angular can locate it
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    WelcomeComponent,
  ],
  // Imports: external module
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'welcome', component: WelcomeComponent },
      // Set a default route
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      // Wildcard route: Usually use to display a 404 Page '{ path: '**', component: PageNotFoundComponent}
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
  ],
  // Bootstrap Array: the starting component of our app
  bootstrap: [AppComponent],
})
export class AppModule {}
