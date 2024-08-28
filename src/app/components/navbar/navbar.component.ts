import { AddInvoiceState } from './../../invoice-store/add-invoice-visibility/add-invoice-visibility.reducer';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { showAddInvoice } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  constructor(private store: Store<{addInvoiceReducer: AddInvoiceState}>) {}

  openAddInvoice() {
    this.store.dispatch(showAddInvoice());
  }
  
}
