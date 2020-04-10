import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// @NgModule decorator
@NgModule({
  declarations: [AppComponent], // Declaration: so Angular can locate it
  imports: [BrowserModule], // Imports: external module
  bootstrap: [AppComponent], // Bootstrap: the starting component of our app
})
export class AppModule {}
