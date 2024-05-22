import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'app-approve-answer',
  templateUrl: './approve-answer.component.html',
  styleUrls: ['./approve-answer.component.css']
})
export class ApproveAnswerComponent {
  approveForm: FormGroup; // Declaring a FormGroup variable to handle form data

  constructor(private fb: FormBuilder, private answerService: AnswerService) {
    // Initializing the form with FormBuilder
    this.approveForm = this.fb.group({
      answerId: ['', Validators.required], // Defining a form control for answerId with validation
      approvalStatus: ['', Validators.required] // Defining a form control for approvalStatus with validation
    });
  }

  onSubmit() {
    // Handling form submission
    if (this.approveForm.valid) { // Checking if the form is valid
      const { answerId, approvalStatus } = this.approveForm.value; // Extracting form values
      this.answerService.approveAnswer(answerId).subscribe( // Calling a service method to approve an answer
        (res: any) => {
          console.log('Answer approved successfully!'); // Logging success message if approval is successful
        },
        (err: any) => {
          console.error('Error approving answer:', err); // Logging error message if approval fails
        }
      );
    }
  }
}
