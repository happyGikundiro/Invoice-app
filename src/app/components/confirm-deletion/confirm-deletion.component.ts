import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InvoiceState } from '../../invoice-store/invoice/invoice.reducer';
import * as InvoiceActions from '../../invoice-store/invoice/invoice.actions'

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrl: './confirm-deletion.component.css'
})
export class ConfirmDeletionComponent {

  @Input() showModal: boolean = false;
  @Input() invoiceId: string | undefined;
  @Output() modalClosed = new EventEmitter<void>();

  constructor(private router: Router, private store:Store<{invoice: InvoiceState}>){}

  closeModal() {
    this.showModal = false;
    this.modalClosed.emit();
  }

  deleteInvoice() {
    if (this.invoiceId) {
      this.store.dispatch(InvoiceActions.deleteInvoice({ invoiceId: this.invoiceId }));
      this.router.navigate(['/invoices']);
    }
  }

}
