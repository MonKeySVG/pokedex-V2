import {Component, EventEmitter, Output} from '@angular/core';
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

  selectedTypes: string[] = [];
  selectedGenerations: number[] = [];
  @Output() selectedTypesChange = new EventEmitter<string[]>();
  @Output() selectedGenerationsChange = new EventEmitter<number[]>();


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
    console.log(this.selectedGenerations);
  }





}
