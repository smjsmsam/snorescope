import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DayDataPagePage } from './day-data-page.page';

describe('DayDataPagePage', () => {
  let component: DayDataPagePage;
  let fixture: ComponentFixture<DayDataPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DayDataPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
