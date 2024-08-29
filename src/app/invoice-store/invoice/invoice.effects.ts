import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as InvoiceActions from './invoice.actions'
import { catchError, mergeMap, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Invoice } from "../../model/model";

@Injectable()

export class InvoiceEffects{

    constructor(private actions$: Actions,private http:HttpClient){}

    loadInvoices$ = createEffect(()=>
        this.actions$.pipe(
            ofType(InvoiceActions.loadInvoices),
            mergeMap(()=>
                this.http.get<Invoice[]>('/assets/data/data.json').pipe(
                    map((invoices) => InvoiceActions.loadInvoicesSuccess({invoices})),
                    catchError((error)=>
                        of(InvoiceActions.loadInvoicesFailure({error: error.message}))
                    )
                )
            )
        )
    )
}