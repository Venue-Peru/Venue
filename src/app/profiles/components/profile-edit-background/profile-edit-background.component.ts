// src/app/profiles/components/profile-edit-background/profile-edit-background.component.ts
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Profile} from "../../model/profile";

@Component({
  selector: 'app-profile-edit-background',
  templateUrl: './profile-edit-background.component.html',
  styleUrl: './profile-edit-background.component.css'
})
export class ProfileEditBackgroundComponent {
  @Input() editDialogVisible: boolean = false;
  @Input() profile: Profile = {} as Profile;
  @Output() onSave = new EventEmitter<File>();
  @Output() onCancel = new EventEmitter();

  newBackground: File | null = null;
  newBackgroundPreview: string | ArrayBuffer | null | undefined = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files![0]) {
      this.newBackground = input.files![0];
      const reader = new FileReader();
      reader.onload = (e) => this.newBackgroundPreview = e.target?.result;
      reader.readAsDataURL(this.newBackground);
    }
  }

  onDialogCancel(): void {
    this.onCancel.emit();
  }

  onContinue(): void {
    if (this.newBackground) {
      this.onSave.emit(this.newBackground);
    }
  }
}
