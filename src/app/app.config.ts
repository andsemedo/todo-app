import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import { httpInterceptor } from "./core/interceptors/http.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([httpInterceptor]), withFetch()),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
