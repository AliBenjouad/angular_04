// src/app/components/answers/answer-question.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-answer-question', // Selector for this component
  templateUrl: './answer-question.component.html', // Path to the HTML template
  styleUrls: ['./answer-question.component.css'] // Path to the CSS stylesheet
})
export class AnswerQuestionComponent {
  answerForm: FormGroup; // Form group for the answer form

  // Constructor to initialize the form group and inject necessary services
  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    // Initialize the form group with form controls and validation rules
    this.answerForm = this.fb.group({
      questionId: ['', Validators.required], // Question ID field with required validation
      text: ['', Validators.required] // Answer text field with required validation
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.answerForm.valid) { // Check if the form is valid
      const { questionId, text } = this.answerForm.value; // Extract values from the form
      // Call the service method to post the answer
      this.answerService.answerQuestion({ questionId, text }).subscribe(
        (res: any) => {
          console.log('Answer posted successfully!'); // Log success message
        },
        (err: any) => {
          console.error('Error posting answer:', err); // Log error message
        }
      );
    }
  }
}
