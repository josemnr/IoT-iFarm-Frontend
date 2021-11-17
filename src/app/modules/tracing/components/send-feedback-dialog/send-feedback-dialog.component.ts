import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Greenhouse } from 'src/app/core/models/greenhouse.model';

import { FeedbackService } from './../../../../core/services/feedback/feedback.service';

@Component({
  selector: 'app-send-feedback-dialog',
  templateUrl: './send-feedback-dialog.component.html',
  styleUrls: ['./send-feedback-dialog.component.scss']
})
export class SendFeedbackDialogComponent implements OnInit {

  user_name!: string;
  greenhouse!: Greenhouse;
  createFeedbackForm!: FormGroup;
  

  constructor(
    private feedbackService: FeedbackService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SendFeedbackDialogComponent>,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.createFeedbackForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
      score: [0, [Validators.required, Validators.min(0), Validators.max(5)]]
    });
  }

  createFeedback(event: Event) {
    event.preventDefault();
    console.log(this.createFeedbackForm.value)
    let feedback = this.createFeedbackForm.value
    feedback.seed_id = this.greenhouse.seed_id;
    feedback.user_name = this.user_name;
    feedback.params = {
      humidity: this.greenhouse.humidity,
      light: this.greenhouse.light,
      temperature: this.greenhouse.temperature
    };

    this.feedbackService.createFeedback(feedback);
    // .subscribe(apiResponse => {
    //   console.log(apiResponse.data);
      this.dialogRef.close(true);
    // })
  }
}
