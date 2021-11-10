import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SeedService } from './../../../../core/services/seed/seed.service';

@Component({
  selector: 'app-seed-creation-dialog',
  templateUrl: './seed-creation-dialog.component.html',
  styleUrls: ['./seed-creation-dialog.component.scss']
})
export class SeedCreationDialogComponent implements OnInit {

  createSeedForm!: FormGroup;

  constructor(
    private seedService: SeedService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SeedCreationDialogComponent>,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.createSeedForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      time: [1, [Validators.required, Validators.min(1), Validators.max(500)]],
      min_pH: [0, [Validators.required, Validators.min(0), Validators.max(14)]],
      max_pH: [0, [Validators.required, Validators.min(0), Validators.max(14)]],
      min_red_light: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      max_red_light: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      min_blue_light: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      max_blue_light: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      min_humidity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      max_humidity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      min_temperature: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      max_temperature: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
    });
  }

  createSeed(event: Event) {
    event.preventDefault();
    let seed = this.createSeedForm.value;
    // Fatlta agregar el image a seed
    this.seedService.CreateSeed(seed).subscribe(apiResponse => {
      console.log(apiResponse.data);
      this.dialogRef.close(true);
    })
  }

}
