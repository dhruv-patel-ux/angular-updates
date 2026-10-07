import { Component, input, Resource } from '@angular/core';
import { LoanType } from '../services/loan.service';

@Component({
  imports: [],
  selector: 'app-loan',
  styleUrl: './loan.scss',
  templateUrl: './loan.html',
})
export class Loan {
  // The `loan` route resource is wrapped in `nonBlocking(...)`, so the router passes
  // the Resource object itself (not its value). Read it with `loan().value()`.
  loan = input.required<Resource<LoanType[]>>();
}
