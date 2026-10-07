import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterResources } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // Binds route params, query params, data and route resources to component inputs by name.
      withComponentInputBinding(),
      // Enables the `resources` property on routes (Angular 22.2, developer preview).
      withRouterResources(),
    ),
  ]
};
