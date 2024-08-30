import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InvoiceState } from "./invoice.reducer";

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoices');


export const selectInvoices = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.invoices
);

export const selectIsLoading = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.loading
);

export const selectError = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.error
);

export const selectInvoiceById = (invoiceId: string) => 
    createSelector(
      selectInvoiceState,
      (state: InvoiceState) => state.invoices.find(invoice => invoice.id === invoiceId)
);
