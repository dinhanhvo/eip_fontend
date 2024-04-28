import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapthuocComponent } from './nhapthuoc.component';

describe('NhapthuocComponent', () => {
  let component: NhapthuocComponent;
  let fixture: ComponentFixture<NhapthuocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapthuocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapthuocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
