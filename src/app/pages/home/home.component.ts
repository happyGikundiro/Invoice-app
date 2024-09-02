import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsInvoiceVisible } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.selectors';
import { hideAddInvoice } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.actions';
import { AddInvoiceState } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  showAddInvoice$!: Observable<boolean>;

  constructor(private store: Store<{addInvoice: AddInvoiceState}>) {}

  ngOnInit() {
    this.showAddInvoice$ = this.store.select(selectIsInvoiceVisible);

    this.showAddInvoice$.subscribe((isVisible) => {
      if (isVisible) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    });
  }

  closeAddInvoice() {
    // this.store.dispatch(hideAddInvoice());
  }

}
