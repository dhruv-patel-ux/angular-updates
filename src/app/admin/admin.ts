  import { Component, effect, inject, input, untracked } from '@angular/core';
  import { ADMIN_API_KEY } from '../app.token';
import { RouterLink } from '@angular/router';

  @Component({
    imports: [RouterLink],
    selector: 'app-admin',
    styleUrl: './admin.scss',
    templateUrl: './admin.html',
  })
  export class Admin {
    // Filled by the router from the `customer` route resource (the list of all customers).
    customer = input.required<any>()
    constructor() {
      // Logs whenever the input value changes. `untracked` keeps the log itself
      // from adding extra signal dependencies to the effect.
      effect(() =>{
        const customer = this.customer();
        untracked(() =>{

          console.log(customer);
        })
      })
    }
  }
