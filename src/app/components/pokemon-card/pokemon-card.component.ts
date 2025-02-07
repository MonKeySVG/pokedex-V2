import {Component, Input} from '@angular/core';
import {Pokemon} from '../../models/pokemon.model';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
  @Input() pokemon!: Pokemon;
  isFlipped: boolean = false;

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

}
