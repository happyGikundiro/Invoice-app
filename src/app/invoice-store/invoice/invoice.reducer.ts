import { createReducer, on } from '@ngrx/store';
import { Invoice } from "../../model/model";
import * as InvoiceActions from './invoice.actions';

export interface InvoiceState {
    invoices: Invoice[];
    loading: boolean;
    error: string;
    filter: string[];
}

export const initialInvoiceState: InvoiceState = {
    invoices: [],
    loading: false,
    error: '',
    filter: [],
};

export const invoiceReducer = createReducer(
    initialInvoiceState,

    on(InvoiceActions.loadInvoices, state => ({ ...state, loading: true })),
    on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => {
        localStorage.setItem('invoices', JSON.stringify(invoices));
        return { ...state, invoices, loading: false };
    }),
    on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({ ...state, error, loading: false })),

    on(InvoiceActions.addInvoice, (state, { invoice }) => {
        const newInvoices = [...state.invoices, invoice];
        localStorage.setItem('invoices', JSON.stringify(newInvoices));
        return { ...state, invoices: newInvoices };
    }),

    on(InvoiceActions.deleteInvoice, (state, { invoiceId }) => {
        const filteredInvoices = state.invoices.filter(inv => inv.id !== invoiceId);
        localStorage.setItem('invoices', JSON.stringify(filteredInvoices));
        return { ...state, invoices: filteredInvoices };
    }),

    on(InvoiceActions.markAsPaid, (state, { invoiceId }) => {
        const updatedInvoices = state.invoices.map(invoice =>
            invoice.id === invoiceId ? { ...invoice, status: 'paid' } : invoice
        );
        localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
        return { ...state, invoices: updatedInvoices };
    }),
   
);
