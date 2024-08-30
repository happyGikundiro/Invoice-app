import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrl: './confirm-deletion.component.css'
})
export class ConfirmDeletionComponent {

  @Input() showModal: boolean = false;

  constructor(private router: Router){}

  closeModal() {
    this.showModal = false;
  }

  deleteInvoice() {
    this.router.navigate(['/invoices']);
  }

}
