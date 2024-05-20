// src/app/components/not-found/not-found.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found', // Selector for this component
  template: `
    <div class="container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a routerLink="/login" class="btn btn-primary">Go to Login</a>
    </div>
  `, // Inline template for the component
  styles: [`
    .container {
      text-align: center;
      padding: 50px;
    }
  `] // Inline styles for the component
})
export class NotFoundComponent {
  // Currently, no additional logic is implemented in this component
}
