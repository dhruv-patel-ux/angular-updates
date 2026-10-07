# LatestAngularThings

A small demo of **route-level resources** in Angular 22.2 (`resources` on a route + `withRouterResources()`).
Data comes from a mock service with artificial delays, so you can watch the behaviour in the browser console.

## What to look at

| File | What it shows |
| --- | --- |
| `src/app/app.config.ts` | Enabling `withRouterResources()` and `withComponentInputBinding()` |
| `src/app/app.routes.ts` | Defining blocking and `nonBlocking` resources on routes, using `ctx.params()` |
| `src/app/customer/customer.ts` | Receiving a blocking resource's **value** as an input |
| `src/app/loan/loan.ts` | Receiving a non-blocking **Resource object** as an input |
| `src/app/services/loan.service.ts` | Mock data with simulated network delay |

## Try it

1. `ng serve` and open `http://localhost:4200/admin` to see the customer list (navigation waits for the data).
2. Click a customer to open `/customer/:id`. The console shows `params` and `fetching customer`.
3. Click **view loan**. The parent route is reused: `params` logs again, but `getCustomer` is **not** called again.
4. Open a different customer. The id changes, so the customer is fetched again.

> Route resources are a **developer preview** API in Angular 22.2 and may change.

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
