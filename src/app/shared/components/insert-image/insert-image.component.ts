import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-insert-image',
  templateUrl: './insert-image.component.html',
  styleUrl: './insert-image.component.css'
})
export class InsertImageComponent {
  @Input() visibility: boolean = false;
  @Input() originalImage: string | null = null;
  imageCache: File | null = null;
  imagePreview: string | ArrayBuffer | null | undefined = null;
  @Output() onSave = new EventEmitter<{ file: File | null, preview: string | ArrayBuffer | null | undefined }>();
  @Output() onCancel = new EventEmitter();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files![0]) {
      this.imageCache = input.files![0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result;
      };
      reader.readAsDataURL(this.imageCache);
    }
  }

  onDialogAccept() {
    this.onSave.emit({ file: this.imageCache, preview: this.imagePreview });
  }

  onDialogCancel() {
    this.onCancel.emit();
  }
}
