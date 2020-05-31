import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngs-add-memory-dialog',
  templateUrl: './add-memory-dialog.component.html',
  styleUrls: ['./add-memory-dialog.component.scss']
})
export class AddMemoryDialogComponent implements OnInit {
  memoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddMemoryDialogComponent>) { }

  ngOnInit() {

    this.memoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      type: new FormControl('IDK'),
    });

    // with FormBuilder
    this.memoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      type: ['IDK']
    });

    this.memoryForm.valueChanges.subscribe(r => console.log(r));
  }

  addMemory(): void {
    // TODO 7: To be or not to be valid ?
    if (this.memoryForm.valid) {
      this.dialogRef.close(this.memoryForm.value);
    }

  }

  closeDialog(): void {
    // TODO 7: Close my up !
    this.dialogRef.close(null);
  }

}
