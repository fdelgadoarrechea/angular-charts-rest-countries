import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporalSelectorComponent } from './temporal-selector.component';

describe('TemporalSelectorComponent', () => {
  let component: TemporalSelectorComponent;
  let fixture: ComponentFixture<TemporalSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
