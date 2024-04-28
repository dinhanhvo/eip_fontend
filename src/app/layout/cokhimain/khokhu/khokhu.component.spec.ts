import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhokhuComponent } from './khokhu.component';

describe('KhokhuComponent', () => {
  let component: KhokhuComponent;
  let fixture: ComponentFixture<KhokhuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhokhuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhokhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
