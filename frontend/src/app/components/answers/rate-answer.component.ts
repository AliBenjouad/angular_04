import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-rate-answer',
  templateUrl: './rate-answer.component.html',
  styleUrls: ['./rate-answer.component.css']
})
export class RateAnswerComponent {
  rateForm: FormGroup; // Declaring a FormGroup variable to handle form data

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    // Initializing the form with FormBuilder
    this.rateForm = this.fb.group({
      answerId: ['', Validators.required], // Defining a form control for answerId with validation
      rating: ['', Validators.required] // Defining a form control for rating with validation
    });
  }

  onSubmit() {
    // Handling form submission
    if (this.rateForm.valid) { // Checking if the form is valid
      const { answerId, rating } = this.rateForm.value; // Extracting form values
      this.answerService.rateAnswer(answerId, rating).subscribe( // Calling a service method to rate an answer
        (res: any) => {
          console.log('Answer rated successfully!'); // Logging success message if rating is successful
        },
        (err: any) => {
          console.error('Error rating answer:', err); // Logging error message if rating fails
        }
      );
    }
  }
}
