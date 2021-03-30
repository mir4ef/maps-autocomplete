import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MapQuestService } from './map-quest.service';

@Component({
  selector: 'app-map-quest',
  templateUrl: './map-quest.component.html',
  styleUrls: ['./map-quest.component.scss'],
})
export class MapQuestComponent implements OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  public mapForm: FormGroup = this.formBuilder.group({ mapQuest: [''] });
  public delay = 750;
  public results: Array<any> = [];
  public mapSearchSelection: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: MapQuestService,
  ) { }

  public search(event: any): void {
    console.log('=== query:', event);

    this.service
      .search(event)
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((result: any): void => {
        console.log('=== map quest:', result);

        this.results = result.results;
      });
  }

  public handleSelect(value: any): void {
    console.log('=== here maps selected value:', value);

    this.mapSearchSelection = value;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
