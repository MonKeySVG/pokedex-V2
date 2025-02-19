import {Component, ViewChild} from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import {FilterModuleComponent} from '../filter-module/filter-module.component';

@Component({
  selector: 'app-browse-page',
  imports: [PokedexComponent, FilterModuleComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css',
})
export class BrowsePageComponent {
  @ViewChild(PokedexComponent) pokedexComponent!: PokedexComponent;
  @ViewChild(FilterModuleComponent) filterModuleComponent!: FilterModuleComponent;

  onSelectedFilterChange(): void {
    this.pokedexComponent.filterPokemons(this.filterModuleComponent.selectedTypes, this.filterModuleComponent.selectedGenerations);
  }
}
