import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PromoterCode} from "../../../requests/model/promoter-code";

@Component({
  selector: 'app-show-promoter-code',
  templateUrl: './show-promoter-code.component.html',
  styleUrl: './show-promoter-code.component.css'
})
export class ShowPromoterCodeComponent {
  @Input() promoterCode: PromoterCode = {} as PromoterCode;
  @Input() dialogVisible: boolean = false;
  @Output() onClose = new EventEmitter();


  constructor() {
  }

  onClickingClose() {
    this.onClose.emit();
  }

  get promoterUrl(): string {
    return `${window.location.origin}/tickets-and-sessions/promoter-checklist/${this.promoterCode.code}`;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.promoterUrl).then(() => {
      alert('URL copied to clipboard');
    });
  }
}
