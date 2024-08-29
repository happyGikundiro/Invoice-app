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
)
