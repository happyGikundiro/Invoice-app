import { createAction, props } from "@ngrx/store";
import { Invoice } from "../../model/model";

export const loadInvoices = createAction('[Invoice] Load Invoices');
export const loadInvoicesSuccess = createAction('[Invoice] Load Invoices Success', props<{ invoices: Invoice[] }>());
export const loadInvoicesFailure = createAction('[Invoice] Load Invoices Failure', props<{ error: string }>());

export const addInvoice = createAction('[Invoice] Add Invoice', props<{ invoice: Invoice }>());

export const deleteInvoice = createAction('[Invoice] Delete Invoice', props<{ invoiceId: string }>());

export const setInvoiceFilter = createAction('[Invoice] Set Invoice Filter', props<{ filter: string[] }>());

export const markAsPaid = createAction('[Invoice] Mark as Paid', props<{ invoiceId: string }>());