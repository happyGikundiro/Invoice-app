import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as InvoiceActions from './invoice.actions'
import { catchError, mergeMap, map, of } from "rxjs";
import { Invoice } from "../../model/model";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class InvoiceEffects {
    constructor(private actions$: Actions, private http: HttpClient) {}

    loadInvoices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InvoiceActions.loadInvoices),
            mergeMap(() => {
                const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');

                if (storedInvoices.length > 0) {
                    return of(InvoiceActions.loadInvoicesSuccess({ invoices: storedInvoices }));
                } else {
                    return this.http.get<Invoice[]>('/assets/data/data.json').pipe(
                        map((invoices) => {
                            localStorage.setItem('invoices', JSON.stringify(invoices));
                            return InvoiceActions.loadInvoicesSuccess({ invoices });
                        }),
                        catchError((error) =>
                            of(InvoiceActions.loadInvoicesFailure({ error: error.message }))
                        )
                    );
                }
            })
        )
    );
}