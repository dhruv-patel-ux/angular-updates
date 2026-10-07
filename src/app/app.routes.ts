import { nonBlocking, ResourceContext, Routes } from '@angular/router';
import { ADMIN_API_KEY } from './app.token';
import { environment } from '../environments/environment';
import { computed, inject, resource } from '@angular/core';
import { LoanService } from './services/loan.service';
import { from, of } from 'rxjs';

/**
 * Route-level resources (Angular 22.2, developer preview).
 *
 * Each route can define a `resources` function that returns a record of Angular `Resource`s.
 * Requires `withRouterResources()` in `provideRouter(...)` (see app.config.ts).
 *
 * How it works:
 * - `resources` runs inside an injection context, so `inject()` works here.
 * - `ctx` (ResourceContext) exposes the route's `params`, `queryParams`, `fragment` and `data` as signals.
 * - It runs ONCE when the route is created. If the route is reused (e.g. navigating from
 *   /customer/1 to /customer/1/loan-list), it does NOT run again. The existing resources stay alive.
 * - By default a resource is BLOCKING: navigation waits until it finishes loading, and its
 *   VALUE is bound to the component input with the same name (needs `withComponentInputBinding()`).
 * - Wrapped in `nonBlocking(...)`: navigation does not wait, and the `Resource` OBJECT itself
 *   is bound to the input, so the component reads `.value()`, `.isLoading()`, etc.
 */
export const routes: Routes = [
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin').then((c) => c.Admin),
        resources: (ctx: any) => {
            const loanService = inject(LoanService);
            return {
                // Key `customer` -> bound to the `customer` input of the Admin component.
                // No `params`, so the loader runs only once when the route is created.
                customer: resource({
                    // params: () => ctx.params()['id'],
                    loader: () => loanService.getAllCustomer()
                })
            }
        }
    },
    {
        path: 'customer/:id',
        loadComponent: () => import('./customer/customer').then((c) => c.Customer),
        resources: (ctx: ResourceContext) => {
            const loanService = inject(LoanService);

            // On every navigation the router hands out a NEW params object, even if `id` is the same.
            // Signals compare by reference, so reading `ctx.params()` directly would look "changed".
            // `computed` compares the string value ('1' === '1'), so `id` only changes when the id really changes.
            const id = computed(() => ctx.params()['id']);

            return {
                // BLOCKING resource: Customer is rendered only after the customer has loaded,
                // and the loaded value is passed to `customer = input.required<CustomerType>()`.
                customer: resource({
                    // `params` is reactive: when it returns a new value, the loader runs again.
                    params: () => {
                        console.log('params', id());
                        return Number(id());
                    },
                    // Receives the value returned by `params`. Called only when params change.
                    loader: ({ params: id }) => loanService.getCustomer(id, 2000),
                }),
            };
        },
        children: [
            {
                path: 'loan-list',
                loadComponent: () => import('./loan/loan').then((c) => c.Loan),
                resources: (ctx: ResourceContext) => {
                    const loanService = inject(LoanService);
                    const id = computed(() => ctx.params()['id']);
                    return {
                        // NON-BLOCKING resource: Loan renders immediately, and the input receives
                        // the Resource object, so the template uses `loan().value()`.
                        loan : nonBlocking(resource({
                            loader : () => loanService.getLoan(id(), 2000)
                        }))
                    }
                }
            }
        ],
    }
];
