
import { createSelector, createFeatureSelector } from '@ngrx/store'; 
import { AddInvoiceState } from './add-invoice-visibility.reducer';

export const selectInvoiceState = createFeatureSelector<AddInvoiceState>('addInvoice');

export const selectIsInvoiceVisible = createSelector(
  selectInvoiceState,
  (state: AddInvoiceState) => state.isVisible
);
