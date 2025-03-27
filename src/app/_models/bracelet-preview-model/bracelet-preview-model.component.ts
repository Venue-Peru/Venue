import {Component, Input} from '@angular/core';
import {BraceletType} from "../../_enums/bracelet-types";

@Component({
  selector: 'app-bracelet-preview-model',
  templateUrl: './bracelet-preview-model.component.html',
  styleUrl: './bracelet-preview-model.component.css'
})
export class BraceletPreviewModelComponent {
  @Input() text: string = '';
  @Input() braceletType: BraceletType = BraceletType.Basic;
  @Input() selected: boolean = false;
}
