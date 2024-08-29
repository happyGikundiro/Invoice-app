
import { InvoiceState } from './../../invoice-store/invoice/invoice.reducer';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../model/model';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../invoice-store/invoice/invoice.actions'
import { selectInvoices, selectIsLoading } from '../../invoice-store/invoice/invoice.selectors';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {

  invoices$!: Observable<Invoice[]>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<{invoice: InvoiceState}>){
    this.invoices$ = this.store.select(selectInvoices)
    this.isLoading$ = this.store.select(selectIsLoading);
    this.loadInvoices();
  }

  loadInvoices(){
    this.store.dispatch(InvoiceActions.loadInvoices())
  }
}
