import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CzasComponent } from './czas.component';

describe('CzasComponent', () => {
  let component: CzasComponent;
  let fixture: ComponentFixture<CzasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CzasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
