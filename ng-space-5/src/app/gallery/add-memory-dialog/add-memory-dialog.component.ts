import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemoryType } from '../models/memory-type.enum';
// import { Store } from '@ngrx/store';
// import { AddMemory } from '../store/gallery.actions';

@Component({
  selector: 'ngs-add-memory-dialog',
  templateUrl: './add-memory-dialog.component.html',
  styleUrls: ['./add-memory-dialog.component.scss']
})
export class AddMemoryDialogComponent implements OnInit {
  memoryForm: FormGroup;

  // constructor(private store: Store<{}>, private fb: FormBuilder, public dialogRef: MatDialogRef<AddMemoryDialogComponent>) { }
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddMemoryDialogComponent>) { }

  ngOnInit() {
    this.memoryForm = this.fb.group({
      name: [undefined, Validators.required],
      url: [undefined, Validators.required],
      type: [MemoryType.IDK]
    });
  }

  addMemory(): void {
    if (this.memoryForm.valid) {

      // Publish the Add emory Event before close
      // this.store.dispatch(AddMemory(this.memoryForm.value));
      this.data.addMemoryFn(this.memoryForm.value);

      // Close the dialog
      this.dialogRef.close(this.memoryForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
