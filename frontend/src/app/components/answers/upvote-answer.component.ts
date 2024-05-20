import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-upvote-answer',
  templateUrl: './upvote-answer.component.html',
  styleUrls: ['./upvote-answer.component.css']
})
export class UpvoteAnswerComponent {
  upvoteForm: FormGroup;

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    this.upvoteForm = this.fb.group({
      answerId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.upvoteForm.valid) {
      const { answerId } = this.upvoteForm.value;
      this.answerService.upvoteAnswer(answerId).subscribe(
        (res: any) => {
          console.log('Answer upvoted successfully!');
        },
        (err: any) => {
          console.error('Error upvoting answer:', err);
        }
      );
    }
  }
}
