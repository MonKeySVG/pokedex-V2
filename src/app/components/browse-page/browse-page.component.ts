import { Component } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import {FilterModuleComponent} from '../filter-module/filter-module.component';

@Component({
  selector: 'app-browse-page',
  imports: [PokedexComponent, FilterModuleComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css',
})
export class BrowsePageComponent {}
