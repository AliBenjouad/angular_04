import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-approve-answer',
  templateUrl: './approve-answer.component.html',
  styleUrls: ['./approve-answer.component.css']
})
export class ApproveAnswerComponent {
  approveForm: FormGroup;

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    this.approveForm = this.fb.group({
      answerId: ['', Validators.required],
      approvalStatus: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.approveForm.valid) {
      const { answerId, approvalStatus } = this.approveForm.value;
      this.answerService.approveAnswer(answerId).subscribe(
        (res: any) => {
          console.log('Answer approved successfully!');
        },
        (err: any) => {
          console.error('Error approving answer:', err);
        }
      );
    }
  }
}
