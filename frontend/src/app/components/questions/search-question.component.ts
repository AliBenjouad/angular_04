import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.css']
})
export class SearchQuestionComponent {
  searchForm: FormGroup; // Declaring a FormGroup variable to handle form data
  results: any[] = []; // Array to store search results

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    // Initializing the form with FormBuilder
    this.searchForm = this.fb.group({
      title: ['', Validators.required] // Defining a form control for question title with validation
    });
  }

  onSubmit() {
    // Handling form submission
    if (this.searchForm.valid) { // Checking if the form is valid
      const { title } = this.searchForm.value; // Extracting form value
      this.questionService.searchQuestions(title).subscribe( // Calling a service method to search questions
        (res: any) => {
          this.results = res; // Storing search results
          console.log('Questions found:', res); // Logging found questions
        },
        (err: any) => {
          console.error('Error searching questions:', err); // Logging error message if searching questions fails
        }
      );
    }
  }
}
