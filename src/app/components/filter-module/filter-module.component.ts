import {Component, ElementRef, EventEmitter, Output} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-filter-module',
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './filter-module.component.html',
  styleUrl: './filter-module.component.css'
})
export class FilterModuleComponent {
  types: string[] = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dragon', 'dark', 'steel', 'fairy'
  ];
  generations: number[] = [1, 2, 3, 4, 5, 6, 7];
  status: string[] = ['normal', 'baby', 'mythical', 'legendary'];

  selectedTypes: string[] = [];
  selectedGenerations: number[] = [];
  selectedStatus: string[] = [];
  searchText = '';

  @Output() selectedTypesChange = new EventEmitter<string[]>();
  @Output() selectedGenerationsChange = new EventEmitter<number[]>();
  @Output() selectedStatusChange = new EventEmitter<string[]>();
  @Output() searchTextChange = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {}

  toggleOpen(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.toggle('open');
  }

  toggleSelectedType(event: Event, type: string): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.toggle('selected');
    if (this.selectedTypes.includes(type)) {
      this.selectedTypes = this.selectedTypes.filter((t) => t !== type);
    } else {
      this.selectedTypes.push(type);
    }
    this.selectedTypesChange.emit(this.selectedTypes);
  }

  toggleSelectedGeneration(event: Event, generation: number): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.toggle('selected');
    if (this.selectedGenerations.includes(generation)) {
      this.selectedGenerations = this.selectedGenerations.filter((g) => g !== generation);
    } else {
      this.selectedGenerations.push(generation);
    }
    this.selectedGenerationsChange.emit(this.selectedGenerations);
  }

  toggleSelectedStatus(event: Event, status: string): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.toggle('selected');
    if (this.selectedStatus.includes(status)) {
      this.selectedStatus = this.selectedStatus.filter((s) => s !== status);
    } else {
      this.selectedStatus.push(status);
    }
    this.selectedStatusChange.emit(this.selectedStatus);
  }

  searchPokemon(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value.toLowerCase();
    this.searchTextChange.emit(this.searchText);
  }

  clearFilters(): void {
    this.selectedTypes = [];
    this.selectedGenerations = [];
    this.selectedStatus = [];
    this.searchText = '';

    const selectedElements = this.elementRef.nativeElement.querySelectorAll('.selected');
    selectedElements.forEach((element: HTMLElement) => element.classList.remove('selected'));

    const searchBar = this.elementRef.nativeElement.querySelector('.search-bar') as HTMLInputElement;
    if (searchBar) {
      searchBar.value = '';
    }

    this.selectedTypesChange.emit(this.selectedTypes);
    this.selectedGenerationsChange.emit(this.selectedGenerations);
    this.selectedStatusChange.emit(this.selectedStatus);
    this.searchTextChange.emit(this.searchText);
  }



}
