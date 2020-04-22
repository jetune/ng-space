import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MemoryType } from '../models/memory-type.enum';

@Component({
  selector: 'ngs-add-memory-dialog',
  templateUrl: './add-memory-dialog.component.html',
  styleUrls: ['./add-memory-dialog.component.scss']
})
export class AddMemoryDialogComponent implements OnInit {
  memoryForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddMemoryDialogComponent>) { }

  ngOnInit() {
    this.memoryForm = this.fb.group({
      name: [undefined, Validators.required],
      url: [undefined, Validators.required],
      type: [MemoryType.IDK]
    });
  }

  addMemory(): void {
    if (this.memoryForm.valid) {
      this.dialogRef.close(this.memoryForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

}
