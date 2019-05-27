import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiSelectorComponent } from './kpi-selector.component';

describe('KpiSelectorComponent', () => {
  let component: KpiSelectorComponent;
  let fixture: ComponentFixture<KpiSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
