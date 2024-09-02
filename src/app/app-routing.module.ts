import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"invoice/:id", component:InvoiceDetailComponent},
  {path:"form", component:AddInvoiceComponent },
  {path:"**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
