import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { HereMapsService } from './here-maps.service';

@Component({
  selector: 'app-here-maps',
  templateUrl: './here-maps.component.html',
  styleUrls: ['./here-maps.component.scss']
})
export class HereMapsComponent implements OnDestroy {
  private readonly ngUnsubscribe: Subject<void> = new Subject<void>();

  public mapForm: FormGroup = this.formBuilder.group({ here: [''] });
  public delay = 750;
  public results: Array<any> = [];
  public mapSearchSelection: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly service: HereMapsService,
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
        console.log('=== here maps:', result);

        this.results = result.items;
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
