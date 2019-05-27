import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionLegendComponent } from './evolution-legend.component';

describe('EvolutionLegendComponent', () => {
  let component: EvolutionLegendComponent;
  let fixture: ComponentFixture<EvolutionLegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionLegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
