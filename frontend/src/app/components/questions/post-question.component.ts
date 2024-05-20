import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.css']
})
export class PostQuestionComponent {
  questionForm: FormGroup;

  constructor(private fb: FormBuilder, private questionService: QuestionService) {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const { title, body } = this.questionForm.value;
      this.questionService.postQuestion({ title, body }).subscribe(
        (res: any) => {
          console.log('Question posted successfully!');
        },
        (err: any) => {
          console.error('Error posting question:', err);
        }
      );
    }
  }
}
