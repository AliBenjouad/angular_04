// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Path to the HTML template
  styleUrls: ['./app.component.css'], // Path to the CSS stylesheet
  standalone: true, // Indicates that this component is a standalone component
  imports: [RouterModule] // Import the RouterModule to enable routing
})
export class AppComponent {
  // Title of the application
  title = 'my-angular-app';
}
