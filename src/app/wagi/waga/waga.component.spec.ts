import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagaComponent } from './waga.component';

describe('WagaComponent', () => {
  let component: WagaComponent;
  let fixture: ComponentFixture<WagaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
