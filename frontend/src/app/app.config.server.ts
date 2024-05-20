// src/app/app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

// Define the server-specific configuration
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // Provider for server-side rendering
  ]
};

// Merge the main application configuration with the server configuration
export const config = mergeApplicationConfig(appConfig, serverConfig);
