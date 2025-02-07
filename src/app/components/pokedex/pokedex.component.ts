import { Component } from '@angular/core';
import {PokedexService} from '../../services/pokedex.service';
import {Pokemon} from '../../models/pokemon.model';
import {PokemonCardComponent} from '../pokemon-card/pokemon-card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-pokedex',
  imports: [
    PokemonCardComponent,
    NgForOf
  ],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  pokemons: Pokemon[] = []

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.pokedexService.pokemons$.subscribe(data => {
      this.pokemons = data;
      console.log(this.pokemons);
    });
    this.pokedexService.getAllPokemons();
  }


}
