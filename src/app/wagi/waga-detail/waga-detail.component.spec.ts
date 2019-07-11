import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WagaDetailComponent } from './waga-detail.component';

describe('WagaDetailComponent', () => {
  let component: WagaDetailComponent;
  let fixture: ComponentFixture<WagaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WagaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WagaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
