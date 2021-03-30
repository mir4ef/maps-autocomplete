import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BingMapsService } from './bing-maps.service';

@Component({
  selector: 'app-bing-maps',
  templateUrl: './bing-maps.component.html',
  styleUrls: ['./bing-maps.component.scss'],
})
export class BingMapsComponent implements OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  public mapForm: FormGroup = this.formBuilder.group({ bing: [''] });
  public delay = 750;
  public results: Array<any> = [];
  public mapSearchSelection: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: BingMapsService,
  ) { }

  public search(event: any): void {
    this.service
      .search(event)
      .pipe(
        take(1),
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((result: any): void => {
        console.log('=== bing:', result);

        this.results = result.resourceSets[0].resources[0].value;
      });
  }

  public handleSelect(value: any): void {
    console.log('=== bing maps selected value:', value);

    this.mapSearchSelection = value;
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
