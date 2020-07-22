import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { MasterpagesComponent } from './components/shared/masterpages/masterpages.component';
import { UserService } from './components/services/user.service';
import { ContactService } from './components/services/contact.service';

@NgModule({
  declarations: [AppComponent, MasterpagesComponent, RoutingComponents],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      positionClass: 'toast-bottom-right',
    }), // ToastrModule added
    AppRoutingModule,
  ],
  providers: [UserService, ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
