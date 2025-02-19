import { Component } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';

@Component({
  selector: 'app-browse-page',
  imports: [PokedexComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css',
})
export class BrowsePageComponent {}
