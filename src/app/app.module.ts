import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';

// @NgModule decorator
@NgModule({
  // Declaration: so Angular can locate it
  declarations: [AppComponent, WelcomeComponent], // root componenet & welcome component
  // Imports: external module
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
    ]),
    ProductModule, // Import 'feature module'
  ],
  // Bootstrap Array: the starting component of our app
  bootstrap: [AppComponent],
})
export class AppModule {}
