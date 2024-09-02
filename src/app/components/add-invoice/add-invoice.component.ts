import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray, Validators, FormBuilder } from '@angular/forms';
import { InvoiceState } from '../../invoice-store/invoice/invoice.reducer';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../invoice-store/invoice/invoice.actions'
import { Invoice } from '../../model/model';
import { Router } from '@angular/router';
import { hideAddInvoice } from '../../invoice-store/add-invoice-visibility/add-invoice-visibility.actions';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent implements OnInit{

  form!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<{invoice: InvoiceState}>, private router: Router) {}

  ngOnInit(): void {
    this.initForm()

    this.items.valueChanges.subscribe(() => {
      this.updateTotals();
    });
  }

  initForm() {
    this.form = new FormGroup({
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
      items: this.fb.array([]) 
    });

    this.addItem();
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [0]
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  updateTotals(): void {
    this.items.controls.forEach(item => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      item.get('total')?.setValue(this.calculateTotal(quantity, price), { emitEvent: false });
    });
  }

  calculateTotal(quantity: number, price: number): number {
    return quantity * price;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const newInvoice: Invoice = {
        id: this.generateUniqueId(), 
        createdAt: new Date().toISOString().split('T')[0],
        paymentDue: this.calculatePaymentDueDate(this.form.value.invoiceDate, this.form.value.payment),
        description: this.form.value.projectDescription,
        paymentTerms: this.form.value.payment,
        clientName: this.form.value.clientName,
        clientEmail: this.form.value.email,
        status: 'pending', 
        senderAddress: {
          street: this.form.value.streetAddress,
          city: this.form.value.city,
          postCode: this.form.value.postCode,
          country: this.form.value.country
        },
        clientAddress: {
          street: this.form.value.clientStreetAddress,
          city: this.form.value.clientCity,
          postCode: this.form.value.clientPostCode,
          country: this.form.value.clientCountry
        },
        items: this.form.value.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price
        })),
        total: this.calculateInvoiceTotal(this.form.value.items)
      };
  
      this.store.dispatch(InvoiceActions.addInvoice({ invoice: newInvoice }));

      this.store.dispatch(hideAddInvoice())
      this.router.navigate(['home']);
      console.log(this.form.value);

      this.onReset();
    } else{
      this.form.markAllAsTouched(); 
      return;
    }
  }
  
  generateUniqueId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);
    return (timestamp + randomPart).toUpperCase().substr(0, 5);
  }

  calculatePaymentDueDate(invoiceDate: string, paymentTerms: string): string {
    const date = new Date(invoiceDate);
    const daysToAdd = parseInt(paymentTerms.replace('net', ''), 10);
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }

  calculateInvoiceTotal(items: any[]): number {
    return items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  }

  onReset() {
    this.form.reset();
    this.items.clear(); 
    this.addItem();
  }

  goBack():void{
    this.router.navigate(['/home'])
  }

}
