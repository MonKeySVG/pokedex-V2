import {Component, Input} from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    NgIf,
    NgClass,
    NgForOf
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  isFlipped: boolean = false;

  statNames: string[] = ['HP', 'ATK', 'DEF', 'ATK SP', 'DEF SP', 'SPD'];


  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

}
