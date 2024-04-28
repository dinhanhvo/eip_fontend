import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhambenhComponent } from './khambenh.component';

describe('KhambenhComponent', () => {
  let component: KhambenhComponent;
  let fixture: ComponentFixture<KhambenhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhambenhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhambenhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
