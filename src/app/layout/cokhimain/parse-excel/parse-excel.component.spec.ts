import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseExcelComponent } from './parse-excel.component';

describe('ParseExcelComponent', () => {
  let component: ParseExcelComponent;
  let fixture: ComponentFixture<ParseExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParseExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
