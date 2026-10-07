import { InjectionToken } from "@angular/core";
import { environment } from "../environments/environment";

// Injection token for environment config. Declared for experiments, not used by any route yet.
export const ADMIN_API_KEY = new InjectionToken<typeof environment>('ADMIN_API_KEY');