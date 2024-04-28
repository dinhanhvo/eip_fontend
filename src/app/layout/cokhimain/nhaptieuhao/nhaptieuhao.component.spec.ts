import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaptieuhaoComponent } from './nhaptieuhao.component';

describe('NhaptieuhaoComponent', () => {
  let component: NhaptieuhaoComponent;
  let fixture: ComponentFixture<NhaptieuhaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhaptieuhaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhaptieuhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
