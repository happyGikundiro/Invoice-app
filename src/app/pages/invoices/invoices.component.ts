import { AddInvoiceState } from './../../invoice-store/add-invoice-visibility/add-invoice-visibility.reducer';
import { InvoiceState } from './../../invoice-store/invoice/invoice.reducer';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../model/model';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../invoice-store/invoice/invoice.actions'
import { selectInvoices, selectIsLoading } from '../../invoice-store/invoice/invoice.selectors';
import { showAddInvoice } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {

  dropdownOpen = false;
  invoices$!: Observable<Invoice[]>;
  isLoading$!: Observable<boolean>;

  constructor(private store: Store<{invoice: InvoiceState, AddInvoiceReducer: AddInvoiceState}>, private router: Router){
    this.invoices$ = this.store.select(selectInvoices)
    this.isLoading$ = this.store.select(selectIsLoading);
    this.loadInvoices();
  }

  loadInvoices(){
    this.store.dispatch(InvoiceActions.loadInvoices())
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  openAddInvoice() {
    this.store.dispatch(showAddInvoice());
  }

  viewDetails(id: string){
    this.router.navigate(['/invoice', id])
  }
  
}
