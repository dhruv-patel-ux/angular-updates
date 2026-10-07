import { Component, inject, input, Resource } from '@angular/core';
import { CustomerType } from '../services/loan.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-customer',
  styleUrl: './customer.scss',
  templateUrl: './customer.html',
})
export class Customer {
  router = inject(Router)
  route = inject(ActivatedRoute)
  // Filled by the router from the BLOCKING `customer` route resource (see app.routes.ts).
  // The key name in `resources` must match this input name.
  customer = input.required<CustomerType>();

  // Navigates to the child route /customer/:id/loan-list.
  // The parent route is reused, so its `customer` resource is NOT reloaded.
  viewLoan() {
    this.router.navigate(['loan-list'], {relativeTo: this.route});
  }
}
  