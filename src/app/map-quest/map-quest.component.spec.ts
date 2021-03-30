import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapQuestComponent } from './map-quest.component';

describe('MapQuestComponent', () => {
  let component: MapQuestComponent;
  let fixture: ComponentFixture<MapQuestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapQuestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
