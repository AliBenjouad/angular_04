import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent {
  questionForm: FormGroup; // Declaring a FormGroup variable to handle form data

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    // Initializing the form with FormBuilder
    this.questionForm = this.fb.group({
      title: ['', Validators.required], // Defining a form control for question title with validation
      body: ['', Validators.required] // Defining a form control for question body with validation
    });
  }

  onSubmit() {
    // Handling form submission
    if (this.questionForm.valid) { // Checking if the form is valid
      const { title, body } = this.questionForm.value; // Extracting form values
      this.questionService.postQuestion({ title, body }).subscribe( // Calling a service method to post a question
        (res: any) => {
          console.log('Question posted successfully!'); // Logging success message if question is posted successfully
        },
        (err: any) => {
          console.error('Error posting question:', err); // Logging error message if posting question fails
        }
      );
    }
  }
}
