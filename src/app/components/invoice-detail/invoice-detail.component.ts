import { selectInvoiceById } from './../../invoice-store/invoice/invoice.selectors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../model/model';
import { Store } from '@ngrx/store';
import { InvoiceState } from '../../invoice-store/invoice/invoice.reducer';
import { Observable } from 'rxjs';
import * as InvoiceActions from '../../invoice-store/invoice/invoice.actions'

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent implements OnInit{

  showModal: boolean = false; 
  invoice$!: Observable<Invoice | undefined>;

  deleteInvoice() {
    this.showModal = true;
  }

  constructor(private route: ActivatedRoute, private store: Store<{invoice: InvoiceState}>, private router: Router){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      const idParam = params.get('id')
      if(idParam){
        this.invoice$ = this.store.select(selectInvoiceById(idParam))
      }
    })
  }

  goBack(){
    this.router.navigate(['/home'])
  }

  markAsPaid(invoice: Invoice) {
    if (invoice.status !== 'paid') {
      const updatedInvoice = { ...invoice, status: 'paid' };
      this.store.dispatch(InvoiceActions.updateInvoice({ invoice: updatedInvoice }));
    }
  }
  
}
