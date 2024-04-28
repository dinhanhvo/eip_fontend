import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuocReportComponent } from './thuoc-report.component';

describe('ThuocReportComponent', () => {
  let component: ThuocReportComponent;
  let fixture: ComponentFixture<ThuocReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThuocReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThuocReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
