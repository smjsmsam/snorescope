import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-page',
    loadComponent: () => import('./pages/home-page/home-page.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
  {
    path: 'day-input-page',
    loadComponent: () => import('./pages/day-input-page/day-input-page.page').then( m => m.DayInputPagePage)
  },
  {
    path: 'day-data-page',
    loadComponent: () => import('./pages/day-data-page/day-data-page.page').then( m => m.DayDataPagePage)
  },
  {
    path: 'sleep-data-page',
    loadComponent: () => import('./pages/sleep-data-page/sleep-data-page.page').then( m => m.SleepDataPagePage)
  },


];
