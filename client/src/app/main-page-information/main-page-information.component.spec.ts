import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageInformationComponent } from './main-page-information.component';

describe('MainPageInformationComponent', () => {
  let component: MainPageInformationComponent;
  let fixture: ComponentFixture<MainPageInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
