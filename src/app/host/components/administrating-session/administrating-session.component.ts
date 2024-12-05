import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Profile} from "../../../profiles/model/profile";
import {PromoterCodesService} from "../../../requests/services/promoter-codes.service";
import {CreatePromoterCodeRequest} from "../../../requests/model/create-promoter-code-request";
import {PromoterCode} from "../../../requests/model/promoter-code";

@Component({
  selector: 'app-administrating-session',
  templateUrl: './administrating-session.component.html',
  styleUrl: './administrating-session.component.css'
})
export class AdministratingSessionComponent implements OnChanges {
  permissions: number = 10;
  promoterCodes: PromoterCode[] = [];
  @Input() editDialogVisible: boolean = false;
  @Input() sessionUuid = '';
  @Output() onSave = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  dialogVisible_show: boolean = false;
  focusedPromoterCode: PromoterCode = {} as PromoterCode;

  constructor(
    private promoterCodesService: PromoterCodesService,
  ) {
  }

  onPromoterCodeClick(code: PromoterCode) {
    this.focusedPromoterCode = code;
    this.dialogVisible_show = true;
  }

  fetchPromoterCodes() {
    this.promoterCodesService.getPromoterCodesBySessionUuid(this.sessionUuid).subscribe(
      response => {
        this.promoterCodes = response;
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editDialogVisible'] && this.editDialogVisible) {
      this.fetchPromoterCodes();
    }
    if (changes['editDialogVisible'] && !this.editDialogVisible) {
      this.promoterCodes = [];
    }
  }

  onClickingSubmit() {
    let createPromoterCodeRequest = new CreatePromoterCodeRequest(this.sessionUuid, this.permissions);
    this.promoterCodesService.createPromoterCode(createPromoterCodeRequest).subscribe(
      response => {
        this.focusedPromoterCode = response;
        this.dialogVisible_show = true;
        this.fetchPromoterCodes();
        this.onSave.emit();
      }
    );

  }

  onClickingCancel() {
    this.onCancel.emit();
  }


  onShowClose() {
    this.dialogVisible_show = false;
  }
}
