import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-submit-view',
  templateUrl: './submit-view.component.html',
  styleUrls: ['./submit-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitViewComponent implements OnInit {

  @Input() url: string;
  @Input() image: string;
  @Input() option: string;

  constructor() { }

  ngOnInit(): void {
  }

}
