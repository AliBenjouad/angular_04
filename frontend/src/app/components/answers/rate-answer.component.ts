import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-rate-answer',
  templateUrl: './rate-answer.component.html',
  styleUrls: ['./rate-answer.component.css']
})
export class RateAnswerComponent {
  rateForm: FormGroup;

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    this.rateForm = this.fb.group({
      answerId: ['', Validators.required],
      rating: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rateForm.valid) {
      const { answerId, rating } = this.rateForm.value;
      this.answerService.rateAnswer(answerId, rating).subscribe(
        (res: any) => {
          console.log('Answer rated successfully!');
        },
        (err: any) => {
          console.error('Error rating answer:', err);
        }
      );
    }
  }
}
