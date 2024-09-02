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

export const selectInvoiceFilter = createSelector(
    selectInvoiceState,
    (state: InvoiceState) => state.filter
);
  
export const selectFilteredInvoices = createSelector(
    selectInvoices,
    selectInvoiceFilter,
    (invoices, filter) => {
      if (filter.length === 0) return invoices;
      return invoices.filter(invoice => filter.includes(invoice.status));
    }
);

export const selectInvoiceById = (invoiceId: string) => 
    createSelector(
      selectInvoiceState,
      (state: InvoiceState) => state.invoices.find(invoice => invoice.id === invoiceId)
);
