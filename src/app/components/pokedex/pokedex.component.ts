import { Component } from '@angular/core';
import {PokedexService} from '../../services/pokedex.service';
import {Pokemon} from '../../models/pokemon.model';

@Component({
  selector: 'app-pokedex',
  imports: [],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
  pokemons: Pokemon[] = []

  constructor(private pokedexService: PokedexService) {}

  ngOnInit() {
    this.pokedexService.getAllPokemons().subscribe({
      next: data => {
        this.pokemons = data.map(pokemonData => {
          const id = pokemonData.id;
          const name = pokemonData.name;
          const types = pokemonData.types.map((type: any) => type.type.name);
          const generation = this.getGeneration(id);
          const spriteUrl = pokemonData.sprites.front_default;
          const spriteArtworkUrl = pokemonData.sprites.other['official-artwork'].front_default;
          const spriteShowdownUrl = pokemonData.sprites.other.showdown.front_default;
          const height = pokemonData.height / 10;
          const weight = pokemonData.weight;
          const stats = pokemonData.stats.map((stat: any) => stat.base_stat);
          return new Pokemon(id, name, types, generation, spriteUrl, spriteArtworkUrl, spriteShowdownUrl, height, weight, stats);
        })
        console.log(this.pokemons);
      },
      error: error => {
        console.error('Error fetching Pokémon data', error);
      }
    });
  }

  getGeneration(pokemonId: number): number {
    if (pokemonId <= 151) return 1;
    if (pokemonId <= 251) return 2;
    if (pokemonId <= 386) return 3;
    if (pokemonId <= 493) return 4;
    if (pokemonId <= 649) return 5;
    if (pokemonId <= 721) return 6;
    return 7;
  }
}
