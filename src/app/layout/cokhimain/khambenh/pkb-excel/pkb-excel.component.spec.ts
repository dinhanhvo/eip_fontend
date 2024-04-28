import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PkbExcelComponent } from './pkb-excel.component';

describe('PkbExcelComponent', () => {
  let component: PkbExcelComponent;
  let fixture: ComponentFixture<PkbExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PkbExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PkbExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
