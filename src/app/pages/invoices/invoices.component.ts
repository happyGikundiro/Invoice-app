import { AddInvoiceState } from './../../invoice-store/add-invoice-visibility/add-invoice-visibility.reducer';
import { InvoiceState } from './../../invoice-store/invoice/invoice.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Invoice } from '../../model/model';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../invoice-store/invoice/invoice.actions'
import { selectFilteredInvoices, selectInvoiceFilter, selectInvoices, selectIsLoading } from '../../invoice-store/invoice/invoice.selectors';
import { showAddInvoice } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit, OnDestroy{

  dropdownOpen = false;
  invoices$!: Observable<Invoice[]>;
  isLoading$!: Observable<boolean>;
  selectedFilters: string[] = [];
  selectedInvoiceSubscription: Subscription | undefined;

  constructor(private store: Store<{invoice: InvoiceState, AddInvoiceReducer: AddInvoiceState}>, private router: Router){}

  ngOnInit(): void {
    this.loadInvoices();

    this.selectedInvoiceSubscription = this.store.select(selectInvoiceFilter).subscribe(filters => {
      this.selectedFilters = [...filters];
    });

    this.invoices$ = this.store.select(selectFilteredInvoices)
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  loadInvoices(){
    this.store.dispatch(InvoiceActions.loadInvoices())
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onFilterChange(status: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;
    let newFilters: string[];

    if (checked) {
      newFilters = [...this.selectedFilters, status];
    } else {
      newFilters = this.selectedFilters.filter(s => s !== status);
    }
    this.store.dispatch(InvoiceActions.setInvoiceFilter({ filter: newFilters }));
  }
  

  openAddInvoice() {
    this.store.dispatch(showAddInvoice());
  }

  viewDetails(id: string){
    this.router.navigate(['/invoice', id])
  }
  
  ngOnDestroy(): void {
    if (this.selectedInvoiceSubscription) {
      this.selectedInvoiceSubscription.unsubscribe();
    }
  }

}
