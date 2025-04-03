import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayInputPagePage } from './day-input-page.page';

describe('DayInputPagePage', () => {
  let component: DayInputPagePage;
  let fixture: ComponentFixture<DayInputPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DayInputPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
