import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-deletion',
  templateUrl: './confirm-deletion.component.html',
  styleUrl: './confirm-deletion.component.css'
})
export class ConfirmDeletionComponent {

  @Input() showModal: boolean = false;

  closeModal() {
    this.showModal = false;
  }

}
