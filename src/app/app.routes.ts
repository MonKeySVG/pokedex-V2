import {Routes} from '@angular/router';
import {BrowsePageComponent} from './components/browse-page/browse-page.component';
import {AboutPageComponent} from './components/about-page/about-page.component';
import {PokemonDetailsPageComponent} from './components/pokemon-details-page/pokemon-details-page.component';

export const routes: Routes = [
  { path: 'browsePage', component: BrowsePageComponent },
  { path: 'aboutPage', component: AboutPageComponent },
  { path : 'pokemon/:id', component: PokemonDetailsPageComponent },
  { path: '', redirectTo: '/browsePage', pathMatch: 'full' }
];
