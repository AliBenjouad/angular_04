import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-search-question',
  templateUrl: './search-question.component.html',
  styleUrls: ['./search-question.component.css']
})
export class SearchQuestionComponent {
  searchForm: FormGroup;
  results: any[] = [];

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.searchForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const { title } = this.searchForm.value;
      this.questionService.searchQuestions(title).subscribe(
        (res: any) => {
          this.results = res;
          console.log('Questions found:', res);
        },
        (err: any) => {
          console.error('Error searching questions:', err);
        }
      );
    }
  }
}
