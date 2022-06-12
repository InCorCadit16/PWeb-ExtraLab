import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Components } from './components';
import { Guards } from './guards';
import { MaterialModule } from './material.module';
import { Services } from './services';


@NgModule({
  declarations: [
    AppComponent,
    ...Components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [...Services, ...Guards],
  bootstrap: [AppComponent]
})
export class AppModule { }
