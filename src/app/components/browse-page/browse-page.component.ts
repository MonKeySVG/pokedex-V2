import {Component, ViewChild} from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import {FilterModuleComponent} from '../filter-module/filter-module.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-browse-page',
  imports: [PokedexComponent, FilterModuleComponent],
  templateUrl: './browse-page.component.html',
  styleUrl: './browse-page.component.css',
})
export class BrowsePageComponent {
  @ViewChild(PokedexComponent) pokedexComponent!: PokedexComponent;
  @ViewChild(FilterModuleComponent) filterModuleComponent!: FilterModuleComponent;

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      if (type) {
        this.filterModuleComponent.selectedTypes = [type];
        this.onSelectedFilterChange();
      }
    });
  }

  onSelectedFilterChange(): void {
    this.pokedexComponent.filterPokemons(
      this.filterModuleComponent.selectedTypes,
      this.filterModuleComponent.selectedGenerations,
      this.filterModuleComponent.selectedStatus,
      this.filterModuleComponent.searchText
    );
  }
}
