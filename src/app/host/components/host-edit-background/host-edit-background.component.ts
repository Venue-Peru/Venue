import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Host} from "../../model/host";

@Component({
  selector: 'app-host-edit-background',
  templateUrl: './host-edit-background.component.html',
  styleUrl: './host-edit-background.component.css'
})
export class HostEditBackgroundComponent {
  @Input() editDialogVisible: boolean = false;
  @Input() host: Host = {} as Host;
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
