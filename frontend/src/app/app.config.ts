// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; // Import the routes
import { provideClientHydration } from '@angular/platform-browser';

// Define the main application configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provider for routing
    provideClientHydration() // Provider for client-side hydration
  ]
};
