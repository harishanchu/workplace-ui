import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  modalTitle: string;
  modalMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<ConfirmComponent>) {
    this.modalTitle = data.title || 'Confirm';
    this.modalMessage = data.message || 'Do you wish to continue with this action?';
    this.dialogRef.disableClose = true;
  }
}
