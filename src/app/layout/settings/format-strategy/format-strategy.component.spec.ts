import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatStrategyComponent } from './format-strategy.component';

describe('FormatStrategyComponent', () => {
  let component: FormatStrategyComponent;
  let fixture: ComponentFixture<FormatStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormatStrategyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
