import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingMapsComponent } from './bing-maps.component';

describe('BingMapsComponent', () => {
  let component: BingMapsComponent;
  let fixture: ComponentFixture<BingMapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BingMapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BingMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
