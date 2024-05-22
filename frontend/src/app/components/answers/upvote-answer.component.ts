import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-upvote-answer',
  templateUrl: './upvote-answer.component.html',
  styleUrls: ['./upvote-answer.component.css']
})
export class UpvoteAnswerComponent {
  upvoteForm: FormGroup; // Declaring a FormGroup variable to handle form data

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    // Initializing the form with FormBuilder
    this.upvoteForm = this.fb.group({
      answerId: ['', Validators.required] // Defining a form control for answerId with validation
    });
  }

  onSubmit() {
    // Handling form submission
    if (this.upvoteForm.valid) { // Checking if the form is valid
      const { answerId } = this.upvoteForm.value; // Extracting form value
      this.answerService.upvoteAnswer(answerId).subscribe( // Calling a service method to upvote an answer
        (res: any) => {
          console.log('Answer upvoted successfully!'); // Logging success message if upvoting is successful
        },
        (err: any) => {
          console.error('Error upvoting answer:', err); // Logging error message if upvoting fails
        }
      );
    }
  }
}
