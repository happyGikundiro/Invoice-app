import { Component } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {

  form = new FormGroup({
    streetAddress: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    postCode: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    clientName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    clientStreetAddress: new FormControl('', [Validators.required]),
    clientCity: new FormControl('', [Validators.required]),
    clientPostCode: new FormControl('', [Validators.required]),
    clientCountry: new FormControl('', [Validators.required]),
    invoiceDate: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required]),
    projectDescription: new FormControl('', [Validators.required]),
    items: new FormArray([
      this.createItemFormGroup()
    ])
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  createItemFormGroup(): FormGroup {
    return new FormGroup({
      itemName: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  addItem(): void {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  // calculateTotal(quantity: number, price: number): number {
  //   const qty = Number(quantity) || 0;
  // const p = Number(price) || 0;
  //   return qty * p;
  // }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Invalid form');
      return;
    }
    console.log(this.form.value);
  }

  onReset() {
    this.form.reset();
  }

}
