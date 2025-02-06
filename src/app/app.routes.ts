import { Routes } from '@angular/router';
import {SearchPageComponent} from './components/search-page/search-page.component';
import {BrowsePageComponent} from './components/browse-page/browse-page.component';
import {AboutPageComponent} from './components/about-page/about-page.component';

export const routes: Routes = [
  { path: 'searchPage', component: SearchPageComponent },
  { path: 'browsePage', component: BrowsePageComponent },
  { path: 'aboutPage', component: AboutPageComponent },
  { path: '', redirectTo: '/searchPage', pathMatch: 'full' }
];
