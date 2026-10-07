import { Injectable } from "@angular/core";
import { from } from "rxjs";

export interface LoanType {
  id: number;
  loanId: string;
  customerId: number;
  loanAmount: number;
  status: string;
}
export interface CustomerType  {
  id: number;
  name: string;
  loanAmount: number;
  status: string;
}

/**
 * Mock data service. There is no real backend: each method waits `delayMs`
 * to simulate a network call, so you can watch loading and blocking behaviour in the console.
 */
@Injectable({ providedIn: 'root' })
export class LoanService {
  customers: CustomerType[] = [
    { id: 1, name: "Rahul Sharma", loanAmount: 250000, status: "ACTIVE" },
    { id: 2, name: "Priya Patel", loanAmount: 150000, status: "ACTIVE" },
    { id: 3, name: "Amit Shah", loanAmount: 500000, status: "PENDING" },
    { id: 4, name: "Neha Verma", loanAmount: 100000, status: "CLOSED" },
    { id: 5, name: "Vikram Mehta", loanAmount: 300000, status: "ACTIVE" },
    { id: 6, name: "Pooja Desai", loanAmount: 200000, status: "ACTIVE" },
    { id: 7, name: "Karan Joshi", loanAmount: 350000, status: "PENDING" },
    { id: 8, name: "Sneha Patel", loanAmount: 125000, status: "ACTIVE" },
    { id: 9, name: "Rakesh Kumar", loanAmount: 450000, status: "CLOSED" },
    { id: 10, name: "Anjali Shah", loanAmount: 175000, status: "ACTIVE" }
  ];
  loans = [
    // Rahul Sharma
    { id: 1, customerId: 1, loanId: "LOAN001", loanAmount: 250000, status: "ACTIVE" },
    { id: 2, customerId: 1, loanId: "LOAN002", loanAmount: 150000, status: "CLOSED" },
    { id: 3, customerId: 1, loanId: "LOAN003", loanAmount: 300000, status: "ACTIVE" },

    // Priya Patel
    { id: 4, customerId: 2, loanId: "LOAN004", loanAmount: 150000, status: "ACTIVE" },
    { id: 5, customerId: 2, loanId: "LOAN005", loanAmount: 100000, status: "CLOSED" },
    { id: 6, customerId: 2, loanId: "LOAN006", loanAmount: 200000, status: "ACTIVE" },
    { id: 7, customerId: 2, loanId: "LOAN007", loanAmount: 125000, status: "PENDING" },

    // Amit Shah
    { id: 8, customerId: 3, loanId: "LOAN008", loanAmount: 500000, status: "ACTIVE" },
    { id: 9, customerId: 3, loanId: "LOAN009", loanAmount: 350000, status: "ACTIVE" },
    { id: 10, customerId: 3, loanId: "LOAN010", loanAmount: 250000, status: "CLOSED" },

    // Neha Verma
    { id: 11, customerId: 4, loanId: "LOAN011", loanAmount: 100000, status: "CLOSED" },
    { id: 12, customerId: 4, loanId: "LOAN012", loanAmount: 175000, status: "ACTIVE" },
    { id: 13, customerId: 4, loanId: "LOAN013", loanAmount: 125000, status: "PENDING" },
    { id: 14, customerId: 4, loanId: "LOAN014", loanAmount: 200000, status: "ACTIVE" },

    // Vikram Mehta
    { id: 15, customerId: 5, loanId: "LOAN015", loanAmount: 300000, status: "ACTIVE" },
    { id: 16, customerId: 5, loanId: "LOAN016", loanAmount: 450000, status: "ACTIVE" },
    { id: 17, customerId: 5, loanId: "LOAN017", loanAmount: 200000, status: "CLOSED" },

    // Pooja Desai
    { id: 18, customerId: 6, loanId: "LOAN018", loanAmount: 200000, status: "ACTIVE" },
    { id: 19, customerId: 6, loanId: "LOAN019", loanAmount: 150000, status: "CLOSED" },
    { id: 20, customerId: 6, loanId: "LOAN020", loanAmount: 275000, status: "ACTIVE" },
    { id: 21, customerId: 6, loanId: "LOAN021", loanAmount: 100000, status: "PENDING" },

    // Karan Joshi
    { id: 22, customerId: 7, loanId: "LOAN022", loanAmount: 350000, status: "PENDING" },
    { id: 23, customerId: 7, loanId: "LOAN023", loanAmount: 250000, status: "ACTIVE" },
    { id: 24, customerId: 7, loanId: "LOAN024", loanAmount: 400000, status: "ACTIVE" },

    // Sneha Patel
    { id: 25, customerId: 8, loanId: "LOAN025", loanAmount: 125000, status: "ACTIVE" },
    { id: 26, customerId: 8, loanId: "LOAN026", loanAmount: 175000, status: "CLOSED" },
    { id: 27, customerId: 8, loanId: "LOAN027", loanAmount: 225000, status: "ACTIVE" },
    { id: 28, customerId: 8, loanId: "LOAN028", loanAmount: 150000, status: "PENDING" },

    // Rakesh Kumar
    { id: 29, customerId: 9, loanId: "LOAN029", loanAmount: 450000, status: "CLOSED" },
    { id: 30, customerId: 9, loanId: "LOAN030", loanAmount: 300000, status: "ACTIVE" },
    { id: 31, customerId: 9, loanId: "LOAN031", loanAmount: 500000, status: "ACTIVE" },

    // Anjali Shah
    { id: 32, customerId: 10, loanId: "LOAN032", loanAmount: 175000, status: "ACTIVE" },
    { id: 33, customerId: 10, loanId: "LOAN033", loanAmount: 250000, status: "CLOSED" },
    { id: 34, customerId: 10, loanId: "LOAN034", loanAmount: 150000, status: "ACTIVE" },
    { id: 35, customerId: 10, loanId: "LOAN035", loanAmount: 300000, status: "PENDING" }
  ];

  async getLoan(customerId: number, delayMs: any = 1500): Promise<any | undefined> {
    console.log(`⏳ fetching loan for customer ${customerId}`);
    await new Promise(r => setTimeout(r, delayMs));
    console.log(`✅ loan for customer ${customerId} loaded`);
    return this.loans.filter(l => l.customerId === +customerId);
  }

  async getCustomer(id: number, delayMs: any = 1500): Promise<any | undefined> {
    console.log(`⏳ fetching customer ${id}`);
    await new Promise(r => setTimeout(r, delayMs));
    console.log(`✅ customer ${id} loaded`);
    return this.customers.find(c => c.id === +id);
  }
  async getAllCustomer( delayMs: any = 1500): Promise<any | undefined> {
    console.log(`⏳ fetching all customers`);
    await new Promise(r => setTimeout(r, delayMs));
    console.log(`✅ all customers loaded`);
    return this.customers;
  }
  
  getLoan$(id: number) { return from(this.getLoan(id)); } // Observable version for rxResource
  getCustomer$(id: number) { return   from(this.getCustomer(id)); } // Observable version for rxResource
}