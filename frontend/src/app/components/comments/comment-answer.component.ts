// src/app/components/comments/comments.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-answer', // Selector for this component
  templateUrl: './comment-answer.component.html', // Path to the HTML template
  styleUrls: ['./comment-answer.component.css'] // Path to the CSS stylesheet
})
export class CommentAnswerComponent {
  commentForm: FormGroup; // Form group for the comment form

  // Constructor to initialize the form group and inject necessary services
  constructor(private fb: FormBuilder, private commentService: CommentService) {
    // Initialize the form group with form controls and validation rules
    this.commentForm = this.fb.group({
      answerId: ['', Validators.required], // Answer ID field with required validation
      text: ['', Validators.required] // Comment text field with required validation
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.commentForm.valid) { // Check if the form is valid
      // Call the service method to add the comment
      this.commentService.addComment(this.commentForm.value).subscribe(
        (res: any) => {
          console.log('Comment added successfully!'); // Log success message
        },
        (err: any) => {
          console.error('Error adding comment:', err); // Log error message
        }
      );
    }
  }
}
