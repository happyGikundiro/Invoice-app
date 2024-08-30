import { createReducer, on } from '@ngrx/store';
import { Invoice } from "../../model/model";
import * as InvoiceActions from './invoice.actions'

export interface InvoiceState{
    invoices: Invoice[];
    loading: boolean;
    error: string;
}

export const initialInvoiceState: InvoiceState = {
    invoices: [],
    loading: false,
    error: ''
}

export const invoiceReducer = createReducer(
    initialInvoiceState,
    on(InvoiceActions.loadInvoices, state => ({ ...state, loading: true })),
    on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => ({ ...state, invoices, loading: false})),
    on(InvoiceActions.loadInvoicesFailure, (state, { error })=> ({ ...state, error, loading: false})),

    on(InvoiceActions.updateInvoice, (state, { invoice }) => ({
        ...state,
        invoices: state.invoices.map(inv => inv.id === invoice.id ? invoice : inv)
      })),
    on(InvoiceActions.updateInvoiceSuccess, (state, { invoice }) => ({
        ...state,
        invoices: state.invoices.map((inv) =>
          inv.id === invoice.id ? { ...invoice } : inv
        )
      })),
    on(InvoiceActions.updateInvoiceFailure, (state, { error }) => ({
        ...state,
        error
      })),

    on(InvoiceActions.deleteInvoice, (state, { invoiceId }) => ({
        ...state,
        invoices: state.invoices.filter(inv => inv.id !== invoiceId)
      }))
)
