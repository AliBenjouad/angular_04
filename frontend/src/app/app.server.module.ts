// src/app/app.server.module.ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module'; // Import the main application module
import { AppComponent } from './app.component'; // Import the main application component

// Define the server-side module for the application
@NgModule({
  imports: [
    ServerModule, // Import the server module for server-side rendering
    AppModule // Import the main application module
  ],
  bootstrap: [AppComponent], // Bootstrap the main application component
})
export class AppServerModule {}
