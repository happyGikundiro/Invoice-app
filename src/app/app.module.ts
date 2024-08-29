import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmptyInvoiceComponent } from './components/empty-invoice/empty-invoice.component';
import { InvoiceCardComponent } from './components/invoice-card/invoice-card.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { ButtonComponent } from './components/button/button.component';
import { ConfirmDeletionComponent } from './components/confirm-deletion/confirm-deletion.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AddInvoiceReducer } from './invoice-store/add-invoice-visibility/add-invoice-visibility.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { invoiceReducer } from './invoice-store/invoice/invoice.reducer';
import { InvoiceEffects } from './invoice-store/invoice/invoice.effects';
import { InvoicesComponent } from './pages/invoices/invoices.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    EmptyInvoiceComponent,
    InvoiceCardComponent,
    InvoiceDetailComponent,
    HomeComponent,
    ButtonComponent,
    ConfirmDeletionComponent,
    AddInvoiceComponent,
    InvoicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(
      { addInvoice: AddInvoiceReducer, invoices: invoiceReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    EffectsModule.forRoot([InvoiceEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
