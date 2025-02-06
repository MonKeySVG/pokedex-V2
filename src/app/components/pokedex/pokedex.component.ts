import { Component } from '@angular/core';
import {PokedexService} from '../../services/pokedex.service';

@Component({
  selector: 'app-pokedex',
  imports: [],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {

  constructor(private pokedexService: PokedexService) {}


  ngOnInit() {
    this.pokedexService.getAllPokemons().subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('Error fetching Pokémon data', error);
      }
    });
  }
}
