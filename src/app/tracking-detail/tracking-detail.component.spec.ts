import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingDetailComponent } from './tracking-detail.component';

describe('TrackingDetailComponent', () => {
  let component: TrackingDetailComponent;
  let fixture: ComponentFixture<TrackingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingDetailComponent]
    });
    fixture = TestBed.createComponent(TrackingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
